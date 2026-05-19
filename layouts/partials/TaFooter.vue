<template>
  <footer class="ta__footer">
    <div class="ta__footer__wrapper">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-lg-4">
            <div class="ta__footer--about">
              <div class="logo">
                <nuxt-link to="/">
                  <img
                    data-src="~/assets/images/intellion-logo.svg"
                    alt="Tata Intellion"
                    v-lazy-load
                  />
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-8">
            <div class="ta__flex">
              <div class="ta__flex--one">
                <div class="ta__flex">
                  <div class="ta__footer--links">
                    <div class="title">{{ projectMenus.title }}</div>
                    <ul class="quicklinks">
                      <li
                        class="quicklinks__item"
                        v-for="(menu, index) in projectMenus.children"
                        :key="'footerMenuOne_' + index"
                      >
                        <nuxt-link :to="menu.url" @click.native="onProjectLinkClick(menu.url)">
                          {{ menu.title }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="ta__footer--links">
                    <div class="title">{{ discoverMenus.title }}</div>
                    <ul class="quicklinks">
                      <li
                        class="quicklinks__item"
                        v-for="(menu, index) in discoverMenus.children"
                        :key="'footerMenuTwo_' + index"
                      >
                        <nuxt-link :to="menu.url">{{ menu.title }}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="ta__footer--links">
                    <div class="title">{{ quickLinks.title }}</div>
                    <ul class="quicklinks">
                      <li
                        class="quicklinks__item"
                        v-for="(menu, index) in quickLinks.children"
                        :key="'footerMenuThree_' + index"
                      >
                        <nuxt-link :to="menu.url">{{ menu.title }}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="ta__flex--two">
                <div class="ta__footer--links social">
                  <div class="title">{{ socialMenus.title }}</div>
                  <ul class="quicklinks">
                    <li
                      class="quicklinks__item"
                      v-for="(menu, index) in socialMenus.children"
                      :key="'footerMenuThree_' + index"
                    >
                      <a
                        :href="menu.url"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span class="twitter" v-if="menu.title === 'twitter'"></span>
                        <span class="ta__icon icon-linkedin" v-else-if="menu.title === 'linkedin'"></span>
                        <span class="ta__icon icon-instagram" v-else-if="menu.title === 'instagram'"></span>
                        <span class="ta__icon icon-facebook" v-else-if="menu.title === 'facebook'"></span>
                        <span class="ta__icon icon-shape" v-else-if="menu.title === 'youtube'"></span>
                        <span class="text">{{
                          menu.title === "linkedin"
                            ? "LinkedIn"
                            : menu.title === "youtube"
                            ? "YouTube"
                            : menu.title
                        }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row ta__footer--padding">
          <div class="col-lg-6 col-md-6">
            <div class="copywrite">
              <p>Copyright © 2026. Intellion Offices by TATA Realty</p>
            </div>
          </div>
          <!-- <div class="col-lg-6 col-md-6">
            <div class="disclaimer">
              <p>Sitemap | Disclaimer</p>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  methods: {
    onProjectLinkClick(url) {
      if (url && url.includes("=")) {
        this.changeQuery(url);
      }
    },
    changeQuery(val) {
      const newVal = val.split("=")[1];
      if (newVal) {
        this.$nuxt.$emit("changeQuery", newVal);
      }
    },
  },
  computed: {
    emptyMenu() {
      return { title: "", children: [] };
    },
    projectMenus() {
      return this.$store.getters.menus.footer[0] || this.emptyMenu;
    },
    discoverMenus() {
      return this.$store.getters.menus.footer[1] || this.emptyMenu;
    },
    quickLinks() {
      return this.$store.getters.menus.footer[2] || this.emptyMenu;
    },
    socialMenus() {
      return this.$store.getters.menus.footer[3] || this.emptyMenu;
    },
  },
};
</script>
