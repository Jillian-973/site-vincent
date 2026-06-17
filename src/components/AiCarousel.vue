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
    <!-- Cadre format portrait élargi pour lisibilité -->
    <div class="relative w-full sm:w-[75%] md:w-[55%] lg:w-[45%] max-w-[380px]">
      <div
        class="relative overflow-hidden rounded-2xl border border-white/15"
        style="aspect-ratio: 4 / 3"
      >
        <div
          class="flex h-full transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <div
            v-for="(item, i) in items"
            :key="item.id"
            class="relative w-full h-full shrink-0 flex flex-col items-center justify-center text-center p-5 sm:p-7 gap-3 sm:gap-4"
            :class="!item.image && !item.bgColor ? `bg-gradient-to-br ${gradientFor(i)}` : ''"
            :style="{
              ...(item.image
                ? {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }
                : {}),
              ...(item.bgColor ? { backgroundColor: item.bgColor } : {}),
            }"
          >
            <!-- Overlay sombre sur fond foncé, blanc sur fond blanc pour lisibilité du texte -->
            <div v-if="item.bgColor !== '#ffffff'" class="absolute inset-0 bg-black/55" />
            <div v-else class="absolute inset-0 bg-white/70" />

            <div class="relative z-10 flex flex-col items-center gap-3 sm:gap-4 max-w-[90%]">
              <h3
                class="font-extrabold leading-tight text-[22px] sm:text-[30px]"
                :class="item.bgColor === '#ffffff' ? 'text-black' : 'text-white'"
              >{{ item.name }}</h3>
              <p
                class="leading-relaxed text-[14px] sm:text-[18px]"
                :class="item.bgColor === '#ffffff' ? 'text-black font-semibold' : 'text-white/80'"
              >{{ item.description }}</p>
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block bg-electric-violet hover:opacity-90 text-white text-sm sm:text-base font-semibold rounded-xl px-5 py-2.5 transition-opacity"
              >
                Essayer cette IA →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center gap-6 sm:gap-8">
      <button
        @click="prev(); restartAutoplay()"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-2xl sm:text-3xl leading-none p-3"
        aria-label="Précédent"
      >
        ←
      </button>

      <div class="flex items-center gap-3">
        <button
          v-for="(_, i) in items"
          :key="i"
          @click="goTo(i); restartAutoplay()"
          :class="[
            'rounded-full transition-all duration-300',
            i === current ? 'w-4 h-4 bg-synthwave-magenta' : 'w-3 h-3 bg-white/30 hover:bg-white/60',
          ]"
          :aria-label="`Aller à l'IA ${i + 1}`"
        />
      </div>

      <button
        @click="next(); restartAutoplay()"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-2xl sm:text-3xl leading-none p-3"
        aria-label="Suivant"
      >
        →
      </button>
    </div>
  </div>
</template>
