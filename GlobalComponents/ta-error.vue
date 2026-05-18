<template>
  <div class="page-margin" id="error-page">
    <section class="section section-padding error-section thank-you">
      <div class="container">
        <div class="row cust_row">
          <!-- <div class="col-lg-12">
            <div class="section__heading">
              <h1 class="section__title">{{ statusString }}</h1>
              <h3 class="ta__h3" v-if="statusString === 404">Page not found</h3>
              <h3 class="ta__h3" v-else>Oops Something went wrong!</h3>
              <div class="section__content">
                <div class="text-center">
                  <ta-cta
                    text="EXPLORE HOMEPAGE"
                    btnStyle="ta__btn--primary"
                    type="link"
                    url="/"
                    :isicon="false"
                  ></ta-cta>
                </div>
              </div>
            </div>
          </div> -->
          <div class="col-lg-4 offset-lg-1">
            <div class="section__heading">
              <!-- <h1 class="section__title">{{ statusString }}</h1> -->
              <div class="four_zero_four_text">
                <img src="~/assets/images/404_text@2x.png" alt="" />
              </div>
              <!-- <h3 class="ta__h3" v-if="statusString === 404">Page not found</h3> -->
              <!-- <h3 class="ta__h3" v-else>Oops Something went wrong!</h3> -->
              <!-- <div class="section__content">
                <div class="text-center">
                  <ta-cta
                    text="EXPLORE HOMEPAGE"
                    btnStyle="ta__btn--primary"
                    type="link"
                    url="/"
                    :isicon="false"
                  ></ta-cta>
                </div>
              </div> -->
            </div>
          </div>
          <div class="col-lg-4 offset-lg-1">
            <div class="page_not_exist_wrapper">
              <div class="pg_nt_title">This page does not exist</div>
              <div class="pg_nt_subtitle">
                Check the correctness of the entered link or go to the main page
                of the site.
              </div>
              <div class="">
                <ta-cta
                  text="BACK TO HOMEPAGE"
                  type="link"
                  btnStyle="ta__btn--primary"
                  url="/"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <NewsSection /> -->

    <!-- Projects section -->
    <section
      class="section projects-section"
      id="project-features"
      v-if="projects_list"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="news_type">
              <div>
                <div class="news_type_title">
                  You couldn’t find what you’re looking for
                </div>
                <div class="news_type_subtitle">
                  Maybe it’s out there, somewhere. Enjoy browsing through these properties and find something you never knew you were looking for.
                </div>
              </div>
              <div class="nt_view all_proj_desk_btn">
                <nuxt-link to="/commercial-projects">ALL PROJECTS</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- project slick -->
      <div class="slick_wrapper">
        <slick
          :options="
            projects_list.length > 2
              ? slickOptions
              : projects_list.length > 1
              ? slickOptionsTwo
              : slickOptionsThree
          "
          v-if="isNuxtReady"
        >
          <template v-for="(project, index) in projects_list">
            <ta-search-projects-card
              :content="{
                ...project,
              }"
              :key="'projects' + index"
            ></ta-search-projects-card>
          </template>
        </slick>
      </div>

      <div class="nt_view all_proj_mob_btn">
        <nuxt-link to="/commercial-projects">ALL PROJECTS</nuxt-link>
      </div>
    </section>
  </div>
</template>
<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
export default {
  head() {
    return {
      title: "TATA Intellion - 404 Not Found",
    };
  },
  data: () => {
    return {
      isNuxtReady: false,
      statusString: 404,
      slickOptions: {
        arrows: false,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        // variableWidth: true,
        centerPadding: "5%",
        nextArrow:
          "<button class='carousel-next ta__btn--navigation' aria-label='Next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev ta__btn--navigation' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              dots: false,
              slidesToShow: 2,
              slidesToScroll: 1,
              centerPadding: "10px",
            },
          },
          {
            breakpoint: 767,
            settings: "unslick",
          },
        ],
      },
      slickOptionsTwo: {
        arrows: false,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        // variableWidth: true,
        centerPadding: "5%",
        nextArrow:
          "<button class='carousel-next ta__btn--navigation' aria-label='Next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev ta__btn--navigation' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              dots: false,
              slidesToShow: 2,
              slidesToScroll: 1,
              centerPadding: "10px",
            },
          },
          {
            breakpoint: 767,
            settings: "unslick",
          },
        ],
      },
      slickOptionsThree: {
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        // variableWidth: true,
        centerPadding: "5%",
        nextArrow:
          "<button class='carousel-next ta__btn--navigation' aria-label='Next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev ta__btn--navigation' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              dots: false,
              slidesToShow: 2,
              slidesToScroll: 1,
              centerPadding: "10px",
            },
          },
          {
            breakpoint: 767,
            settings: "unslick",
          },
        ],
      },
    };
  },
  components: {
    slick,
  },
  computed: {
    projects_list: function () {
      return this.$store.getters.homePageDetails.projects.projects_list;
    },
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
    }
    if (this.$route.query.status) {
      this.statusString = this.$route.query.status;
    }
  },
};
</script>
