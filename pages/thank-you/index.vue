<template>
  <div class="page-margin" id="thank-you">
    <section class="section section-padding thank-you">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section__heading">
              <h1 class="section__title" data-aos="fade-up">{{page.page_title}}</h1>
              <h3 class="ta__h3" data-aos="fade-up">{{page.subtitle}}</h3>
            </div>
            <div class="section__content">
              <!-- <p class="ta__para">
                We aim to respond to messages within 24 hours. If your enquiry is urgent please email us
                <a
                  href
                >@info@intellion.com</a>
              </p>-->
              <div v-html="page.description" data-aos="fade-in"/>
              <div class="text-center">
                <ta-cta
                  text="EXPLORE HOMEPAGE"
                  btnStyle="ta__btn--primary"
                  type="link"
                  url="/"
                  :isicon="false"
                ></ta-cta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <NewsSection /> -->
  </div>
</template>
<script>
import NewsSection from "~/components/NewsSection";
export default {
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.metaTitle,
      meta: this.pageMeta,
      link: this.$store.state.link
    };
  },
  components: {
    NewsSection,
  },
  computed: {
    page: function () {
      return this.$store.getters.thankPage;
    },
    metaTitle() {
      const title = this.$store.state.metaTitle;
      if (title && !/%%/.test(title)) {
        return title;
      }
      return "TATA Intellion - Thank You";
    },
    pageMeta() {
      const title = this.metaTitle;
      return (this.$store.state.meta || []).map((item) => {
        if (
          item.hid === "title" ||
          item.hid === "og:title" ||
          item.hid === "twitter:title"
        ) {
          return { ...item, content: title };
        }
        return item;
      });
    },
  },
};
</script>
