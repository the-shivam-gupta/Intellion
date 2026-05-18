<template>
  <div id="newsroom-page">
    <template v-if="!$fetchState.pending">
      <section class="section">
        <ta-hero heroStyle="leftText" :content="pageDetails.banner_section" type="one"></ta-hero>
      </section>

      <div id="pagetabs">
        <!--<b-tabs
          content-class="ta__pagetabs--content"
          class="ta__pagetabs"
          align="center"
          v-model="activeNewsTab"
        >-->
        <div class="container">
          <div class="row" data-aos="fade-in">
            <ta-breadcrumb id="breadcrumb" :content="pageDetails.banner_section.title" />
          </div>
        </div>
        <!--<b-tab title="Latest News" active @click="scrollToTargetAdjusted()">-->
        <div class="section-news-types">
          <div class="container">
            <div class="container_brbt container_brbt--two container_brbt--three">
              <div class="row">
                <div class="col-lg-12">
                  <div class="news_type">
                    <div class="news_type_title">
                      The universal values that guide us
                    </div>
                    <p>Tata Realty's Code of Conduct is a comprehensive document that serves as a guideline to its
                      employees. Tata group has been led by visionaries who have stayed true to the vision of the
                      founder,
                      Jamsetji Tata.</p>
                    <!--<div class="nt_view">
                          <button type="button" @click="openTab(1)">
                            {{ pageDetails.sections.corporate_social_responsibility.button.text }}
                          </button>
                        </div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- CSR -->
        <section class="section section-news-types custom-fade-in"
          v-if="pageDetails.sections && pageDetails.sections.code_of_conducts">
          <div class="container">
            <div class="container_brbt container_brbt--two container_brbt--three pt-0">
              <!-- <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title"></div>
                        
                        <div class="nt_view">
                          <button type="button" @click="openTab(1)">
                            {{ pageDetails.sections.corporate_social_responsibility.button.text }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> -->
              <div class="row">
                <div class="col-lg-4 col-md-6" v-for="(item, index) in latestCoc" :key="'latest-policies' + index">
                  <ta-coc-info-card :content="item"></ta-coc-info-card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- CSR -->

        <!--</b-tab>-->

        <!-- Media Tab --
          <b-tab title="Media Releases" @click="slicePage(1, 'media') ; scrollToTargetAdjusted()">
            <section class="section section-news-types" id="mediaTab" ref="mediaTab">
              <div class="container">
                <div
                  class="container_brbt container_brbt--two container_brbt--four"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type news_type--two">
                        <div class="news_type_title">Media Releases</div>
                        <div>
                          <b-dropdown
                            split
                            id="dropdown-media"
                            :text="yearLabel.media"
                            class="ta__dropdown"
                          >
                            <b-dropdown-item
                              @click="setYear(item, 'media')"
                              v-for="(item, index) in years"
                              :key="index"
                              >{{ item }}</b-dropdown-item
                            >
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-12"
                      v-for="(item, index) in mediaData"
                      :key="'media-' + index"
                    >
                      <ta-media-card
                        :content="item"
                        from="Media_Two"
                      ></ta-media-card>
                    </div>
                  </div>
                  <div class="row" v-if="mediaData.length !== 0">
                    <div class="col-lg-12">
                      <div class="pagination_wrapper">
                        <div class="overflow-auto">
                          <b-pagination
                            v-model="mediaPagination.currentPage"
                            @change="setPage($event, 'media')"
                            :total-rows="mediaPagination.rows"
                            :per-page="mediaPagination.perPage"
                            first-number
                            last-number
                            aria-controls="my-table"
                          >
                            <template v-slot:prev-text>
                              <img
                                src="~/assets/images/page_left.svg"
                                alt="Prev"
                              />
                            </template>
                            <template v-slot:next-text>
                              <img
                                src="~/assets/images/page_right.svg"
                                alt="Next"
                              />
                            </template>
                          </b-pagination>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </b-tab>
          -- Media Tab -->

        <!-- Policies Tab -->
        <!--<b-tab title="Policies" @click="slicePage(1, 'policies') ; scrollToTargetAdjusted()">
            <section class="section section-news-types" id="policiesTab" ref="policiesTab">
              <div class="container">
                <div
                  class="container_brbt container_brbt--two container_brbt--four"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type news_type--two">
                        <div class="news_type_title">Policies</div>
                        <div>
                          <b-dropdown
                            split
                            id="dropdown-policies"
                            :text="yearLabel.policy"
                            class="ta__dropdown"
                          >
                            <b-dropdown-item
                              @click="setYear(item, 'policies')"
                              v-for="(item, index) in years"
                              :key="index"
                              >{{ item }}</b-dropdown-item
                            >
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in policiesData"
                      :key="'policies' + index"
                    >
                      <ta-policy-card :content="item"></ta-policy-card>
                    </div>
                  </div>
                  <div class="row" v-if="policiesData.length !== 0">
                    <div class="col-lg-12">
                      <div class="pagination_wrapper">
                        <div class="overflow-auto">
                          <b-pagination
                            v-model="policiesPagination.currentPage"
                            @change="setPage($event, 'policies')"
                            :total-rows="policiesPagination.rows"
                            :per-page="policiesPagination.perPage"
                            first-number
                            last-number
                            aria-controls="my-table"
                          >
                            <template v-slot:prev-text>
                              <img
                                src="~/assets/images/page_left.svg"
                                alt="Prev"
                              />
                            </template>
                            <template v-slot:next-text>
                              <img
                                src="~/assets/images/page_right.svg"
                                alt="Next"
                              />
                            </template>
                          </b-pagination>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </b-tab> -->
        <!-- Policies Tab -->
        <!--</b-tabs>-->
      </div>

      <ta-subscription :content="subscription_section"></ta-subscription>
    </template>

    <template v-if="$fetchState.pending">
      <section class="section">
        <ta-skeleton-loader width="100" height="700"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
              <ta-skeleton-loader class="mt-2" width="100" height="15"></ta-skeleton-loader>
            </div>
            <div class="col-lg-6 col-sm-6">
              <div class="mt-3">
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
              </div>
              <div class="mt-3">
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader width="100" height="10"></ta-skeleton-loader>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-lg-4">
              <ta-skeleton-loader class="mt-2" width="100" height="400"></ta-skeleton-loader>
            </div>
            <div class="col-lg-4">
              <ta-skeleton-loader class="mt-2" width="100" height="400"></ta-skeleton-loader>
            </div>
            <div class="col-lg-4">
              <ta-skeleton-loader class="mt-2" width="100" height="400"></ta-skeleton-loader>
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
      const {
        params,
        store
      } = this.$nuxt.context;
      this.pageDetails = await store.dispatch("code-of-conduct/getCocInfoPage");
      //console.log(this.pageDetails, "Fetch");
      // if (!!this.pageDetails) {
      // latest press
      // latest Policies
      this.latestCoc = this.pageDetails.sections.code_of_conducts.items; //.slice(0,3);






    },
    head() {
      return {
        htmlAttrs: {
          lang: "en"
        },
        title: "TATA Intellion - Code of Conduct",
        meta: this.$store.state.meta,
        link: [
          { rel: 'canonical', href: `https://www.intellion.in${this.$route.fullPath}` }
        ]
      };
    },
    data() {
      return {
        pageDetails: {},
        latestCoc: [],

        activeNewsTab: 0,
        subscription_section: {
          title: "Get the latest stories and announcements from Intellion in your inbox.",
          subscription_options: ["News Alert", "Events", "Press Release"],
          subscription_note: "By clicking Subscribe you'll receive occasional emails from Intellion. You always have the choice to adjust your interest settings or unsubscribe.",
        },
      };
    },

    computed: {},
    methods: {
      openTab(index) {
        this.activeNewsTab = index;
        this.slicePage(1, "policies");
        this.slicePage(1, "csr");
        // scrollTo({ top: 0, behavior: "smooth" });
        this.scrollToTargetAdjusted();
      },


      scrollToTargetAdjusted() {
        // if (id) {
        //   let element = document.querySelectorAll(id);
        //   if (element) {
        //     let elementOffset = element[0].offsetTop;
        //     element[0].scrollTo({ behavior: "smooth", block: "center" });
        //     if (window.innerWidth <= 768) {
        //       window.scrollTo(0, elementOffset - 125);
        //     } else if (window.innerWidth <= 1024) {
        //       window.scrollTo(0, elementOffset - 135);
        //     } else {
        //       window.scrollTo(0, elementOffset - 125);
        //     }
        //   }
        // }
        scrollTo({
          top: 100,
          behavior: "smooth"
        });
      },
      scrollEvent() {
        let pagemark = document.getElementById("pagetabs");
        if (pagemark) {
          if (window.pageYOffset > 150) {
            pagemark.classList.add("fixed");
          } else {
            pagemark.classList.remove("fixed");
          }
        }
      },
    },
    mounted() {
      if (process.browser) {
        this.isTablet =
          this.$device.isMobileOrTablet && window.innerWidth <= 1024;
        scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
      document.addEventListener("scroll", this.scrollEvent);
      // console.log(this.pageDetails, this.latestMedia);
    },
    destroyed() {
      document.removeEventListener("scroll", this.scrollEvent);
    }
  };

</script>
