export const state = () => ({
  contactPage: {}
});

export const mutations = {
  updateContactPage(state, data) {
    state.contactPage = data;
  }
};

export const actions = {
  async getContactPage({ commit }) {
    try {
      const res = await this.$axios.get("/contact_us");
      if (res) {
        let commitData = res.data;
        commit("updateContactPage", commitData);
        return commitData;
      }
    } catch (error) {
      console.log(error, error);
    }
  },

  async contactForm({ commit }, payload) {
    try {
      const res = await this.$axios.post("/query", payload);
      if (res) {
        this.$router.push({
          path: "/thank-you"
        });
      }
    } catch (error) {
      console.log(error, error);
    }
  },

  async subscribeForm({}, payload) {
    try {
      const res = await this.$axios.post("/subscribe", payload);
      if (res && res.status !== 422) {
        this.$router.push({
          path: "/thank-you"
        });
      } else {
        return res;
      }
    } catch (error) {
      console.log(error, error);
    }
  }
};
