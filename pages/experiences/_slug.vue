<template>
  <div id="sustainability-inner-page">
    <template v-if="!$fetchState.pending">
      <section class="section" id="sustainability-inner-banner">
        <ta-hero
          heroStyle="transparent"
          :content="sustainabilityList.banner_section"
          type="four"
        ></ta-hero>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="sus_go_back_next_wrapper">
                <div data-aos="fade-in">
                  <nuxt-link
                    class="a_back"
                    :to="sustainabilityList.banner_section.previous_button.url"
                    v-if="sustainabilityList.banner_section.previous_button.url"
                  >
                    <svg
                      width="19px"
                      height="9px"
                      viewBox="0 0 19 9"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                      <title>Fill 1 Copy</title>
                      <desc>Created with Sketch.</desc>
                      <g
                        id="Projects"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="filter"
                          transform="translate(-11.000000, -26.000000)"
                          fill="#7a6958"
                        >
                          <g id="top-bar">
                            <g
                              id="back"
                              transform="translate(11.000000, 15.000000)"
                            >
                              <path
                                d="M18.9949951,15.5823081 C18.99544,15.5788975 18.9962185,15.5756006 18.9965522,15.5720764 C18.9988878,15.5483162 19,15.5243286 19,15.5001137 C19,15.4758987 18.9988878,15.4519112 18.9965522,15.428151 C18.9962185,15.4246267 18.99544,15.4213299 18.9949951,15.4178056 C18.9927707,15.397456 18.9899902,15.3771063 18.9860975,15.3570977 C18.9588485,15.2213577 18.894007,15.0972135 18.7965779,14.9976252 L15.0891578,11.2080439 C14.9578065,11.0738954 14.7833017,11 14.5976749,11 C14.4119369,11 14.2375433,11.0738954 14.1060808,11.2080439 C13.9748408,11.342306 13.9025475,11.5206781 13.9025475,11.7105323 C13.9025475,11.9003865 13.9748408,12.0787586 14.1060808,12.2129071 L16.6267795,14.7894677 L0.695127377,14.7894677 C0.311861946,14.7894677 0,15.1082409 0,15.5 C0,15.8918728 0.311861946,16.2105323 0.695127377,16.2105323 L16.6267795,16.2105323 L14.1060808,18.7872066 C13.9748408,18.9213551 13.9025475,19.0997272 13.9025475,19.2894677 C13.9025475,19.4793219 13.9748408,19.6578076 14.1060808,19.7919561 C14.2375433,19.9262183 14.4119369,20 14.5976749,20 C14.7833017,20 14.9578065,19.9262183 15.0891578,19.7919561 L18.7965779,16.0024884 C18.894007,15.9030139 18.9588485,15.7788697 18.9857638,15.6439254 C18.9899902,15.623121 18.9927707,15.6027714 18.9949951,15.5823081 Z"
                                id="Fill-1-Copy"
                                transform="translate(9.500000, 15.500000) scale(-1, 1) translate(-9.500000, -15.500000) "
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    {{ sustainabilityList.banner_section.previous_button.text }}
                  </nuxt-link>
                </div>
                <div data-aos="fade-in">
                  <nuxt-link
                    class="a_front"
                    :to="sustainabilityList.banner_section.next_button.url"
                    v-if="sustainabilityList.banner_section.next_button.url"
                  >
                    {{ sustainabilityList.banner_section.next_button.text }}
                    <svg
                      width="19px"
                      height="9px"
                      viewBox="0 0 19 9"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                      <title>Fill 1 Copy</title>
                      <desc>Created with Sketch.</desc>
                      <g
                        id="Projects"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="filter"
                          transform="translate(-11.000000, -26.000000)"
                          fill="#7a6958"
                        >
                          <g id="top-bar">
                            <g
                              id="back"
                              transform="translate(11.000000, 15.000000)"
                            >
                              <path
                                d="M18.9949951,15.5823081 C18.99544,15.5788975 18.9962185,15.5756006 18.9965522,15.5720764 C18.9988878,15.5483162 19,15.5243286 19,15.5001137 C19,15.4758987 18.9988878,15.4519112 18.9965522,15.428151 C18.9962185,15.4246267 18.99544,15.4213299 18.9949951,15.4178056 C18.9927707,15.397456 18.9899902,15.3771063 18.9860975,15.3570977 C18.9588485,15.2213577 18.894007,15.0972135 18.7965779,14.9976252 L15.0891578,11.2080439 C14.9578065,11.0738954 14.7833017,11 14.5976749,11 C14.4119369,11 14.2375433,11.0738954 14.1060808,11.2080439 C13.9748408,11.342306 13.9025475,11.5206781 13.9025475,11.7105323 C13.9025475,11.9003865 13.9748408,12.0787586 14.1060808,12.2129071 L16.6267795,14.7894677 L0.695127377,14.7894677 C0.311861946,14.7894677 0,15.1082409 0,15.5 C0,15.8918728 0.311861946,16.2105323 0.695127377,16.2105323 L16.6267795,16.2105323 L14.1060808,18.7872066 C13.9748408,18.9213551 13.9025475,19.0997272 13.9025475,19.2894677 C13.9025475,19.4793219 13.9748408,19.6578076 14.1060808,19.7919561 C14.2375433,19.9262183 14.4119369,20 14.5976749,20 C14.7833017,20 14.9578065,19.9262183 15.0891578,19.7919561 L18.7965779,16.0024884 C18.894007,15.9030139 18.9588485,15.7788697 18.9857638,15.6439254 C18.9899902,15.623121 18.9927707,15.6027714 18.9949951,15.5823081 Z"
                                id="Fill-1-Copy"
                                transform="translate(9.500000, 15.500000) scale(-1, 1) translate(-9.500000, -15.500000) "
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-padding" id="sus_contennt">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div>
                <div class="sus_inner_title" data-aos="fade-up">
                  Intellion
                  {{ sustainabilityList.filters.project_category.name }},
                  {{ sustainabilityList.filters.city.name }}
                </div>
                <div class="sus_inner_subtitle" data-aos="fade-in">
                  {{ sustainabilityList.introduction_section.description }}
                </div>
              </div>
            </div>
          </div>
          <div class="sus_feat_list">
            <div class="row">
              <div class="col-lg-12">
                <div class="sus_feat_list_title" data-aos="fade-up">
                  {{ sustainabilityList.features_section.title }}
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-6"
                v-for="(feat, index) in sustainabilityList.features_section
                  .features"
                :key="'feat' + index"
              >
                <div class="sus_feat_wrapper" data-aos="fade-in">
                  <div class="feat_bullet">
                    <img src="~/assets/images/bullet.svg" alt />
                  </div>
                  <div class="sus_feat_info">{{ feat }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="certification">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="sus_certification_details">
                <div class="sus_cer_title" data-aos="fade-up">
                  {{ sustainabilityList.certificate_section.title }}
                </div>
                <div class="sus_cer_subtitle" data-aos="fade-in">
                  {{ sustainabilityList.certificate_section.description }}
                </div>
                <div class="explore_desktop_btn">
                  <div class="" data-aos="fade-up">
                    <ta-cta
                      :text="sustainabilityList.certificate_section.button.text"
                      type="link"
                      btnStyle="ta__btn--primary"
                      :url="sustainabilityList.certificate_section.button.url"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="cer_logo_wrapper">
                <div
                  class="cer_logo"
                  v-for="(feat, index) in sustainabilityList.certificate_section
                    .certificates_list"
                  :key="'feat' + index"
                >
                  <img :src="feat.src" alt="" data-aos="fade-in"/>
                </div>
              </div>
              <div class="explore_mobile_btn">
                <div class="">
                  <ta-cta
                    :text="sustainabilityList.certificate_section.button.text"
                    type="link"
                    btnStyle="ta__btn--primary"
                    :url="sustainabilityList.certificate_section.button.url"
                  />
                </div>
                <div>
                  <nuxt-link
                    class="next_project"
                    :to="sustainabilityList.banner_section.next_button.url"
                    v-if="sustainabilityList.banner_section.next_button.url"
                  >
                    {{ sustainabilityList.banner_section.next_button.text }}
                    <svg
                      width="19px"
                      height="9px"
                      viewBox="0 0 19 9"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                      <title>Fill 1 Copy</title>
                      <desc>Created with Sketch.</desc>
                      <g
                        id="Projects"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="filter"
                          transform="translate(-11.000000, -26.000000)"
                          fill="#7a6958"
                        >
                          <g id="top-bar">
                            <g
                              id="back"
                              transform="translate(11.000000, 15.000000)"
                            >
                              <path
                                d="M18.9949951,15.5823081 C18.99544,15.5788975 18.9962185,15.5756006 18.9965522,15.5720764 C18.9988878,15.5483162 19,15.5243286 19,15.5001137 C19,15.4758987 18.9988878,15.4519112 18.9965522,15.428151 C18.9962185,15.4246267 18.99544,15.4213299 18.9949951,15.4178056 C18.9927707,15.397456 18.9899902,15.3771063 18.9860975,15.3570977 C18.9588485,15.2213577 18.894007,15.0972135 18.7965779,14.9976252 L15.0891578,11.2080439 C14.9578065,11.0738954 14.7833017,11 14.5976749,11 C14.4119369,11 14.2375433,11.0738954 14.1060808,11.2080439 C13.9748408,11.342306 13.9025475,11.5206781 13.9025475,11.7105323 C13.9025475,11.9003865 13.9748408,12.0787586 14.1060808,12.2129071 L16.6267795,14.7894677 L0.695127377,14.7894677 C0.311861946,14.7894677 0,15.1082409 0,15.5 C0,15.8918728 0.311861946,16.2105323 0.695127377,16.2105323 L16.6267795,16.2105323 L14.1060808,18.7872066 C13.9748408,18.9213551 13.9025475,19.0997272 13.9025475,19.2894677 C13.9025475,19.4793219 13.9748408,19.6578076 14.1060808,19.7919561 C14.2375433,19.9262183 14.4119369,20 14.5976749,20 C14.7833017,20 14.9578065,19.9262183 15.0891578,19.7919561 L18.7965779,16.0024884 C18.894007,15.9030139 18.9588485,15.7788697 18.9857638,15.6439254 C18.9899902,15.623121 18.9927707,15.6027714 18.9949951,15.5823081 Z"
                                id="Fill-1-Copy"
                                transform="translate(9.500000, 15.500000) scale(-1, 1) translate(-9.500000, -15.500000) "
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        id="sus_inner_quotes"
        v-if="sustainabilityList.testimonials_section.testimonials.length > 0"
      >
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6"
              v-for="(feat, index) in sustainabilityList.testimonials_section
                .testimonials"
              :key="'feat' + index"
            >
              <div class="quotes_wrapper">
                <div class="sus_quotes_img">
                  <img src="~/assets/images/quotes.svg" alt="" />
                </div>
                <div>
                  <div class="sus_quotes_info" data-aos="fade-up">
                    {{ feat.testimonial }}
                  </div>
                  <div class="testimonial_logo" data-aos="fade-in">
                    <img :src="feat.logo.src" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-lg-6">
              <div class="quotes_wrapper">
                <div class="sus_quotes_img">
                  <img src="~/assets/images/quotes.svg" alt="" />
                </div>
                <div>
                  <div class="sus_quotes_info">
                    Intellion Park is a biophilic landscape designed to provide a
                    nurturing environment.
                  </div>
                  <img src="https://via.placeholder.com/50" alt="" />
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </section>

      <!-- News section -->
      <section class="section" id="news">
        <NewsSection :newslist="sustainabilityList.latest_news_section.news" />
      </section>
    </template>

    <template v-if="$fetchState.pending">
      <section class="section">
        <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader
                class="mt-2"
                width="50"
                height="5"
              ></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-3"
                width="100"
                height="15"
              ></ta-skeleton-loader>
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
export default {
  async fetch() {
    const { params, store, router } = this.$nuxt.context;
    let newparams = {
      filter: 1,
      slug: params.sustainability
      // project_city: params.city,
    };
    await store.dispatch("sustainability/getSustainabilityList", params);
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en"
      },
      title: this.sustainabilityList.filters
        ? "Tata Intellion - " + this.sustainabilityList.filters.project_category.name + " " + this.sustainabilityList.filters.city.name
        : "Tata Intellion",
      meta: this.$store.state.meta
    };
  },
  data() {
    return {
      sustainabilityData: null,
      hero_section: {
        title: "",
        description: "",
        background_image: {
          alt: "",
          src:
            "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai.jpg",
          ID: 667,
          sizes: {
            thumbnail:
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai-150x150.jpg",
            "thumbnail-width": 150,
            "thumbnail-height": 150,
            medium:
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai-300x115.jpg",
            "medium-width": 300,
            "medium-height": 115,
            medium_large:
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai-768x293.jpg",
            "medium_large-width": 580,
            "medium_large-height": 221,
            large:
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai-1024x391.jpg",
            "large-width": 580,
            "large-height": 221,
            "1536x1536":
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai.jpg",
            "1536x1536-width": 1440,
            "1536x1536-height": 550,
            "2048x2048":
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai.jpg",
            "2048x2048-width": 1440,
            "2048x2048-height": 550,
            "post-thumbnail":
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai-1200x458.jpg",
            "post-thumbnail-width": 1200,
            "post-thumbnail-height": 458,
            "twentytwenty-fullscreen":
              "https://intellion.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/07/banneriamge-park-navimumbai.jpg",
            "twentytwenty-fullscreen-width": 1440,
            "twentytwenty-fullscreen-height": 550
          }
        }
      }
    };
  },
  computed: {
    sustainabilityList: function() {
      return this.$store.state.sustainability.sustainabilities_list;
    }
  },
  mounted() {
    console.log(this.sustainabilityList);
    scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>
