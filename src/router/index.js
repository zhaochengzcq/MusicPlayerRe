import Vue from "vue";
import VueRouter from "vue-router";
import Header from "../views/Header.vue";
import Footer from "../views/Footer.vue";
import Main from "../views/Main.vue";
import Sidebar from "../views/main/SideBar.vue";
import Content from "../views/main/Content.vue";
// import Login from "../views/header/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    components: {
      Header: Header,
      Main: Main,
      Footer: Footer,
    },
    children: [
      {
        path: "",
        name: "Main",
        components: {
          MainSidebar: Sidebar,
          MainContent: Content,
        },
      },
    ],
    // beforeEnter: (to, from, next) => {
    //   window.ipcRenderer.receive("getCookieReply", val => {
    //     if (val) {
    //       console.log(val);
    //       next();
    //     }
    //   });
    //   window.ipcRenderer.send("getCookie");
    // },
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/header/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
