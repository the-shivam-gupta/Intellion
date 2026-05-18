<template>
  <div
    class="ta-skeleton-loader"
    :style="{ width: cwidth, height: cheight }"
  ></div>
</template>
<script>
export default {
  props: {
    width: 0,
    height: 0
  },
  computed: {
    cwidth: function() {
      return this.width + "%";
    },
    cheight: function() {
      return this.height + "px";
    }
  }
};
</script>
