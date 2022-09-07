<script setup>
import WelcomeItem from './DashboardItem.vue'
import SportIcon from './icons/IconSport.vue'
import AchievementIcon from './icons/IconAchievement.vue'
import PersonIcon from './icons/IconPerson.vue'
import SupportIcon from './icons/IconSupport.vue'
import IconDocumentation from './icons/IconDocumentation.vue'
</script>
    
<template>
  <WelcomeItem>
    <template #icon>
      <PersonIcon />
    </template>
    <template #heading>Introduction</template>

    Hi, I am James Bonnel Reyes currently studying at Technological Institute of the Philippines, Manila, taking up
    Bachelor of Science in Information Technology (BSIT).
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SportIcon />
    </template>
    <template #heading>Sport</template>
    My only sport is Badminton but I don't play it much because of School Works and other things.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AchievementIcon />
    </template>
    <template #heading>Achievement</template>

    Participated in the HooHacks Hackaton 2021 competition, which was organized by the University of Virginia (UVA),
    USA, and won second place with my team in the Accessibility and Empowerment Track Prize Category. HooHacks is a team
    of UVA students who run HooHacks, Virginia's biggest hackathon and one of the 50 biggest collegiate hackathons in
    the US.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconDocumentation />
    </template>
    <template #heading>Programming Skill</template>

    My programming skill is more on Mobile Development and Database.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Likes</template>

    I like playing games and when I am bored I do programming to learn and improve my skills like logic, etc.
  </WelcomeItem>
</template>
    