<template>
  <div class="button" :class="{ button_active: props.available }">
    <button class="button__submit" :disabled="!props.available" @click="click">
      {{ text }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  available: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["click"]);
const text = computed(() => {
  return props.available ? "В корзину" : "Нет в наличии";
});

function click() {
  emits("click");
}
</script>

<style>
.button {
  position: relative;
}

.button__submit {
  position: relative;
  z-index: 2;
  padding: calc(4 / 16 * 1rem) 0 calc(8 / 16 * 1rem);
  width: calc(212 / 16 * 1rem);
  display: flex;
  justify-content: center;
  font-size: calc(18 / 16 * 1rem);
  line-height: 133%;
  color: rgba(39, 39, 39, 0.5);
  border: 2px solid rgba(151, 151, 151, 0.3);
  border-radius: 24px;
}

.button_active .button__submit {
  padding: calc(6 / 16 * 1rem) 0 calc(10 / 16 * 1rem);
  color: var(--color-white);
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 100%);
  border: none;
  cursor: pointer;
}

.button_active::after {
  content: "";
  position: absolute;
  top: calc(17 / 16 * 1rem);
  left: calc(9 / 16 * 1rem);
  display: block;
  width: calc(194 / 16 * 1rem);
  height: calc(28 / 16 * 1rem);
  background: linear-gradient(
    270deg,
    rgba(255, 168, 0, 0.6) 0%,
    rgba(255, 111, 0, 0.6) 100%
  );
  filter: blur(14px);
  border-radius: 24px;
}

@media (max-width: 767px) {
  .button__submit {
    width: 150px;
    font-size: 15px;
  }

  .button_active::after {
    width: 135px;
  }
}
</style>
