<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="changelog">
          <div v-html="changelogs" class="text-justify foghorn" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Changelogs from "../js/remarkable";
export default {
  layout: "changelog",
  data: function() {
    return {
      changelogs: Changelogs
    };
  }
};
</script>
