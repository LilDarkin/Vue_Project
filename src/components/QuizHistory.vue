<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Quiz History</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(history, index) in List"
                    :key="index" @click="setActiveHistory(history, index)">
                    {{ history.timeTaken }}
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentHistory">
                <QuizDetails :history="currentHistory" @refreshList="refreshList" />
            </div>
        </div>
    </div>
</template>
  
<script>

import DataService from "../services/DataService";
import QuizDetails from "./QuizDetails.vue";
import { database } from "../firebase";

export default {
    name: "tutorials-list",
    components: { QuizDetails: QuizDetails },
    data() {
        return {
            admin: false,
            List: [],
            currentHistory: null,
            currentIndex: -1
        };
    },
    methods: {
        onDataChange(items) {
            let _history = [];

            if (this.admin) {
                items.forEach((item) => {
                    let userID = item.key;
                    const dbRef = database.ref("Users/" + userID + "/History");
                    dbRef.on('value', (snapshot) => {
                        snapshot.forEach((list) => {
                            let key = list.key
                            let data = list.val()
                            _history.push({
                                userID: userID,
                                key: key,
                                averageScore: data.averageScore,
                                timeTaken: data.timeTaken,
                                timeFinished: data.timeFinished,
                            });
                        })
                    })
                });
                this.List = _history;
            } else {

                items.forEach((item) => {
                    let key = item.key;
                    let data = item.val();
                    _history.push({
                        userID: "0",
                        key: key,
                        averageScore: data.averageScore,
                        timeTaken: data.timeTaken,
                        timeFinished: data.timeFinished,
                    });
                });
                this.List = _history;
            }
        },
        refreshList() {
            this.currentHistory = null;
            this.currentIndex = -1;
        },
        setActiveHistory(history, index) {
            this.currentHistory = history;
            this.currentIndex = index;
        },
    },
    mounted() {
        this.admin = DataService.isAdmin();
        DataService.getAll().on("value", this.onDataChange);
    },
    beforeUnmount() {
        DataService.getAll().off("value", this.onDataChange);
    }
};
</script>
  
<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>