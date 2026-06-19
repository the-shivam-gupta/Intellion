<template>
  <div class="position-relative map">
    <div class="map__iframe">
      <iframe
        width="100%"
        height="500"
        frameborder="0"
        loading="lazy"
        allowfullscreen
        :src="mapSrc">
      </iframe>
    </div>

    <div class="places" v-if="places.length > 0" >
      <!--<div class="section__heading">
        <h2 class="section__title">{{ title }} </h2>
      </div>-->
      <div class="places__list" data-aos="fade-in">
        <div
          class="places__item"
          v-for="(place, index) in places"
          :key="'place-' + index"
          :class="isActive === index ? 'active' : ''"
        >
          <div class="ta__icon">
            <img :src="place.icon.src" alt="Tata Intellion" />
          </div>
          <div class="content">
            <div class="title">{{ place.venue_name }}</div>
            <div class="distance">{{ place.distance_text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    places: Array,
    title: "",
    location: { lat: 19.176074, lng: 72.883089 },
    type: ""
  },

  data() {
    return {
      mapSrc: "https://www.google.com/maps/embed/v1/place?key="+this.$config.apiKey+"&q="+this.location.project_address,
      isActive: 0,
    };
  }
};
</script>
