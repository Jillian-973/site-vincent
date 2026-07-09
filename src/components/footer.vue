<script setup>
import footerBg from '../assets/Footer.png'
import linkedinLogo from '../assets/linkedin_footer.png'
import instagramLogo from '../assets/instagram_footer.png'
import youtubeLogo from '../assets/youtube_footer.png'

defineProps({
  bgClass: { type: String, default: 'bg-retrogrid-black' },
})

const dolfiLogoUrl =
  'https://dolfi-formation.fr/wp-content/uploads/2024/10/logo-dolfi-2025-blanc.webp'
</script>

<template>
  <footer
    class="relative text-white bg-cover bg-top bg-no-repeat flex flex-col justify-end"
    :class="bgClass"
    :style="{ backgroundImage: `url(${footerBg})`, minHeight: '45vw' }"
  >
    <!-- Contenu -->
    <div class="relative z-10">
      <!-- Réseaux sociaux -->
      <div class="max-w-6xl mx-auto px-6 sm:px-10 py-8 sm:py-10 border-t border-white/10">
        <div
          class="flex flex-wrap items-end justify-center gap-20 sm:gap-30 lg:gap-50 pb-6 sm:pb-12"
        >
          <a
            href="https://www.instagram.com/mesotes.fr/"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-transform duration-300 hover:scale-110"
          >
            <img
              :src="instagramLogo"
              alt="Instagram"
              class="h-[168px] sm:h-28 lg:h-40 object-contain"
            />
          </a>

          <a
            href="https://www.youtube.com/@mesotes-fr"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-transform duration-300 hover:scale-110"
          >
            <img
              :src="youtubeLogo"
              alt="YouTube"
              class="h-[168px] sm:h-28 lg:h-40 object-contain"
            />
          </a>

          <a
            href="https://www.linkedin.com/company/mesotes/about/"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-transform duration-300 hover:scale-110"
          >
            <img
              :src="linkedinLogo"
              alt="LinkedIn"
              class="h-[168px] sm:h-28 lg:h-40 object-contain"
            />
          </a>
        </div>
      </div>

      <!-- Bas de page : liens légaux 
      <div
        class="max-w-6xl mx-auto px-6 sm:px-10 py-5 sm:py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6"
      >
        <div class="flex gap-6 sm:gap-10 text-sm sm:text-base lg:text-lg text-white/60">
          <a href="#" class="hover:text-white transition-colors"
            >Conditions Générales d'Utilisation</a
          >
        </div>
        <a
          href="#"
          class="text-white/60 text-sm sm:text-base lg:text-lg hover:text-white transition-colors"
        >
          Mentions légales
        </a>
      </div>-->
    </div>
  </footer>
</template>
