<template>
  <ul v-if="list" class="sidebar">
    <li
      v-for="(item, index) in list"
      :key="index"
      ref="items"
      class="sidebar__item"
      @click="select([item.slug, index])"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    subcategories: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["select"],
  computed: {
    list() {
      return this.subcategories?.length >= 2
        ? [{ name: "Все продукты" }, ...this.subcategories]
        : null;
    },
  },
  mounted() {
    if (this.list) {
      this.loadSelectedItem();
    }
  },
  methods: {
    select(data) {
      this.$emit("select", data);

      this.$refs.items.forEach((item, index) => {
        index === data[1]
          ? item.classList.add("sidebar__item_active")
          : item.classList.remove("sidebar__item_active");
      });
    },
    loadSelectedItem() {
      if (this.$route.params.subslug) {
        const indexSubslug = this.list.findIndex((item) => {
          return item.slug === this.$route.params.subslug;
        });

        this.$refs.items.forEach((item, index) => {
          if (index === indexSubslug) {
            item.classList.add("sidebar__item_active");
          }
        });
        return;
      }

      this.$refs.items[0].classList.add("sidebar__item_active");
    },
  },
};
</script>

<style>
.sidebar {
  width: calc(240 / 16 * 1rem);
  min-width: calc(240 / 16 * 1rem);
  margin: 0;
  padding: 0;
  background: #f7f7f7;
}

.sidebar__item {
  padding: calc(7 / 16 * 1rem) calc(8 / 16 * 1rem) calc(8 / 16 * 1rem)
    calc(12 / 16 * 1rem);
  display: block;
  font-weight: 400;
  font-size: calc(16 / 16 * 1rem);
  line-height: 150%;
  color: var(--color-black);
  border-bottom: 1px solid #e9eef3;
  cursor: pointer;
}

.sidebar__item_active {
  background: #e9eef3;
}
</style>
