<script setup>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import AiCarousel from '../components/AiCarousel.vue'

const aiTools = [
  {
    id: 'gemini',
    name: 'Gemini',
    description:
      'Décris ta pièce idéale et laisse Gemini générer des idées de décoration personnalisées, des couleurs aux matériaux.',
    url: 'https://gemini.google.com',
    image: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=256',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description:
      'Converse avec ChatGPT pour concevoir ton espace étape par étape, du choix du style aux recommandations de mobilier.',
    url: 'https://chatgpt.com',
    image: 'https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png',
    bgColor: '#ffffff',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    description:
      "Microsoft Copilot t'aide à visualiser et affiner l'aménagement de ta pièce à travers un dialogue naturel.",
    url: 'https://copilot.microsoft.com',
    image: 'https://kerv.com/app/uploads/2024/11/Microsoft-Copilot-Logo-360x203.png',
    bgColor: '#ffffff',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description:
      "Modèle IA européen performant, Mistral t'accompagne pour imaginer et décrire ton intérieur avec précision.",
    url: 'https://chat.mistral.ai',
    image: 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=256',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-retrogrid-black">
    <header class="shrink-0">
      <Header />
    </header>
    <!--     
    <main class="flex-1 flex flex-col items-center px-3 sm:px-6 py-6 sm:py-10 gap-6 sm:gap-10">
      <div class="text-center max-w-2xl px-2">
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
          Décorateur d'intérieur
        </h1>
        <p class="text-white/60 text-sm sm:text-base leading-relaxed">
          La consigne : <span class="text-white font-semibold">crée une pièce avec une IA</span>.
          Choisis un outil ci-dessous, décris ton style et laisse l'IA imaginer ta pièce.
        </p>
      </div>

      <AiCarousel :items="aiTools" />
    </main>-->

    <div style="width: 100%">
      <div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0">
        <iframe
          title="Décorateur d'intérieur"
          frameborder="0"
          width="1200"
          height="675"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
          src="https://view.genially.com/6a33e6a459225fe95c8d4db5"
          type="text/html"
          allowscriptaccess="always"
          allowfullscreen="true"
          scrolling="yes"
          allownetworking="all"
        ></iframe>
      </div>
    </div>

    <Footer class="shrink-0" />
  </div>
</template>
