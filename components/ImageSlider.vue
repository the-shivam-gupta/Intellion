<template>
  <div :class="type + '__slider'">
    <div v-if="type === 'full'">
      <slick
        v-if="isNuxtReady && content && content.length > 0"
        :options="slickOptions"
      >
        <div
          class="carousel__image"
          v-for="(item, index) in content"
          :key="id + index"
        >
          
          <ta-image-card :image="item" v-if="from !== 'sustainability'"></ta-image-card>
          
          <ta-image-card from="sustainability" :image="item" v-if="from === 'sustainability'"></ta-image-card>
        </div>
      </slick>
    </div>
    <div v-if="type === 'fit'">
      <slick
        v-if="isNuxtReady && content && content.length > 0"
        :options="slickOptions2"
      >
        <div
          class="carousel__image"
          v-for="(item, index) in content"
          :key="id + index"
        >
          <ta-image-card :image="item" sizes-context="fitSlider"></ta-image-card>
        </div>
      </slick>
    </div>
  </div>
</template>
<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;

export default {
  props: {
    type: String,
    show: Number,
    id: String,
    content: Array,
    from: String,
  },
  data() {
    return {
      isNuxtReady: false,
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        centerMode: true,
        variableWidth: true,
        nextArrow:
          "<button class='carousel-next' aria-label='next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev' aria-label='previous'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: "10px",
            },
          },
        ],
      },
      slickOptions2: {
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        centerMode: false,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        nextArrow:
          "<button class='carousel-next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000,
              centerPadding: "10px",
              variableWidth: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000,
              centerPadding: "5px",
              variableWidth: true,
            },
          },
        ],
      },
    };
  },
  components: {
    slick,
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
    }
  },
};
</script>
