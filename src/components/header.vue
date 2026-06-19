<template>
  <nav class="py-4 pl-6 pr-6 sm:pr-52 flex items-center justify-between">
    <a href="/main">
      <img src="../assets/logo.png" alt="Mésotès" class="h-26 sm:h-30" />
    </a>

    <ul class="flex flex-wrap justify-end gap-2 sm:gap-8">
      <li
        class="h-8 px-3 sm:px-10 md:px-14 rounded-xl border-2 border-orange-400 bg-orange-100/70 font-bold text-black text-xs sm:text-base leading-none flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_18px_4px_rgba(251,146,60,0.7)] hover:shadow-[0_0_30px_8px_rgba(251,146,60,0.95)]"
      >
        <a href="/main">Accueil</a>
      </li>
      <li
        class="h-8 px-3 sm:px-10 md:px-14 rounded-xl border-2 border-pink-400 bg-pink-100/70 font-bold text-black text-xs sm:text-base leading-none flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_18px_4px_rgba(239,60,173,0.7)] hover:shadow-[0_0_30px_8px_rgba(239,60,173,0.95)]"
      >
        <a href="/activite">Ressources</a>
      </li>
      <li
        class="h-8 px-3 sm:px-10 md:px-14 rounded-xl border-2 border-fuchsia-400 bg-fuchsia-100/70 text-black font-bold text-xs sm:text-base leading-none flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_18px_4px_rgba(217,70,239,0.7)] hover:shadow-[0_0_30px_8px_rgba(217,70,239,0.95)]"
      >
        <a href="/apropos">A propos</a>
      </li>
    </ul>
  </nav>
</template>
