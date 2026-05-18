<template>
  <div id="newsroom-page">
    <template v-if="!$fetchState.pending">
      <section class="section">
        <ta-hero
          heroStyle="leftText"
          :content="pageDetails.banner_section"
          type="one"
        ></ta-hero>
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
              <ta-breadcrumb
              id="breadcrumb"
              :content="pageDetails.banner_section.title"
              />
          </div>
        </div>
          <!--<b-tab title="Latest News" active @click="scrollToTargetAdjusted()">-->

            <!-- Policies -->
            <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.policies">
              <div class="container">
                <div class="container_brbt ">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Policies</div>
                        <!--<div class="nt_view">
                          <button type="button" @click="openTab(1)">
                            {{ pageDetails.sections.policies.button.text }}
                          </button>
                        </div>-->
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestPolicies"
                      :key="'latest-policies' + index"
                    >
                      <ta-policy-card :content="item"></ta-policy-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Policies -->

            <!-- CSR -->
            <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.corporate_social_responsibility">
              <div class="container">
                <div class="container_brbt">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Corporate Social Responsibility</div>
                        <!--<div class="nt_view">
                          <button type="button" @click="openTab(1)">
                            {{ pageDetails.sections.corporate_social_responsibility.button.text }}
                          </button>
                        </div>-->
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestCsr"
                      :key="'latest-policies' + index"
                    >
                      <ta-csr-info-card :content="item"></ta-csr-info-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- CSR -->

            <!-- Annual Return -->
            <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.annual_return">
              <div class="container">
                <div class="container_brbt">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Annual Return</div>
                     
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestannualReturn"
                      :key="'latest-AR' + index"
                    >
                      <ta-annulreturn-info-card :content="item"></ta-annulreturn-info-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Annual Return -->

             <!-- Annual Return -->
             <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.notice_of_agm">
              <div class="container">
                <div class="container_brbt">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Notice of AGM</div>
                     
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestAGM"
                      :key="'latest-AGM' + index"
                    >
                      <ta-agm-info-card :content="item"></ta-agm-info-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Annual Return -->

               <!-- Annual Return -->
               <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.annual_report">
              <div class="container">
                <div class="container_brbt">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Annual Report</div>
                     
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestAR"
                      :key="'latest-AR' + index"
                    >
                      <ta-ar-info-card :content="item"></ta-ar-info-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Annual Return -->
     <!-- Annual Return -->
     <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.compliance">
              <div class="container">
                <div class="container_brbt">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Compliance</div>
                     
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestCOMP"
                      :key="'latest-comp' + index"
                    >
                      <ta-comp-info-card :content="item"></ta-comp-info-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Annual Return -->
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
export default {
  async fetch() {
    const { params, store } = this.$nuxt.context;
    this.pageDetails = await store.dispatch("investor-info/getInvestorInfoPage");
    //console.log(this.pageDetails, "Fetch");
    // if (!!this.pageDetails) {
      // latest press
      // latest Policies
      this.latestPolicies = this.pageDetails.sections.policies.items;//.slice(0,3);
      this.latestCsr = this.pageDetails.sections.corporate_social_responsibility.items;//.slice(0,3);
      this.latestannualReturn = this.pageDetails.sections.annual_return.items
      this.latestAGM= this.pageDetails.sections.notice_of_agm.items
      this.latestAR= this.pageDetails.sections.annual_report.items
      this.latestCOMP= this.pageDetails.sections.compliance.items

      //policies
      this.policiesPagination.rows = this.pageDetails.sections.policies.items.length;
      this.csrPagination.rows = this.pageDetails.sections.corporate_social_responsibility.items.length;
      this.filteredPoliciesData = JSON.parse(
        JSON.stringify(this.pageDetails.sections.policies.items)
      );
    
      this.filteredCsrData = JSON.parse(
        JSON.stringify(this.pageDetails.sections.corporate_social_responsibility.items)
      );
      this.filteredAnnualReturn = JSON.parse(
        JSON.stringify(this.pageDetails.sections.annual_return.items)
      );
      this.filteredAGM = JSON.parse(
        JSON.stringify(this.pageDetails.sections.notice_of_agm.items)
      );
      this.filteredAR = JSON.parse(
        JSON.stringify(this.pageDetails.sections.annual_report.items)
      );
      this.filteredCOMP= JSON.parse(
        JSON.stringify(this.pageDetails.sections.compliance.items)
      );
      this.setYear("LATEST", "policies","csr","annulreturn", "agm","ar","comp");

  },
  head() {
    return {
      htmlAttrs: {
        lang: "en"
      },
      title: this.$store.state.metaTitle || "TATA Intellion - xyz",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      pageDetails: {},
      latestPolicies: [],
      latestCsr: [],
      policiesData: [],
      csrData: [],
      annulreturnData: [],
      agmData: [],
      arData: [],
      compData: [],

      yearLabel: {
        policy: "LATEST",
        csr: "LATEST",
      },
      policiesPagination: {
        currentPage: 1,
        perPage: 9,
      },
      csrPagination: {
        currentPage: 1,
        perPage: 9,
      },
      annulreturnPagination: {
        currentPage: 1,
        perPage: 9,
      },
      agmPagination: {
        currentPage: 1,
        perPage: 9,
      },
      arPagination: {
        currentPage: 1,
        perPage: 9,
      },
      compPagination: {
        currentPage: 1,
        perPage: 9,
      },
      filteredPoliciesData: [],
      filteredCsrData: [],
      filteredAnnualReturn: [],
      filteredAGM: [],
      filteredAR: [],
      filteredCOMP: [],
      years: ["LATEST", "OLDEST"],
      activeNewsTab: 0,
      subscription_section: {
        title:
          "Get the latest stories and announcements from Intellion in your inbox.",
        subscription_options: ["News Alert", "Events", "Press Release"],
        subscription_note:
          "By clicking Subscribe you’ll receive occasional emails from Intellion. You always have the choice to adjust your interest settings or unsubscribe.",
      },
    };
  },
  
  computed: {},
  methods: {
    openTab(index) {
      this.activeNewsTab = index;
      this.slicePage(1, "policies");
      this.slicePage(1, "csr");
      this.slicePage(1, "annulreturn");
      this.slicePage(1, "agm");
      this.slicePage(1, "ar");
      this.slicePage(1, "comp");
      // scrollTo({ top: 0, behavior: "smooth" });
      this.scrollToTargetAdjusted();
    },
    setPage(event, type) {
      switch (type) {
        case "policies":
          this.policiesPagination.currentPage = event;
          break;
        case "csr":
          this.csrPagination.currentPage = event;
          break;
          case "annulreturn":
          this.annulreturnPagination.currentPage = event;
          break;
          case "ar":
          this.arPagination.currentPage = event;
          break;
          case "comp":
          this.compPagination.currentPage = event;
          break;
        default:
          break;
      }
      this.scrollToTargetAdjusted();
      this.slicePage(event, type);
    },
    slicePage(index, type) {
      switch (type) {
        case "policies":
          this.policiesData = this.filteredPoliciesData.slice(
            (index - 1) * this.policiesPagination.perPage,
            index * this.policiesPagination.perPage
          );
        case "csr":
          this.csrData = this.filteredCsrData.slice(
            (index - 1) * this.csrPagination.perPage,
            index * this.csrPagination.perPage
          );
          case "annulreturn":
          this.annulreturnData = this.filteredAnnualReturn.slice(
            (index - 1) * this.annulreturnPagination.perPage,
            index * this.annulreturnPagination.perPage
          );

          case "agm":
          this.agmData = this.filteredAGM.slice(
            (index - 1) * this.agmPagination.perPage,
            index * this.agmPagination.perPage
          );
          case "ar":
          this.arData = this.filteredAR.slice(
            (index - 1) * this.arPagination.perPage,
            index * this.arPagination.perPage
          );
          case "comp":
          this.compData = this.filteredCOMP.slice(
            (index - 1) * this.compPagination.perPage,
            index * this.compPagination.perPage
          );
          break;

        default:
          break;
      }
      // scrollTo({ top: 100, behavior: "smooth" });
    },
    setYear(year, type) {
      switch (type) {
        case "policies":
          this.filteredPoliciesData.sort(function (a, b) {
            if (year === "LATEST") {
              return new Date(b.date) - new Date(a.date);
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
          this.yearLabel.policy = year;
          this.slicePage(1, "policies");
          this.policiesPagination.currentPage = 1;
          break;
        case "csr":
          this.filteredCsrData.sort(function (a, b) {
            if (year === "LATEST") {
              return new Date(b.date) - new Date(a.date);
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
          this.yearLabel.csr = year;
          this.slicePage(1, "csr");
          this.csrPagination.currentPage = 1;
          break;
          case "annulreturn":
          this.filteredAnnualReturn.sort(function (a, b) {
            if (year === "LATEST") {
              return new Date(b.date) - new Date(a.date);
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
          this.yearLabel.annulreturn = year;
          this.slicePage(1, "annulreturn");
          this.csrPagination.currentPage = 1;
          break;
        default:
          break;
      }
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
      scrollTo({ top: 100, behavior: "smooth" });
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
      scrollTo({ top: 0, behavior: "smooth" });
    }
    document.addEventListener("scroll", this.scrollEvent);
    // console.log(this.pageDetails, this.latestMedia);
  },
  destroyed() {
    document.removeEventListener("scroll", this.scrollEvent);
  }
};
</script>
