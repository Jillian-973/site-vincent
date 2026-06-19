<script setup>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import LinkedInIcon from './components/LinkedInIcon.vue'
import vincentImg from './assets/vincent logo mode.png'
import romainImg from './assets/romain logo mode.png'
import elvanImg from './assets/elvan mode logo.png'
import killianImg from './assets/kylian logo mode.png'

const members = [
  {
    name: 'Vincent Grange',
    roleTag: 'Formateur',
    hasPortfolio: true,
    portfolioUrl: '#',
    linkedinUrl: '#',
    color: 'bg-neon-sunset',
    avatar: vincentImg,
    bio: "Ceci est un texte d'exemple, écrit simplement pour illustrer à quoi peut ressembler un passage un peu plus long. Il ne raconte rien de particulier : son seul but est d'occuper l'espace et de montrer comment les phrases peuvent s'enchaîner les unes après les autres pour former un paragraphe cohérent.",
  },
  {
    name: 'Weiss Romain',
    roleTag: 'Designer',
    hasPortfolio: false,
    portfolioUrl: '#',
    linkedinUrl: '#',
    color: 'bg-synthwave-magenta',
    avatar: romainImg,
    bio: "Je me suis occupé de désigner le site sur lequel vous êtes en train de naviguer, j'ai réfléchi en particulier à l'harmonie visuelle et technique du projet pour que vous puissiez en profiter de la meilleure des manières. C'est également grâce à moi et Elvan que tous l'univers créatif de ce projet est né pour vous faire découvrir l'IA générative d'une manière inédite.",
  },
  {
    name: 'Kemence Elvan',
    roleTag: 'Designer',
    hasPortfolio: false,
    portfolioUrl: '#',
    linkedinUrl: '#',
    color: 'bg-[#8D4F98]',
    avatar: elvanImg,
    bio: 'Je me suis occupé de toute la direction artistique du projet : création du logo, choix des couleurs et des typographies, ainsi que la conception des designs du site, notamment la page d’accueil et les éléments liés aux activités. J’ai travaillé à donner une identité visuelle cohérente et accessible pour que l’expérience soit claire pour tout le monde.',
  },
  {
    name: 'Dumoulin Killian',
    roleTag: 'Développeur web',
    hasPortfolio: true,
    portfolioUrl: 'https://jillian-973.github.io/Dev_Portfolio/',
    linkedinUrl: 'https://www.linkedin.com/in/killian-entertainment/',
    color: 'bg-[#51329C]',
    avatar: killianImg,
    bio: "Je suis développeur web freelance et j'ai été stagiaire pour ce projet, chargé de la conception et du développement d’une plateforme web sur laquelle les utilisateurs réalisent leurs activités en ligne. J’interviens sur la création des fonctionnalités et l’intégration des différentes interfaces du site. Au cours de mon stage, j’ai participé à la mise en place et à l’évolution du site afin de garantir une navigation fluide, interactive et adaptée aux besoins des utilisateurs.",
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color: var(--color-retrogrid-black)">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 px-4 sm:px-8 py-10 sm:py-16">
      <h1 class="text-3xl sm:text-5xl font-bold text-white text-center mb-12 sm:mb-20">
        L'équipe derrière Mésotès
      </h1>

      <!-- Cartes personnages -->
      <div class="flex flex-wrap justify-center gap-6 sm:gap-8 mb-20 sm:mb-28">
        <div
          v-for="member in members"
          :key="member.name"
          class="relative w-48 sm:w-56 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex flex-col items-center pt-5 pb-0 transition-transform duration-300 ease-out hover:scale-110 hover:z-10 hover:shadow-2xl"
          :class="member.color"
        >
          <h2 class="text-lg sm:text-xl font-bold text-white text-center px-3 mb-3">
            {{ member.name }}
          </h2>

          <div class="flex items-center gap-2 mb-4">
            <span class="bg-white/85 text-black text-xs font-bold px-3 py-1 rounded-full">
              {{ member.roleTag }}
            </span>
            <a
              v-if="member.hasPortfolio"
              :href="member.portfolioUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/85 text-black text-xs font-bold px-3 py-1 rounded-full hover:bg-white transition-colors"
            >
              portfolio
            </a>
            <span v-else class="bg-white/40 text-black/70 text-xs font-bold px-3 py-1 rounded-full">
              non-portfolio
            </span>
          </div>

          <a
            :href="member.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil LinkedIn"
            class="w-8 h-8 mb-4"
          >
            <LinkedInIcon />
          </a>

          <img
            :src="member.avatar"
            :alt="`Portrait de ${member.name}`"
            class="w-full h-44 sm:h-52 object-cover object-top"
          />
        </div>
      </div>

      <!-- Présentations -->
      <div class="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16">
        <div
          v-for="(member, index) in members"
          :key="`bio-${member.name}`"
          class="flex flex-col sm:items-end gap-3"
          :class="index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
        >
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center"
            :class="member.color"
          >
            <img
              :src="member.avatar"
              :alt="`Portrait de ${member.name}`"
              class="w-full h-full object-cover"
            />
          </div>

          <div
            class="flex-1 flex flex-col gap-2"
            :class="index % 2 === 0 ? 'sm:items-start' : 'sm:items-end'"
          >
            <div class="flex items-center gap-2 ml-6">
              <a
                :href="member.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn"
                class="bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-sky-200 transition-colors"
              >
                <span class="w-3.5 h-3.5"><LinkedInIcon /></span>
                linkedin
              </a>
              <a
                v-if="member.hasPortfolio"
                :href="member.portfolioUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-violet-200 transition-colors"
              >
                portfolio
              </a>
              <span
                v-else
                class="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full"
              >
                non-portfolio
              </span>
            </div>

            <p
              class="font-orbitron font-bold bg-white text-black rounded-3xl shadow-lg px-5 py-4 text-sm sm:text-base leading-relaxed"
            >
              {{ member.bio }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <Footer class="shrink-0" />
  </div>
</template>
