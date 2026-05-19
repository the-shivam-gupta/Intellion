<template>
  <div class="all_cards_wrapper">
    <div class="nt_card_wrapper" v-if="content">
      <nuxt-link :to="'/newsroom/' + content.slug" v-if="content.description || content.news_gallery">
      <div class="row nt_row">
        <div class="col-lg-2 col-md-2 col-sm-2">
          <div class="nt_date_time_wrapper">
            <div class="nt_date">{{ content.date }}</div>

            <div class="nt_published_by">
              {{ content.events_type.event_location }}
            </div>
          </div>
        </div>
        <div class="col-lg-7 col-md-7 col-sm-6">
          <div class="news_type_content news_type_content--two">
            <div>
              <div class="nt_date_mob">
                <div class="nt_date">
                  {{ content.date }} <span v-if="content.events_type.event_location">| {{ content.events_type.event_location }}</span>
                </div>
              </div>
              <div class="nt_info nt_info--two" v-html="content.title"></div>
            </div>
            <div class="nt_sub_info" v-html="content.short_description"></div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-4">
          <div class="nt_image_wrapper" v-if="content.background_image && content.background_image.src">
            <img :src="content.background_image.src" alt />
          </div>
        </div>
      </div>
      </nuxt-link>
      <div class="row nt_row" v-else>
        <div class="col-lg-2 col-md-2 col-sm-2">
          <div class="nt_date_time_wrapper">
            <div class="nt_date">{{ content.date }}</div>

            <div class="nt_published_by">
              {{ content.events_type.event_location }}
            </div>
          </div>
        </div>
        <div class="col-lg-7 col-md-7 col-sm-6">
          <div class="news_type_content news_type_content--two">
            <div>
              <div class="nt_date_mob">
                <div class="nt_date">
                  {{ content.date }} <span v-if="content.events_type.event_location">| {{ content.events_type.event_location }}</span>
                </div>
              </div>
              <div class="nt_info nt_info--two" v-html="content.title"></div>
            </div>
            <div class="nt_sub_info" v-html="content.short_description"></div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-4">
          <div class="nt_image_wrapper" v-if="content.background_image && content.background_image.src">
            <img :src="content.background_image.src" alt />
          </div>
        </div>
      </div>
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
