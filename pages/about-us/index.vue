<template>
  <div id="about-page">
    <template v-if="!$fetchState.pending">
      <section class="section" data-aos="slide-up">
        <ta-hero heroStyle="leftText" type="two" :content="pageDetails.hero_section"></ta-hero>
      </section>
      <section class="section">
        <ta-pagemarks :content="pagemarks" :isLogo="false" />
      </section>
      <section class="section section-padding history custom-margin" id="history">
        <div class="container">
          <div class="row" data-aos="slide-up">
              <div class="section__wrapper">
                <ta-breadcrumb
                id="breadcrumb"
                :content="pageDetails.hero_section.sub_title"
                />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="section__wrapper">
                <div class="section__heading" data-aos="slide-up">
                  <h2
                    class="section__title"
                    v-if="pageDetails.history_section.heading"
                  >{{ pageDetails.history_section.heading }}</h2>
                </div>
                <div
                  class="section__content"
                  v-if="!$device.isMobile"
                  v-html="pageDetails.history_section.content"
                  data-aos="slide-up"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="history__slider">
          <imageSlider
            type="full"
            :show="3"
            id="history"
            :content="pageDetails.history_section.images"
          />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div
                class="section__content"
                v-if="$device.isMobile"
                v-html="pageDetails.history_section.content"
                data-aos="slide-up"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="projects">
        <div class="container">
          <div class="row">
            <div class="col-lg-12" :class="$device.isMobile ? 'text-left' : 'text-center'">
              <div class="section__wrapper">
                <ta-heading
                  :subtitle="pageDetails.project_section.sub_title"
                  :title="pageDetails.project_section.title"
                  :isTrans="true"
                  :transhead="pageDetails.project_section.background_title"
                ></ta-heading>
                <div class="section__btn">
                  <ta-cta
                    text="Explore Projects"
                    type="link"
                    btnStyle="ta__btn--primary"
                    url="/commercial-projects"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="work-slider" data-aos="slide-up">
          <ProjectSlider :projects="pageDetails.project_section.projects" />
        </div>
      </section>
      <section
        class="section section-padding"
        id="partners"
        v-if="pageDetails.partners_section.partners_logo.constuction_partners_logo.length > 0 || pageDetails.partners_section.partners_logo.design_partners_logo.length > 0 "
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section__heading">
                <h4 class="section__subtitle" data-aos="fade-up">{{ pageDetails.partners_section.sub_title }}</h4>
                <h2 class="section__title" data-aos="fade-up">{{ pageDetails.partners_section.title }}</h2>
                <div class="section__content" data-aos="fade-up">
                  <p class="ta__para">{{ pageDetails.partners_section.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <b-tabs
                class="partner__tabs"
                id="partner-slider"
                :align="alignLeft ? 'left' : 'right'"
                data-aos="fade-in"
              >
                <b-tab
                  title="Design"
                  v-if="pageDetails.partners_section.partners_logo.design_partners_logo.length"
                >
                  <imageSlider
                    type="fit"
                    :show="5"
                    id="designpartners"
                    :content="pageDetails.partners_section.partners_logo.design_partners_logo"
                  />
                </b-tab>
                <b-tab
                  title="Construction"
                  v-if="pageDetails.partners_section.partners_logo.constuction_partners_logo.length > 0"
                >
                  <imageSlider
                    type="fit"
                    :show="5"
                    id="constructionpartners"
                    :content="pageDetails.partners_section.partners_logo.constuction_partners_logo"
                  />
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="advantage">
        <ta-highlight-section :content="pageDetails.intellion_advantage_section" has="points"></ta-highlight-section>
      </section>
      <section class="section section-padding" id="key-persons">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="section__heading">
                <h4 class="section__subtitle" data-aos="slide-up">{{ pageDetails.key_person_section.sub_title }}</h4>
                <h2 class="section__title" data-aos="slide-up">{{ pageDetails.key_person_section.title }}</h2>
                <div class="section__content" data-aos="slide-up">
                  <div class="section__image">
                    <img
                      :src="pageDetails.key_person_section.featured_image.src"
                      alt="Tata Intellion"
                    />
                  </div>
                  <p class="ta__para">{{ pageDetails.key_person_section.description }}</p>
                </div>
                <div class="section__btn" data-aos="slide-up">
                  <ta-cta
                    text="EXPLORE OUR TEAM"
                    type="link"
                    btnStyle="ta__btn--primary"
                    url="/leadership"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="section__image" data-aos="fade-in">
                <img :src="pageDetails.key_person_section.featured_image.src" alt="Tata Intellion" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-if="$fetchState.pending">
      <section class="section">
        <ta-skeleton-loader width="100" height="700"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-lg-12">
              <div class="width-80">
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
import ImageSlider from "~/components/ImageSlider";
import ProjectSlider from "~/components/ProjectSlider";
export default {
  async fetch() {
    const { params, store } = this.$nuxt.context;
    await store.dispatch("about/getAboutPage");
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.$store.state.metaTitle || "TATA Intellion - About Us",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      alignLeft: false,
    };
  },
  computed: {
    pageDetails: function () {
      return this.$store.state.about.aboutPage;
    },
    pagemarks: function () {
      return this.$store.state.about.aboutPage.tab_section.tabs_list;
    },
  },
  components: {
    ImageSlider,
    ProjectSlider,
  },
  mounted() {
    if (process.browser) {
      this.alignLeft =
        this.$device.isMobileOrTablet && window.innerWidth <= 1024;
    }
    scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>
