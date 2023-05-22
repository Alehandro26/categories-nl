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
  data() {
    return {
      defaultIdCity: 1,
    };
  },
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
    this.writeLocalId();
    this.$store.dispatch("getTags", this.recordedIdCity);
  },
  methods: {
    writeLocalId() {
      if (!this.recordedIdCity) {
        this.$store.dispatch("writeIdCity", this.defaultIdCity);
      }
    },
  },
};
</script>

<style scoped></style>
