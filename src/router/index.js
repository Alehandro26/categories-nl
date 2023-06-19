// import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";

import MainPage from "../pages/MainPage/MainPage.vue";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage.vue";

const pathToRegexpOptions = {
  strict: true,
};

export default createRouter({
  history: createWebHistory(),
  base: "/categories-nl/",
  routes: [
    {
      path: "/categories-nl/",
      name: "main",
      component: MainPage,
      pathToRegexpOptions,
    },
    {
      path: "/categories-nl/categories/:slug/:subslug?/",
      name: "categories",
      component: CategoriesPage,
      pathToRegexpOptions,
    },
  ],
});
