# renderMarkdown()

Fonction utilitaire du composant `src/views/projecteur.vue`.  
Elle convertit un sous-ensemble de syntaxe Markdown en HTML avant d'afficher les réponses du chatbot.

---

## Pourquoi cette fonction existe

Claude (l'IA derrière Le Projecteur) renvoie du texte brut formaté en Markdown. Dans un terminal ou un éditeur, le Markdown est lisible. Dans un `<div>` HTML, les caractères `**`, `#` etc. s'affichent tels quels — l'utilisateur voit `**mot**` au lieu de **mot** en gras. Cette fonction fait la traduction.

Elle n'utilise aucune bibliothèque externe pour rester légère. Elle ne gère qu'un sous-ensemble ciblé de Markdown (gras et titres), les seuls formats que le system prompt de Claude est susceptible de produire.

---

## Où elle est appelée

Deux endroits dans le template de `projecteur.vue`, tous deux avec `v-html` :

```vue
<!-- Bulle bot (réponse normale de Claude) -->
<div v-html="renderMarkdown(msg.content)" />

<!-- Texte de la synthèse (après suppression du marqueur ###SYNTHESE###) -->
<p v-html="renderMarkdown(synthesisText(msg.content))" />
```

`v-html` est l'équivalent Vue de `innerHTML`. Sans lui, Vue afficherait la chaîne brute avec les balises visibles. Avec lui, le navigateur interprète le HTML injecté et rend les balises `<strong>` en gras.

> La bulle utilisateur (`msg.role === 'user'`) utilise `{{ msg.content }}` (interpolation simple) et n'appelle **pas** `renderMarkdown`. Le texte de l'utilisateur ne vient pas de Claude, il ne contiendra jamais de Markdown — et par prudence on ne l'interprète jamais comme du HTML.

---

## Code complet

```js
function renderMarkdown(text) {
  return (
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // **gras** → <strong>
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // ###titre### → <strong>
      .replace(/###([^#\n]+?)###/g, '<strong>$1</strong>')
      // ### titre (début de ligne) → <strong>
      .replace(/^#{1,3} (.+)$/gm, '<strong>$1</strong>')
  )
}
```

---

## Étape par étape

Les remplacements s'enchaînent dans l'ordre. Chaque `.replace()` reçoit la chaîne produite par le précédent.

---

### Étape 1 — Échappement HTML (sécurité)

```js
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
```

**Ce que ça fait :** convertit les trois caractères spéciaux HTML en entités HTML avant de faire quoi que ce soit d'autre.

| Caractère brut | Entité HTML | Résultat affiché |
|---|---|---|
| `&` | `&amp;` | & |
| `<` | `&lt;` | < |
| `>` | `&gt;` | > |

**Pourquoi c'est obligatoire :** la fonction injecte du HTML via `v-html = innerHTML`. Sans cet échappement, si la réponse de Claude contenait par exemple `<script>alert('xss')</script>`, le navigateur l'exécuterait. En échappant `<` en `&lt;` on garantit qu'aucun caractère de la réponse originale ne peut être interprété comme une balise HTML — seules les balises que *nous* ajoutons ensuite (les `<strong>`) seront du vrai HTML.

**Ordre important :** cet échappement se fait en premier. Si on faisait les remplacements Markdown avant, les `<strong>` qu'on insère seraient eux-mêmes échappés en `&lt;strong&gt;` et s'afficheraient en texte brut.

---

### Étape 2 — Gras Markdown (`**texte**`)

```js
.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
```

**Pattern regex :** `/\*\*(.+?)\*\*/g`

| Partie | Signification |
|---|---|
| `\*\*` | deux astérisques littéraux (l'astérisque est un caractère spécial regex, le `\` l'échappe) |
| `(.+?)` | un groupe capturant (`( )`) qui matche un ou plusieurs caractères (`.+`) en mode **non-greedy** (`?`) |
| `\*\*` | les deux astérisques fermants |
| `g` | flag global — remplace toutes les occurrences dans la chaîne, pas seulement la première |

**Non-greedy (`.+?`) vs greedy (`.+`) :** sans le `?`, la regex serait gourmande et capturerait le maximum possible. Exemple avec `**A** et **B**` :
- Greedy : matche `**A** et **B**` → produit `<strong>A** et **B</strong>` (faux)
- Non-greedy : matche `**A**` puis `**B**` → produit `<strong>A</strong> et <strong>B</strong>` (correct)

**Remplacement :** `'<strong>$1</strong>'` — `$1` est le contenu du groupe capturant, c'est-à-dire le texte entre les `**`.

**Exemple :**
```
Entrée : "C'est **très important** pour la suite."
Sortie : "C'est <strong>très important</strong> pour la suite."
```

---

### Étape 3 — Titre encadré (`###titre###`)

```js
.replace(/###([^#\n]+?)###/g, '<strong>$1</strong>')
```

**Pattern regex :** `/###([^#\n]+?)###/g`

| Partie | Signification |
|---|---|
| `###` | trois dièses littéraux |
| `([^#\n]+?)` | groupe capturant : un ou plusieurs caractères qui ne sont **ni** `#` **ni** saut de ligne (`[^...]` = classe niée), non-greedy |
| `###` | trois dièses fermants |
| `g` | flag global |

**Pourquoi `[^#\n]` plutôt que `.+?` :** pour éviter qu'une regex trop large ne s'étende sur plusieurs lignes ou englobe des `#` intermédiaires qui appartiendraient à un autre motif. La classe niée garantit qu'on s'arrête dès le premier `#` ou saut de ligne.

**Cas d'usage principal :** le marqueur `###SYNTHESE###` lui-même, si jamais Claude l'écrit dans un contexte où `isSynthesis()` ne l'intercepte pas. Il sera rendu `<strong>SYNTHESE</strong>` plutôt qu'affiché brut avec les dièses.

**Exemple :**
```
Entrée : "###SYNTHESE###"
Sortie : "<strong>SYNTHESE</strong>"
```

**Ordre par rapport à l'étape 2 :** sans importance ici car les deux patterns sont distincts. Mais l'étape 1 (échappement) doit toujours être avant.

---

### Étape 4 — Titre Markdown en début de ligne (`### titre`)

```js
.replace(/^#{1,3} (.+)$/gm, '<strong>$1</strong>')
```

**Pattern regex :** `/^#{1,3} (.+)$/gm`

| Partie | Signification |
|---|---|
| `^` | début de ligne (activé par le flag `m`) |
| `#{1,3}` | entre 1 et 3 dièses — couvre `#` (h1), `##` (h2), `###` (h3) |
| ` ` | un espace (obligatoire en Markdown standard entre le `#` et le titre) |
| `(.+)` | groupe capturant : tout le reste de la ligne (greedy ici — on veut tout le titre) |
| `$` | fin de ligne (activé par le flag `m`) |
| `g` | flag global |
| `m` | flag multiline — fait en sorte que `^` et `$` correspondent aux débuts/fins de **chaque ligne** de la chaîne, pas seulement du début/fin de la chaîne entière |

**Pourquoi le flag `m` est indispensable :** la réponse de Claude est une chaîne multi-lignes. Sans `m`, `^` ne matche que le tout début de la chaîne et `$` que la toute fin — les titres sur des lignes intérieures ne seraient jamais détectés.

**Exemple :**
```
Entrée : "### Contexte professionnel\nTu travailles dans..."
Sortie : "<strong>Contexte professionnel</strong>\nTu travailles dans..."
```

**Relation avec l'étape 3 :** les deux gèrent les `#` mais des formats différents.  
- Étape 3 : `###titre###` — dièses de chaque côté, sans espace  
- Étape 4 : `### titre` — dièses seulement à gauche, avec espace après, en début de ligne  
Elles ne se marchent pas dessus.

---

## Tableau récapitulatif

| Étape | Regex | Format d'entrée | Résultat |
|---|---|---|---|
| 1 | `/&/g` `/</g` `/>/g` | `<script>` | `&lt;script&gt;` |
| 2 | `/\*\*(.+?)\*\*/g` | `**important**` | `<strong>important</strong>` |
| 3 | `/###([^#\n]+?)###/g` | `###SYNTHESE###` | `<strong>SYNTHESE</strong>` |
| 4 | `/^#{1,3} (.+)$/gm` | `### Mon titre` | `<strong>Mon titre</strong>` |

---

## Ce que la fonction ne fait pas

Elle est volontairement minimaliste. Elle ne gère pas :

- `*italique*` (une seule étoile) — Claude ne l'utilise pas dans ce contexte
- `` `code inline` `` — pas nécessaire pour ce chatbot
- Listes à puces ou numérotées (`- item`, `1. item`)
- Liens Markdown `[texte](url)`
- Tableaux Markdown
- Sauts de ligne doubles → `<p>` — les sauts de ligne simples (`\n`) sont préservés via la classe CSS `whitespace-pre-wrap` sur l'élément affichant le `v-html`

Si Claude venait à produire ces formats un jour, les caractères bruts s'afficheraient simplement tels quels, sans erreur. Il faudrait alors ajouter les remplacements correspondants dans la fonction.

---

## CSS associé

La fonction produit du HTML avec des `<strong>`. Pour que les sauts de ligne (`\n`) de la réponse de Claude soient toujours rendus visuellement, les éléments qui utilisent `v-html="renderMarkdown(...)"` ont la classe Tailwind `whitespace-pre-wrap` :

```css
white-space: pre-wrap;
```

Cela dit au navigateur de respecter les espaces et les `\n` dans les nœuds texte, ce qui est nécessaire car `v-html` injecte du HTML (où les `\n` sont normalement ignorés comme de simples espaces).
