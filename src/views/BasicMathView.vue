<script setup>
import Image from '../assets/images/math_bg.jpg'
</script>

<template>
  <v-parallax :src="Image">
    <v-card class="mx-auto my-12 pa-3 cardRGB" max-width="500" elevation="8" shaped>

      <v-card-title>Basic Math</v-card-title>

      <div class="sy-4 text-subtitle">
        <v-text-field :model-value="fNumber" v-on:input="event => fNumber = event.target.value" @change="answer">
        </v-text-field>

      </div>
      <div class="sy-4 text-subtitle">
        <v-text-field :model-value="sNumber" v-on:input="event => sNumber = event.target.value" @change="answer">
        </v-text-field>
      </div>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <div class="my-4 text-subtitle-1">
          Sum: {{ sumT.toFixed(0) }}
        </div>
        <div class="my-4 text-subtitle-1">
          Difference: {{ diffT.toFixed(0) }}
        </div>
        <div class="my-4 text-subtitle-1">
          Product: {{ prodT.toFixed(0) }}
        </div>
        <div class="my-4 text-subtitle-1">
          Quotient: {{ quoT }}
        </div>
        <div class="my-4 text-subtitle-1">
          Average: {{ avgT.toFixed(0) }}
        </div>
      </v-card-text>
    </v-card>
  </v-parallax>


</template>

<script>
import gsap from 'gsap'

export default {
  data() {
    return {
      fNumber: 0,
      sNumber: 0,
      sum: 0,
      avg: 0,
      prod: 0,
      quo: 0,
      diff: 0,

      sumT: 0,
      avgT: 0,
      prodT: 0,
      quoT: 0,
      diffT: 0,
    }
  },
  computed: {
    answer: function () {
      this.sum = Number(this.fNumber) + Number(this.sNumber);
      this.avg = this.sum / 2;
      this.prod = this.fNumber * this.sNumber;
      this.quo = this.fNumber / this.sNumber;
      this.diff = this.fNumber - this.sNumber;
    }
  },
  watch: {
    sum(n) {
      gsap.to(this, { duration: 3, sumT: Number(n) || 0 })
    },
    avg(n) {
      gsap.to(this, { duration: 3, avgT: Number(n) || 0 })
    },
    prod(n) {
      gsap.to(this, { duration: 3, prodT: Number(n) || 0 })
    },
    quo(n) {
      gsap.to(this, { duration: 3, quoT: Number(n) || 0 })
    },
    diff(n) {
      gsap.to(this, { duration: 3, diffT: Number(n) || 0 })
    },
  }
}
</script>