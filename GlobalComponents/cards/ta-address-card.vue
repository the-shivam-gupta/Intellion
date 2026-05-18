<template>
  <div class="ta__card address">
    <div class="ta__card--body">
      <div class="place" v-if="content.place" data-aos="fade-in">
        <h5>{{ content.place }}</h5>
      </div>
      <div class="address__line address-details" data-aos="fade-in">
        <span
          class="ta__icon"
          :class="from?from:''"
          v-if="content.title_logo && content.title_logo.src"
        >
          <img :src="content.title_logo.src" alt="Tata Intellion" />
        </span>
        <span class="ta__text" :class="from?from:''">
          <h3>{{ content.title }}</h3>
          <p class="ta__para">{{ content.office_address }}</p>
        </span>
      </div>
      <div class="contact-details" data-aos="fade-in">
        <div
          class="address__line"
          v-if="content.phone_number !=='' && content.phone_number !== null"
        >
          <span
            class="ta__icon phone"
            v-if="content.phone_number_logo && content.phone_number_logo.src"
          >
            <img :src="content.phone_number_logo.src" alt="Tata Intellion" />
          </span>
          <span class="ta__text">
            <a
              :href="'tel:'+content.phone_number"
              aria-label="Phone Number"
            >{{ content.phone_number }}</a>
          </span>
        </div>
        <div class="address__line" v-if="content.email_id !=='' && content.email_id !== null">
          <span class="ta__icon email" v-if="content.email_id_logo && content.email_id_logo.src">
            <img :src="content.email_id_logo.src" alt="Tata Intellion" />
          </span>
          <span class="ta__text">
            <a
              :href="'mailto:'+content.email_id"
              rel="noopener"
              target="_blank"
              aria-label="Email"
            >{{ content.email_id }}</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: Object,
    from: String,
  },
};
</script>
