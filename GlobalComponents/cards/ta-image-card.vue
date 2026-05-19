<template>
  <div class="ta__card">
    <div class="ta__card--image" v-if="from !== 'sustainability'">
      <img
        :src="image && image.src ? image.src : '~/assets/images/banner_01.jpg'"
        :alt="image && image.alt ? image.alt : 'Tata Intellion'"
        :srcset="$buildImageSrcset(image)"
        data-aos="fade-in"
      />
    </div>
    <div class="ta__card--image" v-if="from === 'sustainability'">
      <img
        :src="
          image.image && image.image.src
            ? image.image.src
            : '~/assets/images/banner_01.jpg'
        "
        :alt="image.image && image.image.alt ? image.image.alt : 'Tata Intellion'"
        :srcset="$buildImageSrcset(image.image)"
        data-aos="fade-in"
      />
    </div>
    <div
      class="csr_activities_slider_content_wrapper"
      v-if="from === 'sustainability'"
    >
      <div class="csr_as_title" data-aos="fade-in">Ramanujan Intellion Park, Chennai</div>
      <div class="csr_as_content" data-aos="fade-in">{{ image.description }}</div>
      <div class="section__btn">
        <ta-cta
          text="VIEW ALL ACTIVITIES"
          type="link"
          btnStyle="ta__btn--primary"
          url="/csr-activities"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    cardStyle: String,
    image: Object,
    from: String
  },
  mounted() {}
};
</script>
