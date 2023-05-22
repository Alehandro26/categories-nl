<template>
  <img src="@/assets/images/load.svg" alt="Загрузка списка" class="load" />
</template>

<script>
export default {};
</script>

<style>
.load {
  position: fixed;
  width: calc(70 / 16 * 1rem);
  height: calc(70 / 16 * 1rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate 1s linear infinite;
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
