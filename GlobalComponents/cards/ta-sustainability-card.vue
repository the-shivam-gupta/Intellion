<template>
  <!-- cards for projects -->
  <div>
    <template>
      <div
        class="ta__card primary"
        :class="$device.isMobileOrTablet ? 'is_touch' : ''"
      >
        <div class="ta__card--image" style="background-color: #ccc">
          <img
            v-if="content.feature_image && content.feature_image.src"
            :src="content.feature_image.src"
            :srcset="$buildImageSrcset(content.feature_image)"
            :sizes="$buildImageSizes('projectCard')"
            :alt="(content.feature_image.alt!='')?content.feature_image.alt:'Tata Intellion'"
            data-aos="fade-in"
          />
          <!-- <div class="tag" v-if="content.filters.project_tag && content.filters.project_tag.name">{{ content.filters.project_tag.name }}</div> -->
        </div>
        <div
          class="ta__card--body"
          v-if="content.filters.project_category && content.filters.city"
        >
          <div class="category" data-aos="fade-up">
            INTELLION {{ content.filters.project_category.name }} |
            {{ content.filters.city.name }}
          </div>
          <!-- <h3 class="ta__card--title" v-if="content.hero_section && content.hero_section.title">{{ content.hero_section.title }}</h3> -->
          <p class="ta__card--text" data-aos="fade-up">{{ content.hero_section.description }}</p>

          <ta-cta
            text="EXPLORE"
            btnStyle="ta__btn--primary"
            :url="'/sustainability/' + content.slug"
            type="link"
          ></ta-cta>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    content: Object,
    from: String
  },
  mounted() {}
};
</script>
