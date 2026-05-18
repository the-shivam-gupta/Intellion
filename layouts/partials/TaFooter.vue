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
                        @click="changeQuery(menu.url)"
                      >
                        <nuxt-link :to="menu.url">{{ menu.title }}</nuxt-link>
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
                        rel="noopener"
                        target="_blank"
                        class="d-flex align-items-center"
                      >
                        <span class="twitter mr-2" v-if="menu.title =='twitter'"></span>
                        <span class="ta__icon icon-linkedin mr-2" v-if="menu.title=='linkedin'"></span>
                        <span class="ta__icon icon-instagram mr-2" v-if="menu.title=='instagram'"></span>
                        <span class="ta__icon icon-facebook mr-2" v-if="menu.title=='facebook'"></span>
                        <span class="ta__icon icon-shape mr-2" v-if="menu.title=='youtube'"></span>
                        <span
                          class="text"
                        >{{ menu.title =='linkedin'?'LinkedIn':menu.title=='youtube'?'YouTube':menu.title }}</span>
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
    text(arg) {},
    changeQuery(val) {
      let newVal = val.split("=")[1];
      this.$nuxt.$emit("changeQuery", newVal);
    },
  },
  computed: {
    projectMenus: function () {
      return this.$store.getters.menus.footer[0];
    },
    discoverMenus: function () {
      return this.$store.getters.menus.footer[1];
    },
    quickLinks: function () {
      return this.$store.getters.menus.footer[2];
    },
    socialMenus: function () {
      return this.$store.getters.menus.footer[3];
    },
  },
};
</script>
