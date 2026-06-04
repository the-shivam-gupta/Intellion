<template>
  <div class="hero" :class="[type, heroStyle]">
    <div
      class="hero__image"
      v-if="(type === 'two' || type === 'four') && content && content.background_image && content.background_image.src"
    >
      <img
        :src="content.background_image.src"
        :srcset="$buildImageSrcset(content.background_image)"
        :sizes="$buildImageSizes('hero')"
        :alt="
          content.background_image.alt !== ''
            ? content.background_image.alt
            : 'Tata Intellion'
        "
        data-aos="fade-in"
      />
    </div>
    <div
      :class="[
        heroStyle,
        heroStyle === 'transparent'
          ? 'hero__text--transparent'
          : type === 'one'
          ? ''
          : 'hero__text'
      ]"
    >
      <div class="container position-relative z-index-1" v-if=" heroStyle !== 'transparent'">
        <div class="row">
          <div
            :class="{
              'col-md-6 offset-md-6 col-lg-5 offset-lg-7':
                heroStyle === 'rightText' && !isSmallTab,
              'col-lg-6 offset-lg-6': heroStyle === 'rightText' && isSmallTab,
              'col-lg-5': heroStyle === 'leftText' && !isSmallTab,
              'col-lg-6': heroStyle === 'leftText' && isSmallTab,
              'col-lg-12': heroStyle === 'transparent',
              'col-lg-12': heroWidth === 'fullWidth'
            }"
          >
            <div class="hero__text--wrapper" 
            v-if="content" data-aos="slide-down">
              <h1 v-if="content.sub_title && content.sub_title.trim() !== ''" class="section__subtitle">
                            {{ content.sub_title }}
                       </h1>
             
              <h2 v-if="content.title" class="section__title" ref="el">{{ content.title }}</h2>

              <p class="section__desc">{{ content.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container" v-if=" heroStyle === 'transparent'">
        <div class="row">
          <div class="col-lg-12 col-sm-12">
            <div class="hero__text--wrapper" v-if="content" data-aos="slide-down">
              <h4 class="section__subtitle" v-if="content.sub_title && content.sub_title.trim() !== ''">{{ content.sub_title }}</h4>
              <h1 v-if="content.title" class="section__title" ref="el">{{ content.title }}</h1>

             
              <p class="section__desc">{{ content.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitTextPlugin";
export default {
  props: {
    type: String,
    heroStyle: String,
    content: Object,
    heroWidth: String,
  },
  data() {
    return {
      isSmallTab: false,
    };
  },
  methods: {
    animateHeroText() {
      let tl = gsap.timeline();
      let split = new SplitText(this.$refs.el, {
        type: "lines,chars",
      });

      tl.staggerFromTo(
        split.lines,
        1,
        {
          x: 40,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
        },
        0.2
      );
    },
  },
  mounted() {
    if (process.browser) {
      this.isSmallTab = window.innerWidth <= 1024 && this.$device.isTablet;
      // this.animateHeroText();
      // gsap.registerPlugin(SplitTextPlugin);
    }
  },
};
</script>
