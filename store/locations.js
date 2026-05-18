export const state = () => ({
  locations: [
    {
      locator: {
        latitude: "23.55555",
        longitude: "123.33333"
      }
    },
    {
      locator: {
        latitude: "19.0171",
        longitude: "73.0175"
      }
    }
  ]
});
// export const mutations = {
//   updateLocations(state, data) {
//     state.locations = data;
//   }
// };
// export const actions = {
//   async getLocations({ commit }) {
//     const res = await this.$axios.get("/store");
//     if (res) {
//       commit("updateLocations", res.data.stores);
//     } else {
//     }
//   }
// };
