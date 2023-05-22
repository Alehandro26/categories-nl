// import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";

import MainPage from "../pages/MainPage/MainPage.vue";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage.vue";

const pathToRegexpOptions = {
  strict: true,
};

export default createRouter({
  history: createWebHistory(),
  base: "/",
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
      pathToRegexpOptions,
    },
    {
      path: "/categories/:slug/:subslug?/",
      name: "categories",
      component: CategoriesPage,
      pathToRegexpOptions,
    },
  ],
});
