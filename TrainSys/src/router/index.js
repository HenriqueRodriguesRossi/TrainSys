import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Registration from "../views/Registration.vue"
import Dashboard from "../views/Dashboard.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    }
  ]
})

export default router
