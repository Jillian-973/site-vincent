<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  themes: { type: Array, required: true },
})
const emit = defineEmits(['update:modelValue', 'select'])

const rotation = ref(0)
const spinning = ref(false)
const result = ref(null)

const segAngle = computed(() => 360 / props.themes.length)
const colors = ['#fa0881', '#8802fc', '#fc9d03', '#3daeba']

const conicGradient = computed(() => {
  const step = segAngle.value
  const stops = props.themes.map((_, i) => {
    const color = colors[i % colors.length]
    return `${color} ${i * step}deg ${(i + 1) * step}deg`
  })
  return `conic-gradient(${stops.join(', ')})`
})

const wheelStyle = computed(() => ({
  background: conicGradient.value,
  transform: `rotate(${rotation.value}deg)`,
  transition: spinning.value ? 'transform 3.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
}))

function labelStyle(i) {
  const angle = i * segAngle.value + segAngle.value / 2
  return { transform: `rotate(${angle}deg)` }
}

function spin() {
  if (spinning.value) return
  spinning.value = true
  result.value = null

  const n = props.themes.length
  const step = 360 / n
  const winnerIndex = Math.floor(Math.random() * n)

  const currentMod = rotation.value % 360
  const desiredMod = (360 - (winnerIndex * step + step / 2) + 360) % 360
  let delta = desiredMod - currentMod
  if (delta <= 0) delta += 360
  rotation.value += delta + 360 * 5

  setTimeout(() => {
    spinning.value = false
    result.value = props.themes[winnerIndex]
    emit('select', result.value)
  }, 3200)
}

function reset() {
  result.value = null
}

function close() {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (open) => {
    if (!open) result.value = null
  },
)
</script>

<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      @click.self="close"
    >
      <div
        class="bg-retrogrid-black border border-white/15 rounded-2xl p-6 sm:p-8 w-full max-w-md md:max-w-2xl flex flex-col items-center gap-6 sm:gap-8 md:h-[80vh] md:max-h-[80vh]"
      >
        <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-bold shrink-0">Roue des thèmes</h3>

        <!-- Roue -->
        <div v-if="!result" class="relative flex-1 min-h-0 w-full flex items-center justify-center">
          <div class="relative aspect-square w-64 sm:w-80 md:w-auto md:h-full md:max-w-full">
            <div
              class="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"
            />
            <div class="wheel w-full h-full rounded-full border-4 border-white/30" :style="wheelStyle">
              <span
                v-for="(theme, i) in themes"
                :key="theme"
                class="wheel-label"
                :style="labelStyle(i)"
              >
                {{ theme }}
              </span>
            </div>
          </div>
        </div>

        <!-- Résultat à la place de la roue -->
        <div v-else class="flex-1 min-h-0 w-full flex flex-col items-center justify-center text-center gap-3">
          <p class="text-white/60 text-base sm:text-lg md:text-xl">Thème sélectionné</p>
          <p class="text-3xl sm:text-4xl md:text-6xl font-bold text-synthwave-magenta">{{ result }}</p>
        </div>

        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 shrink-0">
          <button
            v-if="!result"
            @click="spin"
            :disabled="spinning"
            class="bg-synthwave-magenta hover:opacity-90 disabled:opacity-50 text-white text-base sm:text-lg md:text-xl font-semibold rounded-xl px-6 py-3 sm:px-7 sm:py-3.5 transition-opacity"
          >
            {{ spinning ? 'Ça tourne…' : 'Faire tourner la roue' }}
          </button>
          <button
            v-else
            @click="reset"
            class="bg-electric-violet hover:opacity-90 text-white text-base sm:text-lg md:text-xl font-semibold rounded-xl px-6 py-3 sm:px-7 sm:py-3.5 transition-opacity"
          >
            Relancer
          </button>
          <button
            @click="close"
            class="border border-white/20 text-white/70 hover:text-white text-base sm:text-lg md:text-xl font-semibold rounded-xl px-6 py-3 sm:px-7 sm:py-3.5 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.wheel-label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 50%;
  margin-left: -45px;
  transform-origin: top center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  padding-bottom: 16px;
  color: white;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.15;
  pointer-events: none;
}

@media (min-width: 640px) {
  .wheel-label {
    width: 110px;
    margin-left: -55px;
    font-size: 16px;
    padding-bottom: 22px;
  }
}

@media (min-width: 768px) {
  .wheel-label {
    width: 150px;
    margin-left: -75px;
    font-size: 22px;
    padding-bottom: 30px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
