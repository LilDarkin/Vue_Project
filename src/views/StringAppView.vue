<script setup>
import Image from '../assets/images/string_bg.jpg'
</script>

<style >
@keyframes RGB {
     0% {
          background-color: rgba(0, 255, 255, .5)
     }

     5% {
          background-color: rgba(254, 255, 255, .5)
     }

     10% {
          background-color: rgba(0, 206, 209, .5)
     }

     15% {
          background-color: rgba(64, 224, 208, .5)
     }

     20% {
          background-color: rgba(72, 209, 204, .5)
     }

     25% {
          background-color: rgba(175, 238, 238, .5)
     }

     30% {
          background-color: rgba(127, 255, 212, .5)
     }

     35% {
          background-color: rgba(176, 224, 230, .5)
     }

     40% {
          background-color: rgba(95, 158, 160, .5)
     }

     45% {
          background-color: rgba(70, 130, 180, .5)
     }

     50% {
          background-color: rgba(100, 149, 237, .5)
     }

     55% {
          background-color: rgba(100, 149, 237, .5)
     }

     60% {
          background-color: rgba(70, 130, 180, .5)
     }

     65% {
          background-color: rgba(95, 158, 160, .5)
     }

     70% {
          background-color: rgba(176, 224, 230, .5)
     }

     75% {
          background-color: rgba(127, 255, 212, .5)
     }

     80% {
          background-color: rgba(175, 238, 238, .5)
     }

     85% {
          background-color: rgba(64, 224, 208, .5)
     }

     90% {
          background-color: rgba(0, 206, 209, .5)
     }

     95% {
          background-color: rgba(254, 255, 255, .5)
     }

     100% {
          background-color: rgba(0, 255, 255, .5)
     }

}

.cardRGB {
     animation-name: RGB;
     animation-duration: 25s;
     animation-iteration-count: infinite;
}

.animText {
     font-size: 15px;
     font-weight: bold;
     color: rgb(6, 208, 253);
}
</style>

   
<template>
     <v-parallax :src="Image">
          <v-card class="mx-auto my-12 pa-3 cardRGB" max-width="500" elevation="8" shaped>

               <v-card-title>String Manipulator</v-card-title>

               <div class="sy-4 text-subtitle">
                    <v-text-field label="Enter a String" v-model="text" @change="answer"></v-text-field>
               </div>

               <v-divider class="mx-4"></v-divider>

               <v-card-text>
                    <div class="my-4 text-subtitle-1">
                         Vowels: <p class="animText"> {{ vow }}</p>
                    </div>
                    <div class="my-4 text-subtitle-1">
                         Consonants: <p class="animText"> {{ conso }}</p>
                    </div>
                    <div class="my-4 text-subtitle-1">
                         Number of Characters: <p class="animText"> {{ count }}</p>
                    </div>
                    <div class="my-4 text-subtitle-1">
                         Vowels to *:<p class="animText"> {{ con }}</p>
                    </div>
               </v-card-text>

          </v-card>
     </v-parallax>


</template>

<script>
import gsap from 'gsap'

export default {
     el: '#app',
     data() {
          return {
               text: "",
               vow: 0,
               count: 0,
               conso: 0,
               con: "",
          }

     },
     computed: {
          answer: function () {

               //Slide Tween
               var p = gsap.from(".animText", {
                    x: -80,
               });

               var pTargets = p.targets();
               var vars = p.vars;

               gsap.set(pTargets, {
                    clearProps: "all"
               });

               gsap.to(pTargets, vars);

               //String Manipulation
               var vowelList = 'aeiouAEIOU';
               this.vow = 0;
               this.count = 0;
               this.conso = 0;

               if (this.text == "") {
                    this.con = "null";
               } else {
                    this.con = "";
               }

               var inputString = this.text
               var vowelPattern = /[aeiou]/gi
               var consoPattern = /[bcdfghjklmnpqrstvwxyz]/gi
               var countPattern = /["a-z"]/gi

               var vowLength = inputString.match(vowelPattern)
               var consoLength = inputString.match(consoPattern)
               var countLength = inputString.match(countPattern)

               //Count vowels
               if (vowLength != null) {
                    this.vow = this.text.match(/[aeiou]/gi).length
               }

               //Count Characters in the string
               if (countLength != null) {
                    this.count = this.text.match(/["a-zA-Z"]/gi).length
               }

               //Count consonants
               if (consoLength != null) {
                    this.conso = this.text.match(/[bcdfghjklmnpqrstvwxyz]/gi).length;
               }

               //Convert to *
               for (var x = 0; x < this.text.length; x++) {
                    if (vowelList.indexOf(this.text[x]) !== -1) {
                         this.con += "*";
                    } else {
                         this.con += this.text[x];
                    }
               }
          }
     },
}
</script>