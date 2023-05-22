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

<script>
import { getDataCity } from "@/api";
import CPopup from "../CPopup/CPopup.vue";

export default {
  components: { CPopup },
  data() {
    return {
      popupOpen: false,
      cityName: "",
      id: null,
    };
  },
  watch: {
    id() {
      this.$store.dispatch("writeIdCity", +this.id);
      this.$router.push("/");
    },
  },
  mounted() {
    this.getDataCityById(this.$store.getters.recordedIdCity);
  },
  methods: {
    async getDataCityById(id) {
      const { data } = await getDataCity(id);
      this.cityName = data.city;
    },
    togglePopup() {
      this.popupOpen = !this.popupOpen;
    },
    getData(data) {
      this.cityName = data.city;
      this.id = data.id;
    },
  },
};
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
