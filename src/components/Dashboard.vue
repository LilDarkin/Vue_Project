<script setup>
import WelcomeItem from './DashboardItem.vue'
import SportIcon from './icons/IconSport.vue'
import AchievementIcon from './icons/IconAchievement.vue'
import PersonIcon from './icons/IconPerson.vue'
import SupportIcon from './icons/IconSupport.vue'
import IconDocumentation from './icons/IconDocumentation.vue'
</script>
    
<template>
  <v-container>
    <v-row justify="center">
      <v-card width="50%">
        <v-img height="200"
          src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t1.6435-9/67549929_2946717845400107_2900852531267633152_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_eui2=AeGQzS5VRne2yD16R71GoVrE27Gixnh56y7bsaLGeHnrLoyAEPX6wdHkkssmHQ5bbGoIyxpgwsk5xuTskqR2Vuu6&_nc_ohc=uyzuUCymMJ4AX_IND5L&_nc_ht=scontent.fmnl9-2.fna&oh=00_AT_O6R6hg8b5hSHigs0cgqrxdy0LdPOnDJTlVnyd48Hcug&oe=6342A565"
          cover class="text-white">
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-1 mb-2">
            About Me
          </div>

          <v-timeline density="compact" truncate-line="none">
            <v-timeline-item v-for="content in contents" :dot-color="content.color"
              :icon="content.icon" size="large">
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ content.title }}</strong>
                </div>
                <div>{{ content.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    contents: [
      {
        title: 'Introduction',
        message: `Hi, I am James Bonnel Reyes currently studying at Technological Institute of the Philippines, Manila, taking up
    Bachelor of Science in Information Technology (BSIT).`,
        color: 'deep-purple lighten-1',
        icon: 'mdi-information',
      },
      {
        title: 'Sport',
        message: "My only sport is Badminton but I don't play it much because of School Works and other things.",
        color: 'deep-purple lighten-1',
        icon: 'mdi-badminton'
      },
      {
        title: 'Programming Skill',
        message: 'My programming skill is more on Mobile Development and Database.',
        color: 'green',
        icon: 'mdi-debug-step-over',
      },
      {
        title: 'Likes',
        message: 'I like playing games and when I am bored I do programming to learn and improve my skills like logic, etc.',
        color: 'deep-purple lighten-1',
        icon: 'mdi-thumb-up'
      },
      {
        title: 'Achievement',
        message: "Participated in the HooHacks Hackaton 2021 competition, which was organized by the University of Virginia (UVA),USA, and won second place with my team in the Accessibility and Empowerment Track Prize Category.HooHacks is a team of UVA students who run HooHacks, Virginia's biggest hackathon and one of the 50 biggest collegiate hackathons in the US.",
        color: 'deep-purple lighten-1',
        icon: 'mdi-trophy'
      },
    ],
  }),
}
</script>