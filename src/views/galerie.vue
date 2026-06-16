<script setup>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-retrogrid-black">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 flex flex-col items-center justify-center text-center px-4 gap-3">
      <h1 class="text-3xl sm:text-5xl font-bold text-white">Galerie d'image</h1>
      <p class="text-white/60 text-sm sm:text-base max-w-md">
        Cette activité arrive bientôt. Revenez plus tard pour découvrir les créations de la communauté.
      </p>
    </main>

    <Footer class="shrink-0" />
  </div>
</template>
