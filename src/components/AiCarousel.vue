<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
})

const current = ref(0)
const total = computed(() => props.items.length)

const gradients = [
  'from-synthwave-magenta to-electric-violet',
  'from-electric-violet to-blue',
  'from-neon-sunset to-synthwave-magenta',
  'from-blue to-neon-sunset',
]

function gradientFor(i) {
  return gradients[i % gradients.length]
}

function goTo(i) {
  current.value = (i + total.value) % total.value
}
function next() {
  goTo(current.value + 1)
}
function prev() {
  goTo(current.value - 1)
}

// Défilement automatique toutes les 4 secondes
let autoplay = null
function startAutoplay() {
  stopAutoplay()
  autoplay = setInterval(next, 4000)
}
function stopAutoplay() {
  if (autoplay) clearInterval(autoplay)
}
function restartAutoplay() {
  startAutoplay()
}

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <!-- Cadre paysage, format compact -->
    <div class="relative w-full sm:w-[65%] md:w-[48%] lg:w-[38%] max-w-[360px]">
      <div
        class="relative overflow-hidden rounded-2xl border border-white/15"
        style="aspect-ratio: 16 / 9"
      >
        <div
          class="flex h-full transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <div
            v-for="(item, i) in items"
            :key="item.id"
            class="relative w-full h-full shrink-0 flex flex-col items-center justify-center text-center p-3 sm:p-4 gap-1.5 sm:gap-2"
            :class="!item.image ? `bg-gradient-to-br ${gradientFor(i)}` : ''"
            :style="
              item.image
                ? {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }
                : {}
            "
          >
            <!-- Overlay pour la lisibilité du texte -->
            <div class="absolute inset-0 bg-black/55" />

            <div class="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 max-w-[88%]">
              <h3 class="text-white font-bold text-sm sm:text-base leading-tight">{{ item.name }}</h3>
              <p class="text-white/80 text-[11px] sm:text-xs leading-relaxed">{{ item.description }}</p>
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block bg-synthwave-magenta hover:opacity-90 text-white text-[11px] sm:text-xs font-semibold rounded-lg px-3 py-1.5 transition-opacity"
              >
                Essayer cette IA →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center gap-5 sm:gap-6">
      <button
        @click="prev(); restartAutoplay()"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-lg sm:text-xl leading-none p-2"
        aria-label="Précédent"
      >
        ←
      </button>

      <div class="flex items-center gap-2">
        <button
          v-for="(_, i) in items"
          :key="i"
          @click="goTo(i); restartAutoplay()"
          :class="[
            'rounded-full transition-all duration-300',
            i === current ? 'w-3 h-3 bg-synthwave-magenta' : 'w-2 h-2 bg-white/30 hover:bg-white/60',
          ]"
          :aria-label="`Aller à l'IA ${i + 1}`"
        />
      </div>

      <button
        @click="next(); restartAutoplay()"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-lg sm:text-xl leading-none p-2"
        aria-label="Suivant"
      >
        →
      </button>
    </div>
  </div>
</template>
