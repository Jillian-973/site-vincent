<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  season: { type: String, required: true },
})

const SIDES = 5

const currentIndex = ref(0)
const modalOpen = ref(false)
let autoTimer = null
let pauseTimeout = null

function modIdx(i) {
  const n = props.images.length
  return ((i % n) + n) % n
}

const centerImage = computed(() => props.images[modIdx(currentIndex.value)])

// Left: rendered furthest → closest so they display correctly left-to-right
const leftItems = computed(() => {
  const count = Math.min(SIDES, props.images.length - 1)
  return Array.from({ length: count }, (_, i) => {
    const dist = count - i
    const index = modIdx(currentIndex.value - dist)
    return { ...props.images[index], dist, index }
  })
})

// Right: closest → furthest
const rightItems = computed(() => {
  const count = Math.min(SIDES, props.images.length - 1)
  return Array.from({ length: count }, (_, i) => {
    const dist = i + 1
    const index = modIdx(currentIndex.value + dist)
    return { ...props.images[index], dist, index }
  })
})

function sideStyle(dist) {
  const scale = Math.max(0.22, 1 - dist * 0.16)
  const w = Math.round(86 * scale)
  const h = Math.round(128 * scale)
  const opacity = Math.max(0.1, 0.78 - dist * 0.14)
  return { width: `${w}px`, height: `${h}px`, opacity, flexShrink: '0' }
}

function startAutoPlay() {
  clearInterval(autoTimer)
  autoTimer = setInterval(() => {
    currentIndex.value = modIdx(currentIndex.value + 1)
  }, 3000)
}

function goTo(index) {
  currentIndex.value = index
  clearInterval(autoTimer)
  clearTimeout(pauseTimeout)
  pauseTimeout = setTimeout(startAutoPlay, 7000)
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
  if (props.images.length > 1) startAutoPlay()
})

onUnmounted(() => {
  clearInterval(autoTimer)
  clearTimeout(pauseTimeout)
})
</script>

<template>
  <div class="galerie-season">
    <p class="season-label">{{ season }}</p>

    <div class="carousel-strip">
      <div
        v-for="item in leftItems"
        :key="`l-${item.index}`"
        class="side-item"
        :style="sideStyle(item.dist)"
        @click="goTo(item.index)"
      >
        <img :src="item.url" :alt="item.name" draggable="false" />
      </div>

      <div class="center-item" @click="openModal">
        <div class="corner tl" />
        <div class="corner tr" />
        <div class="corner bl" />
        <div class="corner br" />
        <img :src="centerImage.url" :alt="centerImage.name" draggable="false" />
      </div>

      <div
        v-for="item in rightItems"
        :key="`r-${item.index}`"
        class="side-item"
        :style="sideStyle(item.dist)"
        @click="goTo(item.index)"
      >
        <img :src="item.url" :alt="item.name" draggable="false" />
      </div>
    </div>

    <p class="image-name">{{ centerImage.name }}</p>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
          <button class="modal-close" aria-label="Fermer" @click="closeModal">×</button>
          <div class="modal-inner">
            <img :src="centerImage.url" :alt="centerImage.name" class="modal-img" />
            <p class="modal-name">{{ centerImage.name }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.galerie-season {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 36px 0 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.season-label {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

.carousel-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  overflow: hidden;
  padding: 8px 0;
}

.side-item {
  cursor: pointer;
  transition: opacity 0.45s ease, width 0.45s ease, height 0.45s ease;
  overflow: hidden;
  border-radius: 3px;
  flex-shrink: 0;
}
.side-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
.side-item:hover {
  filter: brightness(1.25);
}

.center-item {
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.center-item:hover {
  transform: scale(1.02);
}
.center-item img {
  display: block;
  max-width: min(260px, 52vw);
  max-height: 380px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 3px;
}

/* Corner brackets */
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: rgba(255, 255, 255, 0.75);
  border-style: solid;
  border-width: 0;
}
.corner.tl { top: -7px; left: -7px; border-top-width: 2px; border-left-width: 2px; }
.corner.tr { top: -7px; right: -7px; border-top-width: 2px; border-right-width: 2px; }
.corner.bl { bottom: -7px; left: -7px; border-bottom-width: 2px; border-left-width: 2px; }
.corner.br { bottom: -7px; right: -7px; border-bottom-width: 2px; border-right-width: 2px; }

.image-name {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  min-height: 1.2em;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 24px;
  font-size: 2rem;
  line-height: 1;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.modal-close:hover { opacity: 1; }
.modal-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 0 24px;
}
.modal-img {
  max-width: min(90vw, 820px);
  max-height: 80vh;
  object-fit: contain;
  border-radius: 6px;
}
.modal-name {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
}

/* Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
