import { createRouter, createWebHistory } from "vue-router";
import BasicMathView from "../views/BasicMathView.vue";
import StringAppView from "../views/StringAppView.vue";
import AxiosViews from "../views/AxiosViews.vue";
import HomeView from "../views/DashboardView.vue";
import QuizView from "../views/QuizView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/stringApp",
      name: "StringAppView",
      component: StringAppView,
    },
    {
      path: "/basicMath",
      name: "basicMath",
      component: BasicMathView,
    },
    {
      path: "/axios",
      name: "axios",
      component: AxiosViews,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizView,
    },
  ],
});

export default router;
