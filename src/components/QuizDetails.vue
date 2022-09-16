<template>
    <div v-if="user.loggedIn">
        <div v-if="currentTutorial" class="edit-form">
            <h4>History</h4>
            <form>
                <div v-show="admin">
                    <div class="form-group">
                        <label for="userID">Owner (User ID)</label>
                        <input disabled type="text" class="form-control" id="userID" v-model="currentTutorial.userID" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="avgSc">Average Score</label>
                    <input :disabled="!admin" type="text" class="form-control" id="avgSc"
                        v-model="currentTutorial.averageScore" />
                </div>

                <div class="form-group">
                    <label for="dtTaken">Date & Time: Taken</label>
                    <input disabled type="text" class="form-control" id="dtTaken" v-model="currentTutorial.timeTaken" />
                </div>

                <div class="form-group">
                    <label for="dtFinish">Date & Time: Finished</label>
                    <input disabled type="text" class="form-control" id="dtFinish"
                        v-model="currentTutorial.timeTaken" />
                </div>
            </form>
            <div v-show="admin">
                <button class="badge badge-danger mr-2" @click="deleteTutorial">
                    Delete
                </button>

                <button type="submit" class="badge badge-success" @click="updateTutorial">
                    Update
                </button>
                <p>{{ message }}</p>
            </div>

        </div>
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
</template>
  
<script>
import DataService from "../services/DataService";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../firebase'

export default {
    props: ["history"],
    data() {
        return {
            admin: false,
            currentTutorial: null,
            message: "",
        };
    },
    watch: {
        history: function (history) {
            this.currentTutorial = { ...history };
            this.message = "";
        },
    },
    methods: {
        updateTutorial() {
            const data = {
                averageScore: this.currentTutorial.averageScore,
                timeTaken: this.currentTutorial.timeTaken,
                timeFinished: this.currentTutorial.timeFinished,
            };
            if (this.admin) {
                DataService.update(this.currentTutorial.userID, this.currentTutorial.key, data)
                    .then(() => {
                        this.message = "The tutorial was updated successfully!";
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                DataService.update("0", this.currentTutorial.key, data)
                    .then(() => {
                        this.message = "The tutorial was updated successfully!";
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }

        },
        deleteTutorial() {
            DataService.delete(this.currentTutorial.key)
                .then(() => {
                    this.$emit("refreshList");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.admin = DataService.isAdmin();
        this.message = "";
        this.currentTutorial = { ...this.history }
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
  
<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>