<template>
  <div class="header">
    <div class="header__contain contain">
      <button v-if="cityName" class="header__button" @click="togglePopup">
        {{ cityName }}
      </button>
    </div>
    <CPopup
      class="header__popup"
      :open="popupOpen"
      @close="togglePopup"
      @selected-city="getData($event)"
    />
  </div>
</template>

<script setup>
import { getDataCity } from "@/api";
import CPopup from "../CPopup/CPopup.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const popupOpen = ref(false);
const cityName = ref("");
const id = ref("");

watch(id, () => {
  store.dispatch("writeIdCity", +id.value);
  router.push("/categories-nl/");
});

onMounted(() => {
  getDataCityById(store.getters.recordedIdCity);
});

async function getDataCityById(id) {
  const { data } = await getDataCity(id);
  cityName.value = data.city;
}

function togglePopup() {
  popupOpen.value = !popupOpen.value;
}

function getData(data) {
  cityName.value = data.city;
  id.value = data.id;
}
</script>

<style>
.header {
  height: calc(72 / 16 * 1rem);
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.1);
}
.header__contain {
  padding-top: calc(25 / 16 * 1rem);
  padding-bottom: calc(23 / 16 * 1rem);
}

.header__button {
  position: relative;
  padding-left: calc(19 / 16 * 1rem);
  font-size: calc(15 / 16 * 1rem);
  line-height: 160%;
  color: var(--color-dark-gray);
  cursor: pointer;
}

.header__button::after {
  content: "";
  position: absolute;
  top: calc(2 / 16 * 1rem);
  left: 0;
  display: block;
  width: calc(11 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  background-image: url("../../assets/images/header__image.svg");
}
</style>
