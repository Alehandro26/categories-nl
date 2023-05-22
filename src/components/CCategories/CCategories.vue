<template>
  <div class="categories">
    <div v-if="tags" class="categories__contain contain">
      <div class="categories__head">
        <router-link to="/" class="categories__button-back" />
        <h2 class="categories__title">{{ dataTag.name }}</h2>
        <button
          class="categories__button-sidebar"
          :class="{ 'categories__button-sidebar_open': openSidebar }"
          @click="toggleSidebar"
        />
      </div>
      <div class="categories__body">
        <CSidebar
          class="categories__sidebar"
          :class="{ categories__sidebar_open: openSidebar }"
          :subcategories="dataTag.children"
          @select="goToCategory($event)"
        />
        <div class="categories__wrapper">
          <CategoriesCard
            v-for="(product, index) in products"
            :key="index"
            :data="product"
          />
        </div>
      </div>
    </div>
    <CLoad v-else />
  </div>
</template>

<script>
import CLoad from "../CLoad/CLoad.vue";
import CSidebar from "../CSidebar/CSidebar.vue";
import CategoriesCard from "./CategoriesCard.vue";
import { mapState, mapGetters } from "vuex";
import { getProducts } from "@/api";

export default {
  components: { CSidebar, CategoriesCard, CLoad },
  data() {
    return {
      products: null,
      openSidebar: false,
    };
  },
  computed: {
    ...mapState({
      tags: "tags",
    }),
    ...mapGetters({
      recordedIdCity: "recordedIdCity",
    }),
    dataTag() {
      return this.tags.find((item) => item.slug === this.$route.params.slug);
    },
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    goToCategory(data) {
      const [slug] = data;
      if (slug) {
        this.$router.push(`/categories/${this.$route.params.slug}/${slug}`);
      } else {
        this.$router.push(`/categories/${this.$route.params.slug}`);
      }
      setTimeout(() => this.loadProducts());

      if (this.openSidebar) {
        this.openSidebar = false;
      }
    },
    async loadProducts() {
      const { products } = await getProducts(
        this.recordedIdCity,
        this.$route.params.subslug || this.$route.params.slug
      );

      this.products = products;
    },
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },
  },
};
</script>

<style>
.categories__contain {
  padding-top: calc(35 / 16 * 1rem);
  padding-bottom: calc(194 / 16 * 1rem);
}

.categories__head {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  gap: calc(10 / 16 * 1rem);
}

.categories__button-back {
  display: block;
  width: calc(30 / 16 * 1rem);
  height: calc(30 / 16 * 1rem);
  background-image: url("@/assets/images/back.svg");
  background-size: contain;
  background-repeat: no-repeat;
}

.categories__body {
  display: flex;
}
.categories__sidebar {
  margin-right: calc(34 / 16 * 1rem);
}
.categories__wrapper {
  display: flex;
  gap: calc(24 / 16 * 1rem);
  flex-wrap: wrap;
}

.categories__button-sidebar {
  display: none;
  position: absolute;
  top: -36px;
  right: 20px;
  width: 25px;
  height: 25px;
  background-image: url("@/assets/images/back.svg");
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(-90deg) translateX(50%);
}

.categories__button-sidebar_open {
  transform: rotate(90deg) translateX(-50%);
}

@media (max-width: 1023px) {
  .categories__sidebar {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    transform: scaleY(0);
    transform-origin: top left;
    transition: transform 0.3s ease;
  }

  .categories__sidebar_open {
    transform: scaleY(1);
  }

  .categories__button-sidebar {
    display: block;
  }

  .categories__wrapper {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .categories__wrapper {
    gap: 10px;
  }
}

@media (max-width: 451px) {
  .categories__head {
    flex-direction: column;
  }
}
</style>
