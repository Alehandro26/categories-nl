<template>
  <router-link :to="`/categories/${slug}`" class="promo-card">
    <h3 class="promo-card__title" :style="{ color: textColor }">{{ title }}</h3>
    <img :src="image" alt="" class="promo-card__image" />
  </router-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: "#FFFFFF",
    },
    slug: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.promo-card {
  position: relative;
  width: calc(271 / 16 * 1rem);
  aspect-ratio: 1.78/1;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.promo-card:hover {
  transform: scale(1.03);
}
.promo-card__title {
  position: absolute;
  z-index: 1;
  top: calc(20 / 16 * 1rem);
  left: calc(20 / 16 * 1rem);
  right: calc(10 / 16 * 1rem);
  font-size: calc(24 / 16 * 1rem);
  line-height: 117%;
}
.promo-card__image {
  display: block;
  position: absolute;
  height: 100%;
  right: 0;
}

@media (max-width: 1023px) {
  .promo-card {
    width: calc((100vw - 84px) / 3);
  }

  .promo-card__title {
    font-size: 20px;
  }
}

@media (max-width: 767px) {
  .promo-card {
    width: min(93.75vw, 350px);
    width: calc((100vw - 30px) / 2);
  }
}

@media (max-width: 451px) {
  .promo-card {
    width: min(93.75vw, 320px);
  }
}
</style>
