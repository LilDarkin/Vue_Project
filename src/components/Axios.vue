<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <v-card class="mx-auto my-12 pa-3 cardRGB" max-width="50%" elevation="8" prepend-icon="mdi-axe" shaped>

        <template v-slot:title>
            Axios Demo
        </template>


        <div class="d-flex justify-space-between">
            <v-card-actions>
                <v-btn v-show="!hideMe" variant="outlined" @click="getQuestions(); showBtn = true; hideMe = true">Get
                    Questions</v-btn>
                <v-btn v-show="hideMe" :loading="loading[2]" :disabled="loading[2]" variant="outlined"
                    prepend-icon="mdi-refresh-circle" @click="load(2); getQuestions(); showMe()">
                    Refresh Questions
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="showBtn">
                    <v-btn color="success" @click="load(1)" :loading="loading[1]"
                        :disabled="loading[1]">{{textQ}}</v-btn>
                </div>
                <v-divider class="mx-4"></v-divider>
            </v-expand-transition>
        </div>
        <v-divider class="mx-4"></v-divider>


        <v-container>
            <v-row dense>
                <v-list-item v-for="question in questions" :key="question.id">
                    <v-col cols="12">
                        <v-card class="mx-auto" color="gray" theme="dark" width="800">
                            <v-card-text>

                                <v-card-text class="text-h5 animQuestion">
                                    {{ unescapeHtml(question.question) }}
                                </v-card-text>

                                <v-divider></v-divider>
                                <v-expand-transition>
                                    <div v-show="showTxt">
                                        <v-list-item>
                                            <p class="animText">{{ unescapeHtml(question.correct_answer) }}</p>
                                        </v-list-item>
                                    </div>
                                </v-expand-transition>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-list-item>
            </v-row>
        </v-container>
    </v-card>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import gsap from 'gsap'

const questions = ref([])

async function getQuestions() {
    axios.get('https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple').then(response => {
        questions.value = (response.data.results)
    })
}

function unescapeHtml(str) {

    //Slide Tween (Answer)
    var p = gsap.from(".animText", {
        x: -80,
        duration: 1.5,
    });

    var pTargets = p.targets();
    var vars = p.vars;

    gsap.set(pTargets, {
        clearProps: "all"
    });

    gsap.to(pTargets, vars);

    return str
        .replace(/&#039;/g, "&")
        .replace(/&quot;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "\"")
        .replace(/&amp;/g, "'");
}
</script>

<script>

export default {
    data: () => ({
        textQ: "Show Answers",
        hideMe: false,
        showBtn: false,
        showTxt: false,
        loading: [],
    }),
    methods: {
        load(i) {
            this.loading[i] = true
            if (i == 1) {
                setTimeout(() => (this.loading[i] = false, this.showTxt = !this.showTxt,this.textQ = this.showTxt ? 'Hide Answers' : 'Show Answers'), 1000)
            } else {
                setTimeout(() => (this.loading[i] = false), 3000)
            }

        },
    },
}

</script>