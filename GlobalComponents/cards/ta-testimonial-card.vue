<template>
  <div class="ta__card testimonial">
    <div class="ta__card--image">
      <img :src="content.tenant_avatar.src" :alt="content.tenant_avatar.alt" data-aos="fade-in"/>
      <button
        class="ta__btn--video"
        v-if="content.testimony_video_url !== ''"
        v-b-modal="'video-modal'"
        @click="openVideoModal(content.testimony_video_url)"
      >
        <span class="ta__play">
          <span class="icon-play"></span>
        </span>
        <span>Watch Video</span>
      </button>
    </div>
    <div class="ta__card--body">
      <div class="ta__card--title">
        <!-- <h4 class="ta__h4 pinkish-grey" data-aos="fade-up">TESTIMONIALS OF OUR TENANTS</h4> -->
        <div class="ta__h3" data-aos="fade-up">{{content.testimony}}</div>
      </div>
      <div class="ta__card--text">
        <div class="name" data-aos="fade-up">{{content.tenant_name}}</div>
        <div class="designation" data-aos="fade-up">{{content.tenant_designation}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { youtube_parser } from "~/middleware/utils";
export default {
  props: {
    content: Object,
    url: String,
  },
  data() {
    return {
      actual_video: null,
    };
  },
  methods: {
    openVideoModal(url) {
      let videoId = youtube_parser(url);
      this.$store.commit(
        "updateVideoUrl",
        "https://www.youtube.com/embed/" + videoId + "?autoplay=1"
      );
    },
  },
};
</script>
