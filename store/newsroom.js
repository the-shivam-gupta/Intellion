export const state = () => ({
  newsroom: {},
  newsroomInner: {}
});

export const mutations = {
  updateNewsroom(state, data) {
    state.newsroom = data;
  },
  updateNewsroomInner(state, data) {
    state.newsroomInner = data;
  }
};

export const actions = {
  async getNewsroomPage({ commit }) {
    try {
      const res = await this.$axios.get("/newsroom");
      if (res) {
        let commitData = res.data;
        commit("updateNewsroom", commitData);
   
        return commitData;
      }
    } catch (error) {
      console.log(error, error);
    }
  },
  async getNewsroomInner({ commit }, params) {
    try {
      const res = await this.$axios.get("/news?&filter=2&", { params });
      if (res) {
        if (res.status === 404)
          return this.$router.replace("/error?status=" + res.status);

        let commitData = res.data;
        await commit("updateNewsroomInner", commitData);
      }
    } catch (error) {
      console.log(error, error);
    }
  }
};
