export const state = () => ({
  projectsPage: {},
  projects: [],
  project_filters: {},
  counter: 0,
  metaTitle: '',
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
  ]
});

export const mutations = {
  updateProjectsPage(state, data) {
    state.projectsPage = data;
  },
  updateFilters(state, data) {
    state.project_filters = data;
  },
  updateProjects(state, data) {
    if (data.hasOwnProperty("current_page")) {
      state.projects = data.projects;
    } else {
      state.projects = data;
    }
  },
  updateCounter(state, data) {
    state.counter = data;
  },
  updateMeta(state, data) {
    state.meta = data;
  },
  updateMetaTitle(state, data) {
    state.metaTitle = data;
  },
  updateMetaLink(state, data) {
    state.link = data;
  }
};

export const actions = {
  async getProjectsPage({ commit, dispatch }, params) {
    try {
      const res = await this.$axios.get("/projects_listing_page");
      if (res) {
        await dispatch("getProjects", params);
        let commitData = res.data;
        await commit("updateProjectsPage", commitData);
      }
    } catch (error) {
      console.log(error, error);
    }
  },

  async getProjects({ commit, state, dispatch }, params) {
    try {
      const res = await this.$axios.post("/project", params);
      if (res) {
        if (res.status === 404)
          return this.$router.replace("/error?status=" + res.status)

        let commitData = res.data;
        if(res.data.length && res.data.length == 1)//update meta tag for project details page
          await dispatch("updateMeta", commitData[0].meta_data);
        await commit("updateProjects", commitData);
        await commit("updateFilters", commitData.filters);
      }
    } catch (error) {
      console.log(error, error);
    }
  },

  async updateMeta({ commit }, metaData) {
    //console.log(this.$router.currentRoute.fullPath);
    let seo_meta_canonical_url = null;
    if(metaData && metaData.seo_meta_canonical_url!='' && metaData.seo_meta_canonical_url!=null){
      seo_meta_canonical_url = metaData.seo_meta_canonical_url;
    }else if(typeof window !== "undefined") {
      seo_meta_canonical_url = window.location.origin + this.$router.currentRoute.fullPath;
    }
    let meta = [
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
        content: (metaData.seo_meta_description) ? metaData.seo_meta_description : "Tata Intellion"
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

    await commit("updateMetaTitle", metaData.seo_meta_title);
    await commit("updateMeta", meta);
    commit("updateMetaLink", link);
  }
};
