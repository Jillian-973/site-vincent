<template>
  <footer class="border-t border-white/10 text-white" style="background-color: var(--color-retrogrid-black);">

    <!-- Ligne principale : branding + nav -->
    <div class="max-w-6xl mx-auto px-6 pt-10 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="text-center sm:text-left">
        <img src="../assets/logo.png" alt="Mésotès" class="h-12 sm:h-16 mb-1" />
        <p class="text-white/50 text-sm">Plateforme pédagogique IA</p>
      </div>

      <nav class="flex gap-8 text-sm text-white/60">
        <a href="/main" class="hover:text-white transition-colors">Accueil</a>
        <a href="/activite" class="hover:text-white transition-colors">Activités</a>
        <a href="/contact" class="hover:text-white transition-colors">À propos</a>
      </nav>
    </div>

    <!-- Partenaires -->
    <div class="max-w-6xl mx-auto px-6 py-6 border-t border-white/10">
      <p class="text-xs font-semibold uppercase tracking-widest text-white/40 text-center mb-4">Partenaires</p>
      <div class="flex flex-wrap items-center justify-center gap-6">
        <!-- Remplacer chaque bloc par une <img> quand les logos sont disponibles -->
        <div class="w-28 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 text-xs">Logo</div>
        <div class="w-28 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 text-xs">Logo</div>
        <div class="w-28 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 text-xs">Logo</div>
        <div class="w-28 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 text-xs">Logo</div>
      </div>
    </div>

    <!-- Bas de page : liens légaux + copyright -->
    <div class="max-w-6xl mx-auto px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="flex gap-6 text-xs text-white/40">
        <a href="#" class="hover:text-white/70 transition-colors">CGU</a>
        <a href="#" class="hover:text-white/70 transition-colors">Mentions légales</a>
      </div>
      <p class="text-white/30 text-xs">© 2025 Phronesis — Tous droits réservés</p>
    </div>

  </footer>
</template>
