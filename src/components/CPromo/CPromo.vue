<template>
  <section class="promo">
    <div class="promo__contain contain">
      <h2 class="promo__title">Категории товаров</h2>
      <div v-if="tags" class="promo__list">
        <PromoCard
          v-for="(item, index) in tags"
          :key="index"
          class="promo__item"
          :title="item.name"
          :slug="item.slug"
          :image="item.image"
          :text-color="item.text_color"
        />
      </div>
      <img
        v-else
        src="@/assets/images/load.svg"
        alt="Загрузка списка"
        class="promo__load"
      />
    </div>
  </section>
</template>

<script>
import PromoCard from "./PromoCard.vue";
import { getMenuTags } from "@/api";
import { mapGetters, mapState } from "vuex";

export default {
  components: { PromoCard },
  data() {
    return {
      listCategories: null,
    };
  },
  computed: {
    ...mapGetters({
      recordedIdCity: "recordedIdCity",
    }),
    ...mapState({
      tags: "tags",
    }),
  },
  watch: {
    recordedIdCity(v, ov) {
      if (v === ov) return;

      this.$store.commit("setTags", null);
      this.getTags(v);
    },
  },
  mounted() {
    this.getTags(this.recordedIdCity);
  },
  methods: {
    async getTags(id) {
      const { tags } = await getMenuTags(id);
      console.log(tags);

      this.$store.commit("setTags", tags);
    },
  },
};
</script>

<style>
.promo__contain {
  padding-top: calc(35 / 16 * 1rem);
  padding-bottom: calc(156 / 16 * 1rem);
}

.promo__title {
  padding-bottom: calc(20 / 16 * 1rem);
}
.promo__list {
  display: flex;
  gap: calc(22 / 16 * 1rem);
  flex-wrap: wrap;
}

.promo__load {
  position: fixed;
  width: calc(70 / 16 * 1rem);
  height: calc(70 / 16 * 1rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate 1s linear infinite;
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

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
