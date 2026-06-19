<template>
  <header class="ta__header" :class="resizeLogo ? 'sticky' : ''">
    <div v-if="$store.state.toggleSearch">
      <ta-search-popup></ta-search-popup>
    </div>
    <div class="ta__header--pre">
      <div class="image">
        <img
          src="~assets/images/logos/tata_desktop.svg"
          alt="Tata Intellion"
          v-if="!$device.isMobile"
        />
        <img
          src="~assets/images/logos/tata_mobile.svg"
          alt="Tata Intellion"
          v-if="$device.isMobile"
        />
      </div>
      <!-- <div class="left ta__item">ta__list
        <img src="~assets/images/logoRight/tata-realty-new1.svg" alt="Tata Intellion" />
      </div>
      <div class="right ta__item">
        <img src="~assets/images/logoRight/tata-logo-new1.svg" alt="Tata Intellion" />
      </div>-->
    </div>
    <div
      class="ta__header--main"
      :class="[
        isTransparent ? 'transparent' : '',
        ( $route.name === 'index' ||
        (isNavHovered &&
        ($route.name === 'index' ||
          $route.name === 'thank-you' ||
          $route.name === 'projects-slug')))
          ? 'solid'
          : '',
      ]"
      id="mainheader"
      @mouseenter="isNavHovered = true;freezeBackground(true);"
      @mouseleave="
        isNavHovered = false;
        resetIndicator();
        freezeBackground(false);
      "
    >
      <div class="large__device">
        <nav class="nav" :class="resizeLogo ? 'shrink' : ''">
          <ul class="navbar__menu">
            <template v-for="(item, index) in items">
              <li
                class="nav__list"
                :class="'first-row-' + index"
                :key="'menu_left_' + index"
                v-if="item.title === 'Projects'"
                @mouseenter="
                  showSubmenu = true;
                  showIndicator('first-row-' + index);
                  submenuContent = item.children;
                "
              >
                <nuxt-link :to="item.url" class="nav__link">
                  {{ item.title }}
                </nuxt-link>
              </li>
              <li
                v-else
                class="nav__list"
                @mouseenter="
                  showSubmenu = false;
                  showIndicator('first-row-' + index);
                "
                :class="'first-row-' + index"
                :key="'menu_left_' + index"
              >
                <nuxt-link :to="item.url" class="nav__link">
                  {{ item.title }}
                </nuxt-link>
              </li>
            </template>

            <li
              id="logo"
              class="nav__list"
              :class="resizeLogo ? 'shrink' : ''"
              v-if="isLoaded"
            >
              <nuxt-link to="/" class="nav__link">
                <img
                  src="~/assets/images/intellion-logo.svg"
                  alt="Tata Intellion"
                />
              </nuxt-link>
            </li>
            <template v-for="(item, index) in items2">
              <li
                class="nav__list"
                :key="'menu_right_' + index"
                :class="'second-row-' + index"
                v-if="item.title === 'Projects'"
                @mouseenter="
                  showSubmenu = true;
                  showIndicator('second-row-' + index);
                  submenuContent = item.children;
                "
              >
                <nuxt-link :to="item.url" class="nav__link">
                  {{ item.title }}
                </nuxt-link>
              </li>
              <li
                class="nav__list"
                :key="'menu_right_' + index"
                :class="'second-row-' + index"
                v-else
                @mouseenter="
                  showSubmenu = false;
                  showIndicator('second-row-' + index);
                "
              >
                <nuxt-link :to="item.url" class="nav__link">
                  {{ item.title }}
                </nuxt-link>
              </li>
            </template>
          </ul>
          <!-- Hidding search icon as per the request from Pratik, 8th Oct 2020-->
          <div class="search_icon" @click="toggleSearch(true)">
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
                id="search_icon_white_svg"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="search_icon_white_svg_results_2"
                  transform="translate(-15.000000, -60.000000)"
                  fill="#fff"
                  fill-rule="nonzero"
                >
                  <path
                    d="M34.6959131,78.2168311 L29.765571,73.2661588 C31.0332486,71.8112558 31.7278166,69.9806902 31.7278166,68.0749921 C31.7278166,63.6225117 27.9756946,60 23.3639083,60 C18.752122,60 15,63.6225117 15,68.0749921 C15,72.5274725 18.752122,76.1499842 23.3639083,76.1499842 C25.0952373,76.1499842 26.7451091,75.6458238 28.1557005,74.6887617 L33.1234983,79.6770003 C33.3311415,79.8851947 33.6104233,80 33.9097057,80 C34.1929877,80 34.4617237,79.8957273 34.6657303,79.7061405 C35.0991989,79.3034442 35.1130176,78.6356774 34.6959131,78.2168311 Z M23.1818182,61.8181818 C26.6908021,61.8181818 29.5454545,64.6728342 29.5454545,68.1818182 C29.5454545,71.6908021 26.6908021,74.5454545 23.1818182,74.5454545 C19.6728342,74.5454545 16.8181818,71.6908021 16.8181818,68.1818182 C16.8181818,64.6728342 19.6728342,61.8181818 23.1818182,61.8181818 Z"
                    id="search_icon_white_svg_search"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div id="indicator"></div>
        </nav>
        <div
          class="ta__submenu"
          :class="showSubmenu ? 'active' : ''"
          @mouseleave="
            showSubmenu = false;
            resetIndicator();
          "
        >
          <div class="wrapper">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="ta__submenu--wrapper">
                    <div
                      class="ta__submenu--options"
                      v-for="(option, index) in submenuContent"
                      :key="'option-' + index"
                    >
                      <div
                        class="submenu__details"
                        @click="changeQuery(option.url)"
                      >
                        <nuxt-link
                          :to="option.url"
                          class="submenu__details--link"
                        >
                          <div class="title">{{ option.title }}</div>
                          <div class="logo" v-if="option.logo_image !== null">
                            <img
                              :src="option.logo_image.src"
                              :alt="option.logo_image.alt"
                            />
                          </div>
                        </nuxt-link>
                      </div>
                      <div class="submenu__list">
                        <ul class="ta__list">
                          <li
                            class="ta__list--item"
                            v-for="(submenu, index) in option.children"
                            :key="'sub-option-' + index"
                          >
                            <nuxt-link :to="submenu.url">
                              <div class="title">{{ submenu.title }}</div>
                              <div class="desc">{{ submenu.description }}</div>
                            </nuxt-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="small__device">
        <nav class="nav">
          <button
            aria-label="Toggle mobile menu"
            class="ta__btn nav__toggle"
            :class="isToggle ? 'toggle' : ''"
            @click="
              isToggle = !isToggle;
              showSubmenu = false;
              freezeBackground(isToggle);
            "
          >
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </button>
          <nuxt-link to="/" class="nav__brand">
            <img
              src="~/assets/images/intellion-logo.svg"
              alt="Tata Intellion"
            />
          </nuxt-link>
          <button
            aria-label="Search mobile menu"
            class="ta__btn nav__search"
            @click="toggleSearch(true)"
          >
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
                id="search_icon_small_svg"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="search_icon_small_svg_results_2"
                  transform="translate(-15.000000, -60.000000)"
                  fill="#fff"
                  fill-rule="nonzero"
                >
                  <path
                    d="M34.6959131,78.2168311 L29.765571,73.2661588 C31.0332486,71.8112558 31.7278166,69.9806902 31.7278166,68.0749921 C31.7278166,63.6225117 27.9756946,60 23.3639083,60 C18.752122,60 15,63.6225117 15,68.0749921 C15,72.5274725 18.752122,76.1499842 23.3639083,76.1499842 C25.0952373,76.1499842 26.7451091,75.6458238 28.1557005,74.6887617 L33.1234983,79.6770003 C33.3311415,79.8851947 33.6104233,80 33.9097057,80 C34.1929877,80 34.4617237,79.8957273 34.6657303,79.7061405 C35.0991989,79.3034442 35.1130176,78.6356774 34.6959131,78.2168311 Z M23.1818182,61.8181818 C26.6908021,61.8181818 29.5454545,64.6728342 29.5454545,68.1818182 C29.5454545,71.6908021 26.6908021,74.5454545 23.1818182,74.5454545 C19.6728342,74.5454545 16.8181818,71.6908021 16.8181818,68.1818182 C16.8181818,64.6728342 19.6728342,61.8181818 23.1818182,61.8181818 Z"
                    id="search_icon_small_svg_search"
                  />
                </g>
              </g>
            </svg>
          </button>
        </nav>
        <!-- <transition name="slide-right"> -->
        <div class="ta__menu--wrapper" :class="isToggle ? 'active' : ''">
          <ul class="navbar__menu">
            <!-- <transition-group name="list"> -->
            <template v-for="(menu, index) in menus">
              <li
                class="nav__list"
                @click="
                  isToggle = false;
                  freezeBackground(false);
                "
                :key="'menu_' + index"
                v-if="menu.children.length === 0"
              >
                <nuxt-link :to="menu.url" class="nav__link">
                  {{ menu.title }}
                </nuxt-link>
              </li>
              <li v-else :key="'menu_' + index" class="nav__list">
                <nuxt-link
                  :to="menu.url"
                  class="nav__link"
                  aria-label="Menu"
                  @click="freezeBackground(false)"
                  >{{ menu.title }}</nuxt-link
                >
                <button
                  class="icon"
                  aria-label="Toggle Submenu"
                  type="button"
                  v-if="menu.children.length > 0"
                  @click="
                    showSubmenu = true;
                    submenuContent = menu.children;
                  "
                >
                  <span class="add"></span>
                </button>
              </li>
            </template>
            <!-- </transition-group> -->
          </ul>
          <!-- sub menus for mobile -->
          <div class="nav__options" :class="showSubmenu ? 'active' : ''">
            <div class="navbar__submenu">
              <button
                class="navbar__submenu--title"
                @click="showSubmenu = false"
              >
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                  >
                    <path
                      fill="#353e4a"
                      fill-rule="evenodd"
                      d="M.049 5.091l-.002-.01C.044 5.053.043 5.026.043 5c0-.028.001-.054.004-.08l.002-.012c.002-.023.006-.046.01-.068.032-.15.107-.289.22-.4L4.57.232C4.724.082 4.926 0 5.141 0c.215 0 .417.082.569.231.152.15.235.348.235.558 0 .211-.083.41-.235.559L2.79 4.21h11.447c.444 0 .805.354.805.789 0 .435-.361.79-.805.79H2.791L5.71 8.651c.152.15.235.348.235.559 0 .21-.083.409-.235.558-.152.149-.354.231-.57.231-.214 0-.416-.082-.569-.231L.28 5.559c-.113-.111-.188-.25-.22-.4-.004-.022-.008-.045-.01-.068z"
                    />
                  </svg>
                </span>
                <span class="text">Projects</span>
              </button>
              <div role="tablist" class="navbar__submenu--tablist">
                <b-card
                  no-body
                  v-for="(option, index) in submenuContent"
                  :key="'suboption' + index"
                >
                  <b-card-header header-tag="header" role="tab">
                    <button
                      v-b-toggle="'accordion-' + index"
                      class="navbar__submenu--title"
                      :class="
                        submenuContent.chlidren &&
                        submenuContent.chlidren.length === 0
                          ? 'no-dropdown'
                          : ''
                      "
                    >
                      <span class="icon">
                        <img
                          v-if="
                            option.title === 'COMMERCIAL' ||
                            option.title === 'commercial' ||
                            option.title === 'Commercial'
                          "
                          src="~assets/images/edge_logo.svg"
                          alt="Tata Intellion Edge"
                        />
                        <img
                          v-if="option.title === 'ICONIC FLAGSHIP'"
                          src="~assets/images/prime_logo.svg"
                          alt="Tata Intellion Prime"
                        />
                        <img
                          v-if="option.title === 'IT SEZ LARGE SCALE'"
                          src="~assets/images/park_logo.svg"
                          alt="Tata Intellion Park"
                        />
                        <img
                          v-if="option.title === 'IT SEZ SMALL SCALE'"
                          src="~assets/images/square_logo.svg"
                          alt="Tata Intellion Square"
                        />
                      </span>
                      <span class="title" @click="changeQuery(option.url)">
                        <nuxt-link
                          :to="option.url"
                          @click="freezeBackground(false)"
                          class="text"
                          >{{ option.title }}</nuxt-link
                        >
                        <span
                          class="subtext"
                          v-if="option.title === 'IT SEZ SMALL SCALE'"
                          >Intellion Square</span
                        >
                        <span
                          class="subtext"
                          v-if="option.title === 'IT SEZ LARGE SCALE'"
                          >Intellion Park</span
                        >
                        <span
                          class="subtext"
                          v-if="option.title === 'ICONIC FLAGSHIP'"
                          >Intellion Prime</span
                        >
                        <span
                          class="subtext"
                          v-if="
                            option.title === 'COMMERCIAL' ||
                            option.title === 'commercial' ||
                            option.title === 'Commercial'
                          "
                          >Intellion Edge</span
                        >
                      </span>
                    </button>
                  </b-card-header>
                  <b-collapse
                    :id="'accordion-' + index"
                    accordion="mobile-accordion"
                    role="tabpanel"
                  >
                    <div
                      class="suboptions__wrapper"
                      v-for="(submenu, index) in option.children"
                      :key="'suboption' + index"
                    >
                      <nuxt-link
                        :to="submenu.url"
                        @click="freezeBackground(false)"
                        class="nav__link"
                      >
                        <div class="title">{{ submenu.title }}</div>
                        <div class="desc">{{ submenu.desc }}</div>
                      </nuxt-link>
                    </div>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </div>
        </div>
        <!-- </transition> -->
      </div>
    </div>
  </header>
