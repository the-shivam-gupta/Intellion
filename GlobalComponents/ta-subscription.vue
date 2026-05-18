<template>
  <section class="section" id="subscribe">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section__heading">
            <h4 class="ta__h3 charcoal-grey">{{content.title}}</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="ta__subscribe">
            <b-form @submit="subscribe" autocomplete="off">
              <div class="row">
                <!-- email -->
                <div class="col-lg-12">
                  <div
                    class="form-group"
                    :class="[{ 'error-box': errors.email !== null },{isIos: $device.isIos}]"
                  >
                    <label
                      for="subs_email"
                      :class="{active: isHighlight === 'email' || subscribeForm.email !== ''}"
                      @click="autoFocusInput('email')"
                    >EMAIL*</label>
                    <b-form-input
                      v-model="subscribeForm.email"
                      id="subs_email"
                      type="email"
                      name="email"
                      aria-label="Your Email"
                      data-placeholder="EMAIL*"
                      @focus="isHighlight = 'email'"
                      @keyup="isValidForm()"
                    ></b-form-input>
                    <span for="email_error" class="error">{{ errors.email }}</span>
                    <span class="error" v-if="errorMessage !== ''">{{ errorMessage }}</span>
                  </div>
                </div>
              </div>
              <!-- <div class="row">
                <div class="col-lg-12">
                  <b-form-group :class="{isIos: $device.isIos}">
                    <b-form-checkbox-group
                      v-model="subscribeForm.list"
                      class="brown"
                      :options="options"
                      value-field="value"
                      text-field="name"
                      @change="validateList()"
                    ></b-form-checkbox-group>
                  </b-form-group>
                  <span for="list_error" class="error">{{ errors.list }}</span>
                </div>
              </div> -->
              <div class="row">
                <div class="col-lg-12">
                  <button class="ta__btn ta__btn--dark" :disabled="!isValid">SUBSCRIBE</button>
                </div>
              </div>
            </b-form>
            <div class="ta__subscribe--info">{{content.subscription_note}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { isNotEmpty, validateEmail, autoFocusInput } from "~/middleware/utils";
export default {
  props: {
    content: Object,
  },
  data() {
    return {
      isHighlight: false,
      isValid: false,
      errors: {
        email: null,
        list: null,
      },
      options: [
        { name: "News Alerts", value: "news_alerts" },
        { name: "Press Release", value: "press_release" },
        { name: "Events", value: "events" },
      ],
      subscribeForm: {
        email: "",
        list: ["news_alerts"],
      },
      errorMessage: "",
    };
  },
  methods: {
    autoFocusInput: autoFocusInput,
    subscribe: async function (e) {
      e.preventDefault();
      if (
        !validateEmail(this.subscribeForm.email) ||
        this.subscribeForm.list.length === 0
      ) {
        //email validation
        if (!isNotEmpty(this.subscribeForm.email)) {
          this.errors.email = "Please enter your email";
        } else if (!validateEmail(this.subscribeForm.email)) {
          this.errors.email = "Please enter a valid email ";
        } else {
          this.errors.email = null;
        }

        //this.subscribeForm.list.length === 0
        // if (this.subscribeForm.list.length === 0) {
        //   this.errors.list = "Please select one option";
        // } else {
        //   this.errors.list = null;
        // }
      } else {
        this.errors = {
          email: null,
        };
        let payload = {
          email: this.subscribeForm.email,
          list: this.subscribeForm.list,
        };
        const res = await this.$store.dispatch("contact/subscribeForm", payload);
        if (res.status === 422) {
          this.errorMessage = res.data.message;
        }
      }
    },
    isValidForm() {
      if (!isNotEmpty(this.subscribeForm.email)) {
        this.errors.email = "Please enter your email";
      } else if (!validateEmail(this.subscribeForm.email)) {
        this.errors.email = "Please enter a valid email ";
      } else {
        this.errors.email = null;
      }
      if (this.errors.email === null) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    validateList() {
      //this.subscribeForm.list.length === 0
      // if (this.subscribeForm.list.length === 0) {
      //   this.errors.list = "Please select one option";
      // } else {
      //   this.errors.list = null;
      // }
    },
  },
  watch: {
    'subscribeForm.email': function() {
      this.errorMessage = '';
    }
  }
};
</script>
