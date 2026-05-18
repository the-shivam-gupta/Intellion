export const state = () => ({
  aboutPage: {}
});

export const mutations = {
  updateAboutPage(state, data) {
    state.aboutPage = data;
  }
};

export const actions = {
  async getAboutPage({ commit }) {
    try {
      const res = await this.$axios.get("/about_us");
      if (res) {
        let commitData = res.data;
        commit("updateAboutPage", commitData);
        return commitData;
      }
    } catch (error) {
      console.log(error, error);
    }
  }
};
