<template>
  <div>
    <VueSlickCarousel
    class="slider"
    :options="slickOptions">
        <div
            :class="{'slider--slide': true, 'pointer': false }"
            v-for="(slide, index) in galleryImages"
            :key="'slide' + index">

            <picture>
                <img :src="slide.url" :alt="slide.alt" />
            </picture>
            
        </div>
    </VueSlickCarousel>
    <VueSlickCarousel
    class="slider__nav"
    :options="navOptions"
    >
        <div
        v-for="(slide, index) in galleryImages"
        :key="'slide' + index"
        class="slider__nav--slide"
        >

            <picture>
                <img :src="slide.url" :alt="slide.alt" />
            </picture>
            
        </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
  const VueSlickCarousel = () =>
  window && window !== undefined ? import("vue-slick") : null;

  export default {
    name: 'Gallery',
    data() {
        return {
            isNuxtReady: false,
            slickOptions: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    autoplay: false,
                    speed: 500,
                    fade: false,
                    asNavFor: '.slider__nav'
            },
            navOptions:{
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    autoplay: false,
                    speed: 500,
                    focusOnSelect:true,
                    swipeToSlide:true,
                    asNavFor: '.slider'
            }
        };
    },
    components: { VueSlickCarousel },
    props: {
        galleryImages: Array,
    },
    mounted() {
        if (process.browser) {
        this.isNuxtReady = true;
        }
    }
  }
</script>
