<template>
  <div id="home">
    <template v-if="!isLoaded">
      <!-- <HomeBanner /> -->
      <!-- :slideImages="homepage.banner.slider" -->
      <section class="section hero" id="hero">
        <HeroSlider v-if="isNuxtReady" :slideImages="homepage.banner.slider" />
        <div class="scroll-down">
          <a @click.prevent="scrollToTargetAdjusted('#projects')" class="icon">
            <img src="~/assets/images/scroll.svg" alt="Tata Intellion" />
          </a>

          <div class="text">Scroll</div>
        </div>
      </section>
      <CounterSection />
      <section class="section" id="projects">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="section__heading">
                <h2 class="section__title">{{ homepage.projects.title }}</h2>
                <div class="section__desc">
                  <p>{{ homepage.projects.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <ProjectTabsSlider />
            </div>
          </div>
        </div>
      </section>
      <section class="section section-padding testimonials" id="testimonials">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section__heading">
                <h2 class="section__title">
                  {{ homepage.testimonials.title }}
                </h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="testimonials__content">
                <slick v-if="isNuxtReady" :options="slickOptions">
                  <div
                    class="carousel__item"
                    v-for="(testimony, index) in homepage.testimonials
                      .testimonies"
                    :key="'testimony' + index"
                  >
                    <ta-testimonial-card
                      :content="testimony"
                    ></ta-testimonial-card>
                  </div>
                </slick>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="feature">
        <ta-highlight-section
          :content="homepage.features"
          has="features"
        ></ta-highlight-section>
      </section>

      <NewsSection :newslist="latest_news" />
      <!-- <ta-notify></ta-notify> -->
      <!-- test -->

      <!-- Disclaimer -->
      <b-modal
        id="disclaimer"
        class="disclaimer"
        size="lg"
        ref="disclaimer-modal"
        :no-close-on-backdrop="true"
      >
        <h1 class="title">Disclaimer</h1>
        <div class="ta__para">
          This is to inform user / customer(s) that
          <a
            href="https://www.tatarealty.in/"
            rel="noopener"
            target="_blank"
            aria-label="Tatarealty link"
            >www.tatarealty.in</a
          >&nbsp;is the only official website of Tata Realty and its affiliates
          and subsidiaries (hereinafter collectively referred to as "Company").
          User/Customer(s) are cautioned and advised not to rely upon any
          information stated on any other websites which may appear to be
          similar to the Company's official website. The information contained
          in such websites may be misleading/false and user/customer(s) may
          suffer loss if they rely on such information. In the event
          user/customer(s) come across any such websites similar to Company's
          official website containing its brand name/logo or any other
          information, then kindly contact and inform us on
          <a
            href="mailto:mktginfo@tatarealty.in"
            rel="noopener"
            target="_blank"
            aria-label="mktginfo mail"
            >mktginfo@tatarealty.in</a
          >
          in order to enable the Company to take necessary action.
        </div>
        <div class="ta__para">
          Terms of use: The terms and conditions appearing on this page
          (together with the documents referred to in them) set out the terms on
          which you may make use of this website, whether as a guest or a
          registered user. Use of this website includes accessing, browsing or
          registering to use our website. By proceeding to view our website or
          any part of it, you acknowledge that you have read, understood and
          accepted these terms which shall constitute the entire binding
          agreement between you and the Company. These terms may be varied by
          the Company from time to time and the revised terms will be deemed to
          apply at the relevant time in respect of your registration and/or use
          of our website. Please check this page from time to time to take
          notice of any changes we made as they are binding on you. Please read
          these terms carefully before you start to use our website, as these
          will apply to your use of our website. If you do not agree to these
          terms, you must not use our website.
        </div>
        <template v-slot:modal-footer="{ cancel }">
          <div class="text-center">
            <button
              class="ta__btn ta__btn--primary"
              type="button"
              @click="cancel()"
            >
              I agree
            </button>
          </div>
        </template>
      </b-modal>
      <!-- Disclaimer -->
    </template>
    <template v-if="isLoaded">
      <section class="section">
        <ta-skeleton-loader width="100" height="700"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <ta-skeleton-loader width="100" height="15"></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="15"
              ></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-2"
                width="100"
                height="15"
              ></ta-skeleton-loader>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-lg-3 col-sm-3">
              <ta-skeleton-loader width="100" height="250"></ta-skeleton-loader>
            </div>
            <div class="col-lg-3 col-sm-3">
              <ta-skeleton-loader width="100" height="250"></ta-skeleton-loader>
            </div>
            <div class="col-lg-3 col-sm-3">
              <ta-skeleton-loader width="100" height="250"></ta-skeleton-loader>
            </div>
            <div class="col-lg-3 col-sm-3">
              <ta-skeleton-loader width="100" height="250"></ta-skeleton-loader>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
import HeroSlider from "~/components/HeroSlider";
import HomeBanner from "~/components/HomeBanner";
import ProjectTabsSlider from "~/components/ProjectTabsSlider";
import NewsSection from "~/components/NewsSection";
import { youtube_parser } from "~/middleware/utils";
export default {
  head() {
  return {
    htmlAttrs: {
      lang: "en"
    },
    title: this.$store.state.metaTitle || "TATA Intellion - Office Spaces by TATA Realty",
    meta: this.$store.state.meta,
    link: this.$store.state.link,

    script: [
      {
        hid: 'organization-schema',
        type: 'application/ld+json',
        json: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tata Intellion",
          "url": "https://www.intellion.in/",
          "logo": "https://www.intellion.in/_nuxt/img/intellion-logo.ad59e72.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-22-66614444",
            "contactType": "Customer Support",
            "email": "intellion@tatarealty.in"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "E Block, Voltas Compound, Tukaram Bhikaji Kadam Marg, Chinchpokli",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400033",
            "addressCountry": "IN"
          },
          "description": "Tata Intellion is a leading real estate development brand offering premium office spaces and IT campuses in India.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.3",
            "reviewCount": "47",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Mr. Balasubramanian Ramamurthy" },
              "reviewBody": "We were the first tenants to occupy office, and over a period have expanded our facilities in the campus..."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Ms. Pramad Jandhyala" },
              "reviewBody": "Ramanujan IT City is a sophisticated work environment, aesthetically designed and professionally maintained..."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Mr. Raman Padmanabhan" },
              "reviewBody": "Thryve Digital found a credible partner in TRIL and Ramanujan IT City..."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Mr. Kumar Rajagopalan" },
              "reviewBody": "Ramanujan IT City provides a safe, secure & stress-free work environment..."
            }
          ]
        }
      }
    ]
  };
},

  data() {
    return {
      isNuxtReady: false,
      slickOptions: {
        slidesToShow: 1,
        arrows: true,
        dots: true,
        fade: true,
        nextArrow:
          "<button class='carousel-next' aria-label='next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev' aria-label='previous'> <span class='ta__icon icon-prev'></span></button>"
      },
      isLoaded: false
    };
  },
  computed: {
    homepage: function() {
      return this.$store.getters.homePageDetails;
    },
    latest_news: function() {
      return this.$store.getters.latest_news;
    }
  },
  watch: {
    "$store.state.globalLoader": function(val) {
      this.isLoaded = val;
    }
  },
  components: {
    HeroSlider,
    slick,
    ProjectTabsSlider,
    NewsSection,
    HomeBanner
  },
  methods: {
    showModal() {
      this.$refs["disclaimer-modal"].show();
    },
    scrollToTargetAdjusted(id) {
      if (id) {
        let element = document.querySelectorAll(id);
        if (element) {
          let elementOffset = element[0].offsetTop;
          if (window.innerWidth <= 768) {
            window.scrollTo(0, elementOffset - 160);
          } else if (window.innerWidth <= 1024) {
            window.scrollTo(0, elementOffset - 170);
          } else {
            window.scrollTo(0, elementOffset - 200);
          }
        }
      }
    },
    hideModal() {
      this.$refs["disclaimer-modal"].hide();
    },
    getYouTubeUrl(url) {
      let videoId = youtube_parser(url);
      return "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
    }
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
    }
    if (sessionStorage.getItem("firstVisit") === 'no visit') {
      this.showModal();
      sessionStorage.setItem("firstVisit", true);
    }
  }
};
</script>
