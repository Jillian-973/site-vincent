<script setup>
import bgImage from './assets/bg.png'
import Header from './components/header.vue'
import Carousel from './components/carousel.vue'
import projecteur2Img from './assets/projecteur 2.png'
import decorateur2Img from './assets/decorateur 2.png'
import dj2Img from './assets/DJ 2.png'
import { h } from 'vue'
import Footer from './components/footer.vue'

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const activites = [
  {
    id: 'projecteur',
    title: 'Le Projecteur',
    image: projecteur2Img,
    gradient:
      'linear-gradient(to bottom right, var(--color-synthwave-magenta), var(--color-electric-violet))',
    url: '/ressources.html#/projecteur',
  },
  {
    id: 'decorateur',
    title: "Décorateur d'intérieur",
    image: decorateur2Img,
    gradient: 'linear-gradient(to bottom right, var(--color-electric-violet), var(--color-blue))',
    url: '/ressources.html#/decorateur',
  },
  {
    id: 'disque-d-or',
    title: 'Le DJ',
    image: dj2Img,
    gradient:
      'linear-gradient(to bottom right, var(--color-neon-sunset), var(--color-synthwave-magenta))',
    url: '/ressources.html#/disque-d-or',
  },
]
</script>

<template>
  <div
    class="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <header>
      <Header />
    </header>

    <div class="flex flex-col items-center justify-center text-center gap-4 px-4">
      <h1>
        <img
          src="./assets/mesotes.png"
          alt="Mesotes titre"
          class="w-36 sm:w-52 md:w-72 lg:w-[420px] xl:w-[560px]"
        />
      </h1>
      <!--
      <div
        class="rounded-2xl px-4 sm:px-10 md:px-25 py-2"
        style="background-color: var(--color-cosmic-white); backdrop-filter: blur(3px)"
      >
        <p class="max-w-xs sm:max-w-xl md:max-w-4xl text-base sm:text-xl md:text-[24px] text-black">
          Plateforme libre de ressources pédagogiques innovantes <br />
          pour se former autrement à l’intelligence artificielle
        </p>
      </div>-->
    </div>

    <div class="flex flex-col items-center justify-center text-center gap-4 pb-6">
      <img
        @click="scrollTo('activites')"
        src="./assets/mouse.png"
        alt="Mouse Icon"
        class="h-10 sm:h-12 md:h-14 lg:h-16 cursor-pointer animate-bounce"
      />
    </div>

    <!-- Dégradé de transition vers le noir -->
    <div
      class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black pointer-events-none"
    />
  </div>

  <div class="text-center min-h-screen flex flex-col" style="background-color: #000000">
    <div class="py-8 md:py-12 px-4">
      <h2 id="activites" class="text-4xl sm:text-6xl md:text-[80px] font-bold">
        Nos activités pédagogiques
      </h2>
      <p class="text-base sm:text-lg md:text-[20px] mt-8">
        Projet lancé en mai 2026 et porté par des étudiants du campus <br />
        lyonnais de MyDigitalSchool sous la supervision d’un formateur <br />
        indépendant en intelligence artificielle générative, la plateforme <br />
        s’adresse aux professionnels qui suivent une formation comme <br />
        aux internautes désireux d’en apprendre davantage sur le sujet.
      </p>
      <Carousel :slides="activites" />
    </div>
  </div>

  <Footer bg-class="bg-[#000000]" />
</template>
