// Composables
import {
  createRouter,
  createWebHistory,
  onBeforeRouteUpdate,
} from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/comics/:id",
        name: "ComicsDetail",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/apps/marvel-comics-detail/ComicsDetailComponent.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// const updateRoute = (to, from, next) => {
//   if (to.params.id !== from.params.id) {
//     // Yönlendirme işlemini burada gerçekleştirin
//     router.replace(`/comics/${to.params.id}`);
//   } else {
//     next();
//   }
// };

// router.beforeEach(updateRoute);

export default router;
