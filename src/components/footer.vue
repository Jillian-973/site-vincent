<script setup>
import footerBg from '../assets/Footer.png'

defineProps({
  bgClass: { type: String, default: 'bg-retrogrid-black' },
})

const dolfiLogoUrl =
  'https://dolfi-formation.fr/wp-content/uploads/2024/10/logo-dolfi-2025-blanc.webp'
</script>

<template>
  <footer
    class="relative border-t border-white/10 text-white bg-cover bg-top bg-no-repeat flex flex-col justify-end"
    :class="bgClass"
    :style="{ backgroundImage: `url(${footerBg})`, minHeight: '45vw' }"
  >
    <!-- Contenu -->
    <div class="relative z-10">

      <!-- Partenaires -->
      <div class="max-w-6xl mx-auto px-6 py-6 border-t border-white/10">
        <p class="text-xs font-semibold uppercase tracking-widest text-white/40 text-center mb-4">
          Partenaires
        </p>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <img :src="dolfiLogoUrl" alt="Dolfi Formation" class="h-10 sm:h-12 object-contain" />
        </div>
      </div>

      <!-- Bas de page : liens légaux + copyright -->
      <div
        class="max-w-6xl mx-auto px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div class="flex gap-6 text-xs text-white/40">
          <a href="#" class="hover:text-white/70 transition-colors"
            >Conditions Générales d'Utilisation</a
          >
        </div>
        <a href="#" class="text-white/30 text-xs hover:text-white/70 transition-colors"
          >Mentions légales</a
        >
      </div>
    </div>
  </footer>
</template>
