<template>
  <b-tabs
    v-if="filters && filters.project_tag && filters.project_tag.length"
    class="project__tabs"
    id="project__tabs"
    :align="alignLeft ? 'left' : 'right'"
  >
    <b-tab v-for="(tag, index) in filters.project_tag" :title="tag.slug" :key="'tag' + index">
      <slick :options="slickOptions" v-if="isNuxtReady">
        <template v-for="(project, index) in projects.projects_list">
          <ta-primary-card
            :content="project"
            :key="'projects' + index"
            v-if="tag.slug === project.filters.project_tag.slug"
            from="home"
          ></ta-primary-card>
        </template>
      </slick>
    </b-tab>
  </b-tabs>
</template>
<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
import { uniqueByKeepLast } from "~/middleware/utils";
export default {
  data() {
    return {
      isNuxtReady: false,
      alignLeft: false,
      tags: [],
      slickOptions: {
        arrows: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
        nextArrow:
          "<button class='carousel-next ta__btn--navigation' aria-label='Next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev ta__btn--navigation' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: true,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: true,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              arrows: true,
              dots: true,
              centerMode: false,
              variableWidth: true,
              centerPadding: "0",
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  components: {
    slick,
  },
  computed: {
    filters: function () {
      return this.$store.getters.homePageDetails.filters;
    },
    projects: function () {
      //console.log(this.$store.getters.homePageDetails.projects);
      return this.$store.getters.homePageDetails.projects;
    },
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
      this.alignLeft =
        this.$device.isMobileOrTablet && window.innerWidth <= 1200;
    }
  },
};
</script>
