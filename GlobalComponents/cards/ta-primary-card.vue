<template>
  <!-- cards for projects -->
  <div>
    <template>
      <nuxt-link
        :to="projectUrl || '/commercial-projects'"
        class="ta__card primary"
        :class="$device.isMobileOrTablet?'is_touch':'' "
      >
        <div class="ta__card--image" data-aos="fade-in" index>
          <img v-if="content.feature_image && content.feature_image.src"
            :src="content.feature_image.src"
            :srcset="$buildImageSrcset(content.feature_image)"
            :sizes="$buildImageSizes('projectCard')"
            :alt="(content.feature_image.alt) ? content.feature_image.alt : 'blank alt'"
          />
          <div class="tag" v-if="content.filters.project_tag && content.filters.project_tag.name">{{ content.filters.project_tag.name }}</div>
        </div>
        <div class="ta__card--body">
          <div class="category" data-aos="fade-up" v-if="categoryName && cityName">
            INTELLION {{ categoryName }} |
            {{ cityName }}
          </div>
          <h3 class="ta__card--title" v-if="content.hero_section && content.hero_section.title" data-aos="fade-up">{{ content.hero_section.title }}</h3>
          <p class="ta__card--text" v-if="from !== 'home'" data-aos="fade-up">{{ content.hero_section.description }}</p>

          <ta-cta
            text="EXPLORE PROJECT"
            btnStyle="ta__btn--primary"
            :url="projectUrl || '/commercial-projects'"
          ></ta-cta>
        </div>
      </nuxt-link>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    content: Object,
    from: String,
  },
  computed: {
    projectUrl() {
      const content = this.content || {};
      const filters = content.filters || {};
      const city = filters.city || {};
      if (city && city.slug && content.project_slug) {
        return `/commercial-projects/${city.slug}/${content.project_slug}`;
      }
      return null;
    },
    cityName() {
      const filters = (this.content && this.content.filters) || {};
      return filters.city && filters.city.name ? filters.city.name : null;
    },
    categoryName() {
      const filters = (this.content && this.content.filters) || {};
      return filters.project_category && filters.project_category.name ? filters.project_category.name : null;
    },
  },
  mounted() {},
};
</script>
