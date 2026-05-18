<template>
  <div class="all_cards_wrapper">
    <div class="nt_card_wrapper" v-if="content">
      <nuxt-link :to="'/csr-activities/' + content.slug">
        <div class="row nt_row nt_row--two">
          <div class="col-lg-2 col-md-2 col-sm-2">
            <div class="nt_date_time_wrapper">
              <div class="nt_date">{{ content.date }}</div>

              <div class="nt_published_by">{{ content.filters.city.name }}</div>
            </div>
          </div>
          <div class="col-lg-7 col-md-7 col-sm-6">
            <div class="news_type_content news_type_content--two">
              <div>
                <div class="nt_date_mob">
                  <div class="nt_date">
                    {{ content.date }} <span v-if="content.filters.city.name">| {{ content.filters.city.name }}</span>
                  </div>
                </div>
                <div class="nt_info nt_info--two">{{ content.title }}</div>
              </div>
              <div class="nt_sub_info">
                {{ content.listing_page_content.short_description }}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-4">
            <div class="nt_image_wrapper" v-if="content.listing_page_content.feature_image.src">
              <img :src="content.listing_page_content.feature_image.src" alt />
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: Object
  }
};
</script>
