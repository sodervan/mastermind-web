import { createMemoryHistory, createRouter } from "vue-router";

import HomePage from "@/components/HomePage.vue";
import GameScreen from "@/components/gameScreen/GameScreen.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/game-screen", component: GameScreen },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
