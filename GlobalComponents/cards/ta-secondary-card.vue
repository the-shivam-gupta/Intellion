<template>
  <!-- content type one with hover effect for (work , team)-->
  <div class="ta__card secondary">
    <!-- <div class="ta__card--image" v-if="type === 'onlyImage'">
      <img src="~/assets/images/banner_01.jpg" alt="Tata Intellion" />
    </div>-->
    <nuxt-link
      :to="
        content.project_type === 'prime'
          ? '/about-us'
          : '/commercial-projects?project_category=' + this.content.project_type
      "
      :class="[type, content.type, content.project_type]"
      v-if="type === 'hoverImage'"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <img
        :data-src="
          content.background_image.src !== ''
            ? content.background_image.src
            : '~/assets/images/banner_01.jpg'
        "
        v-lazy-load
        alt="Tata Intellion"
        class="ta__card--image"
      />
      <div class="ta__card--body">
        <div class="logo">
          <img
            :data-src="content.hovered_logo.src"
            v-lazy-load
            class="hovered"
            alt="Tata Intellion"
          />
          <img
            :data-src="content.non_hovered_logo.src"
            v-lazy-load
            class="non-hovered"
            alt="Tata Intellion"
          />
        </div>
        <h3 class="ta__card--title">{{ content.project_name }}</h3>
        <p class="ta__card--text">{{ content.project_description }}</p>
      </div>
    </nuxt-link>
    <div
      :class="type"
      v-if="type === 'hoverText'"
      @mouseenter="toggleSlide(true)"
      @mouseleave="toggleSlide(false)"
    >
      <div class="ta__card--image" :class="showButton ? 'sm' : ''">
        <img
          :data-src="content.leader_avatar.src"
          v-lazy-load
          :alt="
            content.leader_avatar.alt !== ''
              ? content.leader_avatar.alt
              : 'Tata Intellion'
          "
          data-aos="fade-in"
        />
      </div>
      <div class="ta__card--content" :class="showButton ? 'sm' : ''">
        <h4 class="ta__card--title">{{ content.leader_name }}</h4>
        <p class="ta__card--text" :class="showButton ? 'custom-margin' : ''">
          {{ content.leader_designation }}
        </p>
        <button
          class="ta__btn--primary"
          :id="'btnShow_' + cardIndex"
          type="button"
          v-if="showButton"
          @click="setLeader(content)"
        >
          EXPLORE PROFILE
        </button>
      </div>
      <div
        class="ta__card--reveal"
        :class="reveal ? 'reveal' : ''"
        v-if="!showButton"
      >
        <h4 class="ta__card--title">{{ content.leader_name }}</h4>
        <p class="ta__card--text">{{ content.leader_designation }}</p>
        <button
          class="ta__btn--primary"
          :id="'btnShow_' + cardIndex"
          type="button"
          @click="setLeader(content)"
        >
          EXPLORE PROFILE
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    content: Object,
    cardIndex: Number
  },
  data() {
    return {
      isHovered: false,
      reveal: false,
      showButton: false
    };
  },
  methods: {
    toggleSlide(arg) {
      this.reveal = arg;
    },
    setLeader(leader) {
      this.$store.commit("leadership/updateLeader", leader);
      this.$root.$emit(
        "bv::show::modal",
        "team-info",
        "#btnShow_" + this.cardIndex
      );
    }
  },
  mounted() {
    if (process.browser) {
      this.showButton = this.$device.isMobileOrTablet;
    }
  }
};
</script>
