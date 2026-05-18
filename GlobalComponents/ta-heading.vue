<template>
  <div class="section__heading">
    <div class="transhead" v-if="isTrans" data-aos="zoom-n">{{transhead}}</div>
    <div :class="isTrans?'opaqhead':''">
      <div class="section__subtitle" data-aos="slide-up">{{ subtitle }}</div>
      <h3 class="section__title" data-aos="slide-up">{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    transhead: String,
    isTrans: Boolean
  }
};
</script>
