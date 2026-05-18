<template>
  <div>
    <ta-header />
    <Nuxt />
    <ta-footer />
    <ta-enquiry />
    <ta-loader v-if="showLoader && !$store.state.hideLoader" />
    <!-- Enquiry Details Modal Starts Here -->
    <b-modal
      id="enquiry-modal"
      class="enquiry-modal"
      ref="enquiry-modal"
      v-model="showFormModal"
      no-close-on-backdrop
    >
      <template v-slot:modal-header="{ close }">
        <button class="ta__btn ta__btn--transparent" @click="close()">
          <span class="icon-close"></span>
        </button>
      </template>
      <div class="form__wrapper">
        <ta-form from="enquire"></ta-form>
      </div>
    </b-modal>
    <!-- Enquiry Details Modal Ends Here -->

    <!-- Video Details Modal Starts Here -->
    <b-modal
      id="video-modal"
      class="video-modal"
      ref="video-modal"
      no-close-on-backdrop
    >
      <template v-slot:modal-header="{ close }">
        <button class="ta__btn ta__btn--transparent" @click="close()">
          <span class="icon-close"></span>
        </button>
      </template>
      <client-only>
        <iframe
          width="560"
          height="315"
          :src="actualUrl"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </client-only>
    </b-modal>
    <!-- Video Details Modal Ends Here -->
  </div>
</template>
<script>
import TaHeader from "./partials/TaHeader";
import TaFooter from "./partials/TaFooter";
import TaEnquiry from "./partials/TaEnquiry";
import TaLoader from "./partials/TaLoader";
export default {
  data() {
    return {
      actualUrl: "",
      showLoader: false,
      showFormModal: false,
    };
  },
  components: {
    TaHeader,
    TaFooter,
    TaEnquiry,
    TaLoader
  },
  watch: {
    "$store.state.globalLoader": function(val) {
      this.showLoader = val;
    },
    "$store.state.showEnquiryModal": function(val) {
      // if (!val) {
      //   this.$refs["enquiry-modal"].hide();
      // }
      this.showFormModal = val;
    },
    "$store.state.video_url": function(val) {
      this.actualUrl = val;
    }
  },
  mounted() {
    if (process.browser) {
      scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>
