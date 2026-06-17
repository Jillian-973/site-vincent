<template>
  <div class="relative flex flex-col items-center justify-center py-10 select-none overflow-hidden">
    <!-- Slides track -->
    <div
      ref="trackRef"
      class="relative flex items-center justify-center w-4/5 mx-auto touch-pan-y"
      :style="{ height: trackHeight + 'px' }"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        :style="getSlideStyle(index)"
        class="absolute overflow-hidden border-3 border-white cursor-pointer transition-all duration-500 ease-out"
        :class="isMobile ? 'rounded-xl' : 'rounded-2xl'"
        @click="handleSlideClick(index)"
      >
        <!-- Image ou gradient fallback -->
        <img
          v-if="slide.image"
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-full object-cover"
          draggable="false"
        />
        <div
          v-else
          class="w-full h-full"
          :style="{ background: slide.gradient || 'linear-gradient(to bottom right, var(--color-retrogrid-black), #1a1040)' }"
        />

        <!-- Label on active slide only -->
        <Transition name="fade">
          <div
            v-if="index === current"
            class="absolute bottom-3 left-1/2 -translate-x-1/2 px-15 py-1.5 rounded-2xl text-white font-semibold whitespace-nowrap"
            :class="isMobile ? 'text-xs' : 'text-xl'"
            style="
              background: rgba(0, 0, 0, 0.5);
              border: 3px solid var(--color-blue);
              backdrop-filter: blur(8px);
            "
          >
            {{ slide.title }}
          </div>
        </Transition>
      </div>
    </div>

    <!-- Navigation row -->
    <div class="flex items-center gap-6 mt-6">
      <button
        @click="prev"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-xl leading-none p-2"
        aria-label="Précédent"
      >
        ←
      </button>

      <div class="flex items-center gap-2">
        <button
          v-for="(_, i) in slides"
          :key="i"
          @click="goToSlide(i)"
          :class="[
            'rounded-full transition-all duration-300',
            i === current ? 'w-3 h-3 bg-pink-500' : 'w-2 h-2 bg-white/30 hover:bg-white/60',
          ]"
          :aria-label="`Aller au slide ${i + 1}`"
        />
      </div>

      <button
        @click="next"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-xl leading-none p-2"
        aria-label="Suivant"
      >
        →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      { id: 1, title: 'Activité 1', image: null, gradient: 'linear-gradient(to bottom right, var(--color-synthwave-magenta), var(--color-electric-violet))', url: null },
      { id: 2, title: 'Activité 2', image: null, gradient: 'linear-gradient(to bottom right, var(--color-electric-violet), var(--color-blue))', url: null },
      { id: 3, title: 'Activité 3', image: null, gradient: 'linear-gradient(to bottom right, var(--color-neon-sunset), var(--color-synthwave-magenta))', url: null },
    ],
  },
})

const current = ref(0)
const total = computed(() => props.slides.length)

// ── Responsive sizing ──────────────────────────────────────────────
const trackRef = ref(null)
const containerWidth = ref(600)

const isMobile = computed(() => containerWidth.value < 500)

const trackHeight = computed(() =>
  isMobile.value
    ? containerWidth.value * 0.58
    : containerWidth.value * 0.4,
)

let ro = null
onMounted(() => {
  ro = new ResizeObserver(([entry]) => {
    containerWidth.value = entry.contentRect.width
  })
  if (trackRef.value) ro.observe(trackRef.value)
  startAutoplay()
})
onBeforeUnmount(() => {
  ro?.disconnect()
  stopAutoplay()
})

// ── Autoplay ───────────────────────────────────────────────────────
let autoplay = null

function startAutoplay() {
  if (autoplay) clearInterval(autoplay)
  autoplay = setInterval(() => {
    current.value = (current.value + 1) % total.value
  }, 3000)
}

function stopAutoplay() {
  if (autoplay) { clearInterval(autoplay); autoplay = null }
}

// ── Navigation ─────────────────────────────────────────────────────
function goToSlide(index) {
  current.value = (index + total.value) % total.value
  startAutoplay()
}

function next() { goToSlide(current.value + 1) }
function prev() { goToSlide(current.value - 1) }

function handleSlideClick(index) {
  if (index === current.value) {
    const url = props.slides[index]?.url
    if (url) window.location.href = url
  } else {
    goToSlide(index)
  }
}

// ── Touch swipe ────────────────────────────────────────────────────
let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}
function onTouchEnd(e) {
  const delta = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
}

// ── Slide positioning ──────────────────────────────────────────────
function getOffset(index) {
  let offset = index - current.value
  const half = Math.floor(total.value / 2)
  if (offset > half) offset -= total.value
  if (offset < -half) offset += total.value
  return offset
}

function getSlideStyle(index) {
  const offset = getOffset(index)
  const abs = Math.abs(offset)
  const cw = containerWidth.value

  const maxVisible = isMobile.value ? 1 : 2
  if (abs > maxVisible) return { opacity: 0, pointerEvents: 'none', zIndex: 0 }

  const activeRatio = isMobile.value ? 0.7 : 0.42
  const w0 = cw * activeRatio
  const h0 = w0 * 0.625

  const mobile = {
    0:  { x: 0,         scale: 1,    opacity: 1,   width: w0,        height: h0,        zIndex: 30, blur: 0 },
    1:  { x:  cw * 0.46, scale: 0.72, opacity: 0.6, width: w0 * 0.72, height: h0 * 0.72, zIndex: 20, blur: 1 },
    '-1': { x: -cw * 0.46, scale: 0.72, opacity: 0.6, width: w0 * 0.72, height: h0 * 0.72, zIndex: 20, blur: 1 },
  }

  const desktop = {
    0:  { x: 0,          scale: 1,    opacity: 1,    width: w0,        height: h0,        zIndex: 30, blur: 0 },
    1:  { x:  cw * 0.3,  scale: 0.78, opacity: 0.7,  width: w0 * 0.78, height: h0 * 0.78, zIndex: 20, blur: 1 },
    '-1': { x: -cw * 0.3, scale: 0.78, opacity: 0.7,  width: w0 * 0.78, height: h0 * 0.78, zIndex: 20, blur: 1 },
    2:  { x:  cw * 0.52, scale: 0.6,  opacity: 0.35, width: w0 * 0.6,  height: h0 * 0.6,  zIndex: 10, blur: 2 },
    '-2': { x: -cw * 0.52, scale: 0.6, opacity: 0.35, width: w0 * 0.6, height: h0 * 0.6,  zIndex: 10, blur: 2 },
  }

  const c = (isMobile.value ? mobile : desktop)[String(offset)]

  return {
    width: c.width + 'px',
    height: c.height + 'px',
    transform: `translateX(${c.x}px) scale(${c.scale})`,
    opacity: c.opacity,
    zIndex: c.zIndex,
    filter: c.blur ? `blur(${c.blur}px)` : 'none',
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
