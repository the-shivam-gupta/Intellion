<template>
  <div id="leadership-page">
    <template v-if="!$fetchState.pending">
      <!-- Hero Section -->
      <section class="section">
        <ta-hero heroStyle="rightText" type="two" :content="pageDetails.hero_section"></ta-hero>
      </section>

      <!-- Mission Section-->
      <section id="mission" class="section section-padding custom-fade-in">
        <div class="container">
          <div class="row" data-aos="slide-up">
              <ta-breadcrumb
              id="breadcrumb"
              content="Leadership"
              />
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="section__heading">
                <h4
                  class="section__subtitle"
                  v-if="
                    pageDetails.our_mission_section &&
                      pageDetails.our_mission_section.sub_title
                  "
                >{{ pageDetails.our_mission_section.sub_title }}</h4>
                <h2
                  class="section__title"
                  v-if="
                    pageDetails.our_mission_section &&
                      pageDetails.our_mission_section.title
                  "
                  v-html = "pageDetails.our_mission_section.title"
                ></h2>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="ta__list--wrapper">
                <ul class="ta__list">
                  <li
                    v-for="(item, index) in pageDetails.our_mission_section
                      .points"
                    :key="'list_' + index"
                    class="ta__list--item"
                  >
                    <p class="ta__para" v-html="item"></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section id="team" class="section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <ta-heading
                :subtitle="pageDetails.leadership_team_section.sub_title"
                :title="pageDetails.leadership_team_section.title"
                :isTrans="true"
                :transhead="
                  pageDetails.leadership_team_section.background_title !== ''
                    ? pageDetails.leadership_team_section.background_title
                    : 'Team'
                "
              ></ta-heading>
              <div class="section__content">
                <p class="ta__para">{{ pageDetails.leadership_team_section.description }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="ta__flex">
                <ta-secondary-card
                  type="hoverText"
                  :content="leader"
                  v-for="(leader, index) in pageDetails.leadership_team_section
                    .leadership_team"
                  :cardIndex="index"
                  :key="'leader_' + index"
                ></ta-secondary-card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Details Modal Starts Here -->
      <b-modal id="team-info" ref="team-info" no-close-on-backdrop>
        <button class="ta__btn--transparent" @click="$bvModal.hide('team-info')">
          <span class="icon-close"></span>
        </button>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="team">
                <div class="team__content">
                  <div class="ta__flex">
                    <div class="team__image ta__flex--first" v-if="isTablet">
                      <img
                        v-if="leader.leader_avatar && leader.leader_avatar.src"
                        :data-src="leader.leader_avatar.src"
                        v-lazy-load
                        :alt="
                          leader.leader_avatar.alt !== ''
                            ? leader.leader_avatar.alt
                            : 'Tata Intellion'
                        "
                      />
                    </div>
                    <div class="ta__flex--first">
                      <div class="name">{{ leader.leader_name }}</div>
                      <div class="designation">{{ leader.leader_designation }}</div>
                    </div>
                  </div>
                  <div class="about" v-html="leader.leader_detail_information" />
                  <div class="connect">
                    <ul class="connect__list">
                      <li class="connect__item" v-if="!!leader.linkedin_profile_url">
                        <a
                          :href="leader.linkedin_profile_url"
                          class="connect__link"
                          rel="noopener"
                          target="_blank"
                        >
                          <span class="ta__icon icon-linkedin"></span>
                        </a>
                      </li>
                      <li class="connect__item" v-if="!!leader.twitter_profile_url">
                        <a
                          :href="leader.twitter_profile_url"
                          rel="noopener"
                          class="connect__link"
                          target="_blank"
                        >
                          <span class="ta__icon icon-twitter"></span>
                        </a>
                      </li>
                      <li class="connect__item" v-if="leader.profile_downloadable_file">
                        <a href class="connect__link" rel="noopener" target="_blank" download>
                          <span class="ta__icon icon-download"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="team__image" v-if="!isTablet">
                  <img
                    v-if="leader.leader_avatar && leader.leader_avatar.src"
                    :data-src="leader.leader_avatar.src"
                    v-lazy-load
                    :alt="
                      leader.leader_avatar.alt !== ''
                        ? leader.leader_avatar.alt
                        : 'Tata Intellion'
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Team Details Modal Ends Here -->
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
    const { params, store, query } = this.$nuxt.context;
    await store.dispatch("leadership/getLeadershipPage");
    const leader = query.leader;
    if (leader) {
      this.$router.replace("/leadership")
      setTimeout(() => {
        this.$bvModal.show('team-info');  
      }, 250);
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.$store.state.metaTitle || "TATA Intellion - Leadership",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      isTablet: false,
    };
  },
  computed: {
    pageDetails: function () {
      return this.$store.state.leadership.leadershipPage;
    },
    leader: function () {
      return JSON.parse(JSON.stringify(this.$store.state.leadership.leader));
    },
  },
  watch: {
    "$route.query" : function (val) {
      if (val.leader) {
        this.$router.replace("/leadership")
        setTimeout(() => {
          this.$bvModal.show('team-info');  
        }, 250);
      }
    }
  },
  mounted() {
    if (process.browser) {
      this.isTablet =
        this.$device.isMobileOrTablet && window.innerWidth <= 1024;
    }
    scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>
