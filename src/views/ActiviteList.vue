<script setup>
import Header from '../components/header.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import bgImage from '../assets/gradende.png'

const router = useRouter()

// `image: null` => fallback couleurs de base (gradient / verre dépoli).
// Renseigner `image` plus tard pour afficher une vraie image en fond recto/verso.
const activities = [
  {
    id: 'projecteur',
    title: 'Le Projecteur',
    description:
      'Échangez avec un assistant conversationnel pour structurer votre projet IA et repartez avec une synthèse claire et exploitable.',
    duration: '15–20 min',
    tag: 'Cadrage de projet',
    gradient: 'from-synthwave-magenta to-electric-violet',
    image: null,
    available: true,
  },
  {
    id: 'decorateur',
    title: "Décorateur d'intérieur",
    description: 'Crée une pièce entière grâce à une IA : décris ton style et laisse la magie opérer.',
    duration: '~10 min',
    tag: "Génération d'image",
    gradient: 'from-electric-violet to-blue',
    image: null,
    available: true,
  },
  {
    id: 'dj',
    title: 'Le DJ',
    description: "Compose une musique avec Suno et imagine la pochette de ton album avec une IA.",
    duration: '~20 min',
    tag: 'Création musicale',
    gradient: 'from-neon-sunset to-synthwave-magenta',
    image: null,
    available: true,
  },
]

function open(activity) {
  if (activity.available) router.push(`/${activity.id}`)
}

// Sur mobile (pas de hover), 1er tap = retourne la carte, 2e tap = navigue
const isTouch = ref(false)
const flippedId = ref(null)

onMounted(() => {
  isTouch.value = window.matchMedia('(hover: none)').matches
})

function handleClick(activity) {
  if (isTouch.value) {
    if (flippedId.value === activity.id) {
      flippedId.value = null
      open(activity)
    } else {
      flippedId.value = activity.id
    }
  } else {
    open(activity)
  }
}

function faceStyle(activity) {
  return activity.image
    ? { backgroundImage: `url(${activity.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}
}
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-top bg-no-repeat flex flex-col"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <header>
      <Header />
    </header>

    <main class="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12">
      <div class="text-center mb-8 sm:mb-14">
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-3">
          Nos activités
        </h1>
        <p class="text-white/70 text-sm sm:text-lg">
          Choisissez une activité et commencez à apprendre
        </p>
      </div>

      <!-- 4 activités par ligne sur grand écran, 2 sur tablette, 1 sur mobile -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="card-container h-64 sm:h-72"
          :class="[
            activity.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-60',
            flippedId === activity.id ? 'is-flipped' : '',
          ]"
          @click="handleClick(activity)"
        >
          <div class="card-inner">
            <!-- Recto : image (si dispo) ou gradient + titre -->
            <div
              class="card-face rounded-2xl flex items-end p-4 sm:p-5"
              :class="!activity.image ? `bg-gradient-to-br ${activity.gradient}` : ''"
              :style="faceStyle(activity)"
            >
              <div v-if="activity.image" class="absolute inset-0 bg-black/30 rounded-2xl" />
              <span class="relative z-10 text-white text-lg sm:text-xl font-bold drop-shadow-lg">
                {{ activity.title }}
              </span>
            </div>

            <!-- Verso : image (si dispo) ou verre dépoli + infos -->
            <div
              class="card-face card-back rounded-2xl border border-white/20 p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
              :class="!activity.image ? 'bg-retrogrid-black/80 backdrop-blur-md' : ''"
              :style="faceStyle(activity)"
            >
              <div v-if="activity.image" class="absolute inset-0 bg-black/70" />
              <div class="relative z-10">
                <h3 class="text-white font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">
                  {{ activity.title }}
                </h3>
                <p class="text-white/75 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {{ activity.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="activity.tag"
                    class="text-xs bg-synthwave-magenta/20 text-pink-300 border border-synthwave-magenta/30 rounded-full px-3 py-1"
                  >
                    {{ activity.tag }}
                  </span>
                  <span class="text-xs bg-white/10 text-white/60 border border-white/20 rounded-full px-3 py-1">
                    ⏱ {{ activity.duration }}
                  </span>
                </div>
              </div>
              <div class="relative z-10">
                <span
                  v-if="activity.available"
                  class="inline-block bg-synthwave-magenta hover:opacity-90 text-white text-xs sm:text-sm font-semibold rounded-xl px-4 sm:px-5 py-2 transition-opacity"
                >
                  Commencer →
                </span>
                <span
                  v-else
                  class="inline-block text-white/40 text-xs sm:text-sm border border-white/15 rounded-xl px-4 sm:px-5 py-2"
                >
                  Bientôt disponible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Galerie d'image : bloc unique, pas de flip, verso uniquement -->
      <div
        class="w-full max-w-6xl mt-6 sm:mt-10 rounded-2xl border border-white/20 bg-retrogrid-black/80 backdrop-blur-md p-5 sm:p-8 cursor-pointer flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 hover:border-synthwave-magenta/40 transition-colors"
        @click="router.push('/galerie')"
      >
        <div class="text-center sm:text-left">
          <h3 class="text-white font-bold text-xl sm:text-2xl mb-1.5">Galerie d'image</h3>
          <p class="text-white/70 text-sm sm:text-base">Explorez les créations de la communauté.</p>
        </div>
        <span class="shrink-0 text-xs sm:text-sm text-white/40 border border-white/15 rounded-xl px-4 py-2">
          Bientôt disponible
        </span>
      </div>
    </main>
  </div>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover uniquement sur les appareils qui le supportent (desktop) */
@media (hover: hover) {
  .card-container:hover .card-inner {
    transform: rotateY(180deg);
  }
}

/* Flip déclenché par tap sur mobile */
.card-container.is-flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
