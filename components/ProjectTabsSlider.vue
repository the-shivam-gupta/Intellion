<template>
  <b-tabs
    v-if="filters && filters.project_tag && filters.project_tag.length"
    class="project__tabs"
    id="project__tabs"
    :align="alignLeft ? 'left' : 'right'"
  >
    <b-tab v-for="(tag, index) in filters.project_tag" :title="tag.name" :key="'tag' + index">
      <slick
        :options="slickOptions"
        v-if="isNuxtReady"
        :key="`${tag.slug}-${projectsList.length}`"
      >
        <template v-for="(project, index) in projectsList">
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
export default {
  async fetch() {
    if (!this.$store.state.projects.projects.length) {
      await this.$store.dispatch("projects/getProjects", {
        page_no: 1,
        per_page: 100,
        filter: 1,
      });
    }
  },
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
    projectsList: function () {
      const fromStore = this.$store.state.projects.projects;
      if (Array.isArray(fromStore) && fromStore.length > 0) {
        return fromStore;
      }
      const homeProjects =
        this.$store.getters.homePageDetails.projects.projects_list || [];
      return homeProjects;
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
