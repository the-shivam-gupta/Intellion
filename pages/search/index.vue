<template>
  <div id="search-page">
    <section class="section" v-if="searchResults.length !== 0">
      <div class="search_result_heading">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="search_count" data-aos="fade-in">
                {{ searchResults.length }} Search Result{{
                  searchResults.length === 1 ? "" : "s"
                }}
                found
              </div>
              <div class="search_term" data-aos="fade-up">
                {{ $store.state.search.searchTerm }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          class="search_results_wrapper"
          v-for="(item, index) in searchData"
          :key="'searchresultsinner_' + index"
          :class="{ active: index === 0 }"
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="result_content" data-aos="fade-up">
                  <div class="sr_type" data-aos="fade-in">
                    <span v-html="computedTag(item.type, item.tabname, item.project_type)"></span>
                    <a
                      :href="item.media_releases_type.media_release_file"
                      target="_blank"
                      v-if="item.media_releases_type && item.media_releases_type.media_release_file"
                    >
                      | PDF
                    </a>
                    <a
                      :href="item.media_releases_type.media_release_url"
                      target="_blank"
                      v-if="item.media_releases_type && item.media_releases_type.media_release_url"
                    >
                      <svg
                        width="10px"
                        height="10px"
                        viewBox="0 0 10 10"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <title>noun_External Link_1167422</title>
                        <g
                          
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="TATA-Intellion-Website_Desktop_o2_v7"
                            transform="translate(-721.000000, -3477.000000)"
                            fill="#7A6958"
                            fill-rule="nonzero"
                          >
                            <g
                              id="TATA-Intellion-Website_Desktop_o2_v7-Group"
                              transform="translate(135.000000, 3272.000000)"
                            >
                              <g
                                id="TATA-Intellion-Website_Desktop_o2_v7-Group-2"
                                transform="translate(1.000000, 73.000000)"
                              >
                                <g
                                  
                                  transform="translate(417.000000, 0.000000)"
                                >
                                  <g
                                    
                                    transform="translate(168.000000, 132.000000)"
                                  >
                                    <path
                                      d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z"
                                      
                                    />
                                    <polygon
                                      
                                      points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444"
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                  <nuxt-link :to="item['redirectTo']">
                    <div class="sr_title" v-html="item.name" data-aos="fade-in"></div>
                  </nuxt-link>
                  <div class="sr_subtitle" v-html="item.description" data-aos="fade-in"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination" data-aos="fade-in">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="pagination_wrapper">
                <div class="overflow-auto">
                  <b-pagination
                    v-model="searchPagination.currentPage"
                    @change="setPage($event, 'search')"
                    :total-rows="searchPagination.rows"
                    :per-page="searchPagination.perPage"
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

    <section
      class="section section_no_result"
      v-if="searchResults.length === 0"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="no_result_title" data-aos="fade-up">No Search Results Found</div>
            <div class="no_result_subtitle" v-if="searchTerm !== ''" data-aos="fade-up">
              0 Results found for “{{ searchTerm }}”
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects section -->
    <section
      class="section projects-section"
      id="project-features"
      v-if="searchResults.length === 0"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="news_type">
              <div class="news_type_title" data-aos="fade-up">
                You might be interested in these properties
              </div>
              <div class="nt_view all_proj_desk_btn" data-aos="fade-in">
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

    <!-- <ta-search-popup></ta-search-popup> -->
  </div>
</template>
<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
export default {
  data() {
    return {
      isNuxtReady: false,
      hero_section: {
        title: "CSR Activities",
        description:
          "We shall leverage our core expertise, partnerships, infrastructure, and other resources to create long-term shared value for the communities we serve, focusing primarily on underserved, socially and economically backward groups, especially women, children, youth, Scheduled Caste & Scheduled Tribes.",
      },
      subscription_section: {
        title:
          "Get the latest stories and announcements from Intellion in your inbox.",
        subscription_options: ["News Alert", "Events", "Press Release"],
        subscription_note:
          "By clicking Subscribe you’ll receive occasional emails from Intellion. You always have the choice to adjust your interest settings or unsubscribe.",
      },
      countryLabel: "LATEST",
      searchPagination: {
        currentPage: 1,
        perPage: 9,
      },
      filteredSearchData: [],
      searchData: [],
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
  head() {
    return {
      htmlAttrs: {
        lang: "en"
      },
      title: this.$store.state.metaTitle || "Tata Intellion - Search",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  computed: {
    searchResults: function () {
      return this.$store.state.search.searchResults;
    },
    searchTerm: function () {
      return this.$store.state.search.searchTerm;
    },
    projects_list: function () {
      return this.$store.getters.homePageDetails.projects.projects_list;
    },
  },
  methods: {
    computedTag: function (type, tabname, projectType) {
      const renameObj = {
        projects: "COMMERCIAL PROJECT",
        news: "NEWS",
        csr: "CSR ACTIVITIES",
        leader: "PERSON",
        page: "PAGE",
        sustainability: "SUSTAINABILITY",
      };
      if (tabname) {
        return tabname.name.toUpperCase();
      }
      if (projectType) {
        return projectType.name.toUpperCase();
      }
      return renameObj[type];
    },
    setCountryLabel(arg) {
      this.countryLabel = arg.label;
    },
    setPage(event, type) {
      this.searchPagination.currentPage = event;
      this.slicePage(event, type);
    },
    slicePage(index, type) {
      scrollTo({ top: 100, behavior: "smooth" });
      this.searchData = this.filteredSearchData.slice(
        (index - 1) * this.searchPagination.perPage,
        index * this.searchPagination.perPage
      );
    },
  },
  components: {
    slick,
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
    }
    // console.log(this.searchResults);
    // console.log(this.searchTerm);
    this.searchPagination.rows = this.searchResults.length;
    this.filteredSearchData = JSON.parse(JSON.stringify(this.searchResults));
    this.slicePage(1, "search");
    // console.log(this.projects_list);
  },
  watch: {
    searchResults: function () {
      this.searchPagination.rows = this.searchResults.length;
      this.filteredSearchData = JSON.parse(JSON.stringify(this.searchResults));
      this.slicePage(1, "search");
    },
  },
};
</script>
