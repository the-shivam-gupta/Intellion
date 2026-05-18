<template>
  <div class="pagemarks" id="pagemarks">
    <div class="pagemarks__logo" v-if="isLogo">
      <img
        src="~/assets/images/logos/edge_black.svg"
        alt="Tata Intellion Edge"
        v-if="type === 'edge'"
      />
      <img
        src="~/assets/images/logos/prime_black.svg"
        alt="Tata Intellion Prime"
        v-if="type === 'prime'"
      />
      <img
        src="~/assets/images/logos/square_black.svg"
        alt="Tata Intellion Square"
        v-if="type === 'square'"
      />
      <template v-if="type === 'park' ">
        <img
          src="~/assets/images/logos/intellion-park-chennai.svg"
          alt="Tata Intellion Park"
          v-if="city ==='chennai'"
          :class="city"
        />
        <img src="~/assets/images/logos/park_black.svg" alt="Tata Intellion Park" v-else />
      </template>
    </div>
    <ul class="pagemarks__list">
      <li
        class="pagemarks__item"
        v-for="(pagemark, index) in content"
        :key="`pagemark` + index"
        @mouseenter="showIndicator(index)"
      >
        <a
          :href="pagemark.key"
          @click.prevent="scrollToTargetAdjusted(pagemark.key)"
        >{{ pagemark.name }}</a>
      </li>
    </ul>
    <div id="indicator" :style="[{ left: hoverDisplacement, width: hoverWidth }]"></div>
  </div>
</template>
<script>
export default {
  props: {
    content: Array,
    isLogo: Boolean,
    type: String,
    city: String,
  },
  data() {
    return {
      hoverDisplacement: 0,
      hoverWidth: 0,
    };
  },
  methods: {
    showIndicator(args) {
      this.hoverDisplacement =
        document
          .getElementsByClassName("pagemarks__list")[0]
          .childNodes[args].getBoundingClientRect().left + "px";
      this.hoverWidth =
        document
          .getElementsByClassName("pagemarks__list")[0]
          .childNodes[args].getBoundingClientRect().width + "px";
    },
    scrollToTargetAdjusted(id) {
      if (id) {
        let element = document.querySelectorAll(id);
        if (element) {
          let elementOffset = element[0].offsetTop;
          // element[0].scrollTo({ behavior: "smooth", block: "center" });
          if (window.innerWidth <= 768) {
            window.scrollTo(0, elementOffset - 125);
          } else if (window.innerWidth <= 1024) {
            window.scrollTo(0, elementOffset - 135);
          } else {
            window.scrollTo(0, elementOffset - 125);
          }
        }
      }
    },
    scrollEvent() {
      let pagemark = document.getElementById("pagemarks");
      if (pagemark) {
        if (window.pageYOffset > 150) {
          pagemark.classList.add("fixed");
        } else {
          pagemark.classList.remove("fixed");
        }
      }
    },
  },
  computed: {},
  mounted() {
    document.addEventListener("scroll", this.scrollEvent);
  },
  destroyed() {
    document.removeEventListener("scroll", this.scrollEvent);
  },
};
</script>
