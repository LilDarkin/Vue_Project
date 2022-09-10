<template>
    <v-card class="mx-auto my-12 pa-3" max-width="70%" elevation="8" prepend-icon="mdi-axe" shaped>

        <template v-slot:title>
            Quiz
        </template>

        <v-divider class="mx-4"></v-divider>

        <h2>Category</h2>
        <div class="d-flex justify-start">
            <v-chip-group v-model="category">
                <v-chip :disabled="!start" filter>Science: Computers</v-chip>

                <v-chip :disabled="!start" filter>Entertainment: Board Games</v-chip>

                <v-chip :disabled="!start" filter>Entertainment: Video Games</v-chip>
            </v-chip-group>
        </div>

        <h2>Difficulty</h2>
        <div class="d-flex justify-start">
            <v-chip-group v-model="difficulty">
                <v-chip :disabled="!start" filter>Easy</v-chip>

                <v-chip :disabled="!start" filter>Medium</v-chip>

                <v-chip :disabled="!start" filter>Hard</v-chip>
            </v-chip-group>
        </div>
        <div class="d-flex justify-space-around">
            <v-btn :disabled="!start" rounded="pill" @click="load(0)" class="mt-5" style="background-color:green"
                :loading="loadingbtn[0]">
                Start Quiz
            </v-btn>
            <v-btn rounded="pill" :prepend-icon="playingSound ? 'mdi-music' : 'mdi-music-off'"
                @click="load(1);playSound()" class="mt-5" style="background-color:blueviolet" :loading="loadingbtn[1]">
                Music
            </v-btn>
        </div>

        <v-divider class="mt-4"></v-divider>

        <v-container>
            <v-row dense>
                <v-container>
                    <div v-show="!loading">

                        <v-row no-gutters justify="center" style="text-align:center">
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <h2>Score: <strong>{{ correctAnswers }}</strong></h2>
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <h2>Currently at question <br><strong>{{ index + 1 }} of {{ questions.length
                                    }}</strong></h2>
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <h2>Heart: <strong>{{ heart }}</strong></h2>
                                </v-sheet>
                            </v-col>
                        </v-row>

                    </div>
                </v-container>
                <v-divider class="mx-4"></v-divider>

                <h1 v-html="loading ? 'Start to begin' : currentQuestion.question"
                    style="width:100%; text-align: center;"></h1>
                <!-- Only first question is displayed -->
                <v-divider class="mx-4"></v-divider>

                <form id="formBtn" v-if="currentQuestion">
                    <div class="btn-group-vertical" role="group" aria-label="First group">
                        <button v-for="answer in currentQuestion.answers" :index="currentQuestion.key" :key="answer"
                            v-html="answer" @click.prevent="handleClick" type="button"
                            class="btn btn-secondary"></button>
                    </div>
                </form>
            </v-row>
        </v-container>
    </v-card>
</template>
  
