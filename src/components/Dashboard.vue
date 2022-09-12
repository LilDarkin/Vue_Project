<script setup>
import Image from '../assets/images/about.jpg'
import hWebsite from '../assets/images/h_website.png'
import hMath from '../assets/images/h_math.png'
import hString from '../assets/images/h_string.png'
import hProfile from '../assets/images/h_profile.png'
import hQuiz from '../assets/images/h_quiz.png'
import hVuetify from '../assets/images/h_vuetify.png'
</script>
    
<template>
  <v-parallax :src="Image">
    <h1 class="pa-4 text-center font-weight-bold">WELCOME</h1>
    <v-divider></v-divider>

    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in items" :key="i">
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props"
                :to="item.path">
                <v-img :src="item.img" height="225px" cover>
                  <v-card-title class="text-h6 d-flex justify-center align-center h-100">
                    <p class="mt-4">
                      {{ item.title }}
                    </p>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>

    <v-divider></v-divider>
    <h2 class="pa-4 text-center">Click the links above to explore the website.</h2>
  </v-parallax>

</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'Basic Math',
        img: hMath,
        path: '/basicMath',
      },
      {
        title: 'String Manipulator',
        img: hString,
        path: '/stringApp',

      },
      {
        title: 'About Vuetify',
        img: hVuetify,
        path: '/vuetify',

      },
      {
        title: 'Quiz',
        img: hQuiz,
        path: '/quiz',

      },
      {
        title: 'About the Developer',
        img: hProfile,
        path: '/bonnel',

      },
      {
        title: 'About the Website',
        img: hWebsite,
        path: '/about',

      },
    ],
    transparent: 'rgba(255, 255, 255, 0)',
  }),
}
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  z-index: 1;
  opacity: 0.6;
}

.v-card:is(.on-hover) {
  z-index: 2;
  transform: scale(1.2);
  opacity: 1;
}
</style>