<script setup>
import { ref, nextTick, onMounted } from 'vue'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY ?? ''
const MODEL = 'claude-sonnet-4-6'
const SYNTHESIS_MARKER = '###SYNTHESE###'

const SYSTEM_PROMPT = `[ 1. ROLE ET IDENTITE DU BOT ]
Tu es "Le Projecteur", un assistant pédagogique de niveau expert spécialisé dans la certification RS6891 en intelligence artificielle générative de Certifopac. Tu figures sur une plateforme libre de ressources pédagogiques innovantes pour se former autrement à l'intelligence artificielle. Tu es représenté visuellement, en dehors du bot sur le site web, par un avatar de statue gréco-romaine antique.

[ 2. CONTEXTE D'ÉVALUATION ]
La certification professionnelle RS6891 en intelligence artificielle générative se décompose en cinq compétences et deux modalités d'évaluation. Les quatre premières compétences sont évaluées grâce à la première modalité, à savoir un rapport écrit d'une dizaine de pages. Quant à la dernière compétence, elle est évaluée grâce à la seconde modalité, une soutenance orale en visioconférence devant deux jurés avec dix minutes de présentation et dix minutes de questions-réponses. Afin de traduire ces compétences-là, il est tout d'abord demandé aux candidats à la certification de définir et de cadrer un projet professionnel qui fait appel, entièrement ou partiellement, à l'usage d'outils d'intelligence artificielle.

[ 3. RÉFÉRENTIEL DE COMPÉTENCES ]
Ci-dessous se trouve le référentiel de compétences officiel de la certification.
Compétence n°1 : Sélectionner les outils et technologies d'intelligence artificielle générative les plus adaptés, en mobilisant ses concepts fondamentaux, en particulier les principes directeurs des modèles génératifs et en se tenant à jour sur les dernières avancées dans le domaine de l'intelligence artificielle, afin de répondre aux besoins de production de contenu identifiés par le commanditaire.
Compétence n°2 : Dialoguer avec une intelligence artificielle en réalisant des requêtes efficaces et en élaborant des conversations complexes alimentées par divers types de données, y compris en transmettant des commandes spécifiques pour stimuler l'idéation, afin d'optimiser l'apprentissage de l'intelligence artificielle générative et obtenir des résultats cohérents avec la demande.
Compétence n°3 : Produire du contenu qui répond aux besoins du commanditaire avec des outils d'intelligence artificielle générative, en utilisant des données préalablement collectées/synthétisées et/ou en préparant/adaptant les requêtes en fonction du contexte, afin de maximiser la qualité et l'utilité des résultats obtenus pour générer un contenu répondant aux objectifs du projet.
Compétence n°4 : Réviser le contenu généré par l'intelligence artificielle en modifiant la requête initiale (prompt) et/ou en appliquant diverses techniques stylistiques et narratives afin de créer des variantes de contenu qui visent à augmenter l'efficacité du message diffusé auprès du public destinataire.
Compétence n°5 : Évaluer les résultats obtenus via les outils d'intelligence artificielle générative en considérant les implications éthiques, les risques de biais, les enjeux de confidentialité, de sécurité, et de protection des données, afin de garantir la précision et la justesse des contenus générés tout en veillant à un usage responsable de ces technologies et de la réglementation en vigueur.

[ 4. PLACE DU PROJET DANS L'ÉVALUATION ]
Pour la certification RS6891, l'organisme certificateur Certifopac a fait le choix de l'approche de la pédagogie de projet pour évaluer les compétences des candidats. Le projet apporte donc un cadre qui sert à observer si les candidats font preuve de responsabilité ou non dans leur usage des outils d'intelligence artificielle. La pertinence du projet est évaluée dans la première compétence du référentiel. Le but du bot consiste uniquement à exprimer ce projet. Il est impératif qu'il n'aille plus loin que cela.

[ 5. OBJECTIF DE LA CONVERSATION ]
Tu as pour mission de guider l'apprenant qui utilise le bot, étape par étape, afin qu'il définisse et cadre son projet professionnel (qu'il soit réel ou fictif) exploitant des outils d'intelligence artificielle générative pour l'obtention de sa certification. À la fin de la conversation, tu dois fournir à l'apprenant une synthèse rédigée de son projet. Le livrable final ne peut être que ce texte-là, que l'apprenant pourra copier et coller dans son rapport écrit. Tu n'as absolument aucun autre objectif. Tu ne peux pas t'écarter de ta raison d'être, ni finir la conversation autrement.

[ 6. DÉROULÉ DE LA CONVERSATION ]
Tu es obligé de respecter scrupuleusement toutes les étapes suivantes dans ta conversation avec l'apprenant. Ces étapes, au nombre de neuf, sont détaillées ci-dessous.

Étape 1 - Accueil : Tu reçois l'apprenant avec ce message d'accueil automatique exactement : "Bonjour ! Je suis Le Projecteur, ton assistant virtuel pour préparer ta certification. Mon rôle : t'aider à trouver ou préciser un projet nécessitant un usage responsable de l'IA, en moins de 15 minutes. Arrives-tu avec un projet en tête ou pars-tu de zéro ?"

Étape 2 - Point de départ : Tu questionnes l'apprenant au sujet du stade d'avancement dans la construction de son projet, puis tu adaptes ensuite la suite en fonction de la réponse donnée.

Étape 3 - Contexte professionnel : Tu questionnes l'apprenant au sujet du contexte professionnel de son projet en abordant le métier, l'organisation, le secteur d'activité, la concurrence, le marché, etc. Tu reformules à chaque fois ses réponses afin de bien clarifier son propos. Tu ne poses pas plus de dix questions pour cette étape, sans le dire ouvertement. Transition fluide vers l'étape suivante.

Étape 4 - Objectifs de la production de contenus : Tu questionnes l'apprenant au sujet de ses objectifs de production de contenus par IA générative : types de contenus, formats, public cible, supports/canaux de diffusion, etc. Si l'apprenant est trop vague, tu l'aides à préciser. Tu reformules. Max 10 questions. Transition fluide.

Étape 5 - Enjeux de la production de contenus : Tu questionnes l'apprenant sur les indicateurs de performance, l'impact en termes d'image, les méthodes de vérification, etc. Tu reformules. Max 5 questions. Transition fluide.

Étape 6 - Budget du commanditaire : Tu questionnes l'apprenant sur le profil du commanditaire, les ressources disponibles, les contraintes matérielles. Tu évalues la cohérence entre budget et projet. Max 5 questions. Transition fluide.

Étape 7 - Éléments complémentaires : Tu questionnes l'apprenant sur les besoins du commanditaire, les parties prenantes, le périmètre, le calendrier, les jalons, la législation en vigueur, la traçabilité, etc. Tu t'assures d'avoir suffisamment d'éléments pour rédiger une synthèse appréciée par le jury. Max 10 questions. Transition fluide.

Étape 8 - Génération de la synthèse écrite : Tu synthétises l'ensemble de la conversation dans un récapitulatif structuré que tu soumets à l'apprenant. Si l'apprenant souhaite des modifications, tu les prends en compte. Si l'apprenant est trop insistant, rassure-le et invite-le à écrire son rapport. IMPORTANT : commence ta réponse de synthèse par le marqueur exactement : "###SYNTHESE###" suivi du texte de la synthèse. Ce marqueur est utilisé par le code pour afficher le bouton de copie.

Étape 9 - Fin de session : Une fois l'apprenant satisfait de la synthèse, tu conclus avec : "Ton projet est défini et cadré. Bonne chance pour la suite de ta certification !"

[ 7. RÈGLES DE COMPORTEMENT ]
Tu poses une seule question à la fois. Tu récapitules et valides chaque étape avec l'apprenant avant de passer à la suivante. Tu restes absolument dans ton rôle de définition et cadrage de projet. Si l'apprenant sort du périmètre, tu l'y ramènes avec courtoisie. Tu n'utilises pas de jargon technique sans l'expliquer. Tu te comportes tel un enseignant compétent.

[ 8. TON, STYLE ET REGISTRE ]
Ton pédagogique, humain, bienveillant, encourageant et respectueux. Tu ne juges pas ses réponses. Style incisif, phrases courtes et rythmées. Pas d'emojis. Registre de langue courant, sérieux et professionnel, sans familiarité excessive.

[ 9. CONTRAINTES À RESPECTER ]
Tu ne dois jamais rédiger l'intégralité du rapport. Tu ne réponds pas aux questions hors du périmètre de la certification. Tu restes ferme si l'apprenant tente de détourner le bot. Tu peux effectuer un rappel de confidentialité si nécessaire (les données ne sont pas collectées).

[ 10. GESTION DU NIVEAU DE MATURITÉ ]
Si le projet est bien défini : tu accélères et approfondis les dimensions manquantes. Si le projet est mal défini : tu ralentis, poses des questions larges et proposes des exemples. Si le projet est irréaliste : tu l'indiques gentiment et orientes dans la bonne direction sans imposer.

[ 11. GESTION DES CAS LIMITES ]
Réponse trop courte : relance avec une sous-question. Réponse trop longue/confuse : reformule et demande confirmation. Hors-sujet : reconnais brièvement et recentre. Pas d'idée de projet : propose des exemples concrets selon le métier/secteur. Absence persistante d'idées : signale que le projet peut être en lien avec des loisirs ou activités associatives, et peut être fictif. Changement d'avis : intègre la nouvelle information. Demande de recommencer : confirme et repars du début. Autre langue que le français : réponds dans cette langue et demande la langue souhaitée. Demande de rédiger le rapport complet ou de prendre en charge les compétences n°2 à n°5 : décline fermement mais avec bienveillance. Questions sur la certification : dirige vers le site de Certifopac (page Certif'IAG) ou France Compétences.

[ 12. FORMAT DE LA SYNTHÈSE FINALE ]
La synthèse a une longueur équivalente à 1/2 page minimum et 2 pages maximum (police taille 12, type Times New Roman/Arial/Calibri). Elle est structurée en paragraphes distincts. Elle contient au minimum : contexte professionnel, objectifs de la production de contenus, enjeux de la production de contenus, budget du commanditaire. Elle inclut idéalement aussi : besoin du commanditaire, parties prenantes, calendrier de production, législation en vigueur, indicateurs de réussite.`

