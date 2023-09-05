import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Registration from "../views/Registration.vue"
import Dashboard from "../views/Dashboard.vue"
import Exercises from "../views/Exercises.vue"
import Students from "../views/Students.vue"

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
    },
    {
      path: "/exercises",
      name: "exercises",
      component: Exercises
    },
    {
      path: "/students",
      name: "students",
      component: Students
    }
  ]
})

export default router
