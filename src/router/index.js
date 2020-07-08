import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "NoteList",
    component: () => import("@/views/NoteList.vue")
  },
  {
    path: "/notes/:id",
    name: "Note",
    component: () => import("@/views/Note.vue"),
    props: true
  },
  {
    path: "/edit/:id",
    name: "NoteEdit",
    component: () => import("@/views/NoteCreate.vue")
  },
  {
    path: "/create",
    name: "NoteCreate",
    component: () => import("@/views/NoteCreate.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
