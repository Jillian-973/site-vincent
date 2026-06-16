<script setup>
import { ref, computed } from 'vue'

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
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <!-- Cadre 9:16, largeur ~70% de la page sur desktop -->
    <div class="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] max-w-[420px]">
      <div
        class="relative overflow-hidden rounded-2xl border border-white/15"
        style="aspect-ratio: 9 / 16"
      >
        <div
          class="flex h-full transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <div
            v-for="(item, i) in items"
            :key="item.id"
            class="relative w-full h-full shrink-0 flex flex-col justify-end p-4 sm:p-5"
            :class="!item.image ? `bg-gradient-to-br ${gradientFor(i)}` : ''"
            :style="
              item.image
                ? { backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : {}
            "
          >
            <!-- Overlay pour la lisibilité du texte -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div class="relative z-10 flex flex-col gap-2 sm:gap-3">
              <h3 class="text-white font-bold text-base sm:text-lg leading-tight">{{ item.name }}</h3>
              <p class="text-white/80 text-xs sm:text-sm leading-relaxed">{{ item.description }}</p>
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block self-start bg-synthwave-magenta hover:opacity-90 text-white text-xs sm:text-sm font-semibold rounded-xl px-4 py-2 transition-opacity"
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
        @click="prev"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-lg sm:text-xl leading-none p-2"
        aria-label="Précédent"
      >
        ←
      </button>

      <div class="flex items-center gap-2">
        <button
          v-for="(_, i) in items"
          :key="i"
          @click="goTo(i)"
          :class="[
            'rounded-full transition-all duration-300',
            i === current ? 'w-3 h-3 bg-synthwave-magenta' : 'w-2 h-2 bg-white/30 hover:bg-white/60',
          ]"
          :aria-label="`Aller à l'IA ${i + 1}`"
        />
      </div>

      <button
        @click="next"
        class="text-white opacity-70 hover:opacity-100 transition-opacity text-lg sm:text-xl leading-none p-2"
        aria-label="Suivant"
      >
        →
      </button>
    </div>
  </div>
</template>