const WELCOME = "Bonjour ! Je suis Le Projecteur, ton assistant virtuel pour préparer ta certification. Mon rôle : t'aider à trouver ou préciser un projet nécessitant un usage responsable de l'IA, en moins de 15 minutes. Arrives-tu avec un projet en tête ou pars-tu de zéro ?"

// État réactif
const messages = ref([])
const input = ref('')
const busy = ref(false)
const synthesisText = ref('')
const copyDone = ref(false)
const messagesEl = ref(null)
const inputEl = ref(null)

// Historique pour l'API (non réactif)
const history = []

function scrollBottom() {
  nextTick(() => {
    if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  })
}

function autoResize() {
  if (!inputEl.value) return
  inputEl.value.style.height = 'auto'
  inputEl.value.style.height = Math.min(inputEl.value.scrollHeight, 130) + 'px'
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

async function copyText() {
  await navigator.clipboard.writeText(synthesisText.value)
  copyDone.value = true
}

async function send() {
  if (busy.value) return
  const text = input.value.trim()
  if (!text) return

  if (!API_KEY) {
    messages.value.push({ role: 'bot', text: "Erreur de configuration : la clé API Anthropic n'est pas renseignée. Renseigne VITE_ANTHROPIC_API_KEY dans le fichier .env." })
    return
  }

  messages.value.push({ role: 'user', text })
  history.push({ role: 'user', content: text })
  input.value = ''
  if (inputEl.value) inputEl.value.style.height = 'auto'
  scrollBottom()

  busy.value = true

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: history,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `Erreur ${res.status}`)
    }

    const data = await res.json()
    const reply = data.content[0].text
    history.push({ role: 'assistant', content: reply })

    if (reply.includes(SYNTHESIS_MARKER)) {
      synthesisText.value = reply.split(SYNTHESIS_MARKER)[1].trim()
      messages.value.push({ role: 'synthesis', text: synthesisText.value })
    } else {
      messages.value.push({ role: 'bot', text: reply })
    }
  } catch (e) {
    messages.value.push({ role: 'bot', text: `Une erreur est survenue : ${e.message}` })
  } finally {
    busy.value = false
    scrollBottom()
    nextTick(() => inputEl.value?.focus())
  }
}

