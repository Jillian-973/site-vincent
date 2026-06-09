<script setup>
import bgImage from './assets/bg.png'
import Header from './components/header.vue'
import bgImage2 from './assets/gradende.png'
import Carousel from './components/carousel.vue'
import { h } from 'vue'
import Footer from './components/footer.vue'

import ordinateur from './assets/ordinateur.svg'

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const MonitorIcon = ordinateur

const HourglassIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'stroke-width': '1.5',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
      }),
    ],
  )

const SearchIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'stroke-width': '1.5',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z',
      }),
    ],
  )

const TrophyIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'stroke-width': '1.5',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0',
      }),
    ],
  )

const features = [
  {
    id: 1,
    icon: MonitorIcon,
    text: "Apprendre l'IA générative ne devrait pas ressembler à un cours magistral. Avec Phronesis, on t'embarque dans des jeux pensés pour te faire comprendre les mécanismes de l'IA de façon concrète et intuitive. Tu joues, tu expérimentes, et sans t'en rendre compte, tu apprends vraiment.",
  },
  {
    id: 2,
    icon: HourglassIcon,
    text: "Dans une formation, chaque module a son propre tempo. Certaines activités se complètent en quelques minutes, d'autres nécessitent un peu plus d'engagement. L'essentiel, c'est d'avancer à ton rythme, de suivre le fil et d'être prêt pour la suite. Phronesis s'adapte à toi, pas l'inverse.",
  },
  {
    id: 3,
    icon: SearchIcon,
    text: "L'IA générative c'est vaste, et tu n'as pas à le parcourir seul. Explore nos ressources, pose tes questions et avance à ton propre rythme. Chaque exploration te rapproche d'une meilleure compréhension de ces outils qui redéfinissent notre quotidien.",
  },
  {
    id: 4,
    icon: TrophyIcon,
    text: "Tu apprends mieux quand l'enjeu est réel ? Mesure-toi aux autres apprenants, grimpe dans le classement et teste tes connaissances en conditions réelles. La compétition est ici un moteur, pas une pression l'objectif reste toujours de progresser.",
  },
]
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-top bg-no-repeat flex flex-col justify-between"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <header>
      <Header />
    </header>

    <div class="flex flex-col items-center justify-center text-center gap-4 px-4">
      <h1>
        <img src="./assets/mesotes.png" alt="Mesotes titre" class="w-36 sm:w-50 md:w-200" />
      </h1>
      <div
        class="rounded-2xl px-4 sm:px-10 md:px-25 py-2"
        style="
          background-color: rgb(100, 100, 100);
          border: 0px solid white;
          backdrop-filter: blur(3px);
        "
      >
        <p
          class="max-w-xs sm:max-w-xl md:max-w-4xl text-base sm:text-xl md:text-[24px] text-black italic"
        >
          Plateforme libre de ressources pédagogiques innovantes <br />
          pour se faire former autrement à l’intelligence artificielle
        </p>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center text-center gap-4 pb-6">
      <img
        @click="scrollTo('activites')"
        src="./assets/mouse.png"
        alt="Mouse Icon"
        class="h-14 sm:h-16 md:h-20 cursor-pointer animate-bounce"
      />
    </div>
  </div>

  <div
    class="text-center min-h-screen bg-cover bg-top bg-no-repeat flex flex-col -mt-16 sm:-mt-20 md:-mt-30 pt-16 sm:pt-20 md:pt-30"
    :style="{ backgroundImage: `url(${bgImage2})` }"
  >
    <div class="py-8 md:py-12 px-4">
      <h2 id="activites" class="text-4xl sm:text-6xl md:text-[80px] font-bold">
        Nos activités pédagogiques
      </h2>
      <p class="text-base sm:text-lg md:text-[20px] mt-8">
        Fais défilé les activités et plonge dans le monde de l'IA générative !
      </p>
      <Carousel :slides="activites" />
    </div>
  </div>

  <div class="w-full px-6 py-16 text-white">
    <div class="text-center mb-12">
      <p class="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
        C'EST QUOI NOTRE PROJET ?
      </p>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
        Avec Phronesis tu as de quoi découvrir<br class="hidden md:block" />
        l'IA générative simplement.
      </h2>
      <p class="text-xl md:text-2xl font-semibold">
        Choisis une activité et commence à apprendre .
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div
        v-for="feature in features"
        :key="feature.id"
        class="flex flex-col items-center text-center px-4"
      >
        <div class="mb-4 text-white/90">
          <component :is="feature.icon" class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-sm md:text-base leading-relaxed text-white/90">
          {{ feature.text }}
        </p>
      </div>
    </div>
  </div>

  <Footer class="bg-gray-800 text-white py-8 py-20" />
</template>
