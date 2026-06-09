<script setup>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import { ref, nextTick } from 'vue'

const messages = ref([
  {
    role: 'bot',
    text: "Bonjour ! Je suis Le Projecteur. Mon rôle est de vous accompagner pas à pas pour cadrer votre projet IA et vous fournir une synthèse structurée à la fin de notre échange. Pour commencer : quel est le nom ou le sujet de votre projet ?",
  },
])

const input = ref('')
const chatRef = ref(null)
const isTyping = ref(false)

async function scrollBottom() {
  await nextTick()
  if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight
}

async function send() {
  const text = input.value.trim()
  if (!text || isTyping.value) return
  messages.value.push({ role: 'user', text })
  input.value = ''
  await scrollBottom()

  isTyping.value = true
  await scrollBottom()

  // Placeholder — à remplacer par un vrai appel API
  setTimeout(async () => {
    isTyping.value = false
    messages.value.push({
      role: 'bot',
      text: "Merci ! Pouvez-vous décrire en quelques mots l'objectif principal de ce projet et le public que vous souhaitez toucher ?",
    })
    await scrollBottom()
  }, 1000)
}

function onEnter(e) {
  if (!e.shiftKey) {
    e.preventDefault()
    send()
  }
}
</script>

<template>
  <!-- h-dvh : hauteur exacte du viewport visible sur mobile (tient compte de la barre du navigateur) -->
  <div class="h-dvh flex flex-col bg-retrogrid-black overflow-hidden">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 min-h-0 flex flex-col items-center px-3 sm:px-4 py-4 sm:py-8 gap-3 sm:gap-6">
      <!-- En-tête de l'activité -->
      <div class="text-center shrink-0 px-2">
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1.5 sm:mb-3">
          Le Projecteur
        </h1>
        <p class="text-white/60 text-xs sm:text-base leading-relaxed max-w-xl mx-auto">
          Répondez aux questions de l'assistant pour clarifier votre projet IA : contexte, objectifs, public cible, contraintes. Une synthèse structurée vous sera remise à la fin.
        </p>
      </div>

      <!-- Widget de conversation — flex-1 + min-h-0 pour remplir l'espace restant sans déborder -->
      <div
        class="flex-1 min-h-0 w-full max-w-2xl flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden"
      >
        <!-- Messages -->
        <div ref="chatRef" class="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
          >
            <div
              class="max-w-[85%] sm:max-w-[78%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm leading-relaxed"
              :class="
                msg.role === 'user'
                  ? 'bg-synthwave-magenta text-white rounded-br-sm'
                  : 'bg-white/10 text-white/90 rounded-bl-sm'
              "
            >
              {{ msg.text }}
            </div>
          </div>

          <!-- Indicateur de frappe -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
              <span class="typing-dot" />
              <span class="typing-dot" />
              <span class="typing-dot" />
            </div>
          </div>
        </div>

        <!-- Zone de saisie -->
        <div class="shrink-0 border-t border-white/10 p-2 sm:p-3 flex gap-2 items-end">
          <textarea
            v-model="input"
            @keydown.enter="onEnter"
            placeholder="Votre réponse…"
            rows="1"
            class="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-white text-xs sm:text-sm placeholder-white/30 outline-none focus:border-synthwave-magenta/50 transition-colors"
          />
          <button
            @click="send"
            :disabled="isTyping"
            class="bg-synthwave-magenta hover:opacity-90 disabled:opacity-40 text-white rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-opacity shrink-0"
          >
            Envoyer
          </button>
        </div>
      </div>
    </main>

    <Footer class="shrink-0" />
  </div>
</template>

<style scoped>
.typing-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  opacity: 0.4;
  animation: blink 1.2s infinite;
}
.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.4;
  }
  40% {
    opacity: 1;
  }
}
</style>
