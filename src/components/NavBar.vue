<style>
@keyframes toolRGB {
  0% {
    background: linear-gradient(45deg, rgba(255, 0, 0, .1));
  }

  5% {
    background: linear-gradient(45deg, rgba(255, 0, 0, .1), rgba(255, 0, 0, .2));
  }

  10% {
    background: linear-gradient(45deg, rgba(255, 0, 0, .1), rgba(255, 0, 0, .2), rgba(255, 0, 0, .3));
  }

  15% {
    background: linear-gradient(45deg, rgba(255, 0, 0, .1), rgba(255, 0, 0, .2), rgba(255, 0, 0, .3), rgba(255, 0, 0, .4));
  }

  20% {
    background: linear-gradient(45deg, rgba(255, 0, 0, .1), rgba(255, 0, 0, .2), rgba(255, 0, 0, .3), rgba(255, 0, 0, .4), rgba(255, 0, 0, .5));
  }

  25% {
    background: linear-gradient(45deg, rgba(255, 0, 0, .1), rgba(255, 0, 0, .2), rgba(255, 0, 0, .3), rgba(255, 0, 0, .4), rgba(255, 0, 0, .5), rgba(255, 0, 0, .8));
  }

  30% {
    background: linear-gradient(45deg, rgba(255, 0, 0, .1), rgba(255, 0, 0, .2), rgba(255, 0, 0, .3), rgba(255, 0, 0, .4), rgba(255, 0, 0, .5), rgba(255, 0, 0, .8), rgba(255, 0, 0, 1));
  }

  35% {
    background: linear-gradient(45deg, rgba(0, 0, 255, .1));
  }

  40% {
    background: linear-gradient(45deg, rgba(0, 0, 255, .1), rgba(0, 0, 255, .2));
  }

  45% {
    background: linear-gradient(45deg, rgba(0, 0, 255, .1), rgba(0, 0, 255, .2), rgba(0, 0, 255, .3));
  }

  50% {
    background: linear-gradient(45deg, rgba(0, 0, 255, .1), rgba(0, 0, 255, .2), rgba(0, 0, 255, .3), rgba(0, 0, 255, .4));
  }

  55% {
    background: linear-gradient(45deg, rgba(0, 0, 255, .1), rgba(0, 0, 255, .2), rgba(0, 0, 255, .3), rgba(0, 0, 255, .4), rgba(0, 0, 255, .5));
  }

  60% {
    background: linear-gradient(45deg, rgba(0, 0, 255, .1), rgba(0, 0, 255, .2), rgba(0, 0, 255, .3), rgba(0, 0, 255, .4), rgba(0, 0, 255, .5), rgba(0, 0, 255, .7));
  }

  65% {
    background: linear-gradient(45deg, rgba(0, 0, 255, .1), rgba(0, 0, 255, .2), rgba(0, 0, 255, .3), rgba(0, 0, 255, .4), rgba(0, 0, 255, .5), rgba(0, 0, 255, .7), rgba(0, 0, 255, 1));
  }

  70% {
    background: linear-gradient(45deg, rgba(0, 128, 0, .1));
  }

  75% {
    background: linear-gradient(45deg, rgba(0, 128, 0, .1), rgba(0, 128, 0, .2));
  }

  80% {
    background: linear-gradient(45deg, rgba(0, 128, 0, .1), rgba(0, 128, 0, .2), rgba(0, 128, 0, .3));
  }

  85% {
    background: linear-gradient(45deg, rgba(0, 128, 0, .1), rgba(0, 128, 0, .2), rgba(0, 128, 0, .3), rgba(0, 128, 0, .4));
  }

  90% {
    background: linear-gradient(45deg, rgba(0, 128, 0, .1), rgba(0, 128, 0, .2), rgba(0, 128, 0, .3), rgba(0, 128, 0, .4), rgba(0, 128, 0, .5));
  }

  95% {
    background: linear-gradient(45deg, rgba(0, 128, 0, .1), rgba(0, 128, 0, .2), rgba(0, 128, 0, .3), rgba(0, 128, 0, .4), rgba(0, 128, 0, .5), rgba(0, 128, 0, .8));
  }

  100% {
    background: linear-gradient(45deg, rgba(0, 128, 0, .1), rgba(0, 128, 0, .2), rgba(0, 128, 0, .3), rgba(0, 128, 0, .4), rgba(0, 128, 0, .5), rgba(0, 128, 0, .8), rgba(0, 128, 0, 1));
  }
}

