<template>
  <div id="project-page">
    <template v-if="!$fetchState.pending">
      <section class="section">
        <div class="hero one text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section__heading">
                  <h1 class="section__subtitle" data-aos="fade-down">
                    {{ pageDetails.hero_section.sub_title }}
                  </h1>
                  <div class="section__title" data-aos="fade-down">
                    {{ pageDetails.hero_section.title }}
                  </div>
                  <div class="section__desc" data-aos="fade-down">
                    <p class="ta__para">
                      {{ pageDetails.hero_section.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 ta__hide--xs">
                <div class="width-80">
                  <div class="ta__dropdown--group" data-aos="fade-up">
                    <b-dropdown split id="dropdown-1" class="ta__dropdown">
                      <template v-slot:button-content>
                        <div class="ta__dropdown--flex">
                          <div class="text">{{ cityLabel }}</div>
                          <button
                            class="icon"
                            v-if="dropdownModals.city.length > 0"
                            @click="clear('city')"
                          >
                            <span class="icon-close"></span>
                          </button>
                        </div>
                      </template>
                      <b-dropdown-form>
                        <b-form-group>
                          <b-form-checkbox-group
                            id="checkbox-group-city"
                            class="ta__block"
                            v-model="dropdownModals.city"
                            :options="all_filters.city"
                            value-field="slug"
                            text-field="name"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </b-dropdown-form>
                    </b-dropdown>
                    <b-dropdown split id="dropdown-2" class="ta__dropdown">
                      <template v-slot:button-content>
                        <div class="ta__dropdown--flex">
                          <div class="text">{{ projectLabel }}</div>
                          <button
                            class="icon"
                            v-if="dropdownModals.project_category.length > 0"
                            @click="clear('project_category')"
                          >
                            <span class="icon-close"></span>
                          </button>
                        </div>
                      </template>
                      <b-dropdown-form>
                        <b-form-group>
                          <b-form-checkbox-group
                            id="checkbox-group-2"
                            class="ta__block"
                            v-model="dropdownModals.project_category"
                            :options="all_filters.project_category"
                            value-field="slug"
                            text-field="name"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </b-dropdown-form>
                    </b-dropdown>
                    <b-dropdown split id="dropdown-3" class="ta__dropdown">
                      <template v-slot:button-content>
                        <div class="ta__dropdown--flex">
                          <div class="text">{{ projectTypeLabel }}</div>
                          <button
                            class="icon"
                            v-if="dropdownModals.project_category.length > 0"
                            @click="clear('project_category')"
                          >
                            <span class="icon-close"></span>
                          </button>
                        </div>
                      </template>
                      <b-dropdown-form>
                        <b-form-group>
                          <b-form-checkbox-group
                            id="checkbox-group-3"
                            class="ta__block"
                            v-model="dropdownModals.project_category"
                            :options="all_filters.project_category"
                            value-field="slug"
                            text-field="project_type"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </b-dropdown-form>
                    </b-dropdown>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 ta__show--xs text-center">
                <button
                  class="ta__btn ta__dropdown"
                  @click="
                    showOptions = true;
                    freezeBackground(true);
                  "
                >
                  <span class="text">{{ mobileFilterlabel }}</span>
                  <span class="ta__icon icon-down"></span>
                </button>
                <div class="ta__options" :class="showOptions ? 'show' : ''">
                  <div class="ta__flex">
                    <button
                      class="ta__btn heal-white"
                      @click="
                        showOptions = false;
                        freezeBackground(false);
                      "
                    >
                      <span class="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="10"
                          viewBox="0 0 15 10"
                        >
                          <path
                            fill="#ffffff"
                            fill-rule="evenodd"
                            d="M.049 5.091l-.002-.01C.044 5.053.043 5.026.043 5c0-.028.001-.054.004-.08l.002-.012c.002-.023.006-.046.01-.068.032-.15.107-.289.22-.4L4.57.232C4.724.082 4.926 0 5.141 0c.215 0 .417.082.569.231.152.15.235.348.235.558 0 .211-.083.41-.235.559L2.79 4.21h11.447c.444 0 .805.354.805.789 0 .435-.361.79-.805.79H2.791L5.71 8.651c.152.15.235.348.235.559 0 .21-.083.409-.235.558-.152.149-.354.231-.57.231-.214 0-.416-.082-.569-.231L.28 5.559c-.113-.111-.188-.25-.22-.4-.004-.022-.008-.045-.01-.068z"
                          />
                        </svg>
                      </span>
                      <span class="text">Filters</span>
                    </button>
                    <button class="ta__btn pinkish-grey" @click="clear('all')">
                      clear filters
                    </button>
                  </div>
                  <div role="tablist">
                    <b-card no-body>
                      <b-card-header header-tag="header" role="tab">
                        <button class="ta__btn" block v-b-toggle.accordion-city>
                          Cities
                          <span class="add"></span>
                        </button>
                      </b-card-header>
                      <b-collapse
                        id="accordion-city"
                        visible
                        accordion="project-accordion"
                        role="tabpanel"
                      >
                        <b-form-group>
                          <b-form-checkbox-group
                            id="checkbox-group-1"
                            class="ta__block"
                            v-model="dropdownModals.city"
                            :options="all_filters.city"
                            value-field="slug"
                            text-field="name"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </b-collapse>
                    </b-card>

                    <b-card no-body>
                      <b-card-header header-tag="header" role="tab">
                        <button
                          class="ta__btn"
                          block
                          v-b-toggle.accordion-category
                        >
                          Projects
                          <span class="add"></span>
                        </button>
                      </b-card-header>
                      <b-collapse
                        id="accordion-category"
                        accordion="project-accordion"
                        role="tabpanel"
                      >
                        <b-form-group>
                          <b-form-checkbox-group
                            id="checkbox-group-2"
                            class="ta__block"
                            v-model="dropdownModals.project_category"
                            :options="all_filters.project_category"
                            value-field="slug"
                            text-field="name"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </b-collapse>
                    </b-card>

                    <b-card no-body>
                      <b-card-header header-tag="header" role="tab">
                        <button
                          block
                          class="ta__btn"
                          v-b-toggle.accordion-project
                        >
                          <span class="text">Project Type</span>
                          <span class="add"></span>
                        </button>
                      </b-card-header>
                      <b-collapse
                        id="accordion-project"
                        accordion="project-accordion"
                        role="tabpanel"
                      >
                        <b-form-group>
                          <b-form-checkbox-group
                            id="checkbox-group-3"
                            class="ta__block"
                            v-model="dropdownModals.project_category"
                            :options="all_filters.project_category"
                            value-field="slug"
                            text-field="project_type"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </b-collapse>
                    </b-card>
                  </div>
                  <div class="apply-filter">
                    <button
                      class="ta__btn ta__btn--primary"
                      @click="showOptions = false"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-padding" id="project-tabs">
        <div class="container">
          <div class="row">
            <ta-breadcrumb
            id="breadcrumb"
            content="Commercial Projects"
            />
          </div>
          <div class="row">
            <div class="col-lg-12">
              <b-tabs class="tabs">
                <template v-for="(tag, index) in all_filters.project_tag">
                  <b-tab
                    :title="tag.name"
                    v-if="hideUnwantedTab(tag)"
                    :key="'tag' + index"
                    @changed="setTab(tag)"
                  >
                    <div class="row" v-if="projects.length > 0 && !showLoader">
                      <template v-for="(project, index) in plottedProjects">
                        <div
                          :key="'projects' + index"
                          class="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                          v-if="tag.slug === project.filters.project_tag.slug"
                          data-aos="fade-in"
                        >
                          <ta-primary-card :content="project"></ta-primary-card>
                        </div>
                      </template>
                    </div>
                    <div class="row" v-else-if="showLoader">
                      <div class="col-lg-4">
                        <ta-skeleton-loader
                          class="mt-2"
                          width="100"
                          height="400"
                        ></ta-skeleton-loader>
                      </div>
                      <div class="col-lg-4">
                        <ta-skeleton-loader
                          class="mt-2"
                          width="100"
                          height="400"
                        ></ta-skeleton-loader>
                      </div>
                      <div class="col-lg-4">
                        <ta-skeleton-loader
                          class="mt-2"
                          width="100"
                          height="400"
                        ></ta-skeleton-loader>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-lg-12 text-center">
                        <h2 class="section__title grey-brown">No Data Found</h2>
                      </div>
                    </div>
                  </b-tab>
                </template>
              </b-tabs>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <ta-highlight-section
          :content="pageDetails.feature_section"
          has="features"
        ></ta-highlight-section>
      </section>
      <NewsSection :newslist="pageDetails.latest_news_section.news" />
    </template>
    <template v-else>
      <section class="section">
        <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="row">
          <div class="col-lg-4">
            <ta-skeleton-loader
              class="mt-2"
              width="100"
              height="400"
            ></ta-skeleton-loader>
          </div>
          <div class="col-lg-4">
            <ta-skeleton-loader
              class="mt-2"
              width="100"
              height="400"
            ></ta-skeleton-loader>
          </div>
          <div class="col-lg-4">
            <ta-skeleton-loader
              class="mt-2"
              width="100"
              height="400"
            ></ta-skeleton-loader>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
import NewsSection from "~/components/NewsSection";
export default {
  async fetch() {
    const { params, store } = this.$nuxt.context;
    let newParams = {
      page_no: 1,
      per_page: 100,
      filter: 1
    };
    await store.dispatch("projects/getProjectsPage", newParams);
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en"
      },
      title: this.$store.state.metaTitle || "TATA Intellion - Projects",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      isNuxtReady: false,
      showOptions: false,
      mobileFilterlabel: "Filters",
      showLoader: false,
      queryChange: false,
      dropdownModals: {
        city: [],
        project_category: [],
        project_type: [],
        project_tag: []
      },
      cityLabel: "All Cities",
      projectLabel: "PROJECTS",
      projectTypeLabel: "PROJECT TYPE",
      makeApi: false
    };
  },
  computed: {
    pageDetails: function() {
      return this.$store.state.projects.projectsPage;
    },
    all_filters: function() {
      return JSON.parse(
        JSON.stringify(this.$store.getters.homePageDetails.filters)
      );
    },
    projects: {
      // getter
      get: function() {
        return JSON.parse(JSON.stringify(this.$store.state.projects.projects));
      },
      // setter
      set: function(newValue) {}
    },

    plottedProjects: function() {
      if (
        this.dropdownModals.city.length === 0 &&
        this.dropdownModals.project_category.length === 0
      ) {
        //console.log(this.projects);
        return this.projects;
      }
      
      return this.projects.filter((project, index) => {
        if (this.dropdownModals.city.length === 0)
          return (
            this.dropdownModals.project_category.indexOf(
              project.filters.project_category.slug
            ) > -1
          );
        else if (this.dropdownModals.project_category.length === 0)
          return (
            this.dropdownModals.city.indexOf(project.filters.city.slug) > -1
          );
        else
          return (
            this.dropdownModals.project_category.indexOf(
              project.filters.project_category.slug
            ) > -1 &&
            this.dropdownModals.city.indexOf(project.filters.city.slug) > -1
          );
      });
    },
    filters: {
      //getter
      get: function() {
        return JSON.parse(
          JSON.stringify(this.$store.state.projects.project_filters)
        );
      },
      // setter
      set: function(newValue) {}
    }
  },
  watch: {
    dropdownModals: {
      handler: function(val) {
        if (this.isNuxtReady && !this.queryChange)
          this.$router
            .replace({
              query: { city: val.city, project_category: val.project_category }
            })
            .catch(() => {
              scrollTo({ top: 0, behavior: "smooth" });
            });
      },
      deep: true
    }
    // "$route.query": function (newval, oldval) {
    //   if (
    //     newval &&
    //     !!newval.project_category &&
    //     newval.project_category !== oldval.project_category
    //   ) {
    //     this.queryChange = true;
    //     this.dropdownModals.project_category = [newval.project_category];
    //     this.queryChange = false;
    //   }
    // },
  },
  components: {
    NewsSection
  },
  methods: {
    clear(arg) {
      if (arg === "all") {
        for (const key in this.dropdownModals) {
          this.dropdownModals[key] = [];
        }
      } else {
        for (const key in this.dropdownModals) {
          if (key === arg) {
            this.dropdownModals[key] = [];
          }
        }
        switch (arg) {
          case "city":
            this.cityLabel = "All Cities";
            break;
          case "projects":
            this.projectLabel = "Projects";
            break;
          case "project_type":
            this.projectTypeLabel = "Project Type";
            break;
          default:
            break;
        }
      }
    },

    //freeze background on menu open
    freezeBackground(arg) {
      let bodyTag = document.querySelectorAll("body");
      if (arg) {
        bodyTag[0].classList.add("modal-open");
      } else {
        bodyTag[0].classList.remove("modal-open");
      }
    },

    hideUnwantedTab(args) {
      let counter = 0;
      this.plottedProjects.forEach(element => {
        if (element.filters.project_tag.slug === args.slug) {
          counter++;
        }
      });
      if (counter === 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    for (const key in this.dropdownModals) {
      if (
        this.dropdownModals.hasOwnProperty(key) &&
        this.$route.query.hasOwnProperty(key)
      ) {
        if (typeof this.$route.query[key] === "string")
          this.dropdownModals[key] = [this.$route.query[key]];
        else this.dropdownModals[key] = this.$route.query[key];
      }
    }
    if (process.browser) {
      this.isNuxtReady = true;
    }
    this.$nuxt.$on("changeQuery", val => {
      this.dropdownModals.project_category = [val];
      scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};
</script>
