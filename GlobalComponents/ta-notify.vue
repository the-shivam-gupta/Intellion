<template>
  <div class="ta__notify" :class="show?'show':''">
    <div class="ta__notify--text" v-html="note" />
    <button class="ta__btn transparent" @click="show=false">
      <span class="icon-close"></span>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return { show: false };
  },
  computed: {
    note: function () {
      return this.$store.getters.homePageDetails.note;
    },
  },
  methods: {
    showNotify() {
      setTimeout((this.show = true), 5000);
    },
  },
  mounted() {
    if (sessionStorage.getItem("firstVisit") === null) {
      this.showNotify();
    }
  },
};
</script>