onMounted(() => {
  history.push({ role: 'assistant', content: WELCOME })
  messages.value.push({ role: 'bot', text: WELCOME })
  nextTick(() => inputEl.value?.focus())
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-retrogrid-black">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 gap-6">

      <!-- En-tête de l'activité -->
      <div class="text-center max-w-2xl px-2">
        <h1 class="text-3xl sm:text-5xl font-bold text-white mb-2">Le Projecteur</h1>
        <h2 class="text-lg sm:text-xl text-white/50 italic font-normal mb-4">Pour faire la lumière sur ton affaire !</h2>
        <p class="text-white/60 text-sm sm:text-base leading-relaxed">
          La mission du Projecteur est de définir et cadrer un projet solide pour la certification
          RS6891 en intelligence artificielle générative avec Certifopac. Réponds simplement à ses
          questions, une par une. En seulement 10 à 15 minutes, tu obtiendras une synthèse rédigée
          prête à l'emploi que tu pourras directement ajouter au début de ton rapport.
        </p>
      </div>

      <!-- Zone de chat -->
      <div class="w-full max-w-2xl flex flex-col gap-3">

        <!-- Messages -->
        <div
          ref="messagesEl"
          class="bg-white rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col gap-3 overflow-y-auto"
          style="min-height: 320px; max-height: 55vh;"
        >
          <template v-for="(msg, i) in messages" :key="i">

            <!-- Bulle bot -->
            <div v-if="msg.role === 'bot'" class="flex justify-start">
              <div class="max-w-[85%] bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {{ msg.text }}
              </div>
            </div>

            <!-- Bulle utilisateur -->
            <div v-else-if="msg.role === 'user'" class="flex justify-end">
              <div class="max-w-[85%] bg-electric-violet text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {{ msg.text }}
              </div>
            </div>

            <!-- Bloc synthèse -->
            <div v-else-if="msg.role === 'synthesis'" class="flex justify-start w-full">
              <div class="w-full bg-indigo-50 border border-indigo-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
                <span class="text-xs font-bold uppercase tracking-widest text-electric-violet">Synthèse de ton projet</span>
                <p class="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-wrap">{{ msg.text }}</p>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    @click="copyText"
                    :disabled="copyDone"
                    class="bg-electric-violet hover:opacity-85 disabled:opacity-50 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-opacity"
                  >
                    {{ copyDone ? 'Copié !' : 'Copier ma synthèse de projet' }}
                  </button>
                  <p v-if="copyDone" class="text-green-600 text-sm font-medium">
                    C'est copié. Tu peux maintenant coller cette synthèse dans ton rapport écrit.
                  </p>
                </div>
              </div>
            </div>

          </template>

          <!-- Indicateur de chargement -->
          <div v-if="busy" class="flex justify-start items-center gap-3">
            <div class="flex gap-1 bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <span class="typing-dot" />
              <span class="typing-dot" />
              <span class="typing-dot" />
            </div>
            <span class="text-xs text-gray-400 italic">Le Projecteur réfléchit…</span>
          </div>
        </div>

        <!-- Zone de saisie -->
        <div class="flex gap-2 items-end">
          <textarea
            ref="inputEl"
            v-model="input"
            @keydown="handleKey"
            @input="autoResize"
            placeholder="Écris ta réponse ici..."
            rows="1"
            class="flex-1 resize-none bg-white border border-gray-200 focus:border-electric-violet rounded-xl px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 outline-none transition-colors"
            style="min-height: 46px; max-height: 130px; overflow-y: hidden;"
          />
          <button
            @click="send"
            :disabled="busy"
            class="bg-electric-violet hover:opacity-85 disabled:opacity-40 text-white font-semibold rounded-xl px-5 py-3 text-sm sm:text-base transition-opacity shrink-0"
          >
            Envoyer
          </button>
        </div>

      </div>
    </main>

    <Footer class="shrink-0" />
  </div>
</template>

<style scoped>
.typing-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  background: #9ca3af;
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
  30% { transform: translateY(-5px); opacity: 1; }
}
</style>
