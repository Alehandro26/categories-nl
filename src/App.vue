<template>
  <div>
    <CHeader />
    <router-view />
  </div>
</template>

<script>
import CHeader from "./components/CHeader/CHeader.vue";
import { mapGetters } from "vuex";

export default {
  components: { CHeader },
  computed: {
    ...mapGetters({
      recordedIdCity: "recordedIdCity",
    }),
  },
  watch: {
    recordedIdCity(v, ov) {
      if (v === ov) return;

      this.$store.commit("setTags", null);
      this.$store.dispatch("getTags", v);
    },
  },
  created() {
    this.$store.dispatch("writeIdCity", this.recordedIdCity);
    this.$store.dispatch("getTags", );
  },
};
</script>

<style scoped></style>
