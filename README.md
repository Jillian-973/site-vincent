# Phronesis (Mésotès)

Plateforme libre de ressources pédagogiques innovantes pour se former autrement à l'intelligence artificielle générative. Le site propose des activités ludiques pour comprendre l'IA générative en la manipulant directement plutôt que par un cours magistral.

## Stack technique

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vue Router](https://router.vuejs.org/) (mode hash, pour la SPA des activités)
- [Vite](https://vite.dev/) — build multi-pages (deux points d'entrée HTML)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- ESLint + oxlint + Prettier

## Structure du projet

Le site est une application **multi-pages** : deux fichiers HTML d'entrée, chacun avec son propre point de montage Vue.

```
index.html        → src/main.js     → App.vue            (page d'accueil)
activite.html      → src/activite.js → ActiviteApp.vue     (SPA des activités, via Vue Router)
```

```
src/
├── App.vue                  # page d'accueil (hero, carousel, présentation)
├── main.js                  # point d'entrée de index.html
├── activite.js               # point d'entrée de activite.html (créé le routeur)
├── ActiviteApp.vue           # coquille de la SPA activités (<RouterView />)
├── components/
│   ├── header.vue            # navigation principale
│   ├── footer.vue
│   ├── carousel.vue           # carousel "fan" utilisé sur la page d'accueil
│   ├── AiCarousel.vue         # carousel réutilisable listant des IA (16:9, autoplay 4s)
│   └── FortuneWheel.vue       # modal "roue de la fortune" (choix de thème musical)
├── views/                    # pages de la SPA activités (routées via Vue Router)
│   ├── ActiviteList.vue       # grille des activités (cartes qui se retournent)
│   ├── projecteur.vue         # activité "Le Projecteur" (chat de cadrage de projet)
│   ├── decorateur.vue         # activité "Décorateur d'intérieur"
│   ├── dj.vue                 # activité "Le DJ" (roue de thèmes + carrousels IA)
│   └── galerie.vue            # "Galerie d'image" (à venir)
├── styles/style.css           # Tailwind + thème de couleurs custom
└── assets/                    # images et icônes
```

## Les activités (`/activite.html`)

La page Activités est une mini-SPA (routage par hash, sans rechargement) :

| Route | Activité | Description |
|---|---|---|
| `#/` | Liste | Grille de cartes qui se retournent au survol (desktop) ou au tap (mobile) |
| `#/projecteur` | Le Projecteur | Chat conversationnel pour cadrer un projet IA et obtenir une synthèse |
| `#/decorateur` | Décorateur d'intérieur | Crée une pièce avec une IA, carrousel d'outils à essayer |
| `#/dj` | Le DJ | Choix d'un thème musical (à la main ou via une roue de la fortune), génération de musique (Suno) et de pochette d'album |
| `#/galerie` | Galerie d'image | Activité à venir |

## Lancer le projet

Prérequis : Node `^20.19.0` ou `>=22.12.0`.

```sh
npm install
```

### Développement (hot-reload)

```sh
npm run dev
```

### Build de production

```sh
npm run build
```

Génère `dist/` avec les deux pages (`index.html` et `activite.html`).

### Prévisualiser le build

```sh
npm run preview
```

### Lint & format

```sh
npm run lint     # oxlint + eslint (avec --fix)
npm run format    # prettier sur src/
```

## Déploiement

Le projet est prévu pour un hébergement Apache classique : `.htaccess` redirige toutes les routes inconnues vers `index.html` (nécessaire pour le routage côté client). Builder avec `npm run build`, puis déployer le contenu de `dist/`.

## Responsive

L'interface est pensée mobile-first jusqu'à l'iPhone 13 (390px de large), en passant par tablette et desktop. Le grid des activités passe de 1 colonne (mobile) à 2 (tablette) à 4 (desktop), et les carrousels/modals s'adaptent en conséquence.