.toolbarRGB {
  animation: toolRGB 1.5s infinite;
}
</style>

<template>


  <v-toolbar class="toolbarRGB" app>
    <v-toolbar-title>Rawr ??????</v-toolbar-title>
    <v-spacer></v-spacer>

    <div v-if="user.loggedIn">
      <v-btn color="white" class="font-weight-bold" @click.prevent="signOut" href="/" prepend-icon="mdi-logout-variant">
        Logout
      </v-btn>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" router :to="item.path" :prepend-icon="item.icon">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else>
      <v-btn color="white" class="font-weight-bold" router :to="loginUrl" prepend-icon="mdi-login-variant">
        Login
      </v-btn>
      <v-btn color="white" class="font-weight-bold" router :to="registerUrl" prepend-icon="mdi-account-plus-outline">
        Register
      </v-btn>
    </div>
  </v-toolbar>
  <div v-if="user.loggedIn">
    <v-navigation-drawer style="color:aqua" expand-on-hover rail="true">
      <v-parallax src="https://wallpapers.com/images/file/dark-blue-aesthetic-glowing-triangles-e63gsnm9zakquywb.jpg"
        class="fill-height">
        <v-list>
          <v-list-item :prepend-avatar="getImgUrl(user.data.userId)" :title="user.data.displayName"
            :subtitle="user.data.email"><span style="font-size: xx-small;">version:4.0</span></v-list-item>
          <v-list-item prepend-icon="mdi-logout-variant" subtitle="Logout" @click.prevent="signOut" href="/">

          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list density="compact" app>
          <v-list-item v-for="item in items" :key="item.title" router :to="item.path" :prepend-icon="item.icon"
            :color="item.color">
            <v-list-item-title :color="item.color">{{ item.title }}</v-list-item-title>

          </v-list-item>
        </v-list>

      </v-parallax>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../firebase'
import { database } from "../firebase";
import { ref } from 'vue'

export default {
  data() {
    return {
      drawer: false,
      loginUrl: '/login',
      registerUrl: '/register',
      items: [
        { title: 'Home', icon: 'mdi-home-account', path: '/', color: "warning" },
        { title: 'Math', icon: 'mdi-calculator-variant', path: '/basicMath', color: "warning" },
        { title: 'String App', icon: 'mdi-message-processing', path: '/stringApp', color: "warning" },
        { title: 'Vuetify', icon: 'mdi-vuetify', path: '/vuetify', color: 'warning' },
        { title: 'Quiz', icon: 'mdi-book-open', path: '/quiz', color: 'warning' },
        { title: 'Quiz History', icon: 'mdi-web', path: '/quizHistory', color: 'warning' },
        { title: 'Developer', icon: 'mdi-account-multiple', path: '/bonnel', color: 'warning' },
        { title: 'Website', icon: 'mdi-web', path: '/about', color: 'warning' },
      ],
      rail: false,
    }
  },
  methods: {
    getImgUrl(z) {
      const dbRef = database.ref("Users");
      var ZZZ = "https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp";
      if (z != null) {
        dbRef.child(z).child("User Information").on('value', (snapshot) => {
          snapshot.forEach((list) => {
            let key = list.key
            let data = list.val()
            if (key == "profilePath") {
              ZZZ = data
            }
          })
        })
        console.log(ZZZ)
      }

      return ZZZ
    }
  },
  setup() {

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
    return { user, signOut }
  }
};
</script>