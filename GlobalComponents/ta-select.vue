<template>
  <div class="ta__multiselect">
    <div class="selectbox" @click="showCheckboxes('checkboxes' + idLabel)">
      <select>
        <option v-if="selected.length === 0">{{ label }}</option>
      </select>
      <div class="select-selected" v-if="selected.length === 0">
        {{ label }}
      </div>
      <div class="overSelect">
        <span class="selected-values">{{ selectedString }}</span>
        <button v-if="selected.length > 0" class="ta__close"></button>
      </div>
    </div>
    <div :id="'checkboxes' + idLabel" class="ta__checkboxes">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        class="ta__checkboxes--group"
        value-field="value"
        text-field="text"
        disabled-field="notEnabled"
      ></b-form-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: Array,
    label: String,
    idLabel: String
  },
  data() {
    return {
      selected: [],
      selectedString: ""
    };
  },
  watch: {
    selected: function() {
      let string = this.selected.join();
      this.selectedString = string;
      this.$emit("change", this.selected);
    }
  },
  methods: {
    showCheckboxes(arg) {
      let checkboxes = document.getElementById(arg);
      if (!this.expanded) {
        checkboxes.style.display = "block";
        this.expanded = true;
      } else {
        checkboxes.style.display = "none";
        this.expanded = false;
      }
    }
  }
};
</script>
