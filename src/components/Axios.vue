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
    <v-card class="mx-auto my-12 pa-3" max-width="50%" elevation="8" prepend-icon="mdi-axe" shaped>

        <template v-slot:title>
            Axios Demo
        </template>

        <v-divider class="mx-4"></v-divider>
        <h2>Category</h2>
        <div class="d-flex justify-start">
            <v-chip-group v-model="category">
                <v-chip filter>Science: Computers</v-chip>

                <v-chip filter>Entertainment: Board Games</v-chip>

                <v-chip filter>Entertainment: Video Games</v-chip>
            </v-chip-group>
        </div>

        <v-divider class="mx-4"></v-divider>
        <h2>Difficulty</h2>
        <div class="d-flex justify-start">
            <v-chip-group v-model="difficulty">
                <v-chip filter>Easy</v-chip>

                <v-chip filter>Medium</v-chip>

                <v-chip filter>Hard</v-chip>
            </v-chip-group>
        </div>
        <v-divider class="mx-4"></v-divider>

        <div class="d-flex justify-space-between">
            <v-card-actions>
                <v-btn :disabled="!start" variant="outlined" @click="load(0); start = false" :loading="loading[0]">
                    Start Quiz
                </v-btn>

            </v-card-actions>
        </div>
        <v-divider class="mx-4"></v-divider>

        <v-container>
            <v-row dense>
                <form>
                    <v-list-item v-for="z, question in questions" :key="question.id">
                        <v-col cols="12">
                            <v-card class="mx-auto" color="gray" theme="dark" width="800">
                                <v-card-text>

                                    <v-card-text class="text-h5 animQuestion">
                                        {{ unescapeHtml(z.question) }}
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-radio-group column>
                                        <v-radio :label="z.correct_answer" :value="z.correct_answer"></v-radio>
                                        <v-radio :label="z.incorrect_answers[0]" :value="z.incorrect_answers[0]"></v-radio>
                                        <v-radio :label="z.incorrect_answers[1]" :value="z.incorrect_answers[1]"></v-radio>
                                        <v-radio :label="z.incorrect_answers[2]" :value="z.incorrect_answers[2]"></v-radio>
                                    </v-radio-group>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-list-item>

                    <v-card-actions>
                        <div v-show="!start">
                            <v-btn color="success" variant="outlined" @click="load(1)" :loading="loading[1]">Submit Quiz
                            </v-btn>
                        </div>
                    </v-card-actions>
                </form>
            </v-row>
        </v-container>
    </v-card>

</template>

<script setup>


function unescapeHtml(str) {
    return str
        .replace(/&#039;/g, "&")
        .replace(/&quot;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "\"")
        .replace(/&amp;/g, "'");
}
</script>

<script>
import { ref } from 'vue';
import axios from 'axios';
const questions = ref([])

function getQuestions(category, difficulty) {
    if (category == 0) { // Science: Computers
        if (difficulty == 0) { // Easy
            axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        } else if (difficulty == 1) { // Medium
            axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        } else if (difficulty == 2) { // Hard
            axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        }
    } else if (category == 1) { // Entertainment: Board Games
        if (difficulty == 0) { // Easy
            axios.get('https://opentdb.com/api.php?amount=10&category=16&difficulty=easy&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        } else if (difficulty == 1) { // Medium
            axios.get('https://opentdb.com/api.php?amount=10&category=16&difficulty=medium&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        } else if (difficulty == 2) { // Hard
            axios.get('https://opentdb.com/api.php?amount=10&category=16&difficulty=hard&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        }
    } else if (category == 2) { // Entertainment: Video Games
        if (difficulty == 0) { // Easy
            axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        } else if (difficulty == 1) { // Medium
            axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        } else if (difficulty == 2) { // Hard
            axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple').then(response => {
                questions.value = (response.data.results)
            })
        }
    }
}

export default {
    data: () => ({
        start: true,
        category: 0,
        difficulty: 0,
        loading: [],
    }),
    methods: {
        load(i) {
            this.loading[i] = true
            if (i == 1) {
                setTimeout(() => (this.loading[i] = false), 1000)
            } else {
                setTimeout(() => (this.loading[i] = false, getQuestions(this.category, this.difficulty)), 1)
            }
        },
    },
}

</script>