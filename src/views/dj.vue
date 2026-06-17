<script setup>
import { ref } from 'vue'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import AiCarousel from '../components/AiCarousel.vue'
import FortuneWheel from '../components/FortuneWheel.vue'

// Thèmes triés du plus populaire au moins populaire — modifiable librement
const themes = [
  'Pop',
  'Hip-Hop / Rap',
  'Électro / EDM',
  'Rock',
  'R&B',
  'Reggaeton',
  'Synthwave',
  'Lo-Fi',
  'Cinématique',
]

const selectedTheme = ref(null)
const wheelOpen = ref(false)

function onWheelSelect(theme) {
  selectedTheme.value = theme
}

const musicAiTools = [
  {
    id: 'suno',
    name: 'Suno',
    description:
      "Génère un morceau complet (paroles, voix, instrumentation) à partir d'un simple prompt textuel.",
    url: 'https://suno.com',
    image: 'https://www.google.com/s2/favicons?domain=suno.com&sz=256',
  },
]

const pochetteAiTools = [
  {
    id: 'gemini',
    name: 'Gemini',
    description:
      "Décris l'ambiance de ta musique et laisse Gemini générer des concepts visuels pour ta pochette d'album.",
    url: 'https://gemini.google.com',
    image: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=256',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description:
      "Utilise ChatGPT pour concevoir le visuel de ta pochette, de l'idée initiale à la description détaillée.",
    url: 'https://chatgpt.com',
    image: 'https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png',
    bgColor: '#ffffff',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    description:
      "Copilot Designer génère des visuels artistiques pour ta pochette à partir d'une description textuelle.",
    url: 'https://copilot.microsoft.com',
    image: 'https://kerv.com/app/uploads/2024/11/Microsoft-Copilot-Logo-360x203.png',
    bgColor: '#ffffff',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description:
      "Décris l'univers visuel de ton morceau et Mistral te propose des concepts créatifs pour ta pochette.",
    url: 'https://chat.mistral.ai',
    image: 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=256',
  },
]

const albumAiTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description:
      'Génère des descriptions visuelles détaillées et utilise DALL·E intégré pour créer les visuels de ton album.',
    url: 'https://chatgpt.com',
    image: 'https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png',
    bgColor: '#ffffff',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    description:
      "Copilot combine texte et image pour t'aider à concevoir un album cohérent et visuellement percutant.",
    url: 'https://copilot.microsoft.com',
    image: 'https://kerv.com/app/uploads/2024/11/Microsoft-Copilot-Logo-360x203.png',
    bgColor: '#ffffff',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description:
      'Trouve des inspirations visuelles, des références artistiques et des concepts originaux pour ton album.',
    url: 'https://www.perplexity.ai',
    image: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=256',
    bgColor: '#ffffff',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description:
      "Conceptualise l'identité visuelle complète de ton album avec des descriptions précises et créatives.",
    url: 'https://chat.mistral.ai',
    image: 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=256',
  },
  {
    id: 'claude',
    name: 'Claude',
    description:
      "Claude t'aide à définir et articuler le concept visuel de ton album avec un sens du détail remarquable.",
    url: 'https://claude.ai',
    image: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=256',
    bgColor: '#ffffff',
  },
  {
    id: 'grok',
    name: 'Grok',
    description:
      "Grok de xAI génère des idées créatives et décalées pour l'univers visuel de ton album.",
    url: 'https://grok.com',
    image: 'https://www.google.com/s2/favicons?domain=grok.com&sz=256',
    bgColor: '#ffffff',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-retrogrid-black">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 flex flex-col items-center px-3 sm:px-6 py-6 sm:py-10 gap-8 sm:gap-12">
      <!-- Titre -->
      <div class="text-center max-w-2xl px-2">
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">Le DJ</h1>
        <p class="text-white/60 text-sm sm:text-base leading-relaxed">
          La consigne : <span class="text-white font-semibold">crée une musique avec Suno</span>,
          génère une musique avec l'IA et la pochette de l'album avec une IA.
        </p>
      </div>

      <!-- Choix du thème -->
      <section class="w-full max-w-3xl flex flex-col items-center gap-4">
        <h2 class="text-white font-bold text-lg sm:text-xl">Choisis un thème musical</h2>

        <div class="inline-flex flex-col items-stretch gap-4">
          <div class="grid grid-flow-col grid-rows-3 gap-3 sm:gap-4 justify-center">
            <div
              v-for="theme in themes"
              :key="theme"
              class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl sm:rounded-2xl border flex items-center justify-center text-center px-1.5 text-[11px] sm:text-xs md:text-sm font-semibold leading-tight"
              :class="
                selectedTheme === theme
                  ? 'bg-synthwave-magenta border-synthwave-magenta text-white'
                  : 'bg-white/5 border-white/20 text-white/70'
              "
            >
              {{ theme }}
            </div>
          </div>

          <p class="text-center text-white/50 text-sm sm:text-base italic">
            Du mal à choisir ? Laisse le hasard décider !
          </p>
          <button
            @click="wheelOpen = true"
            class="w-full text-lg sm:text-xl md:text-2xl font-semibold rounded-xl sm:rounded-2xl px-6 py-4 sm:py-5 bg-electric-violet text-white hover:opacity-90 transition-opacity"
          >
            🎡 Faire tourner la roue
          </button>
        </div>
      </section>

      <!-- Description Suno -->
      <section class="w-full max-w-2xl text-center px-2">
        <h2 class="text-white font-bold text-lg sm:text-xl mb-2">C'est quoi Suno ?</h2>
        <p class="text-white/60 text-sm sm:text-base leading-relaxed">
          Suno est une intelligence artificielle qui génère des morceaux de musique complets —
          paroles, voix et instrumentation — à partir d'une simple description textuelle. Indique un
          style, une ambiance ou un thème pour obtenir une piste originale en quelques secondes,
          sans aucune connaissance musicale requise.
        </p>
      </section>

      <!-- Carrousel IA musique -->
      <section class="w-full flex flex-col items-center gap-4">
        <h2 class="text-white font-bold text-lg sm:text-xl">IA à utiliser pour la musique</h2>
        <AiCarousel :items="musicAiTools" />
      </section>

      <!-- Carrousels pochette / album -->
      <section
        class="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-6"
      >
        <div class="w-full flex flex-col items-center gap-4">
          <h2 class="text-white font-bold text-lg sm:text-xl">IA pour la pochette</h2>
          <AiCarousel :items="pochetteAiTools" />
        </div>
        <div class="w-full flex flex-col items-center gap-4">
          <h2 class="text-white font-bold text-lg sm:text-xl">IA pour le texte</h2>
          <AiCarousel :items="albumAiTools" />
        </div>
      </section>
    </main>

    <Footer class="shrink-0" />

    <FortuneWheel v-model="wheelOpen" :themes="themes" @select="onWheelSelect" />
  </div>
</template>
