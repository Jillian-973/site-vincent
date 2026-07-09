<script setup>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

import vincentImg from './assets/Pdp_Vincent.png'
import romainImg from './assets/Pdp_Romain.png'
import elvanImg from './assets/Pdp_Elvan.png'
import killianImg from './assets/Pdp_Killian.png'

import vincentCardImg from './assets/vincent.png'
import romainCardImg from './assets/romain.png'
import elvanCardImg from './assets/elvan.png'
import killianCardImg from './assets/killian.png'

import linkedinFallback from './assets/linkedin_footer.png'
import linkedinKillian from './assets/linkedin-killian.png'
import linkedinVincent from './assets/linkedin-vincent.png'
import linkedinRomain from './assets/linkedin-romain.png'
import linkedinElvan from './assets/linkedin-elvan.png'

import portfolioVincent from './assets/portfolio-vincent.png'
import portfolioRomain from './assets/portfolio-romain.png'
import portfolioElvan from './assets/portfolio-elvan.png'
import portfolioKillian from './assets/portfolio-killian.png'

import linkedinPartenaire from './assets/linkedin-partenaires.png'
import websitePartenaire from './assets/link-partenaires.png'
const dolfiLogoUrl =
  'https://dolfi-formation.fr/wp-content/uploads/2024/10/logo-dolfi-2025-blanc.webp'

// Ajouter les imports des images partenaires ici (avatar + websiteImg)
// import partnerXAvatar from './assets/partner-x-avatar.png'
// import partnerXWebsiteImg from './assets/partner-x-website.png'

function formatBio(bio) {
  // Sépare les paires Q&A (fin de phrase "." ou "!" avant majuscule)
  const pairs = bio.split(/(?<=[.!])\s*(?=[A-ZÀÂÈÉÊËÎÏÔÙÛÜŸ])/)
  // Dans chaque paire, sépare la question "?" de la réponse
  return pairs.map((pair) => pair.split(/(?<=\?)\s*/).filter(Boolean))
}

const partners = [
  {
    name: 'Dolfi',
    avatar: dolfiLogoUrl,
    linkedinUrl: null,
    websiteUrl: null,
    bio: "Dolfi est un organisme de formation spécialisé dans l'IA générative, offrant des programmes adaptés aux professionnels et aux passionnés. Leur expertise permet de comprendre et d'exploiter les technologies d'IA de manière efficace et éthique.",
  },
]

const members = [
  {
    name: 'Vincent',
    roleTag: 'Formateur en IA',
    linkedinUrl: 'https://www.linkedin.com/in/vincent-grange/',
    portfolioUrl: null,
    linkedinImg: linkedinVincent,
    portfolioImg: portfolioVincent,
    color: 'bg-[#FB8C32]',
    tagColor: 'bg-[#774115]',
    lookingLeft: false,
    avatar: vincentImg,
    cardAvatar: vincentCardImg,
    bio: 'Ce que j’aime faire en dehors du cadre professionnel ? - Lire et nager. Ce qu’il y a dans l’entreprise ou chez les clients pour qui j’ai envie de travailler ? - De la transparence et une démarche d’amélioration continue. Mon outil numérique de prédilection pour mettre en œuvre des projets premium ? - Les intelligences artificielles génératives, évidemment. Ma principale référence et source d’inspiration dans le domaine du digital ? - Mes stagiaires !Ma plus grande satisfaction dans la création de la plateforme Mésotès ? - La coordination avec succès d’une équipe d’étudiants compétents et motivés.',
  },
  {
    name: 'Romain',
    roleTag: 'Designer UX/UI',
    linkedinUrl: 'https://www.linkedin.com/in/romain-weiss-66820b395/',
    portfolioUrl: null,
    linkedinImg: linkedinRomain,
    portfolioImg: portfolioRomain,
    color: 'bg-[#F66074]',
    tagColor: 'bg-[#8E2331]',
    lookingLeft: true,
    avatar: romainImg,
    cardAvatar: romainCardImg,
    bio: 'Ce que j’aime faire en dehors du cadre professionnel ? - Écouter de la musique et regarder des séries télévisées. Ce qu’il y a dans l’entreprise ou chez les clients pour qui j’ai envie de travailler ? - De la confiance. Mon outil numérique de prédilection pour mettre en œuvre des projets premium ? - Figma. Ma principale référence et source d’inspiration dans le domaine du digital ? - Marcelo Cedeno. Ma plus grande satisfaction dans la création de la plateforme Mésotès ? - Le système de carrousel et de cartes pour présenter les ressources.',
  },
  {
    name: 'Elvan',
    roleTag: 'Directeur artistique',
    linkedinUrl: 'https://www.linkedin.com/in/elvan-kemence/',
    portfolioUrl: null,
    linkedinImg: linkedinElvan,
    portfolioImg: portfolioElvan,
    color: 'bg-[#8D4F98]',
    tagColor: 'bg-[#631571]',
    lookingLeft: false,
    avatar: elvanImg,
    cardAvatar: elvanCardImg,
    bio: 'Ce que j’aime faire en dehors du cadre professionnel ? - La course à pied et la randonnée. Ce qu’il y a dans l’entreprise ou chez les clients pour qui j’ai envie de travailler ? - Une valorisation de la créativité. Mon outil numérique de prédilection pour mettre en œuvre des projets premium ? - Photoshop. Ma principale référence et source d’inspiration dans le domaine du digital ? - Aziatack. Ma plus grande satisfaction dans la création de la plateforme Mésotès ? - Le logo, inspiré du buste de Marc-Aurèle.',
  },
  {
    name: 'Killian',
    roleTag: 'Développeur web',
    linkedinUrl: 'https://www.linkedin.com/in/killian-entertainment/',
    portfolioUrl: 'https://jillian-973.github.io/Dev_Portfolio/',
    linkedinImg: linkedinKillian,
    portfolioImg: portfolioKillian,
    color: 'bg-[#51329C]',
    tagColor: 'bg-[#2A1167]',
    lookingLeft: true,
    avatar: killianImg,
    cardAvatar: killianCardImg,
    bio: 'Ce que j’aime faire en dehors du cadre professionnel ? - De l’ultimate, C’est un sport d’équipe avec un frisbee. Ce qu’il y a dans l’entreprise ou chez les clients pour qui j’ai envie de travailler ? - Du respect. Mon outil numérique de prédilection pour mettre en œuvre des projets premium ? - Visual Studio Code. Ma principale référence et source d’inspiration dans le domaine du digital ? - Clemzou. Ma plus grande satisfaction dans la création de la plateforme Mésotès ? - Tout ce que vous ne voyez pas et qui permet pourtant au site de fonctionner.',
  },
]
</script>

