<template>
  <div class="ta__enquiry--wrapper" id="enquiry" :class="!isVisible?'hide':''">
    <ta-cta text="ENQUIRE NOW" btnStyle="ta__btn--dark" @click.native="openFormModal"></ta-cta>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  watch: {
    "$route.name": function (val) {
      if (val === "index") {
        this.isVisible = false;
      }
    },
  },
  methods: {
    toggleButton() {
      let currentScrollPos = window.pageYOffset;
      if (this.$route.name === "index") {
        let triggerPosition = document.querySelectorAll("#hero");
        if ( triggerPosition.length > 0 ) 
        {
          if(triggerPosition[0].offsetHeight < currentScrollPos){
            this.isVisible = true;
          }else{
            this.isVisible = false;
          }
        } else {
          this.isVisible = false;
        }
      } else if (this.$route.name === "thank-you") {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },
    openFormModal() {
      this.$store.commit('updateEnquiryModal', true);
    }
  },
  mounted() {
    if (process.browser) {
      document.addEventListener("scroll", this.toggleButton);
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.toggleButton);
  },
};
</script>
