<template>
  <Teleport v-if="openPopup" to="body">
    <div class="popup" :class="{ popup_close: animationClose }">
      <div class="popup__background" @click="closePopup" />

      <section class="popup__wrapper">
        <h3 class="popup__title">Выбор населённого пункта:</h3>
        <div class="popup__body">
          <div class="popup__input-wrapper">
            <input
              v-model="keyWord"
              type="text"
              class="popup__input"
              :class="{ popup__input_active: listCities }"
              placeholder="Например, Санкт-петербург"
            />
            <div v-if="listCities" class="popup__list-wrapper">
              <div class="popup__list-contain">
                <ul class="popup__list">
                  <li
                    v-for="city in listCities"
                    :key="city.id"
                    class="popup__list-item"
                    @click="selectCity(city)"
                  >
                    {{ city.label }}
                  </li>
                </ul>
              </div>
            </div>

            <button
              v-if="checkClearInput"
              class="popup__input-clear"
              @click="clearInputArea"
            />
          </div>
          <div
            class="popup__submit-wrapper"
            :class="{ 'popup__submit-wrapper_active': selectedCity }"
          >
            <button
              class="popup__submit"
              :disabled="!selectedCity"
              @click="submit"
            >
              Подтвердить
            </button>
          </div>
        </div>
        <button class="popup__close" @click="closePopup" />
      </section>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { getListCities } from "../../api";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["close", "selectedCity"]);

const keyWord = ref("");
const listCities = ref(null);
const selectedCity = ref(null);
const animationClose = ref(null);
const openPopup = ref(null);

const checkClearInput = computed(() => keyWord.value.length > 0);

watch(
  () => keyWord.value,
  (v, ov) => {
    if (!v || v === ov) return;

    keyWord.value = v.replace(/\d+/, "");

    if (v.length >= 3 && !selectedCity.value) getList(v);
    if (v.length < 3) listCities.value = null;
    if (selectedCity.value?.label !== v) selectedCity.value = null;
  }
);
watch(
  () => props.open,
  (v) => {
    document.body.classList.toggle("no-scroll");

    if (v) openPopup.value = true;
    if (!v) {
      animationClose.value = true;

      setTimeout(() => {
        openPopup.value = false;
        animationClose.value = false;
      }, 300);
    }
  }
);

async function getList(term) {
  const { data } = await getListCities(term);

  listCities.value = data;
}
function clearInputArea() {
  keyWord.value = "";
  listCities.value = null;
  selectedCity.value = null;
}
function closePopup() {
  clearInputArea();
  emits("close");
}
function selectCity(data) {
  selectedCity.value = data;
  keyWord.value = selectedCity.value.label;
  listCities.value = null;
}
function submit() {
  emits("selectedCity", selectedCity.value);
  closePopup();
}
</script>

<style>
.popup {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.popup_open {
  display: block;
}

.popup__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #353647;
  animation: backgroundOpen 0.2s forwards ease-in;
}

.popup_close .popup__background {
  animation: backgroundClose 0.2s forwards ease-in;
}

.popup__wrapper {
  padding: calc(28 / 16 * 1rem) calc(18 / 16 * 1rem) calc(32 / 16 * 1rem)
    calc(19 / 16 * 1rem);
  width: fit-content;
  position: relative;
  top: 33.47vh;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-white);
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 5px;
  animation: popupOpen 0.3s forwards ease-in;
}

.popup_close .popup__wrapper {
  animation: popupClose 0.3s forwards ease-in;
}

.popup__title {
  padding-bottom: calc(12 / 16 * 1rem);
  font-size: calc(20 / 16 * 1rem);
  line-height: calc(24 / 16 * 1rem);
}

.popup__body {
  display: flex;
  align-items: center;
}

.popup__input-wrapper {
  position: relative;
  z-index: 2;
  margin-right: calc(18 / 16 * 1rem);
  font-size: 0;
}

.popup__input {
  padding: calc(11 / 16 * 1rem) calc(36 / 16 * 1rem) calc(12 / 16 * 1rem)
    calc(16 / 16 * 1rem);
  width: min(calc(540 / 16 * 1rem), 70vw);
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 5px;
  font-weight: 400;
  font-size: calc(18 / 16 * 1rem);
  line-height: 128%;
}

