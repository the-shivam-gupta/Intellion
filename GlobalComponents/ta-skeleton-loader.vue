<template>
  <div
    class="ta-skeleton-loader"
    :data-w="width"
    :data-h="height"
  ></div>
</template>
<script>
export default {
  props: {
    width: 0,
    height: 0
  }
};
</script>
