<template>
  <ul v-if="list" class="sidebar">
    <li v-for="(item, index) in list" :key="index" class="sidebar__item">
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
  computed: {
    list() {
      return this.subcategories?.length >= 2
        ? [{ name: "Все продукты" }, ...this.subcategories]
        : null;
    },
  },
};
</script>

<style>
.sidebar {
  width: 240px;
}
.sidebar__item {
  padding: 8px 0 8px 12px;
  display: block;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-black);
  border-bottom: 1px solid #e9eef3;
}
</style>
