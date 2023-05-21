<template>
  <div class="categories-card">
    <img src="" alt="" class="categories-card__image" />
    <div class="categories-card__text-wrapper">
      <span class="categories-card__text" />
      <h4 class="categories-card__title" />
      <span class="categories-card__description" />
      <span class="categories-card__price" />
    </div>
    <button class="categories-card__button" />
  </div>
</template>

<script>
export default {};
</script>

<style>
.categories-card {
}
.categories-card__image {
}
.categories-card__text-wrapper {
  padding-bottom: 16px;
}
.categories-card__text {
  font-size: 14px;
  line-height: 14px;
  color: var(--color-gray);
}
.categories-card__title {
  padding: 4px 0 9px;
  font-size: 20px;
  line-height: 24px;
  color: var(--color-dark-gray);
}
.categories-card__description {
  padding-bottom: 14px;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-dark-gray);
}
.categories-card__price {
  color: var(--color-dark-gray);
}
.categories-card__button {
  padding: 6px 0 10px;
  width: 212px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  line-height: 24px;
}
</style>
