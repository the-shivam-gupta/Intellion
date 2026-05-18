export const state = () => ({
    investorInfo: {},
    investorInfoInner: {}
  });
  
  export const mutations = {
    updateInvestorInfo(state, data) {
      state.investorInfo = data;
    },
    updateInvestorInfoInner(state, data) {
      state.investorInfoInner = data;
    }
  };
  
  export const actions = {
    async getInvestorInfoPage({ commit }) {
      try {
        const res = await this.$axios.get("/investor_info");
        if (res) {
          let commitData = res.data;
          commit("updateInvestorInfo", commitData);
          return commitData;
        }
      } catch (error) {
        console.log(error, error);
      }
    },
    async getInvestorInfoInner({ commit }, params) {
      try {
        const res = await this.$axios.get("/news?filter=2&", { params });
        if (res) {
          if (res.status === 404)
            return this.$router.replace("/error?status=" + res.status);
  
          let commitData = res.data;
          await commit("updateInvestorInfoInner", commitData);
        }
      } catch (error) {
        console.log(error, error);
      }
    }
  };
  