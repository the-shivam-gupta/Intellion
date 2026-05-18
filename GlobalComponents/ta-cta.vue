<template>
  <div>
    <nuxt-link
      class="ta__btn"
      :class="btnStyle"
      :to="url"
      v-if="type === 'link' && btnStyle !=='ta__btn--ternary'"
    >{{text}}</nuxt-link>
    <nuxt-link
      class="ta__btn"
      :class="[btnStyle, isicon?'ta__flex':'']"
      :to="url"
      v-else-if="type === 'link' && btnStyle ==='ta__btn--ternary'"
    >
      <span class="text">{{text}}</span>
      <span class="icon" v-if="isicon && btnStyle === 'ta__btn--ternary' "></span>
    </nuxt-link>
    <a
      class="ta__btn"
      :class="btnStyle"
      :href="url"
      v-else-if="type === 'downloadLink'"
      rel="noopener"
      download
      target="_blank"
    >{{ text }}</a>
    <button v-else class="ta__btn" :class="btnStyle" :type="type" aria-label="Button">{{ text }}</button>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
    type: String,
    btnStyle: "",
    color: "",
    url: String,
    isicon: Boolean,
  },
};
</script>
