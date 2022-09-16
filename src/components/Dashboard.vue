<template>
  <v-parallax :src="Image">
    <div v-if="user.loggedIn">
      <h1 class="pa-4 text-center font-weight-bold">WELCOME, {{ user.data.displayName }}</h1>
    </div>
    <div v-else>
      <v-card class="mx-auto mt-6 bg-info" max-width="25%" variant="outlined">
        <v-card-item color="white">
          <div>
            <div class="text-overline mb-1">
              YOU ARE NOT LOGGED IN!
            </div>
            <div class="text-caption mb-3">Please login if you already have an account, otherwise create one
              now.</div>
          </div>
        </v-card-item>
      </v-card>
    </div>
    <v-divider></v-divider>

    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in items" :key="i">
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card :disabled="!user.loggedIn" :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }"
                v-bind="props" :to="item.path">
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
    <div v-if="user.loggedIn">
      <h2 class="pa-4 text-center">To explore the website, use the links above</h2>
    </div>
    <div v-else>
      <div class="d-flex justify-center w-100">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </div>

    </div>



  </v-parallax>

</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../firebase'

//Images
import ImageSrc from '../assets/images/about.jpg'
import hWebsite from '../assets/images/h_website.png'
import hMath from '../assets/images/h_math.png'
import hString from '../assets/images/h_string.png'
import hProfile from '../assets/images/h_profile.png'
import hQuiz from '../assets/images/h_quiz.png'
import hVuetify from '../assets/images/h_vuetify.png'

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
  setup() {

    const Image = ImageSrc;
    const store = useStore()
    const router = useRouter()
    auth.onAuthStateChanged(user => {
      store.dispatch("fetchUser", user);
    });
    const user = computed(() => {
      return store.getters.user;
    });
    const signOut = async () => {
      await store.dispatch('logOut')
      router.push('/login')
    }
    return { user, signOut, Image }
  }
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