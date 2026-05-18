export const state = () => ({
    sustainabilities: {},
    sustainabilities_list: {}
});

export const mutations = {
  updatesustainability(state, data) {
    state.sustainabilities = data;
  },
  updatesustainabilityList(state, data) {
    state.sustainabilities_list = data;
  },
};

export const actions = {
  async getSustainabilityPage({ commit }) {
    try {
      const res = await this.$axios.get("/sustainability_overview");
      if (res) {
        let commitData = res.data;

        commit("updatesustainability", commitData);
       
      }
    } catch (error) {
      console.log(error, error);
    }
  },
  async getSustainabilityList({ commit }, params) {
    try {
      const res = await this.$axios.get("/sustainability", {params});
      if (res) {
        if (res.status === 404)
          return this.$router.replace("/error?status=" + res.status)

        let commitData = res.data;
        await commit("updatesustainabilityList", commitData);
      }
    } catch (error) {
      console.log(error, error);
    }
  }
};
