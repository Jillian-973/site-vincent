<script setup>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import AiCarousel from '../components/AiCarousel.vue'

const aiTools = [
  {
    id: 'interior-ai',
    name: 'Interior AI',
    description:
      "Transforme la photo d'une pièce vide en design complet selon le style choisi (scandinave, industriel, minimaliste…).",
    url: 'https://interiorai.com',
  },
  {
    id: 'roomgpt',
    name: 'RoomGPT',
    description:
      "Génère un nouveau design de pièce à partir d'une simple photo, gratuit et rapide à utiliser.",
    url: 'https://www.roomgpt.io',
  },
  {
    id: 'reimagine-home',
    name: 'REimagine Home',
    description:
      "IA spécialisée dans la rénovation et la décoration d'intérieur avec un rendu très réaliste.",
    url: 'https://reimaginehome.ai',
  },
  {
    id: 'planner5d',
    name: 'Planner 5D',
    description: 'Outil de conception 3D assisté par IA pour aménager une pièce de A à Z.',
    url: 'https://planner5d.com',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-retrogrid-black">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 flex flex-col items-center px-3 sm:px-6 py-6 sm:py-10 gap-6 sm:gap-10">
      <div class="text-center max-w-2xl px-2">
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
          Décorateur d'intérieur
        </h1>
        <p class="text-white/60 text-sm sm:text-base leading-relaxed">
          La consigne : <span class="text-white font-semibold">crée une pièce avec une IA</span>. Choisis
          un outil ci-dessous, décris ton style et laisse l'IA imaginer ta pièce.
        </p>
      </div>

      <AiCarousel :items="aiTools" />
    </main>

    <Footer class="shrink-0" />
  </div>
</template>
