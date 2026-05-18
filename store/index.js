export const state = () => ({
  pageLoadData: null,
  video_url: "",
  globalLoader: false,
  showEnquiryModal: false,
  metaTitle: "Tata Intellion",
  meta: [
    {
      hid: "utf-8",
      charset: "utf-8"
    },
    {
      hid: "viewport",
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      hid: "description",
      name: "description",
      content: "Tata Intellion"
    },
    {
      hid: "keywords",
      name: "keywords",
      content: "Tata Intellion"
    }
  ],
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: ""
    }
  ],
  toggleSearch: false,
  hideLoader: false,
});

export const getters = {
  homePageDetails: state => {
    return {
      banner: state.pageLoadData.hero_section,
      facts: state.pageLoadData.facts_section,
      projects: state.pageLoadData.project_section,
      testimonials: state.pageLoadData.testimonials_section,
      features: state.pageLoadData.feature_section,
      filters: state.pageLoadData.all_filters,
      news: state.pageLoadData.latest_news,
      note: state.pageLoadData.floating_side_note
    };
  },
  meta: state => {
    return state.pageLoadData.meta_data;
  },
  thankPage: state => {
    return state.pageLoadData.other_pages.thank_you_page;
  },
  policy: state => {
    return state.pageLoadData.other_pages.privacy_page;
  },
  terms: state => {
    return state.pageLoadData.other_pages.terms_and_conditions_page;
  },
  latest_news: state => {
    return state.pageLoadData.latest_news_section.news;
  },
  menus: state => {
    return {
      header: state.pageLoadData.header_section.menus,
      footer: state.pageLoadData.footer_section.menus
    };
  },
  link: state => {
    return state.pageLoadData.meta_data;
  }
};

export const mutations = {
  updatePageLoadData(state, data) {
    state.pageLoadData = data;
  },
  updateGlobalLoader(state, data) {
    state.globalLoader = data;
  },
  updateHideLoader(state, data) {
    state.hideLoader = data;
  },
  updateVideoUrl(state, data) {
    state.video_url = data;
  },
  updateEnquiryModal(state, data) {
    state.showEnquiryModal = data;
  },
  updateMeta(state, data) {
    state.meta = data;
  },
  updateMetaTitle(state, data) {
    state.metaTitle = data;
  },
  updateSearchVisibility(state, data) {
    state.toggleSearch = data;
  },
  updateMetaLink(state, data) {
    state.link = data;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const res = await this.$axios.$get("/home_page");
      if (res) {
        commit("updatePageLoadData", res);
        // commit("updateMeta", commitData.meta_data);
      }
    } catch (error) {
      console.log(error, error);
    }
  },
  async submitEnquiry({ commit }, payload) {
    try {
      const res = await this.$axios.post("/enquiry", payload);
      if (res) {
        commit("updateEnquiryModal", false);
        this.$router.push({
          path: "/thank-you"
        });
      }
    } catch (error) {
      console.log(error, error);
    }
  },
  async updateMeta({ commit }, metaData) {
    
    let seo_meta_canonical_url = null;
    if(metaData && metaData.seo_meta_canonical_url!=''){
      seo_meta_canonical_url = metaData.seo_meta_canonical_url;
    }else if(typeof window !== "undefined") {
      seo_meta_canonical_url = window.location.origin + '/' + metaData.page_route;
    }
    let meta = [
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: (metaData) ? metaData.seo_meta_description : "Tata Intellion"
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "Tata Intellion"
      }
    ];

    let link = [];
    if (metaData) {
      meta.push(
        {
          hid: "og:title",
          name: "og:title",
          content: metaData.fb_title
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: 'TATA Intellion'
        },
        {
          hid: "og:type",
          name: "og:type",
          content: 'website'
        },
        {
          hid: "og:description",
          name: "og:description",
          content: metaData.fb_description
        },
        {
          hid: "og:image",
          name: "og:image",
          content: metaData.fb_image
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: metaData.twitter_title
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: metaData.twitter_description
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: metaData.twitter_image
        },
        {
          hid: "title",
          name: "title",
          content: metaData.seo_meta_title
        },
        {
          hid: "description",
          name: "description",
          content: metaData.seo_meta_description
        }
      );

      if(seo_meta_canonical_url != null){
        link.push(
          {
            hid: "canonical",
            rel: "canonical",
            href: seo_meta_canonical_url
          }
        );
      }
    }
    commit("updateMetaTitle", metaData.seo_meta_title);
    commit("updateMeta", meta);
    commit("updateMetaLink", link);
  }
};