</template>
<script>
import { setCspDynamicStyle } from "~/utils/cspDynamicStyle";

export default {
  data() {
    return {
      isToggle: false,
      isLoaded: false,
      items: [],
      items2: [],
      isTransparent: false,
      prevScrollpos: 0,
      resizeLogo: false,
      toggleMenu: false,
      isNavHovered: false,
      scrollWidth: 0,
      showSubmenu: false,
      showOptions: false,
      submenuContent: false,
      projectOptions: [
        {
          title: "Commercial",
          type: "edge",
          desc: "",
          url: "/projects?category=edge",
          sub_options: [
            {
              title: "GURUGRAM",
              type: "",
              desc:
                " Office floors can be used in their entirety for larger offices or segmented into up to 4 for smaller ones.",
              url: "/projects/edge?city=gurugram",
            },
          ],
        },
        {
          title: "IT/ITeS/SEZ Large Scale",
          type: "park",
          desc: "",
          url: "/projects?category=park",
          sub_options: [
            {
              title: "GURUGRAM",
              type: "",
              desc: " ",
              url: "/projects/park?city=gurugram",
            },
            {
              title: "CHENNAI",
              type: "",
              desc: " ",
              url: "/projects/park?city=chennai",
            },
            {
              title: "NAVI MUMBAI",
              type: "",
              desc: "  ",
              url: "/projects/park?city=navi-mumbai",
            },
          ],
        },
        {
          title: "IT/ITeS Small Scale",
          type: "square",
          desc: "",
          url: "/projects?category=square",
          sub_options: [
            {
              title: "MUMBAI",
              type: "",
              desc: " ",
              url: "/projects/square?city=mumbai",
            },
          ],
        },
        {
          title: "ICONIC FLAGSHIP",
          type: "prime",
          desc: "",
          url: "/",
          sub_options: [
            {
              title: "COMING SOON",
              type: "",
              desc:
                "Conceived as full-fledged business districts, Intellion Prime would be Iconic Flagship Developments that seed new areas of planned commercial real estate in the region and emerge as independent commercial hubs and growth centres.",
              url: "/",
            },
          ],
        },
      ],
    };
  },
  computed: {
    menus: function () {
      return this.$store.getters.menus.header;
    },
  },
  watch: {
    "$route.query": function (val) {
      this.showSubmenu = false;
      let bodyTag = document.querySelectorAll("body");
      if (bodyTag[0].classList.contains("modal-open")) {
        bodyTag[0].classList.remove("modal-open");
      }
      if (window.innerWidth <= 1024 && !this.showSubmenu) {
        this.isToggle = false;
      }
    },
    "$route.name": function (val) {
      this.showSubmenu = false;
      let bodyTag = document.querySelectorAll("body");
      if (bodyTag[0].classList.contains("modal-open")) {
        bodyTag[0].classList.remove("modal-open");
      }
      if (window.innerWidth <= 1024 && !this.showSubmenu) {
        this.isToggle = false;
      }
      if (val === "index" || val === "commercial-projects-city-project" || val === "sustainability" || val === "sustainability-slug") {
        if (window.innerWidth > 1204) {
          this.isTransparent = true;
        }
      } else {
        this.isTransparent = false;
      }
    },
    // isNavHovered: function(val) {
    //   console.log(val);
    //   console.log(this.$route);
    // }
  },
  methods: {
    toggleSearch(arg) {
      this.$store.commit("updateSearchVisibility", arg);
    },
    changeQuery(val) {
      let newVal = val.split("=")[1];
      this.$nuxt.$emit("changeQuery", newVal);
    },
    getHeaderMenus() {
      this.isActive = false;
      if (!this.menus || !this.menus.length) {
        this.items = [];
        this.items2 = [];
        this.isLoaded = true;
        return;
      }
      let middle = Math.ceil(this.menus.length / 2);
      this.items = this.menus.slice(0, middle);
      this.items2 = this.menus.slice(middle, this.menus.length);
      this.isLoaded = true;
    },
    freezeBackground(arg) {
      let bodyTag = document.querySelectorAll("body");
      if (arg) {
        bodyTag[0].classList.add("modal-open");
      } else {
        bodyTag[0].classList.remove("modal-open");
      }
    },
    toggleTransparentClass() {
      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos < 50) {
        if (
          this.$route.name === "index" ||
          this.$route.name === "commercial-projects-city-project" ||
          this.$route.name === "sustainability" ||
          this.$route.name === "sustainability-slug"
        ) {
          this.isTransparent = true;
        }
        this.resizeLogo = false;
      } else {
        if (
          this.$route.name === "index" ||
          this.$route.name === "commercial-projects-city-project" ||
          this.$route.name === "sustainability" ||
          this.$route.name === "sustainability-slug"
        ) {
          this.isTransparent = false;
        }
        this.resizeLogo = true;
      }
    },
    resetIndicator() {
      setCspDynamicStyle(
        "header-nav-indicator-style",
        "#indicator { left: 0; width: 0; }"
      );
    },
    showIndicator(args) {
      const element = document.querySelectorAll("." + args);

      if (!element.length) {
        return;
      }

      const rect = element[0].getBoundingClientRect();
      setCspDynamicStyle(
        "header-nav-indicator-style",
        `#indicator { left: ${rect.left}px; width: ${rect.width}px; }`
      );
    },
  },
  mounted() {
    this.getHeaderMenus();
    if (process.browser) {
      setTimeout(() => {
        if (
          this.$route.name === "index" ||
          this.$route.name === "projects-slug" ||
          this.$route.name === "sustainability" ||
          this.$route.name === "sustainability-slug"
        ) {
          if (window.innerWidth > 1204) {
            this.isTransparent = true;
          }
        } else {
          this.isTransparent = false;
        }
        addEventListener("scroll", this.toggleTransparentClass);
      }, 500);
      let bodyTag = document.querySelectorAll("body");
      if (bodyTag[0].classList.contains("modal-open")) {
        bodyTag[0].classList.remove("modal-open");
      }
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.toggleTransparentClass);
  },
};
</script>
