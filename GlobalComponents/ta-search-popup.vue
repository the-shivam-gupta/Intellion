<template>
  <div id="search-popup">
    <section class="section">
      <div class="search_items">
        <div>
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
            <title>search</title>
            <desc>Created with Sketch.</desc>
            <g
              id="search_icon_gold_svg"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="search_icon_gold_svg_results_2"
                transform="translate(-15.000000, -60.000000)"
                fill="#7A6958"
                fill-rule="nonzero"
              >
                <path
                  d="M34.6959131,78.2168311 L29.765571,73.2661588 C31.0332486,71.8112558 31.7278166,69.9806902 31.7278166,68.0749921 C31.7278166,63.6225117 27.9756946,60 23.3639083,60 C18.752122,60 15,63.6225117 15,68.0749921 C15,72.5274725 18.752122,76.1499842 23.3639083,76.1499842 C25.0952373,76.1499842 26.7451091,75.6458238 28.1557005,74.6887617 L33.1234983,79.6770003 C33.3311415,79.8851947 33.6104233,80 33.9097057,80 C34.1929877,80 34.4617237,79.8957273 34.6657303,79.7061405 C35.0991989,79.3034442 35.1130176,78.6356774 34.6959131,78.2168311 Z M23.1818182,61.8181818 C26.6908021,61.8181818 29.5454545,64.6728342 29.5454545,68.1818182 C29.5454545,71.6908021 26.6908021,74.5454545 23.1818182,74.5454545 C19.6728342,74.5454545 16.8181818,71.6908021 16.8181818,68.1818182 C16.8181818,64.6728342 19.6728342,61.8181818 23.1818182,61.8181818 Z"
                  id="search_icon_gold_svg_search"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="search_input">
          <b-form @submit.prevent="submitSearch(true)">
            <b-form-input
              id="searchinputbox"
              type="text"
              name="keyword"
              v-model="searchTerm"
              aria-label="Search Input"
              data-placeholder="Search Input"
              placeholder="What are you looking for?"
            ></b-form-input>
          </b-form>
        </div>
        <div class="close_search" @click="toggleSearch(false)">
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g
              id="close_icon_svg"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="close_icon_svg_results_2"
                transform="translate(-1410.000000, -61.000000)"
                fill="#7A6958"
                fill-rule="nonzero"
              >
                <polygon
                  id="close_icon_svg_polygon"
                  transform="translate(1418.000000, 69.000000) rotate(-315.000000) translate(-1418.000000, -69.000000) "
                  points="1419.26383 78 1419.26383 70.2829787 1427 70.2829787 1427 67.7170213 1419.26383 67.7170213 1419.26383 60 1416.71702 60 1416.71702 67.7170213 1409 67.7170213 1409 70.2829787 1416.71702 70.2829787 1416.71702 78"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div class="search_suggestion_wrapper">
        <!-- <div class="suggestion_title">POPULAR SEARCHES</div> -->
        <nuxt-link
          v-for="(item, index) in resultsLength"
          :key="'searchresultsinputbox_' + index"
          :to="searchResults[item - 1]['redirectTo']"
        >
          <div
            class="search_suggest_item"
            v-html="displayResult(searchResultsNames[item - 1])"
            @click.self="toggleSearch(false, searchResults[item -1])"
            data-aos="fade-up"
          ></div>
        </nuxt-link>
        <!-- <nuxt-link class="search_suggest_item" :to="'/search'" ><span @click.self="toggleSearch(false)"> All Results</span></nuxt-link> -->
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      debounceTime: 500,
      isLoaded: false,
      isOpen: false,
      searchTerm: "",
      search: "",
      totalResult: -1,
    };
  },
  computed: {
    searchResults: function () {
      return this.$store.state.search.searchResults;
    },
    searchResultsNames: function () {
      return this.searchResults.map((e) => e.name);
    },
    resultsLength: function () {
      return this.searchResults.length <= 3 ? this.searchResults.length : 3;
    },
  },
  methods: {
    capitalize(str) {
      let splitStr = str.toLowerCase().split(" ");
      for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      // Directly return the joined string
      return splitStr.join(" ");
    },
    displayResult(arg) {
      const index = arg.toLowerCase().indexOf(this.search.toLowerCase());
      // if (index >= 0) {
      //   let re = new RegExp(`${this.search}`, "gi");
      //   return this.capitalize(
      //     arg.replace(re, `<strong>${this.search}</strong>`)
      //   );
      // } else {
      //   return arg;
      // }
      return arg;
    },
    toggleSearch(arg, searchResult) {
      if (searchResult && searchResult.type === "leader") {
        this.$store.commit("leadership/updateLeader", searchResult.acf);
      }
      this.$store.commit("updateSearchVisibility", arg);
    },
    submitSearch(e) {
      this.search = this.searchTerm;
      if (e) {
        this.toggleSearch(false);
        this.$router.push('/search');
      }
    },
    debouncer: function () {},
    // documentClickClose(e) {
    //   let el = this.$refs.searchBoxWrapper;
    //   let target = e.target;
    //   if (el !== target && !el.contains(target)) {
    //     this.isOpen = false;
    //   }
    // },
  },
  watch: {
    searchTerm: function () {
      this.debouncer();
    },
    search: async function (arg) {
      this.$store.commit("search/updateSearchTerm", arg);
      if (arg !== "") {
        await this.$store.dispatch("search/getSearchResults", arg);
      } else this.$store.commit("search/updateSearchResults", []);
    },
  },
  created() {
    this.debouncer = _.debounce(function () {
      this.search = this.searchTerm;
    }, this.debounceTime);
    // document.addEventListener("click", this.documentClickClose);
  },
  destroyed() {
    // document.removeEventListener("click", this.documentClickClose);
  },
};
</script>
