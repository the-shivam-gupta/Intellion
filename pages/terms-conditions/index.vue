<template>
  <div class="page-margin" id="privacy">
    <div class="section section-padding">
      <div class="container">
        <div class="row">
            <ta-breadcrumb
            id="breadcrumb"
            :content="page.page_title"
            />
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section__heading text-center" data-aos="fade-up">
              <h1 class="section__title">{{page.page_title}}</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div v-html="page.page_content" data-aos="fade-in"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.$store.state.metaTitle || "Tata Intellion Terms & Conditions",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  computed: {
    page: function () {
      return this.$store.getters.terms;
    },
  },
  mounted() {
    scrollTo({ top: 100, behavior: "smooth" });
  },
};
</script>
