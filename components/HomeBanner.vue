<template>
  <section class="section banner" id="banner">
    <div class="banner-slider">
      <div class="banner-video" ref="videoWrapper">
        <div
          class="banner-slider-item"
          v-for="(slide, index) in slides"
          :key="'video_' + index"
        >
          <video
            :id="'banner-video-' + index"
            class="video"
            aria-label="banner video"
            playsinline="playsinline"
            muted="muted"
            autoplay="autoplay"
            :style="'background-image:url(' + slide.image.src + ')'"
            :src="slide.video_file_url"
            v-if="slide.video_file_url"
          ></video>
          <img
            :src="slide.image.src"
            :srcset="
              (slide.image.src + ' 1x',
              slide.sizes.medium + ' 2x',
              slide.sizes.large + ' 3x')
            "
            alt="Tata Intellion"
            class="image"
            v-else
          />
          <div class="banner-video-actions" v-if="slide.video_file_url">
            <button
              @click="playVid(index)"
              type="button"
              class="ta__btn"
              :class="!togglePlay ? 'active' : ''"
            >
              <img src="~/assets/images/actions-video-play.svg" alt />
            </button>
            <button
              @click="pauseVid(index)"
              type="button"
              class="ta__btn"
              :class="togglePlay ? 'active' : ''"
            >
              <img src="~/assets/images/actions-video-pause.svg" alt />
            </button>
          </div>
        </div>
      </div>
      <div class="banner-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div
                class="banner-content-item"
                v-for="(item, index) in slides"
                :key="index"
              >
                <template v-if="index === 0">
                  <div class="section__image">
                    <img
                      src="~assets/images/TRIL logo_white.svg"
                      alt="Tata Intellion"
                    />
                  </div>

                  <div class="cities">
                    <div class="city">
                      <nuxt-link to="/commercial-projects/mumbai"
                        >Mumbai</nuxt-link
                      >
                    </div>
                    <div class="city">
                      <nuxt-link to="/commercial-projects/navimumbai"
                        >Navi Mumbai</nuxt-link
                      >
                    </div>
                    <div class="city">
                      <nuxt-link to="/commercial-projects/gurgaon"
                        >Gurgaon</nuxt-link
                      >
                    </div>
                    <div class="city">
                      <nuxt-link to="/commercial-projects/chennai"
                        >Chennai</nuxt-link
                      >
                    </div>
                  </div>
                </template>
                <template v-if="index !== 0">
                  <div class="hero__text--wrapper">
                    <h1 class="section__title">{{ item.title }}</h1>
                    <p class="section__desc">{{ item.sub_title }}</p>
                  </div>
                </template>
                <button
                  v-b-modal="'video-modal'"
                  class="ta__btn ta__btn--primary mt-5"
                  v-if="item.video_file_url"
                  @click="setVideoUrl(item.youtube_video_url)"
                >
                  <span class="text">Watch Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-indicators">
        <div
          role="button"
          v-for="(item, index) in slides.length"
          aria-label="banner indicators"
          :key="index"
          :id="'banner_indicator_' + index"
          class="banner-indicators-item"
          @click="playCurrent($event)"
        ></div>
      </div>
    </div>
    <div class="scroll-down">
      <a href="#projects" class="icon">
        <img src="~/assets/images/scroll.svg" alt="Tata Intellion" />
      </a>
      <div class="text">Scroll</div>
    </div>
  </section>
</template>

<script>
import { youtube_parser } from "~/middleware/utils";
export default {
  data() {
    return {
      durationArray: [],
      // actual_video: "",
      isPageReady: false,
      activeVideoDuration: 5000,
      togglePlay: false
    };
  },
  computed: {
    slides: function() {
      return this.$store.getters.homePageDetails.banner.slider;
    }
  },
  methods: {
    timeout: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    playVid(index) {
      this.togglePlay = true;
      let vid = document.getElementById("banner-video-" + index);
      vid.play();
    },
    pauseVid(index) {
      this.togglePlay = false;
      let vid = document.getElementById("banner-video-" + index);
      vid.pause();
    },
    playCurrent(event) {
      let videos = $(".banner-slider-item");
      let currentIndicator = event.target.id;
      let currentIndicatorId = currentIndicator.charAt(
        currentIndicator.length - 1
      );
      videos.removeClass("active");
      $(".banner-slider-item:nth-child(" + currentIndicatorId + ")").addClass(
        "active"
      );
    },
    async playIndicators() {
      const that = this;
      let count = -1;
      async function addActiveClassIndicator() {
        // For indicators
        let indicators = $(".banner-indicators-item");
        let textContent = $(".banner-content-item");
        let videoLength = indicators.length - 1;
        let videos2 = $(".banner-slider-item");
        count < videoLength ? count++ : (count = 0);
        textContent
          .removeClass("active")
          .eq(count)
          .addClass("active");
        // For video
        //Check if the actual item isn't more than the length then add 1 otherway restart to 0
        //Remove the class and add it to the new target

        videos2
          .removeClass("active")
          .eq(count)
          .addClass("active");

        // For video length
        [...videos2].forEach((v, index) => {
          if ([...v.classList].indexOf("active") > -1) {
            var x = document.getElementById("banner-video-" + index);
            const vidDuration = [...[...v.children]][0].duration;
            if (vidDuration) x.play();
            that.activeVideoDuration = vidDuration
              ? parseInt(vidDuration * 1000)
              : 5000;
          }
        });

        //Check if the actual item isn't more than the length then add 1 otherway restart to 0
        //Remove the class and add it to the new target
        indicators
          .removeClass("active")
          .eq(count)
          .addClass("active");
        // .css({ animation: "" })
        // .eq(count)
        // .addClass("active")
        // .css({
        //   animation:
        //     "active " + that.activeVideoDuration / 1000 + "s linear infinite",
        // });

        await that.timeout(that.activeVideoDuration);

        addActiveClassIndicator();
      }
      addActiveClassIndicator();
    },
    setVideoUrl(url) {
      let videoId = youtube_parser(url);
      this.$store.commit(
        "updateVideoUrl",
        "https://www.youtube.com/embed/" + videoId + "?autoplay=1"
      );
      // this.actual_video =
      //   "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
    }
  },
  mounted() {
    setTimeout(() => {
      this.playIndicators();
    }, 10);
  }
};
</script>
