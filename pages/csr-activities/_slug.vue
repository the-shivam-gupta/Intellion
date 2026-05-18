<template>
  <div id="newsroom-inner-page">
    <template v-if="!$fetchState.pending">
      <section class="section section-newsroom-inner">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="news_back" data-aos="fade-in">
                <nuxt-link to="/newsroom">
                  <svg
                    width="19px"
                    height="9px"
                    viewBox="0 0 19 9"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                    <title>Fill 1 Copy</title>
                    <desc>Created with Sketch.</desc>
                    <g
                      id="Projects"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="filter"
                        transform="translate(-11.000000, -26.000000)"
                        fill="#7a6958"
                      >
                        <g id="top-bar">
                          <g
                            id="back"
                            transform="translate(11.000000, 15.000000)"
                          >
                            <path
                              d="M18.9949951,15.5823081 C18.99544,15.5788975 18.9962185,15.5756006 18.9965522,15.5720764 C18.9988878,15.5483162 19,15.5243286 19,15.5001137 C19,15.4758987 18.9988878,15.4519112 18.9965522,15.428151 C18.9962185,15.4246267 18.99544,15.4213299 18.9949951,15.4178056 C18.9927707,15.397456 18.9899902,15.3771063 18.9860975,15.3570977 C18.9588485,15.2213577 18.894007,15.0972135 18.7965779,14.9976252 L15.0891578,11.2080439 C14.9578065,11.0738954 14.7833017,11 14.5976749,11 C14.4119369,11 14.2375433,11.0738954 14.1060808,11.2080439 C13.9748408,11.342306 13.9025475,11.5206781 13.9025475,11.7105323 C13.9025475,11.9003865 13.9748408,12.0787586 14.1060808,12.2129071 L16.6267795,14.7894677 L0.695127377,14.7894677 C0.311861946,14.7894677 0,15.1082409 0,15.5 C0,15.8918728 0.311861946,16.2105323 0.695127377,16.2105323 L16.6267795,16.2105323 L14.1060808,18.7872066 C13.9748408,18.9213551 13.9025475,19.0997272 13.9025475,19.2894677 C13.9025475,19.4793219 13.9748408,19.6578076 14.1060808,19.7919561 C14.2375433,19.9262183 14.4119369,20 14.5976749,20 C14.7833017,20 14.9578065,19.9262183 15.0891578,19.7919561 L18.7965779,16.0024884 C18.894007,15.9030139 18.9588485,15.7788697 18.9857638,15.6439254 C18.9899902,15.623121 18.9927707,15.6027714 18.9949951,15.5823081 Z"
                              id="Fill-1-Copy"
                              transform="translate(9.500000, 15.500000) scale(-1, 1) translate(-9.500000, -15.500000) "
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  BACK TO NEWSROOM
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-2 col-md-2">
              <div class="social_links_wrapper" data-aos="fade-up">
                <a
                  rel="noopener"
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                  @click.prevent="redirectUrl(fbSocialUrl)"
                  target="_blank"
                >
                  <div class="social_icon">
                    <img src="~/assets/images/facebook.svg" alt />
                  </div>
                </a>
                <a
                  rel="noopener"
                  title="Share on Twitter"
                  aria-label="Share on Twitter"
                  @click.prevent="redirectUrl(twitterSocialUrl)"
                  target="_blank"
                >
                  <div class="social_icon">
                    <img src="~/assets/images/twitter.svg" alt />
                  </div>
                </a>
                <a
                  rel="noopener"
                  title="Share on Linkedin"
                  aria-label="Share on Linkedin"
                  @click.prevent="redirectUrl(linkedinShareUrl)"
                  target="_blank"
                >
                  <div class="social_icon">
                    <img src="~/assets/images/linked-in.svg" alt="Linkedin" />
                  </div>
                </a>
                <a
                  rel="noopener"
                  title="Share on Mail"
                  aria-label="Share on Mail"
                  :href="`mailto:?${mailShareUrl}`"
                  target="_blank"
                >
                  <div class="social_icon">
                    <img src="~/assets/images/email_newsroom.svg" alt />
                  </div>
                </a>
                <a
                  rel="noopener"
                  title="Copy link"
                  aria-label="Copy link"
                  @click.prevent="sharePageLink"
                  target="_blank"
                >
                  <div class="social_icon">
                    <img src="~/assets/images/share_link.svg" alt="Share link" />
                  </div>
                </a>
              </div>
            </div>
            <div class="col-lg-8 col-md-8">
              <div class="news_wrapper">
                <h1 data-aos="fade-up">
                  {{ csrList.title }}
                </h1>
                <div class="social_links_wrapper_mob">
                  <a
                    rel="noopener"
                    title="Share on Facebook"
                    aria-label="Share on Facebook"
                    @click.prevent="redirectUrl(fbSocialUrl)"
                    target="_blank"
                  >
                    <div class="social_icon">
                      <img src="~/assets/images/mob_facebook.svg" alt="Facebook" />
                    </div>
                  </a>
                  <a
                    rel="noopener"
                    title="Share on Twitter"
                    aria-label="Share on Twitter"
                    @click.prevent="redirectUrl(twitterSocialUrl)"
                    target="_blank"
                  >
                    <div class="social_icon">
                      <img src="~/assets/images/mob_twitter.svg" alt="X" />
                    </div>
                  </a>
                  <a
                    rel="noopener"
                    title="Share on Linkedin"
                    aria-label="Share on Linkedin"
                    @click.prevent="redirectUrl(linkedinShareUrl)"
                    target="_blank"
                  >
                    <div class="social_icon">
                      <img src="~/assets/images/mob_linkedin.svg" alt="Linkedin" />
                    </div>
                  </a>
                  <a
                    rel="noopener"
                    title="Share on Mail"
                    aria-label="Share on Mail"
                    :href="`mailto:?${mailShareUrl}`"
                    target="_blank"
                  >
                    <div class="social_icon">
                      <img src="~/assets/images/mob_email.svg" alt="Mob Email" />
                    </div>
                  </a>
                  <a
                    rel="noopener"
                    title="Copy link"
                    aria-label="Copy link"
                    @click.prevent="sharePageLink"
                    target="_blank"
                  >
                    <div class="social_icon">
                      <img src="~/assets/images/mob_share_link.svg" alt="Mob Share link" />
                    </div>
                  </a>
                  <a
                    rel="noopener"
                    title="Share on Whatsapp"
                    aria-label="Share on Whatsapp"
                    @click.prevent="redirectUrl(whatsAppSocialUrl)"
                    target="_blank"
                  >
                    <div class="social_icon">
                      <img src="~/assets/images/whatsapp.svg" alt="whatsapp" />
                    </div>
                  </a>
                </div>
                <h6 data-aos="fade-up">{{ csrList.date }}</h6>
                <div v-html="csrList.page_content" data-aos="fade-in" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ta-subscription :content="subscription_section"></ta-subscription>
    </template>

    <template v-if="$fetchState.pending">
      <section class="section">
        <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader
                class="mt-2"
                width="50"
                height="5"
              ></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-3"
                width="100"
                height="15"
              ></ta-skeleton-loader>
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
export default {
  async fetch() {
    const { params, store, router } = this.$nuxt.context;
    let newparams = {
      filter: 2,
      slug: params.slug,
      // project_city: params.city,
    };
    await store.dispatch("csr/getCsrInner", params);
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.csrList
        ? "Tata Intellion - " + this.csrList.title
        : "Tata Intellion",
         meta: this.$store.state.meta,
      link: [
        ...this.$store.state.meta,
        { hid: 'canonical', rel: 'canonical', href: `https://www.intellion.in${this.$route.fullPath}` }
      ],
    };
  },
  data() {
    return {
      hero_section: {
        title: "Newsroom",
        description:
          "Get the latest news, events and feature stories on our businesses, community initiatives, heritage and people.",
      },
      subscription_section: {
        title:
          "Get the latest stories and announcements from Intellion in your inbox.",
        subscription_options: ["News Alert", "Events", "Press Release"],
        subscription_note:
          "By clicking Subscribe you'll receive occasional emails from Intellion. You always have the choice to adjust your interest settings or unsubscribe.",
      },
    };
  },
  methods: {
    scrollEvent() {
      // console.log(window.pageYOffset);
      let pagemark = document.getElementById("pagetabs");
      if (pagemark) {
        if (window.pageYOffset > 150) {
          pagemark.classList.add("fixed");
        } else {
          pagemark.classList.remove("fixed");
        }
      }
    },
    redirectUrl(arg) {
      open(arg, "_blank");
    },
    copyMessage(val) {
      const selBox = document.createElement("textarea");
      selBox.style.position = "fixed";
      selBox.style.left = "0";
      selBox.style.top = "0";
      selBox.style.opacity = "0";
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand("copy");
      document.body.removeChild(selBox);
    },
  },
  computed: {
    csrList: function () {
      return this.$store.state.csr.csrList;
    },
    fbSocialUrl: function () {
      return process.client
        ? "https://www.facebook.com/sharer/sharer.php?u=" +
            window.location.origin +
            this.$route.fullPath
        : "";
    },
    twitterSocialUrl: function () {
      return process.client
        ? "http://twitter.com/share?text=" +
            "Hi, checkout this link from TATA Intellion" +
            "&url=" +
            window.location.origin +
            this.$route.fullPath
        : "";
    },
    mailShareUrl: function () {
      return process.client
        ? "subject= TATA Intellion - " +
            this.$route.fullPath +
            " " +
            "&body= Hi, checkout this link from TATA Intellion" +
            "  " +
            " - " +
            window.location.origin +
            this.$route.fullPath
        : "";
    },
    linkedinShareUrl: function () {
      return process.client
        ? "https://www.linkedin.com/shareArticle?mini=true&url=" +
            window.location.origin +
            this.$route.fullPath
        : "";
    },
    sharePageLink: function () {
      return this.copyMessage(window.location.origin + this.$route.fullPath);
    },
    whatsAppSocialUrl: function () {
      if (this.$device.isMobile) {
        return process.client
          ? "whatsapp://send?text=" +
              "Hi, checkout this link from TATA Intellion" +
              " " +
              window.location.origin +
              this.$route.fullPath
          : "";
      } else {
        return process.client
          ? "https://web.whatsapp.com/send?text=" +
              "Hi, checkout this link from TATA Intellion" +
              " " +
              window.location.origin +
              this.$route.fullPath
          : "";
      }
    },
  },
  mounted() {
    scrollTo({ top: 0, behavior: "smooth" });
    document.addEventListener("scroll", this.scrollEvent);
  },
  destroyed() {
    document.removeEventListener("scroll", this.scrollEvent);
  },
};
</script>
