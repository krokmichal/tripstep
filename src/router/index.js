import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Review from "../components/Review.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";
import Trip from "../components/Trip.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/review", component: Review },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/trip", component: Trip },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
