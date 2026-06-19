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
        <b-tabs
          content-class="ta__pagetabs--content"
          class="ta__pagetabs"
          align="center"
          v-model="activeNewsTab"
        >
        <div class="container">
          <div class="row">
              <ta-breadcrumb
              id="breadcrumb"
              :content="pageDetails.banner_section.title"
              />
          </div>
        </div>
          <b-tab title="Latest News" active @click="scrollToTargetAdjusted()">
           <!-- Media Starts -->
         <!--<StaticNewsSectionInner ></StaticNewsSectionInner> -->
            <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.media_release_section">
              <div class="container">
                <div class="container_brbt">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Media Releases</div>
                        <div class="nt_view">
                          <button type="button" @click="openTab(1)">
                            {{
                              pageDetails.sections.media_release_section.button
                                .text
                            }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestMedia"
                      :key="'latest-media' + index"
                    >
                      <ta-media-card :content="item" from="Media"></ta-media-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
       
            <!-- Media Ends -->


            <!-- Press Releases -->
            <!-- <section class="section section-news-types" v-if="pageDetails.sections && pageDetails.sections.press_release_section">
              <div class="container">
                <div class="container_brbt container_brbt--three">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Press Releases</div>
                        <div class="nt_view">
                          <button type="button" @click="openTab(2)">
                            {{
                              pageDetails.sections.press_release_section.button
                                .text
                            }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-12"
                      v-for="(item, index) in latestPress"
                      :key="'latest-press' + index"
                    >
                      <ta-press-card :content="item" from="Press"></ta-press-card>
                    </div>
                  </div>
                </div>
              </div>
            </section> -->
            <!-- Press releases -->

            <!-- Awards -->
            <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.award_section">
              <div class="container">
                <div class="container_brbt">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Awards</div>
                        <div class="nt_view">
                          <button type="button" @click="openTab(2)">
                            {{ pageDetails.sections.award_section.button.text }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6"
                      v-for="(item, index) in latestAwards"
                      :key="'latest-awards' + index"
                    >
                      <ta-awards-card :content="item"></ta-awards-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Awards -->
            
            <!-- Events -->
            <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.event_section">
              <div class="container">
                <div class="container_brbt container_brbt--three">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">Events</div>
                        <div class="nt_view">
                          <button type="button" @click="openTab(3)">
                            {{ pageDetails.sections.event_section.button.text }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-12"
                      v-for="(item, index) in latestEvents"
                      :key="'latest-events' + index"
                    >
                      <ta-events-card :content="item"></ta-events-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Events -->


            <!-- CSR -->
            <section class="section section-news-types custom-fade-in" v-if="pageDetails.sections && pageDetails.sections.csr_activities_section">
              <div class="container">
                <div
                  class="container_brbt container_brbt--two container_brbt--three"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">CSR Activities</div>
                        <div class="nt_view">
                          <nuxt-link to="/csr-activities"> VIEW ALL </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-12"
                      v-for="(item, index) in latestCsrs"
                      :key="'latest-csr' + index"
                    >
                      <ta-csr-card :content="item"></ta-csr-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- CSR -->
          </b-tab>

          <!-- Media Tab -->
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

                  <!---<StaticMedia></StaticMedia> --->
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
          <!-- Media Tab -->

          <!-- Press Tab -->
          <!-- <b-tab title="Press Releases" @click="slicePage(1, 'press') ; scrollToTargetAdjusted()">
            <section class="section section-news-types" id="pressTab" ref="pressTab">
              <div class="container">
                <div
                  class="container_brbt container_brbt--two container_brbt--four"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type news_type--two">
                        <div class="news_type_title">Press Releases</div>
                        <div>
                          <b-dropdown
                            split
                            id="dropdown-press"
                            :text="yearLabel.press"
                            class="ta__dropdown"
                          >
                            <b-dropdown-item
                              @click="setYear(item, 'press')"
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
                      v-for="(item, index) in pressData"
                      :key="'press-' + index"
                    >
                      <ta-press-card :content="item"></ta-press-card>
                    </div>
                  </div>
                  <div class="row" v-if="pressData.length !== 0">
                    <div class="col-lg-12">
                      <div class="pagination_wrapper">
                        <div class="overflow-auto">
                          <b-pagination
                            v-model="pressPagination.currentPage"
                            @change="setPage($event, 'press')"
                            :total-rows="pressPagination.rows"
                            :per-page="pressPagination.perPage"
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
          <!-- Press Tab -->

          <!-- Awards Tab -->
          <b-tab title="Awards" @click="slicePage(1, 'awards') ; scrollToTargetAdjusted()">
            <section class="section section-news-types" id="awardsTab" ref="awardsTab">
              <div class="container">
                <div
                  class="container_brbt container_brbt--two container_brbt--four"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type news_type--two">
                        <div class="news_type_title">Awards</div>
                        <div>
                          <b-dropdown
                            split
                            id="dropdown-awards"
                            :text="yearLabel.award"
                            class="ta__dropdown"
                          >
                            <b-dropdown-item
                              @click="setYear(item, 'awards')"
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
                      v-for="(item, index) in awardsData"
                      :key="'awards' + index"
                    >
                      <ta-awards-card :content="item"></ta-awards-card>
                    </div>
                  </div>
                  <div class="row" v-if="awardsData.length !== 0">
                    <div class="col-lg-12">
                      <div class="pagination_wrapper">
                        <div class="overflow-auto">
                          <b-pagination
                            v-model="awardsPagination.currentPage"
                            @change="setPage($event, 'awards')"
                            :total-rows="awardsPagination.rows"
                            :per-page="awardsPagination.perPage"
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
          <!-- Awards Tab -->

          <!-- Events Tab -->
          <b-tab title="Events" @click="slicePage(1, 'events') ; scrollToTargetAdjusted()">
            <section class="section section-news-types" id="eventsTab" ref="eventsTab">
              <div class="container">
                <div
                  class="container_brbt container_brbt--two container_brbt--four"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type news_type--two">
                        <div class="news_type_title">Events</div>
                        <div>
                          <b-dropdown
                            split
                            id="dropdown-events"
                            :text="yearLabel.event"
                            class="ta__dropdown"
                          >
                            <b-dropdown-item
                              @click="setYear(item, 'events')"
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
                      v-for="(item, index) in eventsData"
                      :key="'events' + index"
                    >
                      <ta-events-card :content="item"></ta-events-card>
                    </div>
                  </div>
                  <div class="row" v-if="eventsData.length !== 0">
                    <div class="col-lg-12">
                      <div class="pagination_wrapper">
                        <div class="overflow-auto">
                          <b-pagination
                            v-model="eventsPagination.currentPage"
                            @change="setPage($event, 'events')"
                            :total-rows="eventsPagination.rows"
                            :per-page="eventsPagination.perPage"
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
          <!-- Events Tab -->

          <!-- CSR Tab -->
          <b-tab title="CSR" @click="slicePage(1, 'events') ; scrollToTargetAdjusted()">
            <section class="section section-news-types" id="csrTab" ref="csrTab">
              <div class="container">
                <div
                  class="container_brbt container_brbt--two container_brbt--three"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="news_type">
                        <div class="news_type_title">CSR Activities</div>
                        <div class="nt_view">
                          <nuxt-link to="/csr-activities"> VIEW ALL </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-12"
                      v-for="(item, index) in latestCsrs"
                      :key="'latest-csr' + index"
                    >
                      <ta-csr-card :content="item"></ta-csr-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </b-tab>
          <!-- CSR Tab -->
        </b-tabs>


        
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
    this.pageDetails = await store.dispatch("newsroom/getNewsroomPage");
    // console.log(this.pageDetails, "Fetch");
    // if (!!this.pageDetails) {
      // latest press
      this.latestPress = this.pageDetails.sections.press_release_section.items.slice(
        0,
        3
      );
      // latest Media
      this.latestMedia = this.pageDetails.sections.media_release_section.items.slice(
        0,
        3
      );
      // console.log(this.latestMedia, "Ltest Media");

      // latest Events
      this.latestEvents = this.pageDetails.sections.event_section.items.slice(
        0,
        3
      );

      // latest Awards
      this.latestAwards = this.pageDetails.sections.award_section.items.slice(
        0,
        3
      );

      // latest Csr
      this.latestCsrs = this.pageDetails.sections.csr_activities_section.items.slice(
        0,
        3
      );

      //Media Data
      this.mediaPagination.rows = this.pageDetails.sections.media_release_section.items.length;
      this.filteredMediaData = JSON.parse(
        JSON.stringify(this.pageDetails.sections.media_release_section.items)
      );
      this.setYear("LATEST", "media");

      // press data
      this.pressPagination.rows = this.pageDetails.sections.press_release_section.items.length;
      this.filteredPressData = JSON.parse(
        JSON.stringify(this.pageDetails.sections.press_release_section.items)
      );
      this.setYear("LATEST", "press");

      //awards
      this.awardsPagination.rows = this.pageDetails.sections.award_section.items.length;
      this.filteredAwardsData = JSON.parse(
        JSON.stringify(this.pageDetails.sections.award_section.items)
      );
      this.setYear("LATEST", "awards");

      //events
      this.eventsPagination.rows = this.pageDetails.sections.event_section.items.length;
      this.filteredEventsData = JSON.parse(
        JSON.stringify(this.pageDetails.sections.event_section.items)
      );
      this.setYear("LATEST", "events");
    // }
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en"
      },
      title: this.$store.state.metaTitle || "TATA Intellion - Newsroom",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      pageDetails: {},
      latestPress: [],
      latestMedia: [],
      latestEvents: [],
      latestAwards: [],
      latestCsrs: [],
      awardsData: [],
      yearLabel: {
        award: "LATEST",
        event: "LATEST",
        press: "LATEST",
        media: "LATEST",
      },
      mediaPagination: {
        currentPage: 1,
        perPage: 6,
      },
      awardsPagination: {
        currentPage: 1,
        perPage: 9,
      },
      eventsPagination: {
        currentPage: 1,
        perPage: 3,
      },
      pressPagination: {
        currentPage: 1,
        perPage: 6,
      },
      staticMediaData: [
        {
          title: "Launch of New Platform",
          date: "2024-12-01",
          description: "We are excited to announce the launch of our new platform.",
          link: "#"
        },
        {
          title: "Investor Meet Highlights",
          date: "2025-01-15",
          description: "Key takeaways from our recent investor meet.",
          link: "#"
        }
      ],
      filteredMediaData: [],
      filteredPressData: [],
      filteredEventsData: [],
      filteredAwardsData: [],
      mediaData: [],
      pressData: [],
      eventsData: [],
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
  computed: {
    combinedMediaData() {
      return [...this.staticMediaData, ...this.mediaData];
    }
  },
  methods: {
    openTab(index) {
      this.activeNewsTab = index;
      this.slicePage(1, "media");
      this.slicePage(1, "press");
      this.slicePage(1, "events");
      this.slicePage(1, "awards");
      // scrollTo({ top: 0, behavior: "smooth" });
      this.scrollToTargetAdjusted();
    },
    setPage(event, type) {
      switch (type) {
        case "awards":
          this.awardsPagination.currentPage = event;
          break;

        case "events":
          this.eventsPagination.currentPage = event;
          break;

        case "press":
          this.pressPagination.currentPage = event;
          break;

        case "media":
          this.mediaPagination.currentPage = event;
          break;

        default:
          break;
      }
      this.scrollToTargetAdjusted();
      this.slicePage(event, type);
    },
    slicePage(index, type) {
      switch (type) {
        case "awards":
          this.awardsData = this.filteredAwardsData.slice(
            (index - 1) * this.awardsPagination.perPage,
            index * this.awardsPagination.perPage
          );
          break;

        case "events":
          this.eventsData = this.filteredEventsData.slice(
            (index - 1) * this.eventsPagination.perPage,
            index * this.eventsPagination.perPage
          );
          break;

        case "press":
          this.pressData = this.filteredPressData.slice(
            (index - 1) * this.pressPagination.perPage,
            index * this.pressPagination.perPage
          );
          break;

        case "media":
          this.mediaData = this.filteredMediaData.slice(
            (index - 1) * this.mediaPagination.perPage,
            index * this.mediaPagination.perPage
          );
          break;

        default:
          break;
      }
      // scrollTo({ top: 100, behavior: "smooth" });
    },
    setYear(year, type) {
      switch (type) {
        case "awards":
          this.filteredAwardsData.sort(function (a, b) {
            if (year === "LATEST") {
              return new Date(b.date) - new Date(a.date);
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
          this.yearLabel.award = year;
          this.slicePage(1, "awards");
          this.awardsPagination.currentPage = 1;
          break;

        case "events":
          this.filteredEventsData.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.

            if (year === "LATEST") {
              return new Date(b.date) - new Date(a.date);
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
          this.yearLabel.event = year;
          this.slicePage(1, "events");
          this.eventsPagination.currentPage = 1;
          break;

        case "press":
          this.filteredPressData.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.

            if (year === "LATEST") {
              return new Date(b.date) - new Date(a.date);
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
          this.yearLabel.press = year;
          this.slicePage(1, "press");
          this.pressPagination.currentPage = 1;
          break;

        case "media":
          this.filteredMediaData.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.

            if (year === "LATEST") {
              return new Date(b.date) - new Date(a.date);
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
          this.yearLabel.media = year;
          this.slicePage(1, "media");
          this.mediaPagination.currentPage = 1;
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