.popup__input::placeholder {
  color: var(--color-gray);
}

.popup__input_active {
  border: solid var(--color-dark-gray);
  border-width: 1px 1px 0 1px;
  border-radius: 5px 5px 0 0;
}

.popup__list-wrapper {
  padding: calc(12 / 16 * 1rem) calc(11 / 16 * 1rem);
  position: absolute;
  overflow: scroll;
  max-height: calc(172 / 16 * 1rem);
  width: 100%;
  background: var(--color-white);
  border: solid var(--color-dark-gray);
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 5px 5px;
}

.popup__list-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc(12 / 16 * 1rem);
  right: calc(20 / 16 * 1rem);
  display: block;
  height: calc(2 / 16 * 1rem);
  background: rgba(151, 151, 151, 0.3);
}

.popup__list-contain {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.popup__list {
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.popup__list-item {
  font-size: calc(18 / 16 * 1rem);
  line-height: 133%;
  color: var(--color-gray);
  transition: color 0.3s ease;
  cursor: pointer;
}

.popup__list-item:not(:first-child) {
  margin-top: calc(7 / 16 * 1rem);
}

.popup__list-item:hover {
  color: var(--color-dark-gray);
}

.popup__input-clear {
  position: absolute;
  top: calc(21 / 16 * 1rem);
  right: calc(20 / 16 * 1rem);
  width: calc(12 / 16 * 1rem);
  height: calc(12 / 16 * 1rem);
  background-image: url("../../assets/images/close.svg");
  background-size: calc(16 / 16 * 1rem) calc(16 / 16 * 1rem);
  background-position: center;
  cursor: pointer;
}

.popup__submit-wrapper {
  position: relative;
}

.popup__submit {
  position: relative;
  z-index: 1;
  padding: calc(11 / 16 * 1rem) calc(22 / 16 * 1rem) calc(12 / 16 * 1rem)
    calc(23 / 16 * 1rem);
  font-size: calc(16 / 16 * 1rem);
  line-height: 131%;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  color: #acacac;
  border: 2px solid rgba(151, 151, 151, 0.3);
  border-radius: 24px;
  transition: color 0.2s ease, background 0.2s ease;
}

.popup__submit-wrapper_active .popup__submit {
  color: var(--color-white);
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 60.2%);
  cursor: pointer;
}

.popup__submit-wrapper_active::after {
  content: "";
  position: absolute;
  top: calc(8 / 16 * 1rem);
  left: calc(15 / 16 * 1rem);
  display: block;
  width: calc(145 / 16 * 1rem);
  height: calc(48 / 16 * 1rem);
  background: linear-gradient(
    270deg,
    rgba(255, 168, 0, 0.6) 0%,
    rgba(255, 111, 0, 0.6) 100%
  );
  filter: blur(14px);
}

.popup__close {
  position: absolute;
  top: calc(18 / 16 * 1rem);
  right: calc(18 / 16 * 1rem);
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  background-image: url("../../assets/images/close.svg");
  background-size: contain;
  cursor: pointer;
}

@media (max-width: 1023px) {
  .popup__wrapper {
    padding-top: 40px;
  }

  .popup__body {
    flex-direction: column;
  }

  .popup__submit-wrapper {
    margin-top: 20px;
  }
}

@media (max-width: 451px) {
  .popup__input {
    font-size: 14px;
  }

  .popup__list-item {
    font-size: 14px;
  }
}

@keyframes backgroundOpen {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
}

@keyframes backgroundClose {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0;
  }
}

@keyframes popupOpen {
  from {
    opacity: 0;
    transform: scale3d(1.2, 1.2, 1.2) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: scaleX(1) translateX(-50%);
  }
}

@keyframes popupClose {
  from {
    opacity: 1;
    transform: scaleX(1) translateX(-50%);
  }
  to {
    opacity: 0;
    transform: scale3d(1.2, 1.2, 1.2) translateX(-50%);
  }
}
</style>
