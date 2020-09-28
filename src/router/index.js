import Vue from "vue";
import VueRouter from "vue-router";
import BoxList from "../components/BoxList";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "BoxList",
    component: BoxList
  }
];

const router = new VueRouter({
  routes
});

export default router;