<template>
  <div class="flex flex-col" style="background-color: var(--color-retrogrid-black)">
    <!-- Section hero : prend exactement un écran entier (header inclus) -->
    <section class="min-h-screen flex flex-col">
      <header class="shrink-0">
        <Header />
      </header>

      <div
        class="flex-1 flex flex-col items-center justify-center gap-10 sm:gap-16 py-10 px-4 sm:px-8"
      >
        <h1 class="text-3xl sm:text-5xl font-bold text-white text-center uppercase leading-[1.4]">
          équipe
        </h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
          <div
            v-for="member in members"
            :key="member.name"
            class="relative w-56 sm:w-full sm:max-w-72 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex flex-col items-center pt-6 pb-0 transition-transform duration-300 ease-out hover:scale-110 hover:z-10 hover:shadow-2xl"
            :class="member.color"
          >
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center px-3 mb-3">
              {{ member.name }}
            </h2>

            <div class="flex items-center gap-2 mb-4">
              <span
                class="text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full"
                :class="member.tagColor"
              >
                {{ member.roleTag }}
              </span>
            </div>

            <img
              :src="member.cardAvatar"
              :alt="`Portrait de ${member.name}`"
              class="w-full h-52 sm:h-60 md:h-72 object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Présentations — visibles au scroll -->
    <main class="px-4 sm:px-8">
      <div class="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16 py-10 sm:py-16">
        <div
          v-for="(member, index) in members"
          :key="`bio-${member.name}`"
          class="flex flex-col sm:items-center gap-3"
          :class="index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
        >
          <!-- Avatar + icônes réseaux sous le cercle -->
          <div class="flex flex-col items-center gap-2 shrink-0">
            <div class="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <img
                :src="member.avatar"
                :alt="`Portrait de ${member.name}`"
                class="w-full h-full object-contain"
                :class="{ '-scale-x-100': member.lookingLeft }"
              />
            </div>

            <!-- Icônes LinkedIn + Portfolio -->
            <div class="flex gap-2">
              <!-- LinkedIn -->
              <component
                :is="member.linkedinImg && member.linkedinUrl ? 'a' : 'span'"
                :href="member.linkedinImg && member.linkedinUrl ? member.linkedinUrl : undefined"
                :target="member.linkedinImg && member.linkedinUrl ? '_blank' : undefined"
                :rel="member.linkedinImg && member.linkedinUrl ? 'noopener noreferrer' : undefined"
                :class="
                  member.linkedinImg && member.linkedinUrl
                    ? 'transition-transform hover:scale-110 cursor-pointer'
                    : 'opacity-35 grayscale cursor-not-allowed pointer-events-none'
                "
              >
                <img
                  :src="member.linkedinImg ?? linkedinFallback"
                  alt="LinkedIn"
                  class="h-8 w-8 object-contain"
                />
              </component>

              <!-- Portfolio -->
              <component
                :is="member.portfolioUrl ? 'a' : 'span'"
                :href="member.portfolioUrl ?? undefined"
                :target="member.portfolioUrl ? '_blank' : undefined"
                :rel="member.portfolioUrl ? 'noopener noreferrer' : undefined"
                :class="
                  member.portfolioUrl
                    ? 'transition-transform hover:scale-110 cursor-pointer'
                    : 'opacity-35 grayscale cursor-not-allowed pointer-events-none'
                "
              >
                <img :src="member.portfolioImg" alt="Portfolio" class="h-8 w-8 object-contain" />
              </component>
            </div>
          </div>

          <!-- Bulle bio -->
          <div
            class="flex-1 flex flex-col gap-2"
            :class="index % 2 === 0 ? 'sm:items-start' : 'sm:items-end'"
          >
            <div
              class="font-orbitron font-bold bg-white text-black rounded-3xl shadow-lg px-5 py-4 text-sm sm:text-base leading-relaxed flex flex-col gap-6"
            >
              <div v-for="(pair, i) in formatBio(member.bio)" :key="i" class="flex flex-col gap-1">
                <p v-for="(line, j) in pair" :key="j">{{ line }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>
