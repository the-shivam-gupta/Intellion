<template>
  <div class="hero__slider">
    <slick v-if="isNuxtReady" :options="slickOptions">
      <div 
        :class="{'hero__slider--media': true, 'pointer': false }"
        v-for="(slide, index) in slideImages"
        :key="'slide' + index"
        >

        <div v-if="slide.cta.cta_url">
        <a :href="slide.cta.cta_url" target="_blank">
          <picture>
          <source
            v-if="slide.image_mobile && slide.image_mobile.src"
            :srcset="$buildImageSrcset(slide.image_mobile)"
            :sizes="$buildImageSizes('banner')"
            media="(max-width:768px)">
          <img
            :src="slide.image.src"
            :srcset="$buildImageSrcset(slide.image, slide.sizes)"
            :sizes="$buildImageSizes('banner')"
            :alt="slide.image.alt"
            v-if="!slide.video_file_url"
          />
        </picture>
        
        <video
          aria-label="banner video"
          playsinline="playsinline"
          muted="muted"
          autoplay="autoplay"
          class="video"
          :id="'video-' + index"
          :poster="slide.image.src"
          :src="slide.video_file_url"
          v-if="slide.video_file_url"
        ></video>
        <div class="hero__content" v-if="index === -1">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section__image">
                  <img src="~assets/images/TRIL logo_white.svg" alt="Tata Intellion" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="cities">
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=mumbai">Mumbai</nuxt-link>
                  </div>
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=navi-mumbai">Navi Mumbai</nuxt-link>
                  </div>
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=gurugram">Gurgaon</nuxt-link>
                  </div>
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=chennai">Chennai</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero__content" v-if="index !== 0">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="hero__text--wrapper">
                  <h2 class="section__title">{{ slide.title }}</h2>
                  <p class="section__desc">{{ slide.sub_title }}</p>
                </div>
                <!-- <div class="section__btn text-center" v-if="slide.cta.cta_text">
                  <ta-cta
                    :text="slide.cta.cta_text"
                    type="link"
                    btnStyle="ta__btn--primary"
                    :url="slide.cta.cta_url"
                  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="hero__actions" v-if="slide.video_file_url">
          <button
            @click="playVid(index)"
            type="button"
            class="ta__btn"
            :class="!togglePlay ? 'active' : ''"
          >
            <img src="~/assets/images/actions-video-play.svg" alt="Tata Intellion" />
          </button>
          <button
            @click="pauseVid(index)"
            type="button"
            class="ta__btn"
            :class="togglePlay ? 'active' : ''"
          >
            <img src="~/assets/images/actions-video-pause.svg" alt="Tata Intellion" />
          </button>
        </div>
        </a>
      </div>
      <div v-else>
        <picture>
          <source
            v-if="slide.image_mobile && slide.image_mobile.src"
            :srcset="$buildImageSrcset(slide.image_mobile)"
            :sizes="$buildImageSizes('banner')"
            media="(max-width:768px)">
          <img
            :src="slide.image.src"
            :srcset="$buildImageSrcset(slide.image, slide.sizes)"
            :sizes="$buildImageSizes('banner')"
            :alt="slide.image.alt"
            v-if="!slide.video_file_url"
          />
        </picture>
        <video
          aria-label="banner video"
          playsinline="playsinline"
          muted="muted"
          autoplay="autoplay"
          class="video"
          :id="'video-' + index"
          :poster="slide.image.src"
          :src="slide.video_file_url"
          v-if="slide.video_file_url"
        ></video>
        <div class="hero__content" v-if="index === -1">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section__image">
                  <img src="~assets/images/TRIL logo_white.svg" alt="Tata Intellion" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="cities">
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=mumbai">Mumbai</nuxt-link>
                  </div>
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=navi-mumbai">Navi Mumbai</nuxt-link>
                  </div>
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=gurugram">Gurgaon</nuxt-link>
                  </div>
                  <div class="city">
                    <nuxt-link to="/commercial-projects?city=chennai">Chennai</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero__content" v-if="index !== 0">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="hero__text--wrapper">
                  <h2 class="section__title">{{ slide.title }}</h2>
                  <p class="section__desc">{{ slide.sub_title }}</p>
                </div>
                <!-- <div class="section__btn text-center" v-if="slide.cta.cta_text">
                  <ta-cta
                    :text="slide.cta.cta_text"
                    type="link"
                    btnStyle="ta__btn--primary"
                    :url="slide.cta.cta_url"
                  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="hero__actions" v-if="slide.video_file_url">
          <button
            @click="playVid(index)"
            type="button"
            class="ta__btn"
            :class="!togglePlay ? 'active' : ''"
          >
            <img src="~/assets/images/actions-video-play.svg" alt="Tata Intellion" />
          </button>
          <button
            @click="pauseVid(index)"
            type="button"
            class="ta__btn"
            :class="togglePlay ? 'active' : ''"
          >
            <img src="~/assets/images/actions-video-pause.svg" alt="Tata Intellion" />
          </button>
        </div>
      </div>
        
     



   
    
   

      </div>
    </slick>

    <!-- <b-modal
      v-for="(slide, index) in popup"
      :id="`banner-popup-${index}`"
      size="lg"
      ref="banner-modal"
      :key="index"
      >
      <div class="banner-popup--img-container">
        <button class="banner-popup--close" title="Close" @click="hideModal(index)">&times;</button>
        <picture>
          <source :srcset="slide.popup_image_mobile.src" v-if="slide.popup_image_mobile.src" media="(max-width: 540px)">
          <img :src="slide.popup_image.src" class="img-fluid" :alt="slide.title" />
        </picture>
      </div>
    </b-modal> -->
  </div>
</template>
<script>
//
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
export default {
  props: {
    slideImages: Array
  },
  data() {
    return {
      isNuxtReady: false,
      togglePlay: false,
      slickOptions: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        fade: true,
        // cssEase: "linear"
      },
    };
  },
  components: {
    slick,
  },
  computed: {
    popup: function () {
        const sliders = {};

        if (!this.slideImages || !this.slideImages.length) {
          return sliders;
        }

        this.slideImages.forEach((slide, index) => {
          if (slide.popup_image.src || slide.popup_image_mobile.src) {
            sliders[index] = slide;
          }
        });

        return sliders;
    }
  },
  methods: {
    showModal (index) {
      this.$refs['banner-modal'][index].show();
    },
    hideModal (index) {
      this.$refs['banner-modal'][index].hide();
    },
    playVid(index) {
      this.togglePlay = true;
      let vid = document.getElementById("video-" + index);
      vid.play();
    },
    pauseVid(index) {
      this.togglePlay = false;
      let vid = document.getElementById("video-" + index);
      vid.pause();
    },
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
    }
  }
};
</script>
