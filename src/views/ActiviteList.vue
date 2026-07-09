<script setup>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import projecteurImg from '../assets/projecteur.png'
import decorateurImg from '../assets/decorateur.png'
import djImg from '../assets/DJ.png'
const router = useRouter()

// `image: null` => fallback couleurs de base (gradient / verre dépoli).
// Renseigner `image` plus tard pour afficher une vraie image en fond recto/verso.
const activities = [
  {
    id: 'projecteur',
    title: 'Le Projecteur',
    description:
      'Échangez avec un assistant conversationnel pour structurer votre projet IA et repartez avec une synthèse claire et exploitable.',
    duration: '10-15 minutes',
    tag: 'Cadrage de projet',
    accentColor: 'var(--color-electric-violet)',
    image: projecteurImg,
    available: true,
  },
  {
    id: 'decorateur',
    title: "Décorateur d'intérieur",
    description:
      'Crée une pièce entière grâce à une IA : décris ton style et laisse la magie opérer.',
    duration: '~10 minutes',
    tag: "Génération d'image",
    accentColor: 'var(--color-neon-sunset)',
    image: decorateurImg,
    available: true,
  },
  {
    id: 'disque-d-or',
    title: "Le Disque d'or",
    description: 'Compose une musique avec Suno et imagine la pochette de ton album avec une IA.',
    duration: '~20 minutes',
    tag: 'Création musicale',
    accentColor: 'var(--color-synthwave-magenta)',
    image: djImg,
    available: true,
  },
]

function open(activity) {
  if (!activity.available) return
  router.push(`/${activity.id}`)
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
  if (activity.image) {
    return {
      backgroundImage: `url(${activity.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  return {
    background: `linear-gradient(to bottom right, ${activity.accentColor}, color-mix(in srgb, ${activity.accentColor} 53%, transparent))`,
  }
}
</script>

<template>
  <div class="min-h-screen bg-retrogrid-black flex flex-col">
    <header>
      <Header />
    </header>

    <main class="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 gap-10 sm:gap-14">
      <!-- Texte intro -->
      <div class="text-center max-w-6xl px-2">
        <p
          class="text-white text-sm sm:text-xl md:text-2xl lg:text-3xl leading-relaxed"
          style="font-family: 'Orbitron', sans-serif"
        >
          Ci-dessous se trouve l'ensemble des ressources pédagogiques<br />
          conçues par le formateur et produites par l'équipe d'étudiants.
        </p>
      </div>

      <!-- 3 activités par ligne sur grand écran, 2 sur tablette, 1 sur mobile -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full max-w-6xl">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="card-container h-[22rem] sm:h-[27rem]"
          :class="[
            activity.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-60',
            flippedId === activity.id ? 'is-flipped' : '',
          ]"
          @click="handleClick(activity)"
        >
          <div class="card-inner">
            <!-- Recto : image (si dispo) ou gradient + titre -->
            <div
              class="card-face rounded-2xl flex items-start justify-center p-4 sm:p-5"
              :style="faceStyle(activity)"
            >
              <span
                class="text-white text-lg sm:text-xl font-bold drop-shadow-lg"
                style="font-family: 'Orbitron', sans-serif"
              >
                {{ activity.title }}
              </span>
            </div>

            <!-- Verso : image (si dispo) ou verre dépoli + infos -->
            <div
              class="card-face card-back rounded-2xl border border-white/20 p-4 sm:p-6 flex flex-col justify-between text-center overflow-hidden"
              :class="!activity.image ? 'bg-retrogrid-black/80 backdrop-blur-md' : ''"
              :style="faceStyle(activity)"
            >
              <div v-if="activity.image" class="absolute inset-0 bg-black/70" />
              <div class="relative z-10">
                <h3 class="text-white font-bold text-lg sm:text-xl mb-1.5 sm:mb-2 line-clamp-2">
                  {{ activity.title }}
                </h3>
                <p class="text-white/75 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  {{ activity.description }}
                </p>
                <div class="flex flex-col items-center gap-2">
                  <span
                    v-if="activity.tag"
                    class="text-sm sm:text-base text-white rounded-full px-3 py-1.5"
                    :style="{
                      backgroundColor: `color-mix(in srgb, ${activity.accentColor} 20%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${activity.accentColor} 40%, transparent)`,
                    }"
                  >
                    {{ activity.tag }}
                  </span>
                  <span
                    class="text-sm sm:text-base bg-white/10 text-white/60 border border-white/20 rounded-full px-3 py-1.5"
                  >
                    ⏱ {{ activity.duration }}
                  </span>
                </div>
              </div>
              <div class="relative z-10 mt-3 sm:mt-4 flex justify-center">
                <span
                  v-if="activity.available"
                  class="inline-block text-white text-sm sm:text-base font-semibold rounded-xl px-5 sm:px-6 py-2.5 transition-opacity hover:opacity-90"
                  :style="{ backgroundColor: activity.accentColor }"
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

      <!-- Texte contact -->
      <div class="text-center max-w-6xl px-2 pb-4">
        <p
          class="text-white/80 text-sm sm:text-xl md:text-2xl lg:text-3xl leading-relaxed break-words"
          style="font-family: 'Orbitron', sans-serif"
        >
          Pour toute proposition de ressource, suggestion d'amélioration<br />
          ou demande de renseignement, vous pouvez nous contacter à<br />
          l'adresse mail suivante :
          <a
            href="mailto:vincent.grange.formateur@gmail.com"
            class="text-electric-violet underline underline-offset-4 hover:opacity-80 transition-opacity break-words"
            >vincent.grange.formateur@gmail.com</a
          >
        </p>
      </div>
    </main>

    <Footer />
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
