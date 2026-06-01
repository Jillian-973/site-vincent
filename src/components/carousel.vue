<template>
  <div class="relative flex flex-col items-center justify-center py-10 select-none overflow-hidden">
    <!-- Slides track -->
    <div
      ref="trackRef"
      class="relative flex items-center justify-center w-4/5 mx-auto"
      :style="{ height: trackHeight + 'px' }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        :style="getSlideStyle(index)"
        class="absolute border-4 border-white rounded-4xl overflow-hidden cursor-pointer transition-all duration-500 ease-out"
        @click="goTo(index)"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-full object-cover"
          draggable="false"
        />

        <!-- Label on active slide only -->
        <Transition name="fade">
          <div
            v-if="index === current"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-white font-semibold text-sm whitespace-nowrap"
            style="
              background: rgba(0, 0, 0, 0.5);
              border: 1.5px solid rgba(255, 255, 255, 0.4);
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
      <!-- Prev arrow -->
      <button
        @click="prev"
        class="text-white cursor-pointer opacity-70 hover:opacity-100 transition-opacity text-xl leading-none"
        aria-label="Précédent"
      >
        ←
      </button>

      <!-- Dots -->
      <div class="flex gap-2">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goTo(index)"
          :class="[
            'rounded-full cursor-pointer transition-all duration-300',
            index === current ? 'w-3 h-3 bg-pink-500' : 'w-2 h-2 bg-white/30 hover:bg-white/60',
          ]"
          :aria-label="`Aller au slide ${index + 1}`"
        />
      </div>

      <!-- Next arrow -->
      <button
        @click="next"
        class="text-white cursor-pointer opacity-70 hover:opacity-100 transition-opacity text-xl leading-none"
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
      { id: 1, title: 'Activité 1', image: 'https://picsum.photos/seed/1/600/400' },
      { id: 2, title: 'Activité 2', image: 'https://picsum.photos/seed/2/600/400' },
      { id: 3, title: 'Activité 3', image: 'https://picsum.photos/seed/3/600/400' },
      { id: 4, title: 'Activité 4', image: 'https://picsum.photos/seed/4/600/400' },
      { id: 5, title: 'Activité 5', image: 'https://picsum.photos/seed/5/600/400' },
    ],
  },
})

const current = ref(0)
const total = computed(() => props.slides.length)

// Responsive sizing based on container width
const trackRef = ref(null)
const containerWidth = ref(800)

const trackHeight = computed(() => containerWidth.value * 0.38)

let ro = null
onMounted(() => {
  ro = new ResizeObserver(([entry]) => {
    containerWidth.value = entry.contentRect.width
  })
  if (trackRef.value) ro.observe(trackRef.value)
})
onBeforeUnmount(() => ro?.disconnect())

function goTo(index) {
  current.value = (index + total.value) % total.value
}
function next() {
  goTo(current.value + 1)
}
function prev() {
  goTo(current.value - 1)
}

// Compute position relative to current (-2, -1, 0, 1, 2)
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

  // Only render up to ±2 positions
  if (abs > 2) return { opacity: 0, pointerEvents: 'none', zIndex: 0 }

  const cw = containerWidth.value
  // Active slide = 42% of container width, 16:10 ratio
  const w0 = cw * 0.42
  const h0 = w0 * 0.625

  const configs = {
    0: { x: 0, scale: 1, opacity: 1, width: w0, height: h0, zIndex: 30, blur: 0 },
    1: {
      x: cw * 0.3,
      scale: 0.78,
      opacity: 0.7,
      width: w0 * 0.78,
      height: h0 * 0.78,
      zIndex: 20,
      blur: 1,
    },
    '-1': {
      x: -cw * 0.3,
      scale: 0.78,
      opacity: 0.7,
      width: w0 * 0.78,
      height: h0 * 0.78,
      zIndex: 20,
      blur: 1,
    },
    2: {
      x: cw * 0.52,
      scale: 0.6,
      opacity: 0.35,
      width: w0 * 0.6,
      height: h0 * 0.6,
      zIndex: 10,
      blur: 2,
    },
    '-2': {
      x: -cw * 0.52,
      scale: 0.6,
      opacity: 0.35,
      width: w0 * 0.6,
      height: h0 * 0.6,
      zIndex: 10,
      blur: 2,
    },
  }

  const key = String(offset)
  const c = configs[key]

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
