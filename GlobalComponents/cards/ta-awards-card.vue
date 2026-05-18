<template>
  <div class="all_cards_wrapper">
    <div class="nt_card_wrapper nt_card_wrapper--two" v-if="content">
      <div class="news_type_content">
        <div>
          <div class="nt_date">{{ splitDate(content.date) }}</div>
          <div class="nt_info">{{ content.title }}</div>
        </div>
        <div class="nt_docs" v-html="content.award_type.award_receiver"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: Object
  },
  methods: {
    splitDate(args) {
      return args.split(',')[1];
    }
  }
};
</script>
