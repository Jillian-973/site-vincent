<script setup>
import { ref, computed, onMounted } from 'vue'
import GalerieCarousel from './GalerieCarousel.vue'

const SHEET_URL = import.meta.env.VITE_GALERIE_SHEET_URL ?? ''

const images = ref([])
const loading = ref(true)
const fetchError = ref(null)

function parseCSV(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r/g, '')
  const lines = text.split('\n').filter((l) => l.trim())
  return lines
    .slice(1)
    .map((line) => {
      const fields = []
      let cur = ''
      let inQ = false
      for (const ch of line) {
        if (ch === '"') {
          inQ = !inQ
          continue
        }
        if (ch === ',' && !inQ) {
          fields.push(cur.trim())
          cur = ''
          continue
        }
        cur += ch
      }
      fields.push(cur.trim())
      return {
        name: fields[0] ?? '',
        url: fields[1] ?? '',
        season: fields[2] ?? 'Saison',
      }
    })
    .filter((img) => img.url)
}

const seasons = computed(() => {
  const order = []
  const groups = {}
  for (const img of images.value) {
    if (!groups[img.season]) {
      groups[img.season] = []
      order.push(img.season)
    }
    groups[img.season].push(img)
  }
  return order.map((name) => ({ name, images: groups[name] }))
})

async function load() {
  if (!SHEET_URL) {
    loading.value = false
    return
  }
  try {
    const res = await fetch(SHEET_URL)
    if (!res.ok) throw new Error(res.statusText)
    images.value = parseCSV(await res.text())
  } catch {
    fetchError.value = 'Impossible de charger la galerie.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <section class="w-full bg-retrogrid-black pt-14 pb-10 flex flex-col border-t border-white/[0.08]">
    <!-- <div class="flex flex-col items-center text-center gap-2 px-4 pb-10">
      <h2 class="orb font-bold text-xl sm:text-2xl tracking-[0.1em] uppercase text-white">
        La galerie d'images
      </h2>
    </div>-->

    <div v-if="loading" class="orb text-[0.85rem] text-white/35 text-center py-12 px-4">
      Chargement de la galerie…
    </div>
    <div v-else-if="fetchError" class="orb text-[0.85rem] text-red-400/70 text-center py-12 px-4">
      {{ fetchError }}
    </div>
    <div v-else-if="!SHEET_URL" class="orb text-[0.85rem] text-white/35 text-center py-12 px-4">
      Galerie non configurée (VITE_GALERIE_SHEET_URL manquant).
    </div>
    <div
      v-else-if="seasons.length === 0"
      class="orb text-[0.85rem] text-white/35 text-center py-12 px-4"
    >
      Aucune image pour le moment.
    </div>

    <template v-else>
      <GalerieCarousel v-for="s in seasons" :key="s.name" :images="s.images" :season="s.name" />
    </template>
  </section>
</template>

<style scoped>
.orb {
  font-family: 'Orbitron', sans-serif;
}
</style>
