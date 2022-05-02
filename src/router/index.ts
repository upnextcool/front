import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("../app/landing/app.vue"),
    children: [
      {
        path: "",
        component: () => import("../app/landing/home/home.vue"),
      },
      {
        path: "join",
        component: () => import("../app/landing/join/join.vue"),
      },
      {
        path: "start",
        component: () => import("../app/landing/start/start.vue"),
      },
      {
        path: "logout",
        component: () => import("../app/landing/logout/logout.vue"),
      },
    ],
  },
  {
    path: "/app",
    redirect: "/app/home",
    component: () => import("../app/user-area/app.vue"),
    children: [
      {
        path: "home",
        component: () => import("../app/user-area/home/home.vue"),
      },
      {
        path: "cast",
        component: () => import("../app/user-area/cast/cast.vue"),
      },
      {
        path: "users",
        component: () => import("../app/user-area/users/users.vue"),
      },
      {
        path: "search",
        component: () => import("../app/user-area/search/search.vue"),
      },
      {
        path: "history",
        component: () => import("../app/user-area/history/history.vue"),
      },
      {
        path: "view",
        component: () => import("../app/user-area/view/view.vue"),
        children: [
          {
            path: "popular",
            props: true,
            component: () =>
              import("../app/user-area/view/popular-playlists.vue"),
          },
          {
            path: "playlist/:id",
            props: true,
            component: () => import("../app/user-area/view/playlist.vue"),
          },
          {
            path: "album/:id",
            props: true,
            component: () => import("../app/user-area/view/album.vue"),
          },
          {
            path: "artist/:id",
            props: true,
            component: () => import("../app/user-area/view/artist.vue"),
          },
        ],
      },
      {
        path: "queue",
        component: () => import("../app/user-area/queue/queue.vue"),
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
