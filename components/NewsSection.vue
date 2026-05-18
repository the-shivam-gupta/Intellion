<template>
  <section class="section section-padding section-news-types section-news-sustainability" id="news" v-if="newslist && newslist.length !== 0">
    <div class="container">
      <div class="container_brbt">
        <div class="row">
          <div class="col-lg-12">
            <div class="news_type">
              <h2 class="news_type_title news_type_title--two">Latest News <span>Updates</span></h2>
              <div class="nt_view">
                <nuxt-link to="/newsroom">
                  SEE ALL NEWS
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-lg-4"
            v-for="(news,index) in latestNews"
            :key="'news-'+index"
          >
            <ta-basic-card from="Media" :content="news"></ta-basic-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    newslist: Array
  },
  computed: {
    latestNews: function () {
      return this.newslist.slice(0, 3);
    },
  },
  data() {
    return {};
  },
};
</script>
