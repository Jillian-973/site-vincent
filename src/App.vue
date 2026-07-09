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
    title: 'LE PROJECTEUR',
    image: projecteur2Img,
    gradient:
      'linear-gradient(to bottom right, var(--color-synthwave-magenta), var(--color-electric-violet))',
    url: '/ressources.html#/projecteur',
  },
  {
    id: 'decorateur',
    title: "LE DÉCORATEUR D\'INTÉRIEUR",
    image: decorateur2Img,
    gradient: 'linear-gradient(to bottom right, var(--color-electric-violet), var(--color-blue))',
    url: '/ressources.html#/decorateur',
  },
  {
    id: 'disque-d-or',
    title: "LE DISQUE D'OR",
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
    <div id="activites" class="py-8 md:py-12 px-4">
      <p
        class="text-[18px] sm:text-[22px] lg:text-[28px] xl:text-[30px] leading-relaxed mt-16 max-w-6xl mx-auto"
        style="font-family: 'Orbitron', sans-serif"
      >
        Projet lancé en mai 2026 et porté par des étudiants du campus <br />
        lyonnais de
        <a
          href="https://www.mydigitalschool.com/ecole-multimedia-lyon"
          target="_blank"
          rel="noopener noreferrer"
          class="text-electric-violet underline underline-offset-4 hover:opacity-80 transition-opacity"
          >MyDigitalSchool</a
        >
        sous la supervision d’un formateur <br />
        indépendant en intelligence artificielle générative, la plateforme <br />
        s’adresse aux professionnels qui suivent une formation comme <br />
        aux internautes désireux d’en apprendre davantage sur le sujet.
      </p>
      <p
        class="text-[18px] sm:text-[22px] lg:text-[28px] xl:text-[30px] leading-relaxed mt-28 max-w-6xl mx-auto"
        style="font-family: 'Orbitron', sans-serif"
      >
        Dans la philosophie gréco-romaine antique, et notamment chez <br />
        Aristote, la notion de «
        <a
          href="https://www.linkedin.com/pulse/se-soucier-de-trouver-le-juste-milieu-%C3%A9ric-delassus-owwhe/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-electric-violet underline underline-offset-4 hover:opacity-80 transition-opacity"
          >mésotès</a
        >
        » désigne la voie du juste milieu. <br />
        C’est précisément ce type de regard à la fois mesuré et nuancé <br />
        que nous avons pour ambition de développer ici à propos de l’IA.
      </p>
      <Carousel :slides="activites" />
    </div>
  </div>

  <Footer bg-class="bg-[#000000]" />
</template>
