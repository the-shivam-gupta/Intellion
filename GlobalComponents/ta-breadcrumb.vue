<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
      <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li class="breadcrumb-item active">
      {{ content }}
      </li>
    </ol>
  </nav>
</template>
<script>
import { uniqueByKeepLast } from "~/middleware/utils";
export default {
  props: {
    content: String
  },
  data() { return {}; }
};
</script>