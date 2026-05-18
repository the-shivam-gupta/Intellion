export const state = () => ({
    cocInfo: {},
    cocInfoInner: {}
  });
  
  export const mutations = {
    updateCocInfo(state, data) {
      state.cocInfo = data;
    },
    updateCocInfoInner(state, data) {
      state.cocInfoInner = data;
    }
  };
  
  export const actions = {
    async getCocInfoPage({ commit }) {
      try {
        const res = await this.$axios.get("/code_of_conduct");
        if (res) {
          let commitData = res.data;
          commit("updateCocInfo", commitData);
          return commitData;
        }
      } catch (error) {
        console.log(error, error);
      }
    },
    async getCocInner({ commit }, params) {
      try {
        const res = await this.$axios.get("/news?filter=2&", { params });
        if (res) {
          if (res.status === 404)
            return this.$router.replace("/error?status=" + res.status);
  
          let commitData = res.data;
          await commit("updateCocInfoInner", commitData);
        }
      } catch (error) {
        console.log(error, error);
      }
    }
  };
  