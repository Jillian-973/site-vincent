<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<template>
  <!-- Header — z-50 pour rester au-dessus de l'overlay -->
  <nav class="p-4 sm:p-6 relative flex items-center z-50">
    <!-- Logo -->
    <a href="/">
      <img src="../assets/logo.png" alt="Mésotès" class="h-14 sm:h-26 md:h-30" />
    </a>

    <!-- Liens desktop — centrés, cachés sur mobile -->
    <ul class="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 sm:gap-8">
      <li
        class="h-8 px-3 sm:px-10 md:px-14 rounded-xl border-2 border-orange-400 bg-orange-100/70 font-bold text-black text-xs sm:text-base leading-none flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_18px_4px_rgba(251,146,60,0.7)] hover:shadow-[0_0_30px_8px_rgba(251,146,60,0.95)]"
      >
        <a href="/">Accueil</a>
      </li>
      <li
        class="h-8 px-3 sm:px-10 md:px-14 rounded-xl border-2 border-pink-400 bg-pink-100/70 font-bold text-black text-xs sm:text-base leading-none flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_18px_4px_rgba(239,60,173,0.7)] hover:shadow-[0_0_30px_8px_rgba(239,60,173,0.95)]"
      >
        <a href="/ressources">Ressources</a>
      </li>
      <li
        class="h-8 px-3 sm:px-10 md:px-14 rounded-xl border-2 border-fuchsia-400 bg-fuchsia-100/70 text-black font-bold text-xs sm:text-base leading-none flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_18px_4px_rgba(217,70,239,0.7)] hover:shadow-[0_0_30px_8px_rgba(217,70,239,0.95)]"
      >
        <a href="/a-propos">A propos</a>
      </li>
    </ul>

    <!-- Bouton hamburger / croix — mobile uniquement -->
    <button
      class="ml-auto sm:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white/80 hover:text-white transition-colors"
      :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
      @click="menuOpen = !menuOpen"
    >
      <Transition name="icon" mode="out-in">
        <svg v-if="menuOpen" key="close" viewBox="0 0 24 24" fill="none" class="w-6 h-6">
          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else key="open" viewBox="0 0 24 24" fill="none" class="w-6 h-6">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </Transition>
    </button>
  </nav>

  <!-- Overlay plein écran — part du haut de la page, z-40 sous le header -->
  <Transition name="dropdown">
    <div
      v-if="menuOpen"
      class="sm:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-5 px-8"
      @click.self="menuOpen = false"
    >
      <a
        href="/"
        class="w-full max-w-xs flex items-center justify-center h-14 rounded-xl border-2 border-orange-400 bg-orange-100/70 font-bold text-black text-base shadow-[0_0_18px_4px_rgba(251,146,60,0.7)] transition-all hover:scale-[1.02]"
        @click="menuOpen = false"
      >
        Accueil
      </a>
      <a
        href="/ressources"
        class="w-full max-w-xs flex items-center justify-center h-14 rounded-xl border-2 border-pink-400 bg-pink-100/70 font-bold text-black text-base shadow-[0_0_18px_4px_rgba(239,60,173,0.7)] transition-all hover:scale-[1.02]"
        @click="menuOpen = false"
      >
        Ressources
      </a>
      <a
        href="/a-propos"
        class="w-full max-w-xs flex items-center justify-center h-14 rounded-xl border-2 border-fuchsia-400 bg-fuchsia-100/70 font-bold text-black text-base shadow-[0_0_18px_4px_rgba(217,70,239,0.7)] transition-all hover:scale-[1.02]"
        @click="menuOpen = false"
      >
        A propos
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.25s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}

.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.15s ease;
}
.icon-enter-from,
.icon-leave-to {
  opacity: 0;
}
</style>
