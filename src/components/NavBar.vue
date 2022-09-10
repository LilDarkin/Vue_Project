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
  <nav>
    <v-toolbar class="toolbarRGB" app>
      <v-toolbar-title>Welcome ❣️</v-toolbar-title>
      <v-spacer></v-spacer>
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
    </v-toolbar>

    <v-navigation-drawer style="color:aqua" expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/285904537_7617205418351303_7735473882644039146_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHIPWzc2HNBuCxZ_399GXGH6z0lwVrMu6jrPSXBWsy7qOOsr-UohG1aT3CRSwR8RgrBD_momtxa5k7KNDeMuZUX&_nc_ohc=9NWPJI7Hv10AX-ZN3cR&tn=Ov07vvXkhUqrdXVp&_nc_ht=scontent.fmnl9-2.fna&oh=00_AT_Th6xyVZi6u5NkwkFXpaKRbcBiNFRaQ62J-AXon6nA5w&oe=631B0CD9"
          title="Bon Nel" subtitle="Sheesh"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" app>
        <v-list-item v-for="item in items" :key="item.title" router :to="item.path" :prepend-icon="item.icon"
          :color="item.color">
          <v-list-item-title :color="item.color">{{ item.title }}</v-list-item-title>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const items = ref([
  { title: 'Home', icon: 'mdi-home-account', path: '/', color: "warning" },
  { title: 'Math', icon: 'mdi-calculator-variant', path: '/basicMath', color: "warning" },
  { title: 'String App', icon: 'mdi-message-processing', path: '/stringApp', color: "warning" },
  { title: 'Quiz', icon: 'mdi-book-open', path: '/quiz', color: 'warning' },
])

</script>