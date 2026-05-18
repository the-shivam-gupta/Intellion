<template>
  <div class="partial__slider">
    <div class="wrapper hide-sm">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide carousel__image"
            v-for="(project, index) in projects"
            :key="'projects_' + index"
          >
            <ta-secondary-card :content="project" type="hoverImage"></ta-secondary-card>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="position-relative d-flex justify-content-between">
              <div class="navigation">
                <div class="carousel-next carousel-button">
                  <span class="ta__icon icon-next"></span>
                </div>
                <div class="carousel-prev carousel-button">
                  <span class="ta__icon icon-prev"></span>
                </div>
              </div>
              <div class="custom-dots">
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container show-sm">
      <div class="row">
        <div class="col-lg-12">
          <div class="wrapper">
            <slick v-if="isNuxtReady" :options="slickOptions">
              <div
                class="carousel__image"
                v-for="(project, index) in projects"
                :key="'projects_' + index"
              >
                <ta-secondary-card :content="project" type="hoverImage"></ta-secondary-card>
              </div>
            </slick>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from "swiper";

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);
export default {
  props: {
    projects: Array,
  },
  data() {
    return {
      isNuxtReady: false,
      slickOptions: {
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
        infinite: false,
        nextArrow:
          "<button class='carousel-next ta__btn--navigation' aria-label='Next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev ta__btn--navigation' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 576,
            settings: "unslick",
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
      // init Swiper:
      const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: false,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        navigation: {
          nextEl: ".carousel-next",
          prevEl: ".carousel-prev",
        },
        breakpoints: {
          1025: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          769: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          577: {
            slidesPerView: 1,
          },
        },
      });
    }
  },
};
</script>
