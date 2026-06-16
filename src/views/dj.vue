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
  'Ambient',
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
  },
  {
    id: 'udio',
    name: 'Udio',
    description:
      'Création musicale par IA avec un rendu audio très réaliste, idéal pour explorer un style rapidement.',
    url: 'https://udio.com',
  },
  {
    id: 'aiva',
    name: 'AIVA',
    description: 'IA spécialisée dans la composition de musique instrumentale et de bandes sonores.',
    url: 'https://www.aiva.ai',
  },
  {
    id: 'soundraw',
    name: 'Soundraw',
    description: 'Génère de la musique libre de droits, personnalisable par genre et ambiance.',
    url: 'https://soundraw.io',
  },
]

const pochetteAiTools = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: "Génère des visuels artistiques détaillés, idéal pour une pochette d'album originale.",
    url: 'https://www.midjourney.com',
  },
  {
    id: 'dalle',
    name: 'DALL·E',
    description: "Crée une image à partir d'une simple description textuelle, rapide et accessible.",
    url: 'https://openai.com/dall-e-3',
  },
  {
    id: 'leonardo',
    name: 'Leonardo.Ai',
    description: "Plateforme de génération d'images IA avec de nombreux styles artistiques prédéfinis.",
    url: 'https://leonardo.ai',
  },
]

const albumAiTools = [
  {
    id: 'canva',
    name: 'Canva (Magic Media)',
    description: "Crée facilement des visuels d'album et templates avec génération d'images intégrée.",
    url: 'https://www.canva.com/ai-image-generator/',
  },
  {
    id: 'firefly',
    name: 'Adobe Firefly',
    description: "IA générative d'Adobe pour créer des visuels d'album professionnels.",
    url: 'https://firefly.adobe.com',
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    description:
      "IA de génération d'images reconnue pour son rendu de texte et typographies sur les visuels.",
    url: 'https://ideogram.ai',
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
          La consigne : <span class="text-white font-semibold">crée une musique avec Suno</span>, génère
          une musique avec l'IA et la pochette de l'album avec une IA.
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
          Suno est une intelligence artificielle qui génère des morceaux de musique complets — paroles,
          voix et instrumentation — à partir d'une simple description textuelle. Indique un style, une
          ambiance ou un thème pour obtenir une piste originale en quelques secondes, sans aucune
          connaissance musicale requise.
        </p>
      </section>

      <!-- Carrousel IA musique -->
      <section class="w-full flex flex-col items-center gap-4">
        <h2 class="text-white font-bold text-lg sm:text-xl">IA à utiliser pour la musique</h2>
        <AiCarousel :items="musicAiTools" />
      </section>

      <!-- Carrousels pochette / album -->
      <section class="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-6">
        <div class="w-full flex flex-col items-center gap-4">
          <h2 class="text-white font-bold text-lg sm:text-xl">IA pour la pochette</h2>
          <AiCarousel :items="pochetteAiTools" />
        </div>
        <div class="w-full flex flex-col items-center gap-4">
          <h2 class="text-white font-bold text-lg sm:text-xl">IA pour l'album</h2>
          <AiCarousel :items="albumAiTools" />
        </div>
      </section>
    </main>

    <Footer class="shrink-0" />

    <FortuneWheel v-model="wheelOpen" :themes="themes" @select="onWheelSelect" />
  </div>
</template>
