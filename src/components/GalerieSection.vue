<script setup>
import { ref, computed, onMounted } from 'vue'
import GalerieCarousel from './GalerieCarousel.vue'

const SHEET_URL = import.meta.env.VITE_GALERIE_SHEET_URL ?? ''

const images = ref([])
const loading = ref(true)
const fetchError = ref(null)

function parseCSV(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r/g, '')
  const lines = text.split('\n').filter(l => l.trim())
  return lines.slice(1).map(line => {
    // Parse CSV fields, respecting double-quoted values
    const fields = []
    let cur = ''
    let inQ = false
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue }
      if (ch === ',' && !inQ) { fields.push(cur.trim()); cur = ''; continue }
      cur += ch
    }
    fields.push(cur.trim())
    return {
      name: fields[0] ?? '',
      url: fields[1] ?? '',
      season: fields[2] ?? 'Saison',
    }
  }).filter(img => img.url)
}

// Preserve sheet order for seasons, deduplicated
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
  return order.map(name => ({ name, images: groups[name] }))
})

async function load() {
  if (!SHEET_URL) { loading.value = false; return }
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
  <section class="galerie-section">
    <div class="galerie-header">
      <p class="galerie-label">Galerie des créations</p>
      <h2 class="galerie-title">Les œuvres de la communauté</h2>
      <p class="galerie-sub">Chaque saison, les meilleures créations du Décorateur d'intérieur.</p>
    </div>

    <div v-if="loading" class="galerie-state">Chargement de la galerie…</div>
    <div v-else-if="fetchError" class="galerie-state error">{{ fetchError }}</div>
    <div v-else-if="!SHEET_URL" class="galerie-state">Galerie non configurée (VITE_GALERIE_SHEET_URL manquant).</div>
    <div v-else-if="seasons.length === 0" class="galerie-state">Aucune image pour le moment.</div>

    <template v-else>
      <GalerieCarousel
        v-for="s in seasons"
        :key="s.name"
        :images="s.images"
        :season="s.name"
      />
    </template>
  </section>
</template>

<style scoped>
.galerie-section {
  width: 100%;
  background-color: var(--color-retrogrid-black);
  padding: 56px 0 40px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.galerie-header {
  text-align: center;
  padding: 0 16px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.galerie-label {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

.galerie-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
}

.galerie-sub {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.04em;
  max-width: 420px;
}

.galerie-state {
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.35);
  text-align: center;
  padding: 48px 16px;
}
.galerie-state.error {
  color: rgba(239, 68, 68, 0.7);
}
</style>
