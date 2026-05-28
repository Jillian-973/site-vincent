<script setup>
import bgImage from './assets/bg.png'
import Header from './components/header.vue'
import bgImage2 from './assets/gradende.png'

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div
    class="h-screen bg-cover bg-top bg-no-repeat flex flex-col justify-between"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <Header />

    <div class="flex flex-col items-center justify-center text-center gap-6">
      <h1 class="text-[96px] font-bold">Phronesis</h1>
      <p class="mx-150 font-bold text-[24px]">
        L'IA , peut s’apprendre en jouant. Phronesis réinvente la pédagogie autour de l’IA
        générative à travers des expériences interactives, des défis et des discussions qui font
        réfléchir.
      </p>
    </div>

    <div class="flex flex-col items-center justify-center text-center gap-6">
      <p class="text-[36px] font-bold">Nos activités</p>
      <img
        @click="scrollTo('activites')"
        src="./assets/mouse.png"
        alt="Mouse Icon"
        class="h-20 cursor-pointer animate-bounce"
      />
    </div>
  </div>

  <div
    class="text-center h-screen bg-cover bg-top bg-no-repeat flex flex-col -mt-30 pt-30"
    :style="{ backgroundImage: `url(${bgImage2})` }"
  >
    <h2 id="activites" class="text-[80px] font-bold">Nos activités pédagogiques</h2>
    <p class="text-[20px]">
      Fais défilé les activités et plonge dans le monde de l’IA générative !
    </p>
  </div>

  <div></div>
</template>
