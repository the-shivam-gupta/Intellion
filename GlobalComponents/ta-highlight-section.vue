<template>
  <div class="ta__highlight">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="ta__flex">
            <div class="ta__flex--one">
              <div class="section__heading" data-aos="fade-down">
                <h2 class="section__subtitle" v-if="content.sub_title">{{ content.sub_title }}</h2>
                <div class="section__title" v-if="content.title">{{ content.title }}</div>
                <div class="section__content">
                  <p class="ta__para" v-if="content.description" v-html="content.description"></p>
                </div>
              </div>
            </div>
            <div class="ta__flex--two">
              <div class="ta__list--wrapper">
                <div class="ta__flex">
                  <div class="ta__flex--one">
                    <ul class="ta__list">
                      <li
                        class="ta__list--item"
                        v-for="(item, index) in menusOne"
                        :key="'first' + index"
                        data-aos="fade-down"
                      >{{ item }}</li>
                    </ul>
                  </div>
                  <div class="ta__flex--one">
                    <ul class="ta__list">
                      <li
                        class="ta__list--item"
                        v-for="(item, index) in menusTwo"
                        :key="'second_' + index"
                        data-aos="fade-down"
                      >{{ item }}</li>
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
</template>
<script>
export default {
  props: {
    content: Object,
    has: String,
  },
  data() {
    return {
      menusOne: [],
      menusTwo: [],
    };
  },
  beforeMount() {
    const features = this.content && this.content.features;
    const points = this.content && this.content.points;

    if (this.has === "features") {
      if (features && features.length > 0) {
        const middle = Math.ceil(features.length / 2);
        this.menusOne = features.slice(0, middle);
        this.menusTwo = features.slice(middle, features.length);
      }
    } else if (points && points.length > 0) {
      const middle = Math.ceil(points.length / 2);
      this.menusOne = points.slice(0, middle);
      this.menusTwo = points.slice(middle, points.length);
    }
  },
};
</script>