<script>
import axios from 'axios';
import sound from '../assets/sounds/music.mp3'
const audio = new Audio(sound)
audio.volume = 0.5
audio.loop = true
export default {
    data() {
        return {
            playingSound: false,
            heart: 5,
            start: true,
            category: 0,
            difficulty: 0,
            loadingbtn: [],
            questions: [],
            loading: true,
            index: 0,
            value: 50,
        };
    },
    computed: {
        currentQuestion() {
            if (this.questions !== []) {
                return this.questions[this.index];
            }
            return null;
        },
        correctAnswers() {
            if (this.questions && this.questions.length > 0) {
                let streakCounter = 0;
                this.questions.forEach(function (question) {
                    if (!question.rightAnswer) {
                        return;
                    } else if (question.rightAnswer === true) {
                        streakCounter++;
                    }
                });
                return streakCounter;
            } else {
                return "--";
            }
        },
        pluralizeAnswer() {
            // For grammatical correctness
            return this.correctAnswers === 1 ? "Answer" : "Answers";
        },
        quizCompleted() {
            if (this.questions.length === 0) {
                return false;
            }
            /* Check if all questions have been answered */
            let questionsAnswered = 0;
            this.questions.forEach(function (question) {
                question.rightAnswer !== null ? questionsAnswered++ : null;
            });
            return questionsAnswered === this.questions.length;
        },
        outOfHeart() {
            if (this.heart == 0) {
                return true;
            }
            /* Check if all questions have been answered */
            let questionsAnswered = 0;
            this.questions.forEach(function (question) {
                question.rightAnswer !== null ? questionsAnswered++ : null;
            });
            return questionsAnswered === this.questions.length;
        },
        score() {
            if (this.questions !== []) {
                return {
                    allQuestions: this.questions.length,
                    answeredQuestions: this.questions.reduce((count, currentQuestion) => {
                        if (currentQuestion.userAnswer) {
                            // userAnswer is set when user has answered a question, no matter if right or wrong
                            count++;
                        }
                        return count;
                    }, 0),
                    correctlyAnsweredQuestions: this.questions.reduce(
                        (count, currentQuestion) => {
                            if (currentQuestion.rightAnswer) {
                                // rightAnswer is true, if user answered correctly
                                count++;
                            }
                            return count;
                        },
                        0
                    ),
                };
            } else {
                return {
                    allQuestions: 0,
                    answeredQuestions: 0,
                    correctlyAnsweredQuestions: 0,
                };
            }
        },
    },
    watch: {
        quizCompleted(completed) {
            completed &&
                setTimeout(() => {
                    this.$emit("quiz-completed", this.score);
                }, 3000);
        },
        outOfHeart(completed) {
            completed && setTimeout(() => {
                this.$emit("quiz-completed", this.score);
            }, 3000);
        },
    },
    methods: {
        playSound() {
            if (this.playingSound) {
                audio.pause();
                audio.currentTime = 0
            } else {
                audio.currentTime = 9
                audio.play();
            }
        },
        load(i) {
            this.loadingbtn[i] = true
            if (i == 1) {
                setTimeout(() => (this.loadingbtn[i] = false, this.playingSound = !this.playingSound), 1000)
            } else {
                setTimeout(() => (this.loadingbtn[i] = false, this.fetchQuestions(this.category, this.difficulty), this.start = false), 3000)
            }
        },
        async fetchQuestions(category, difficulty) {
            this.loading = true;

            //fetching questions from api
            let index = 0; //To identify single answer
            if (category == 0) { // Science: Computers
                if (difficulty == 0) { // Easy

                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;

                } else if (difficulty == 1) { // Medium
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                } else if (difficulty == 2) { // Hard
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                }
            } else if (category == 1) { // Entertainment: Board Games
                if (difficulty == 0) { // Easy
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=16&difficulty=easy&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                } else if (difficulty == 1) { // Medium
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=16&difficulty=medium&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                } else if (difficulty == 2) { // Hard
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=16&difficulty=hard&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                }
            } else if (category == 2) { // Entertainment: Video Games
                if (difficulty == 0) { // Easy
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                } else if (difficulty == 1) { // Medium
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                } else if (difficulty == 2) { // Hard
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;
                }
            }
        },
        handleClick(e) {
            let index = e.target.getAttribute("index");
            let pollutedUserAnswer = e.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
            /* Clear from pollution with ' */
            let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");
            //set answer
            this.questions[index].userAnswer = userAnswer;
            /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
            e.target.classList.add("clicked");
            let allButtons = document.querySelectorAll(`[index="${index}"]`);
            for (let i = 0; i < allButtons.length; i++) {
                if (allButtons[i] === e.target) continue;
                allButtons[i].setAttribute("disabled", "");
            }
            this.checkCorrectAnswer(e, index);
        },
        checkCorrectAnswer(e, index) {
            let question = this.questions[index];
            if (question.userAnswer) {
                if (this.index < this.questions.length - 1) {
                    setTimeout(
                        function () {
                            this.index += 1;
                        }.bind(this),
                        3000
                    );
                }
                if (question.userAnswer === question.correct_answer) {
                    /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
                    e.target.classList.add("rightAnswer");
                    /* Set rightAnswer on question to true, computed property can track a streak out of 20 questions */
                    this.questions[index].rightAnswer = true;
                } else {
                    /* Mark users answer as wrong answer */
                    this.heart--
                    e.target.classList.add("wrongAnswer");
                    this.questions[index].rightAnswer = false;
                    /* Show right Answer */
                    let correctAnswer = this.questions[index].correct_answer;
                    let allButtons = document.querySelectorAll(`[index="${index}"]`);
                    allButtons.forEach(function (button) {
                        if (button.innerHTML === correctAnswer) {
                            button.classList.add("showRightAnswer");
                        }
                    });
                }
            }
        },
    },
};
</script>
  
<style scoped>
.container {
    margin: 1rem auto;
    padding: 1rem;
    width: 100%;
}

#formBtn button {
    font-size: 1.1rem;
    box-sizing: border-box;
    padding: 1rem;
    margin: 0.5rem;
    gap: 1rem;
    background-color: rgba(100, 100, 100, 0.3);
    border: none;
    border-radius: 0.4rem;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
}

#formBtn button:hover:enabled {
    transform: scale(1.02);
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

#formBtn button:focus {
    outline: none;
}

#formBtn button:active:enabled {
    transform: scale(1.05);
}

@keyframes flashButton {
    0% {
        opacity: 1;
        transform: scale(1.01);
    }

    50% {
        opacity: 0.7;
        transform: scale(1.02);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

#formBtn button.clicked {
    pointer-events: none;
}

#formBtn button.rightAnswer {
    animation: flashButton;
    animation-duration: 700ms;
    animation-delay: 200ms;
    animation-iteration-count: 3;
    animation-timing-function: ease-in-out;
    color: black;
    background: linear-gradient(210deg,
            rgba(0, 178, 72, 0.25),
            rgba(0, 178, 72, 0.5));
}

#formBtn button.wrongAnswer {
    color: black;
    background: linear-gradient(210deg,
            rgba(245, 0, 87, 0.25),
            rgba(245, 0, 87, 0.5));
}

#formBtn button.showRightAnswer {
    animation: flashButton;
    animation-duration: 700ms;
    animation-delay: 200ms;
    animation-iteration-count: 2;
    animation-timing-function: ease-in-out;
    color: black;
    background: linear-gradient(210deg,
            rgba(0, 178, 72, 0.25),
            rgba(0, 178, 72, 0.5));
}

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