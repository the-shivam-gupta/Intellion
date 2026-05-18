export const state = () => ({
  searchResults: [],
  searchTerm: ""
});

export const mutations = {
  updateSearchResults(state, data) {
    state.searchResults = data;
  },
  updateSearchTerm(state, data) {
    state.searchTerm = data;
  }
};

export const actions = {
  async getSearchResults({ commit }, keyword) {
    try {
      commit('updateHideLoader', true, {root:true});
      const res = await this.$axios.get("/search?keyword=" + keyword);
      commit('updateHideLoader', false, {root:true})
      if (res && res.status !== 204) {
        let commitData = res.data.items;

        // modify redirects here
        commitData.forEach(e => {
          let redirectTo = false;
          let params = ["", e.type, e.slug];
          const rerouteObj = {
            projects: "commercial-projects",
            news: "newsroom",
            csr: "csr-activities",
            leader: "leadership",
            sustainability: "sustainability"
          }
        
          if (params[1] === "page") {
            const pageObj = {
              "news-room-page": "newsroom",
              "csr-listing-page": "csr-activities",
              "sustainability-overview-page": "sustainability",
              "terms-and-condition-page": "terms-conditions",
              "privacy-policy-page": "privacy-policy",
              "project-listing-page": "commercial-projects",
              "leadership-page": "leadership",
              "about-us-page": "about-us",
              "home-page": "",
              "contact-us-page": "contact-us"
            }
            params[1] = pageObj[params[2]];
            params.pop();
            redirectTo = params.join("/");
        
            
          } else if (Object.prototype.hasOwnProperty.call(rerouteObj, params[1])) {
            params[1] = rerouteObj[params[1]];
            if (params[1] === "leadership") {
              params[2] = `?leader=${params[2]}`
            }
            redirectTo = params.join("/");
          }
          e['redirectTo'] = redirectTo;
        })

        commit("updateSearchResults", commitData);
        return commitData;
      } else commit("updateSearchResults", []);
    } catch (error) {
      console.log(error, "error");
    }
  }
};
