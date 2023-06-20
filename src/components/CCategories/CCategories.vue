<template>
  <div class="categories">
    <div v-if="tags" class="categories__contain contain">
      <div class="categories__head">
        <router-link to="/categories-nl/" class="categories__button-back" />
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
        <div v-if="productsData" class="categories__wrapper">
          <CategoriesCard
            v-for="(product, index) in productsData"
            :key="index"
            :data="product"
          />
        </div>
        <CLoad v-else />
      </div>
    </div>
    <CLoad v-else />
  </div>
</template>

<script setup>
import CLoad from "../CLoad/CLoad.vue";
import CSidebar from "../CSidebar/CSidebar.vue";
import CategoriesCard from "./CategoriesCard.vue";
import { useStore } from "vuex";
import { getProducts } from "@/api";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const productsData = ref(null);
const openSidebar = ref(false);

const tags = computed(() => store.state.tags);
const recordedIdCity = computed(() => store.getters.recordedIdCity);
const dataTag = computed(() => {
  return tags.value.find((item) => item.slug === route.params.slug);
});

onMounted(loadProducts);

function goToCategory(data) {
  const [slug] = data;
  if (slug) {
    router.push(`/categories-nl/categories/${route.params.slug}/${slug}/`);
  } else {
    router.push(`/categories-nl/categories/${route.params.slug}/`);
  }
  setTimeout(() => this.loadProducts());

  if (openSidebar.value) {
    openSidebar.value = false;
  }
}

async function loadProducts() {
  const { products } = await getProducts(
    recordedIdCity.value,
    route.params.subslug || route.params.slug
  );
  productsData.value = products;
}

function toggleSidebar() {
  openSidebar.value = !openSidebar.value;
}
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
}

@media (max-width: 599px) {
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
