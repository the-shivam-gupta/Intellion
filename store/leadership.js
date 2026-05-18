export const state = () => ({
  leadershipPage: {},
  leader: {}
});

export const mutations = {
  updateLeadershipPage(state, data) {
    state.leadershipPage = data;
  },
  updateLeader(state, data) {
    state.leader = data;
  }
};

export const actions = {
  async getLeadershipPage({ commit }) {
    try {
      const res = await this.$axios.get("/leadership_page");
      if (res) {
        let commitData = res.data;
        commit("updateLeadershipPage", commitData);
      }
    } catch (error) {
      console.log(error, error);
    }
  }
};
