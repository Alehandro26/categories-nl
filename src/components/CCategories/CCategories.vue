<template>
  <div class="categories">
    <div class="categories__contain contain">
      <div class="categories__head">
        <button class="categories__button-back" />
        <h2 class="categories__title">{{ dataTag.name }}</h2>
      </div>
      <div class="categories__body">
        <CSidebar
          class="categories__sidebar"
          :subcategories="dataTag.children"
        />
        <div class="categories__wrapper">
          <CategoriesCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CSidebar from "../CSidebar/CSidebar.vue";
import CategoriesCard from "./CategoriesCard.vue";
import { mapState } from "vuex";

export default {
  components: { CSidebar, CategoriesCard },
  computed: {
    ...mapState({
      tags: "tags",
    }),
    dataTag() {
      return this.tags.find((item) => item.slug === this.$route.params.slug);
    },
  },
};
</script>

<style></style>
