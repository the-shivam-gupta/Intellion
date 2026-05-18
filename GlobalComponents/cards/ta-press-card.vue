<template>
  <div class="all_cards_wrapper">
    <div class="nt_card_wrapper" v-if="content">
      <nuxt-link :to="'/newsroom/' + content.slug">
        <div class="row nt_row">
          <div class="col-lg-2 col-md-2 col-sm-2">
            <div class="nt_date_time_wrapper">
              <div class="nt_date">{{ content.date }}</div>

              <div class="nt_published_by">
                {{ content.press_release_type.press_release_platform }}
              </div>
            </div>
          </div>
          <div class="col-lg-7 col-md-7 col-sm-6">
            <div class="news_type_content news_type_content--two">
              <div class="nt_date_mob">
                <div class="nt_date">
                  {{ content.date }}
                  <span v-if="content.press_release_type.press_release_platform">
                    |
                    {{ content.press_release_type.press_release_platform }}
                  </span>
                </div>
              </div>
              <div class="nt_info nt_info--two">{{ content.title }}</div>
              <div class="nt_view">
                <button>CONTINUE READING</button>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-4">
            <div class="nt_image_wrapper" v-if="content.background_image.src">
              <img :src="content.background_image.src" alt />
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
    content: Object,
  },
};
</script>
