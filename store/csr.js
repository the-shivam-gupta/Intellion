export const state = () => ({
  csrActivities: {},
  csrList: {}
});

export const mutations = {
  updateCsr(state, data) {
    state.csrActivities = data;
  },
  updateCsrList(state, data) {
    state.csrList = data;
  }
};

export const actions = {
  async getCsrPage({ commit }) {
    try {
      const res = await this.$axios.get("/csrs");
      if (res) {
        let commitData = res.data;
        commit("updateCsr", commitData);
        return commitData;
      }
    } catch (error) {
      console.log(error, error);
    }
  },
  async getCsrInner({ commit }, params) {
    try {
      const res = await this.$axios.get("/csr", { params });
      if (res) {
        if (res.status === 404)
          return this.$router.replace("/error?status=" + res.status);

        let commitData = res.data;
        await commit("updateCsrList", commitData);
      }
    } catch (error) {
      console.log(error, error);
    }
  }
};
