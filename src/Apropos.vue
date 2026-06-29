<script setup>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import LinkedInIcon from './components/LinkedInIcon.vue'
import vincentImg from './assets/vincent logo mode.png'
import romainImg from './assets/romain logo mode.png'
import elvanImg from './assets/elvan mode logo.png'
import killianImg from './assets/kylian logo mode.png'
import vincentCardImg from './assets/vincent.png'
import romainCardImg from './assets/romain.png'
import elvanCardImg from './assets/elvan.png'
import killianCardImg from './assets/killian.png'

const members = [
  {
    name: 'Vincent',
    roleTag: 'Formateur en IA',
    hasPortfolio: false,
    portfolioUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/vincent-grange/',
    color: 'bg-[#FB8C32]',
    tagColor: 'bg-[#774115]',
    avatar: vincentImg,
    cardAvatar: vincentCardImg,
    bio: "Ceci est un texte d'exemple, écrit simplement pour illustrer à quoi peut ressembler un passage un peu plus long. Il ne raconte rien de particulier : son seul but est d'occuper l'espace et de montrer comment les phrases peuvent s'enchaîner les unes après les autres pour former un paragraphe cohérent.",
  },
  {
    name: 'Romain',
    roleTag: 'Designer UX/UI',
    hasPortfolio: false,
    portfolioUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/romain-weiss-66820b395/',
    color: 'bg-[#F66074]',
    tagColor: 'bg-[#8E2331]',
    avatar: romainImg,
    cardAvatar: romainCardImg,
    bio: "Je me suis occupé de désigner le site sur lequel vous êtes en train de naviguer, j'ai réfléchi en particulier à l'harmonie visuelle et technique du projet pour que vous puissiez en profiter de la meilleure des manières. C'est également grâce à moi et Elvan que tous l'univers créatif de ce projet est né pour vous faire découvrir l'IA générative d'une manière inédite.",
  },
  {
    name: 'Elvan',
    roleTag: 'Directeur artistique',
    hasPortfolio: false,
    portfolioUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/elvan-kemence/',
    color: 'bg-[#8D4F98]',
    tagColor: 'bg-[#631571]',
    avatar: elvanImg,
    cardAvatar: elvanCardImg,
    bio: 'Je me suis occupé de toute la direction artistique du projet : création du logo, choix des couleurs et des typographies, ainsi que la conception des designs du site, notamment la page d’accueil et les éléments liés aux activités. J’ai travaillé à donner une identité visuelle cohérente et accessible pour que l’expérience soit claire pour tout le monde.',
  },
  {
    name: 'Killian',
    roleTag: 'Développeur web',
    hasPortfolio: true,
    portfolioUrl: 'https://jillian-973.github.io/Dev_Portfolio/',
    linkedinUrl: 'https://www.linkedin.com/in/killian-entertainment/',
    color: 'bg-[#51329C]',
    tagColor: 'bg-[#2A1167]',
    avatar: killianImg,
    cardAvatar: killianCardImg,
    bio: "Je suis développeur web freelance et j'ai été stagiaire pour ce projet, chargé de la conception et du développement d’une plateforme web sur laquelle les utilisateurs réalisent leurs activités en ligne. J’interviens sur la création des fonctionnalités et l’intégration des différentes interfaces du site. Au cours de mon stage, j’ai participé à la mise en place et à l’évolution du site afin de garantir une navigation fluide, interactive et adaptée aux besoins des utilisateurs.",
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color: var(--color-retrogrid-black)">
    <header class="shrink-0">
      <Header />
    </header>

    <main class="flex-1 px-4 sm:px-8">
      <!-- Cartes personnages : occupe tout l'écran, le reste se découvre au scroll -->
      <section
        class="min-h-screen flex flex-col items-center justify-center gap-10 sm:gap-16 py-10"
      >
        <h1 class="text-3xl sm:text-5xl font-bold text-white text-center">L'équipe S-1</h1>

        <div class="flex flex-wrap justify-center items-center gap-8 sm:gap-10">
          <div
            v-for="member in members"
            :key="member.name"
            class="relative w-56 sm:w-64 md:w-72 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex flex-col items-center pt-6 pb-0 transition-transform duration-300 ease-out hover:scale-110 hover:z-10 hover:shadow-2xl"
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
      </section>

      <!-- Présentations -->
      <div class="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16 py-10 sm:py-16">
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
