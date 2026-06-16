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
        class="bg-retrogrid-black border border-white/15 rounded-2xl p-5 sm:p-6 w-full max-w-md flex flex-col items-center gap-5 sm:gap-6"
      >
        <h3 class="text-white text-lg sm:text-xl font-bold">Roue des thèmes</h3>

        <!-- Roue -->
        <div v-if="!result" class="relative w-56 h-56 sm:w-72 sm:h-72">
          <div
            class="absolute -top-1 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-white"
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

        <!-- Résultat à la place de la roue -->
        <div v-else class="w-56 h-56 sm:w-72 sm:h-72 flex flex-col items-center justify-center text-center gap-2">
          <p class="text-white/60 text-sm">Thème sélectionné</p>
          <p class="text-2xl sm:text-3xl font-bold text-synthwave-magenta">{{ result }}</p>
        </div>

        <div class="flex gap-3">
          <button
            v-if="!result"
            @click="spin"
            :disabled="spinning"
            class="bg-synthwave-magenta hover:opacity-90 disabled:opacity-50 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-opacity"
          >
            {{ spinning ? 'Ça tourne…' : 'Faire tourner la roue' }}
          </button>
          <button
            v-else
            @click="reset"
            class="bg-electric-violet hover:opacity-90 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-opacity"
          >
            Relancer
          </button>
          <button
            @click="close"
            class="border border-white/20 text-white/70 hover:text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors"
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
  width: 70px;
  margin-left: -35px;
  transform-origin: top center;
  text-align: center;
  padding-top: 10px;
  color: white;
  font-size: 9px;
  font-weight: 700;
  pointer-events: none;
}

@media (min-width: 640px) {
  .wheel-label {
    font-size: 11px;
    padding-top: 14px;
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
