<template>
  <div class="categories-card">
    <img
      :src="data.main_image_thumb_300"
      alt=""
      class="categories-card__image"
    />
    <div class="categories-card__text-wrapper">
      <span class="categories-card__text">{{ data.category.name }}</span>
      <h4 class="categories-card__title">{{ data.present_name }}</h4>
      <span class="categories-card__description">{{ data.comment_name }}</span>
      <span class="categories-card__price">{{ `${data.price} ₽` }}</span>
    </div>

    <CButton
      class="categories__button"
      :available="data.allowed && data.available"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import CButton from "../CButton/CButton.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
const data = computed(() => props.data);
</script>

<style>
.categories-card {
  width: calc(276 / 16 * 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-white);
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 0px 0px 5px 5px;
}
.categories-card__image {
  width: 100%;
}
.categories-card__text-wrapper {
  width: 100%;
  height: 100%;
  padding: calc(6 / 16 * 1rem) calc(10 / 16 * 1rem) calc(16 / 16 * 1rem);
  display: flex;
  flex-direction: column;
  text-align: center;
}
.categories-card__text {
  font-size: calc(14 / 16 * 1rem);
  line-height: 100%;
  color: var(--color-gray);
}
.categories-card__title {
  padding: 4px 0 9px;
  font-size: calc(20 / 16 * 1rem);
  line-height: 120%;
  color: var(--color-dark-gray);
}
.categories-card__description {
  padding-bottom: 14px;
  margin-top: auto;
  font-size: calc(16 / 16 * 1rem);
  line-height: 125%;
  color: var(--color-dark-gray);
}
.categories-card__price {
  font-weight: 600;
  font-size: calc(26 / 16 * 1rem);
  line-height: 92%;
  color: var(--color-dark-gray);
}

.categories__button {
  margin-bottom: 23px;
}

@media (max-width: 1023px) {
  .categories-card {
    width: calc((100% - 48px) / 3);
  }
}

@media (max-width: 599px) {
  .categories-card {
    width: calc((100% - 10px) / 2);
  }

  .categories-card__text {
    font-size: 12px;
  }

  .categories-card__title {
    font-size: 17px;
  }

  .categories-card__description {
    font-size: 14px;
  }

  .categories-card__price {
    font-size: 23px;
  }
}
</style>
