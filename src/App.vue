<script setup>
import bgImage from './assets/bg.png'
import Header from './components/header.vue'
</script>

<template>
  <div
    class="h-screen bg-cover bg-top bg-no-repeat"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <Header />
    <div class="flex flex-col items-center justify-center text-center gap-6 mt-50">
      <h1 class="text-[96px] font-bold">Phronesis</h1>
      <p class="mx-150 font-bold text-[24px]">
        L'IA , peut s’apprendre en jouant. Phronesis réinvente la pédagogie autour de l’IA
        générative à travers des expériences interactives, des défis et des discussions qui font
        réfléchir.
      </p>
    </div>

    <div class="flex flex-col items-center justify-center text-center gap-6 mt-50">
      <p class="text-[36px] font-bold">Nos activités</p>
      <img src="./assets/mouse.png" alt="Mouse Icon" class="h-20 cursor-pointer animate-bounce" />
    </div>
  </div>
</template>
