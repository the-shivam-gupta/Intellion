<template>
  <div id="csr-page">
    <template v-if="!$fetchState.pending">
      <section class="section">
        <ta-hero
          heroWidth="fullWidth"
          :content="pageDetails.banner_section"
          type="one"
        ></ta-hero>
      </section>

      <section class="section custom-fade-in">
        <div class="section-csr">
          <div class="container">
            <div class="row">
              <div class="csr_filter_wrapper">
                <div class="sust_back_title">
                  <nuxt-link :to="pageDetails.button.url">
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
                    {{ pageDetails.button.text }}
                  </nuxt-link>
                </div>

                <div class="filter_dropdown">
                  <b-dropdown
                    split
                    id="dropdown-csr"
                    :text="yearLabel.csr"
                    class="ta__dropdown"
                  >
                    <b-dropdown-item
                      @click="setYear(item, 'csr')"
                      v-for="(item, index) in years"
                      :key="index"
                      >{{ item }}</b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="container_brbt container_brbt--two">
            <div v-for="(item, index) in csrData" :key="index">
              <ta-csr-card :content="item" from="Csr"></ta-csr-card>
            </div>
            <div class="row" v-if="csrData.length !== 0">
              <div class="col-lg-12">
                <div class="pagination_wrapper">
                  <div class="overflow-auto">
                    <b-pagination
                      v-model="csrPagination.currentPage"
                      @change="setPage($event, 'csr')"
                      :total-rows="csrPagination.rows"
                      :per-page="csrPagination.perPage"
                      first-number
                      last-number
                      aria-controls="my-table"
                    >
                      <template v-slot:prev-text>
                        <img src="~/assets/images/page_left.svg" alt="Prev" />
                      </template>
                      <template v-slot:next-text>
                        <img src="~/assets/images/page_right.svg" alt="Next" />
                      </template>
                    </b-pagination>
                  </div>
                </div>
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

    <!-- <ta-subscription :content="subscription_section"></ta-subscription> -->
  </div>
</template>
<script>
export default {
  async fetch() {
    const { params, store } = this.$nuxt.context;
    this.pageDetails = await store.dispatch("csr/getCsrPage");
    if (this.pageDetails.list && this.pageDetails.list.length > 0) {
      this.csrPagination.rows = this.pageDetails.list.length;
      this.filteredCsrData = JSON.parse(JSON.stringify(this.pageDetails.list));
      this.setYear("LATEST", "csr");
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.$store.state.metaTitle || "TATA Intellion - CSR Activities",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      subscription_section: {
        title:
          "Get the latest stories and announcements from Intellion in your inbox.",
        subscription_options: ["News Alert", "Events", "Press Release"],
        subscription_note:
          "By clicking Subscribe you’ll receive occasional emails from Intellion. You always have the choice to adjust your interest settings or unsubscribe.",
      },
      yearLabel: {
        csr: "LATEST",
      },
      csrData: [],
      filteredCsrData: [],
      csrPagination: {
        currentPage: 1,
        perPage: 6,
      },
      years: ["LATEST", "OLDEST"],
      pageDetails: {},
    };
  },
  methods: {
    setCountryLabel(arg) {
      this.countryLabel = arg.label;
      this.countryLabel1 = arg.label;
    },
    setPage(event, type) {
      this.csrPagination.currentPage = event;
      this.slicePage(event, type);
      scrollTo({ top: 100, behavior: "smooth" });
    },
    slicePage(index, type) {
      this.csrData = this.filteredCsrData.slice(
        (index - 1) * this.csrPagination.perPage,
        index * this.csrPagination.perPage
      );
    },
    setYear(year, type) {
      this.filteredCsrData.sort(function (a, b) {
        // console.log(year);

        if (year === "LATEST") {
          return new Date(b.date) - new Date(a.date);
        } else {
          return new Date(a.date) - new Date(b.date);
        }
      });
      this.yearLabel.csr = year;
      this.csrPagination.currentPage = 1;
      this.slicePage(1, "csr");
    },
  },
  computed: {
    // pageDetails: function() {
    //   return this.$store.state.csr.csrActivities;
    // }
  },
  beforeMount() {
    // console.log(this.pageDetails);
  },
  mounted() {
    if (process.browser) {
      this.isTablet =
        this.$device.isMobileOrTablet && window.innerWidth <= 1024;
    }
    scrollTo({ top: 0, behavior: "smooth" });
    // console.log(this.pageDetails.list);
    // if (this.pageDetails) {
    //   this.csrPagination.rows = this.pageDetails.list.length;
    //   this.filteredCsrData = this.pageDetails.list;
    //   this.slicePage(1, "csr");
    // }
  },
};
</script>
