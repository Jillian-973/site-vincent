<script setup>
import { ref, nextTick, onMounted } from 'vue'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
const SYNTHESIS_MARKER = '###SYNTHESE###'

const WELCOME =
  "Bonjour ! Je suis Le Projecteur, ton assistant virtuel pour préparer ta certification. Mon rôle : t'aider à trouver ou préciser un projet nécessitant un usage responsable de l'IA, en moins de 15 minutes. Arrives-tu avec un projet en tête ou pars-tu de zéro ?"

// Historique de conversation envoyé au backend à chaque appel : { role: 'user'|'assistant', content }
const messages = ref([])
const inputUser = ref('')
const isLoading = ref(false)
const lastError = ref(null)
const copiedIndex = ref(null)

const messagesEl = ref(null)
const inputEl = ref(null)

function isSynthesis(content) {
  return content.startsWith(SYNTHESIS_MARKER)
}

function synthesisText(content) {
  return content.slice(SYNTHESIS_MARKER.length).trim()
}

function renderMarkdown(text) {
  return (
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // **gras** → <strong>
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // ###titre### → <strong>
      .replace(/###([^#\n]+?)###/g, '<strong>$1</strong>')
      // ### titre (début de ligne) → <strong>
      .replace(/^#{1,3} (.+)$/gm, '<strong>$1</strong>')
  )
}

function scrollBottom() {
  nextTick(() => {
    if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  })
}

function autoResize() {
  if (!inputEl.value) return
  inputEl.value.style.height = 'auto'
  inputEl.value.style.height = Math.min(inputEl.value.scrollHeight, 130) + 'px'
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

async function copySynthesis(content, index) {
  await navigator.clipboard.writeText(synthesisText(content))
  copiedIndex.value = index
  setTimeout(() => {
    if (copiedIndex.value === index) copiedIndex.value = null
  }, 3000)
}

function errorMessageFor(code) {
  switch (code) {
    case 'TIMEOUT':
      return 'Oups, ça a pris trop de temps. Recharge et réessaie.'
    case 'INVALID_RESPONSE':
      return 'Le Projecteur a eu un souci. Tu peux reformuler ?'
    case 'CONFIG_ERROR':
      return 'Problème de configuration. Contacte l’administrateur du site.'
    case 'RATE_LIMIT':
      return 'Trop d’activité en ce moment. Réessaie dans une minute.'
    case 'SERVER_ERROR':
    default:
      return 'Le Projecteur réfléchit mais prend du temps. Réessaie, et si ça persiste, recharge la page.'
  }
}

async function send() {
  if (isLoading.value) return
  const text = inputUser.value.trim()
  if (!text) return

  lastError.value = null
  const history = messages.value.map((m) => ({ role: m.role, content: m.content }))

  messages.value.push({ role: 'user', content: text })
  inputUser.value = ''
  if (inputEl.value) inputEl.value.style.height = 'auto'
  scrollBottom()

  isLoading.value = true

  try {
    const res = await fetch(`${API_URL}/api/projecteur`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      lastError.value = errorMessageFor(data.errorCode)
      return
    }
    if (!data.response) {
      lastError.value = errorMessageFor('INVALID_RESPONSE')
      return
    }

    messages.value.push({ role: 'assistant', content: data.response })
  } catch {
    lastError.value = errorMessageFor('SERVER_ERROR')
  } finally {
    isLoading.value = false
    scrollBottom()
    nextTick(() => inputEl.value?.focus())
  }
}

onMounted(() => {
  messages.value.push({ role: 'assistant', content: WELCOME })
  scrollBottom()
  nextTick(() => inputEl.value?.focus())
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-retrogrid-black">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 gap-6">
      <!-- En-tête de l'activité -->
      <div class="text-center max-w-2xl px-2">
        <h1 class="text-3xl sm:text-5xl font-bold text-white mb-2">Le Projecteur</h1>
        <h2 class="text-lg sm:text-xl text-white/50 italic font-normal mb-4">
          Pour faire la lumière sur ton affaire !
        </h2>
        <p class="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
          La mission du Projecteur est de définir et cadrer un projet solide pour la certification
          RS6891 en intelligence artificielle générative avec Certifopac. Réponds simplement à ses
          questions, une par une. En seulement 10 à 15 minutes, tu obtiendras une synthèse rédigée
          prête à l'emploi que tu pourras directement ajouter au début de ton rapport.
        </p>
        <p class="text-amber-300/90 text-sm sm:text-base font-semibold leading-relaxed bg-amber-300/10 border border-amber-300/20 rounded-xl px-4 py-3">
          Important : ne saisis pas de données personnelles ou confidentielles (secrets
          commerciaux, numéros de compte, etc.)
        </p>
      </div>

      <!-- Zone de chat -->
      <div class="w-full max-w-2xl flex flex-col gap-3">
        <!-- Messages -->
        <div
          ref="messagesEl"
          role="log"
          aria-live="polite"
          aria-label="Conversation avec Le Projecteur"
          class="bg-white rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col gap-3 overflow-y-auto"
          style="min-height: 320px; max-height: 55vh"
        >
          <template v-for="(msg, i) in messages" :key="i">
            <!-- Bulle utilisateur -->
            <div v-if="msg.role === 'user'" class="flex justify-end" role="article" aria-label="Ton message">
              <div
                class="max-w-[85%] bg-electric-violet text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
              >
                {{ msg.content }}
              </div>
            </div>

            <!-- Bloc synthèse -->
            <div
              v-else-if="isSynthesis(msg.content)"
              class="flex justify-start w-full"
              role="article"
              aria-label="Synthèse du Projecteur"
            >
              <div class="w-full bg-indigo-50 border border-indigo-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
                <span class="text-xs font-bold uppercase tracking-widest text-electric-violet"
                  >Synthèse de ton projet</span
                >
                <p class="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-wrap"
                  v-html="renderMarkdown(synthesisText(msg.content))"
                />
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    @click="copySynthesis(msg.content, i)"
                    :disabled="copiedIndex === i"
                    class="min-h-11 bg-electric-violet hover:opacity-85 disabled:opacity-50 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-opacity"
                  >
                    {{ copiedIndex === i ? 'Copié !' : 'Copier ma synthèse de projet' }}
                  </button>
                  <p v-if="copiedIndex === i" class="text-green-600 text-sm font-medium">
                    C'est copié. Tu peux maintenant coller cette synthèse dans ton rapport écrit.
                  </p>
                </div>
              </div>
            </div>

            <!-- Bulle bot -->
            <div v-else class="flex justify-start" role="article" aria-label="Réponse du Projecteur">
              <div
                class="max-w-[85%] bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
                v-html="renderMarkdown(msg.content)"
              />
            </div>
          </template>

          <!-- Indicateur de chargement -->
          <div v-if="isLoading" class="flex justify-start items-center gap-3" role="status">
            <div class="flex gap-1 bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <span class="typing-dot" />
              <span class="typing-dot" />
              <span class="typing-dot" />
            </div>
            <span class="text-xs text-gray-400 italic">Le Projecteur réfléchit…</span>
          </div>

          <!-- Message d'erreur -->
          <div v-if="lastError" class="flex justify-start" role="alert">
            <div
              class="max-w-[85%] bg-red-50 text-red-700 border border-red-200 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm sm:text-base leading-relaxed"
            >
              {{ lastError }}
            </div>
          </div>
        </div>

        <!-- Zone de saisie -->
        <div class="flex gap-2 items-end">
          <textarea
            ref="inputEl"
            v-model="inputUser"
            @keydown="handleKey"
            @input="autoResize"
            placeholder="Écris ta réponse ici..."
            aria-label="Ta réponse"
            rows="1"
            class="flex-1 resize-none bg-white border border-gray-200 focus:border-electric-violet rounded-xl px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 outline-none transition-colors"
            style="min-height: 46px; max-height: 130px; overflow-y: hidden"
          />
          <button
            @click="send"
            :disabled="isLoading"
            aria-label="Envoyer ta réponse"
            class="min-h-11 bg-electric-violet hover:opacity-85 disabled:opacity-40 text-white font-semibold rounded-xl px-5 py-3 text-sm sm:text-base transition-opacity shrink-0"
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
  width: 7px;
  height: 7px;
  background: #9ca3af;
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}
.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.35;
  }
  30% {
    transform: translateY(-5px);
    opacity: 1;
  }
}
</style>
