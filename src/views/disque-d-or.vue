<script setup>
import { ref } from 'vue'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import AiCarousel from '../components/AiCarousel.vue'
import FortuneWheel from '../components/FortuneWheel.vue'

// Thèmes triés du plus populaire au moins populaire — modifiable librement
const themes = [
  'Pop',
  'Hip-Hop',
  'Électro',
  'Rock',
  'R&B',
  'Reggaeton',
  'Synthwave',
  'Metal',
  'Rap',
  'Jazz',
  'Classique',
  'Funk',
]

const selectedTheme = ref(null)
const wheelOpen = ref(false)

function onWheelSelect(theme) {
  selectedTheme.value = theme
}

const musicAiTools = [
  {
    id: 'suno',
    name: 'Suno',
    description:
      "Génère un morceau complet (paroles, voix, instrumentation) à partir d'un simple prompt textuel.",
    url: 'https://suno.com',
    image: 'https://www.google.com/s2/favicons?domain=suno.com&sz=256',
  },
]

const pochetteAiTools = [
  {
    id: 'gemini',
    name: 'Gemini',
    description:
      "Décris l'ambiance de ta musique et laisse Gemini générer des concepts visuels pour ta pochette d'album.",
    url: 'https://gemini.google.com',
    image: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=256',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description:
      "Utilise ChatGPT pour concevoir le visuel de ta pochette, de l'idée initiale à la description détaillée.",
    url: 'https://chatgpt.com',
    image: 'https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png',
    bgColor: '#ffffff',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    description:
      "Copilot Designer génère des visuels artistiques pour ta pochette à partir d'une description textuelle.",
    url: 'https://copilot.microsoft.com',
    image: 'https://kerv.com/app/uploads/2024/11/Microsoft-Copilot-Logo-360x203.png',
    bgColor: '#ffffff',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description:
      "Décris l'univers visuel de ton morceau et Mistral te propose des concepts créatifs pour ta pochette.",
    url: 'https://chat.mistral.ai',
    image: 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=256',
  },
]

const albumAiTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description:
      'Génère des descriptions visuelles détaillées et utilise DALL·E intégré pour créer les visuels de ton album.',
    url: 'https://chatgpt.com',
    image: 'https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png',
    bgColor: '#ffffff',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    description:
      "Copilot combine texte et image pour t'aider à concevoir un album cohérent et visuellement percutant.",
    url: 'https://copilot.microsoft.com',
    image: 'https://kerv.com/app/uploads/2024/11/Microsoft-Copilot-Logo-360x203.png',
    bgColor: '#ffffff',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description:
      'Trouve des inspirations visuelles, des références artistiques et des concepts originaux pour ton album.',
    url: 'https://www.perplexity.ai',
    image: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=256',
    bgColor: '#ffffff',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description:
      "Conceptualise l'identité visuelle complète de ton album avec des descriptions précises et créatives.",
    url: 'https://chat.mistral.ai',
    image: 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=256',
  },
  {
    id: 'claude',
    name: 'Claude',
    description:
      "Claude t'aide à définir et articuler le concept visuel de ton album avec un sens du détail remarquable.",
    url: 'https://claude.ai',
    image: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=256',
    bgColor: '#ffffff',
  },
  {
    id: 'grok',
    name: 'Grok',
    description:
      "Grok de xAI génère des idées créatives et décalées pour l'univers visuel de ton album.",
    url: 'https://grok.com',
    image: 'https://www.google.com/s2/favicons?domain=grok.com&sz=256',
    bgColor: '#ffffff',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-retrogrid-black">
    <header class="shrink-0">
      <Header />
    </header>

    <Footer class="shrink-0" />

    <FortuneWheel v-model="wheelOpen" :themes="themes" @select="onWheelSelect" />
  </div>
</template>
