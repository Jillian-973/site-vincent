<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  season: { type: String, required: true },
})

const currentIndex = ref(0)
const modalOpen = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
let autoTimer = null
let pauseTimeout = null

function onResize() {
  windowWidth.value = window.innerWidth
}

function modIdx(i) {
  const n = props.images.length
  return ((i % n) + n) % n
}

const centerImage = computed(() => props.images[modIdx(currentIndex.value)])

// 3 sides on mobile (<640), 5 on tablet (<1024), 8 on desktop
const visibleSides = computed(() => {
  if (windowWidth.value < 640) return 3
  if (windowWidth.value < 1024) return 5
  return 8
})

const leftItems = computed(() => {
  const count = Math.min(visibleSides.value, props.images.length - 1)
  return Array.from({ length: count }, (_, i) => {
    const dist = count - i
    const index = modIdx(currentIndex.value - dist)
    return { ...props.images[index], dist, index }
  })
})

const rightItems = computed(() => {
  const count = Math.min(visibleSides.value, props.images.length - 1)
  return Array.from({ length: count }, (_, i) => {
    const dist = i + 1
    const index = modIdx(currentIndex.value + dist)
    return { ...props.images[index], dist, index }
  })
})

function sideStyle(dist) {
  const isMobile = windowWidth.value < 640
  const isTablet = windowWidth.value < 1024
  const w = isMobile ? 50 : isTablet ? 70 : 90
  const h = isMobile ? 75 : isTablet ? 105 : 135
  const opacity = Math.max(0.15, 0.85 - dist * 0.12)
  return { width: `${w}px`, height: `${h}px`, opacity }
}

const centerImgStyle = computed(() => {
  const w = windowWidth.value
  return {
    maxWidth: w < 640 ? 'min(180px, 46vw)' : w < 1024 ? 'min(280px, 44vw)' : 'min(400px, 40vw)',
    maxHeight: w < 640 ? '260px' : w < 1024 ? '340px' : '520px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '3px',
    display: 'block',
  }
})

function startAutoPlay() {
  clearInterval(autoTimer)
  autoTimer = setInterval(() => {
    currentIndex.value = modIdx(currentIndex.value + 1)
  }, 5000)
}

function goTo(index) {
  currentIndex.value = index
  clearInterval(autoTimer)
  clearTimeout(pauseTimeout)
  pauseTimeout = setTimeout(startAutoPlay, 5000)
}

function prev() {
  goTo(modIdx(currentIndex.value - 1))
}

function next() {
  goTo(modIdx(currentIndex.value + 1))
}

function openModal() {
  clearInterval(autoTimer)
  clearTimeout(pauseTimeout)
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  startAutoPlay()
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  if (props.images.length > 1) startAutoPlay()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  clearInterval(autoTimer)
  clearTimeout(pauseTimeout)
})
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4 sm:gap-[18px] pb-6 border-white/[0.07]">
    <!-- Season label -->
    <p class="orb font-bold text-xl py-20 sm:text-[40px] tracking-[0.1em] uppercase text-white">
      {{ season }}
    </p>

    <!-- Carousel strip + arrows -->
    <div class="relative w-full">
      <!-- Left arrow -->
      <button
        class="absolute left-3 sm:left-5 top-1/2 cursor-pointer -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-all backdrop-blur-sm"
        aria-label="Image précédente"
        @click="prev"
      >
        <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4 sm:w-5 sm:h-5">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Strip -->
      <div class="flex items-center justify-center gap-2 w-full overflow-hidden py-2">
        <!-- Left side items -->
        <div
          v-for="item in leftItems"
          :key="`l-${item.index}`"
          class="cursor-pointer overflow-hidden rounded-[3px] shrink-0 transition-[opacity,width,height] duration-[450ms] ease-in-out hover:brightness-125"
          :style="sideStyle(item.dist)"
          @click="goTo(item.index)"
        >
          <img
            :src="item.url"
            :alt="item.name"
            class="w-full h-full object-cover block pointer-events-none"
            draggable="false"
          />
        </div>

        <!-- Center item -->
        <div
          class="relative cursor-pointer shrink-0 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
          @click="openModal"
        >
          <div class="absolute w-4 h-4 border-white/75 border-t-2 border-l-2" style="top: -7px; left: -7px" />
          <div class="absolute w-4 h-4 border-white/75 border-t-2 border-r-2" style="top: -7px; right: -7px" />
          <div class="absolute w-4 h-4 border-white/75 border-b-2 border-l-2" style="bottom: -7px; left: -7px" />
          <div class="absolute w-4 h-4 border-white/75 border-b-2 border-r-2" style="bottom: -7px; right: -7px" />
          <img
            :src="centerImage.url"
            :alt="centerImage.name"
            :style="centerImgStyle"
            draggable="false"
          />
        </div>

        <!-- Right side items -->
        <div
          v-for="item in rightItems"
          :key="`r-${item.index}`"
          class="cursor-pointer overflow-hidden rounded-[3px] shrink-0 transition-[opacity,width,height] duration-[450ms] ease-in-out hover:brightness-125"
          :style="sideStyle(item.dist)"
          @click="goTo(item.index)"
        >
          <img
            :src="item.url"
            :alt="item.name"
            class="w-full h-full object-cover block pointer-events-none"
            draggable="false"
          />
        </div>
      </div>

      <!-- Right arrow -->
      <button
        class="absolute right-3 sm:right-5 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-all backdrop-blur-sm"
        aria-label="Image suivante"
        @click="next"
      >
        <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4 sm:w-5 sm:h-5">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Image name -->
    <p
      class="orb font-bold text-[0.8rem] sm:text-[20px] tracking-[0.18em] uppercase text-white/80 text-center min-h-[1.2em] px-4"
    >
      {{ centerImage.name }}
    </p>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="modalOpen"
          class="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          @click.self="closeModal"
        >
          <button
            class="absolute top-4 right-5 text-3xl leading-none text-white bg-transparent border-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Fermer"
            @click="closeModal"
          >
            ×
          </button>
          <div class="flex flex-col items-center gap-5 px-4 sm:px-6 max-w-full">
            <img
              :src="centerImage.url"
              :alt="centerImage.name"
              class="max-w-[90vw] sm:max-w-[min(90vw,820px)] max-h-[75vh] sm:max-h-[80vh] object-contain rounded-md"
            />
            <p
              class="orb text-[0.85rem] sm:text-[0.95rem] tracking-[0.12em] text-white/75 text-center px-4"
            >
              {{ centerImage.name }}
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.orb {
  font-family: 'Orbitron', sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
