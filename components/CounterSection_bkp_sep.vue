<template>
  <section class="section facts" id="facts" ref="facts">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <ta-heading
            :subtitle="facts.sub_title"
            :title="facts.title"
            :isTrans="true"
            :transhead="facts.background_title"
          ></ta-heading>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="facts__content">
            <div class="ta__flex">
              <div
                class="hs__card counter"
                v-for="(achievement, index) in achievements"
                :key="'achievements' + index"
              >
                <div class="count" :id="toID(achievement.item_name)">{{achievement.quantity__value}}</div>
                <div class="content">
                  <div class="subtitle">{{achievement.measure}}</div>
                  <div class="title">{{achievement.item_name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { CountUp } from "~/js/countUp";
export default {
  data() {
    return {
      isNuxtReady: false,
      options: {
        decimalPlaces: 1,
      },
    };
  },
  computed: {
    facts: function () {
      return this.$store.getters.homePageDetails.facts;
    },
    achievements: function () {
      return this.$store.getters.homePageDetails.facts.facts_list;
    }
  },
  methods: {
    onReady: function (instance, CountUp) {
      const that = this;
      instance.update(that.endVal + 100);
    },
    initializeCounter() {
      this.achievements.forEach((achievement) => {
        console.log(achievement);
        let countUp = new CountUp(
          this.toID(achievement.item_name),
          +achievement.quantity__value,
          this.options
        );
        if (!countUp.error) {
          countUp.start();
        } else {
          console.error(countUp.error);
        }
      });
    },
    toID: function (string) {
      return string.toLowerCase()
             .replace(/ /g, '_')
             .replace(/[^\w-]+/g, '');
    }
  },
  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
      let that = this;

      let observer = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting === true) {
            that.initializeCounter();
          }
        },
        { threshold: [1] }
      );
      observer.observe(document.querySelector("#facts"));
    }
  },
};
</script>
