<template>
  <div id="sustainability">
    <template v-if="!$fetchState.pending">
      <section class="section">
        <ta-hero
          heroStyle="transparent"
          :content="pageDetails.banner_section"
          type="four"
        ></ta-hero>
      </section>

      <section class="section" v-if="pageDetails.tab_section">
        <ta-pagemarks
          :content="pageDetails.tab_section.tabs_list"
          :isLogo="false"
        />
      </section>

      <!-- Introduction section -->
      <section
        class="section section-padding history custom-margin"
        id="introduction"
      >
        <div class="container">
          <div class="row" data-aos="fade-in">
            <ta-breadcrumb
            id="breadcrumb"
            :content="pageDetails.banner_section.title"
            />
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class>
                <div class="section__heading">
                  <h2 class="section__title" data-aos="fade-in">
                    {{ pageDetails.introduction_tab.title }}
                  </h2>
                </div>
                <div
                  class="section__content"
                  v-html="pageDetails.introduction_tab.description"
                  data-aos="fade-in"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quotes section -->
      <section class="section section_quote" id="quote" data-aos="fade-in">
        <div class="container quote_desktop_container">
          <div class="row">
            <div class="col-lg-5">
              <div>
                <div class="quote_icon" data-aos="fade-up">
                  <!-- <?xml version="1.0" encoding="UTF-8"?> -->
                  <svg
                    width="36px"
                    height="31px"
                    viewBox="0 0 36 31"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
                    <title>"</title>
                    <desc>Created with Sketch.</desc>
                    <g
                      id="Homepage"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="TATA-Intellion-Website_Desktop_o2_v5"
                        transform="translate(-436.000000, -2174.000000)"
                      >
                        <g
                          id="testimonials"
                          transform="translate(194.000000, 2174.000000)"
                        >
                          <g
                            id="title"
                            transform="translate(158.000000, 0.000000)"
                          >
                            <text
                              id="What-are-clients-are"
                              font-family="Bitter-Regular, Bitter"
                              font-size="32"
                              font-weight="normal"
                              line-spacing="43"
                              letter-spacing="1"
                              fill="#363E4A"
                            >
                              <tspan x="144.304" y="45">
                                What are clients are saying
                              </tspan>
                            </text>
                            <path
                              d="M119.265625,30.8574219 L119.265625,17.6328125 L113.606445,17.6328125 L113.606445,16.2626953 C113.606445,13.0458984 113.953939,10.4545898 114.648926,8.48876953 C115.343913,6.52294922 116.386393,5.16276042 117.776367,4.40820312 L117.776367,4.40820312 L117.776367,0 C113.844727,0.992838542 110.905924,3.23665365 108.959961,6.73144531 C107.013997,10.226237 106.041016,14.9720052 106.041016,20.96875 L106.041016,20.96875 L106.041016,30.8574219 L119.265625,30.8574219 Z M97.2246094,30.8574219 L97.2246094,17.6328125 L91.5654297,17.6328125 L91.5654297,16.2626953 C91.5654297,13.0458984 91.9129232,10.4545898 92.6079102,8.48876953 C93.3028971,6.52294922 94.3453776,5.16276042 95.7353516,4.40820312 L95.7353516,4.40820312 L95.7353516,0 C91.8037109,0.992838542 88.8649089,3.23665365 86.9189453,6.73144531 C84.9729818,10.226237 84,14.9720052 84,20.96875 L84,20.96875 L84,30.8574219 L97.2246094,30.8574219 Z"
                              id
                              fill="#CBBBA0"
                              fill-rule="nonzero"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div class="quote_content" data-aos="fade-up">
                  In a free enterprise, the community is not just another
                  stakeholder in business; but is in fact the very purpose of
                  its existence.
                </div>
                <div class="quote_by" data-aos="fade-up">Jamsetji Tata</div>
              </div>
            </div>
          </div>
        </div>
        <div class="quote_mobile_container">
          <img
            src="~/assets/images/sustainability-mobile-jamshetji-tata-quote.jpg"
            alt="jamsetji-tata"
          />
        </div>
      </section>

      <!-- CSR section -->
      <section class="section" id="csr-activities">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-12"
              :class="$device.isMobile ? 'text-left' : 'text-center'"
            >
              <div class="section__wrapper">
                <ta-heading
                  :subtitle="pageDetails.csr_activities_section.sub_title"
                  :title="pageDetails.csr_activities_section.title"
                  :isTrans="true"
                  :transhead="
                    pageDetails.csr_activities_section.background_title
                  "
                  data-aos="fade-up"
                ></ta-heading>
                <div class="section__content">
                  <p class="ta__para" data-aos="fade-up">
                    {{ pageDetails.csr_activities_section.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="history__slider">
          <imageSlider
            id="csr-activities-slider"
            type="full"
            from="sustainability"
            :show="3"
            :content="pageDetails.csr_activities_section.activities_list"
          />
        </div>
        <div class="section__btn text-center" data-aos="fade-up">
          <!-- <ta-cta
            :text="pageDetails.csr_activities_section.button.text"
            type="link"
            btnStyle="ta__btn--primary"
            :url="pageDetails.csr_activities_section.button.url"
          /> -->
        </div>
      </section>

      <!-- Projects section -->
      <section class="section" id="project-features">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-12"
              :class="$device.isMobile ? 'text-left' : 'text-center'"
            >
              <div class="">
                <ta-heading
                  :subtitle="pageDetails.project_feature_section.sub_title"
                  :title="pageDetails.project_feature_section.title"
                  :isTrans="true"
                  :transhead="
                    pageDetails.project_feature_section.background_title
                  "
                  data-aos="fade-up"
                ></ta-heading>
                <div class="section__content">
                  <p class="ta__para" data-aos="fade-up">
                    {{ pageDetails.project_feature_section.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- project slick -->
        <slick
          :options="
            pageDetails.project_feature_section.projects_list.length > 2
              ? slickOptions
              : pageDetails.project_feature_section.projects_list.length > 1
              ? slickOptionsTwo
              : slickOptionsThree
          "
          v-if="isNuxtReady"
        >
          <template
            v-for="(project, index) in pageDetails.project_feature_section
              .projects_list"
          >
            <ta-sustainability-card
              :content="{
                ...project,
                hero_section: { description: project.short_description },
              }"
              :key="'projects' + index"
            ></ta-sustainability-card>
          </template>
        </slick>
      </section>
      <br />

      <!-- News section -->
      <section class="section" id="news">
        <NewsSection :newslist="pageDetails.latest_news_section.news" />
      </section>
    </template>

    <template v-if="$fetchState.pending">
      <section class="section">
        <ta-skeleton-loader width="100" height="700"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="15"
              ></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="15"
              ></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="15"
              ></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="15"
              ></ta-skeleton-loader>
            </div>
            <div class="col-lg-6 col-sm-6">
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-lg-4">
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="400"
              ></ta-skeleton-loader>
            </div>
            <div class="col-lg-4">
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="400"
              ></ta-skeleton-loader>
            </div>
            <div class="col-lg-4">
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="400"
              ></ta-skeleton-loader>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
import ImageSlider from "~/components/ImageSlider";
import NewsSection from "~/components/NewsSection";
export default {
  async fetch() {
    const { params, store } = this.$nuxt.context;
    await store.dispatch("sustainability/getSustainabilityPage");
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.$store.state.metaTitle || "TATA Intellion - Sustainability",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      isNuxtReady: false,
      subscription_section: {
        title:
          "Get the latest stories and announcements from Intellion in your inbox.",
        subscription_options: ["News Alert", "Events", "Press Release"],
        subscription_note:
          "By clicking Subscribe you’ll receive occasional emails from Intellion. You always have the choice to adjust your interest settings or unsubscribe.",
      },
      countryLabel: "LATEST",
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
              slidesToShow: 1,
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
  computed: {
    projects_list: function () {
      return this.$store.getters.homePageDetails.projects.projects_list;
    },
    pageDetails: function () {
      return this.$store.state.sustainability.sustainabilities;
    },
  },
  methods: {
    setCountryLabel(arg) {
      this.countryLabel = arg.label;
    },
  },
  components: {
    ImageSlider,
    slick,
    NewsSection
    // ProjectSlider,
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
    }
    scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>
