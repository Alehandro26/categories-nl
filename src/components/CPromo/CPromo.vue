<template>
  <section class="promo">
    <div class="promo__contain contain">
      <h2 class="promo__title">Категории товаров</h2>
      <div v-if="$store.state.tags" class="promo__list">
        <PromoCard
          v-for="(item, index) in $store.state.tags"
          :key="index"
          class="promo__item"
          :title="item.name"
          :slug="item.slug"
          :image="item.image"
          :text-color="item.text_color"
        />
      </div>
      <CLoad v-else />
    </div>
  </section>
</template>

<script setup>
import CLoad from "../CLoad/CLoad.vue";
import PromoCard from "./PromoCard.vue";
</script>

<style>
.promo__contain {
  padding-top: calc(35 / 16 * 1rem);
  padding-bottom: calc(176 / 16 * 1rem);
}

.promo__title {
  padding-bottom: calc(20 / 16 * 1rem);
}
.promo__list {
  display: flex;
  gap: calc(22 / 16 * 1rem);
  flex-wrap: wrap;
}

@media (max-width: 767px) {
  .promo__list {
    gap: 10px;
  }
}

@media (max-width: 451px) {
  .promo__title {
    text-align: center;
  }

  .promo__list {
    justify-content: center;
  }
}
</style>
