<template>
  <div id="contact-page">
    <template v-if="!$fetchState.pending">
      <section class="section">
        <ta-hero heroStyle="leftText" :content="pageDetails.hero_section" type="one"></ta-hero>
      </section>
      <section class="section section-padding office" id="head-office">
        <div class="container">
        <div class="row" data-aos="fade-in">
            <ta-breadcrumb
            id="breadcrumb"
            :content="pageDetails.hero_section.title"
            />
        </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="ta__flex">
                <div class="ta__flex--one">
                  <div class="section__heading">
                    <h2 class="section__title">{{pageDetails.assistance_section.title}}</h2>
                    <div class="section__content">
                      <p>{{pageDetails.assistance_section.description}}</p>
                    </div>
                  </div>
                  <div class="office__content">
                    <ta-address-card
                      :content="pageDetails.assistance_section.corporate_office"
                      from="icon-margin"
                    ></ta-address-card>
                    <ta-address-card
                      class="custom-margin enquiry"
                      from="icon-margin"
                      :content="pageDetails.assistance_section.press_enquiry"
                    ></ta-address-card>
                  </div>
                </div>
                <div class="ta__flex--two">
                  <div class="contact__form custom-fade-in">
                    <b-form @submit="contact" autocomplete="off">
                      <div class="row">
                        <!-- full name -->
                        <div class="col-lg-12">
                          <div
                            class="form-group"
                            :class="[{ 'error-box': errors.fullname !== null },{isIos: $device.isIos}]"
                          >
                            <label
                              for="fullname"
                              :class="{active: isHighlight === 'fullname' || contactForm.fullname !== ''}"
                              @click="autoFocusInput('fullname')"
                            >FULL NAME*</label>
                            <b-form-input
                              v-model="contactForm.fullname"
                              id="fullname"
                              type="text"
                              name="fullname"
                              aria-label="Your full name"
                              data-placeholder="FULL NAME*"
                              @focus="isHighlight = 'fullname'"
                              @keyup="isValidForm('fullname')"
                            ></b-form-input>
                            <span for="fullname_error" class="error">{{ errors.fullname }}</span>
                          </div>
                        </div>

                        <!-- email -->
                        <div class="col-lg-12">
                          <div
                            class="form-group"
                            :class="[{ 'error-box': errors.email !== null },{isIos: $device.isIos}]"
                          >
                            <label
                              for="email"
                              :class="{active: isHighlight === 'email' || contactForm.email !== ''}"
                              @click="autoFocusInput('email')"
                            >EMAIL*</label>
                            <b-form-input
                              v-model="contactForm.email"
                              id="email"
                              type="email"
                              name="email"
                              aria-label="Your Email"
                              data-placeholder="EMAIL*"
                              @focus="isHighlight = 'email'"
                              @keyup="isValidForm('email')"
                            ></b-form-input>
                            <span for="email_error" class="error">{{ errors.email }}</span>
                          </div>
                        </div>

                        <!-- country -->
                        <div class="col-lg-12">
                          <div
                            class="form-group"
                            :class="[{ 'error-box': errors.country !== null },{isIos: $device.isIos}, { 'has-country-value': countryLabel !== '' }]"
                          >
                            <label
                              for="dropdown-country"
                              :class="{active: isHighlight === 'country' || countryLabel !== ''}"
                              @click="focusCountryDropdown"
                            >COUNTRY*</label>
                            <b-dropdown
                              split
                              id="dropdown-country"
                              :text="countryLabel"
                              class="ta__dropdown"
                              @show="isHighlight = 'country'"
                              @hidden="isHighlight = false"
                            >
                              <b-dropdown-item
                                v-for="(country,index) in countries"
                                :key="'country-'+index"
                                @click="setCountryLabel(country)"
                              >{{country.label}}</b-dropdown-item>
                            </b-dropdown>
                          </div>
                        </div>

                        <!-- phone -->
                        <div class="col-lg-12">
                          <div
                            class="form-group"
                            :class="[{ 'error-box': errors.phone !== null },{isIos: $device.isIos}]"
                          >
                            <label
                              for="phone"
                              :class="{active: isHighlight === 'phone' || contactForm.phone !== ''}"
                              @click="autoFocusInput('phone')"
                            >Phone NUmber*</label>
                            <b-form-input
                              v-model="contactForm.phone"
                              id="phone"
                              type="tel"
                              name="phone"
                              aria-label="Your Phone"
                              data-placeholder="Phone NUmber*"
                              @focus="isHighlight = 'phone'"
                              @keyup="isValidForm('phone')"
                            ></b-form-input>
                            <span for="phone_error" class="error">{{ errors.phone }}</span>
                          </div>
                        </div>

                        <!-- message -->
                        <div class="col-lg-12">
                          <div
                            class="form-group"
                            :class="[{ 'error-box': errors.message !== null },{isIos: $device.isIos}]"
                          >
                            <label
                              for="message"
                              :class="{active: isHighlight === 'message' || contactForm.message !== ''}"
                              @click="autoFocusInput('message')"
                            >MESSAGE (LIMIT 150 Words)*</label>
                            <b-form-textarea
                              v-model="contactForm.message"
                              id="message"
                              type="text"
                              name="message"
                              value="message"
                              aria-label="Message"
                              data-placeholder="MESSAGE (LIMIT 150 Words)*"
                              @focus="isHighlight = 'message'"
                              @keyup="isValidForm('message')"
                            ></b-form-textarea>
                            <span for="message_error" class="error">{{ errors.message }}</span>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <button class="ta__btn ta__btn--primary" id="btn__contact__submit" :disabled="!isValid">submit</button>
                          <span v-if="submitError" class="error d-block mt-2">{{ submitError }}</span>
                        </div>
                      </div>
                    </b-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="section" id="regions">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section__heading">
                <h2 class="section__title">{{pageDetails.region_wise_enquiry_section.title}}</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="section__content">
                <div class="row">
                  <div
                    class="col-lg-4 col-md-6 col-sm-12"
                    v-for="(office, index) in offices"
                    :key="'office' + index"
                  >
                    <ta-address-card :content="office" from="region"></ta-address-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ta-subscription :content="pageDetails.subscription_section"></ta-subscription>
    </template>
    <template v-if="$fetchState.pending">
      <section class="section">
        <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-sm-6">
              <ta-skeleton-loader width="100" height="30"></ta-skeleton-loader>
              <div class="mt-5">
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
                <ta-skeleton-loader class="mt-2" width="100" height="10"></ta-skeleton-loader>
              </div>
              <div class="mt-5">
                <ta-skeleton-loader width="60" height="30"></ta-skeleton-loader>
                <div class="mt-5">
                  <ta-skeleton-loader class="mt-2" width="30" height="10"></ta-skeleton-loader>
                  <ta-skeleton-loader class="mt-2" width="30" height="10"></ta-skeleton-loader>
                  <ta-skeleton-loader class="mt-2" width="30" height="10"></ta-skeleton-loader>
                </div>
              </div>
              <div class="mt-5">
                <ta-skeleton-loader width="60" height="30"></ta-skeleton-loader>
                <div class="mt-5">
                  <ta-skeleton-loader class="mt-2" width="30" height="10"></ta-skeleton-loader>
                  <ta-skeleton-loader class="mt-2" width="30" height="10"></ta-skeleton-loader>
                  <ta-skeleton-loader class="mt-2" width="30" height="10"></ta-skeleton-loader>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <ta-skeleton-loader width="100" height="500"></ta-skeleton-loader>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
import {
  isNotEmpty,
  validateName,
  validateEmail,
  validateNumber,
  autoFocusInput,
  containsHtmlTags,
} from "~/middleware/utils";
import { countries } from "~/js/countries";
export default {
  async fetch() {
    const { params, store } = this.$nuxt.context;
    await store.dispatch("contact/getContactPage");
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      title: this.$store.state.metaTitle || "TATA Intellion - Contact Us",
      meta: this.$store.state.meta,
      link: this.$store.state.link
    };
  },
  data() {
    return {
      isHighlight: false,
      isValid: false,
      countries: countries,
      countryLabel: "India",
      errors: {
        fullname: null,
        email: null,
        country: null,
        phone: null,
        message: null,
      },
      contactForm: {
        fullname: "",
        email: "",
        country: "india",
        phone: "",
        message: "",
      },
      submitError: null,
    };
  },
  computed: {
    pageDetails: function () {
      return this.$store.state.contact.contactPage;
    },
    offices: function () {
      let officeArray = [];
      this.$store.state.contact.contactPage.region_wise_enquiry_section.enquiry_office_list.map(
        (office) => {
          officeArray.push({
            email_id: office.office_email_id,
            email_id_logo: office.office_email_id_logo,
            office_address: office.office_address,
            phone_number: office.office_phone_number,
            phone_number_logo: office.office_phone_number_logo,
            place: office.office_city,
          });
        }
      );
      return officeArray;
    },
  },
  methods: {
    autoFocusInput: autoFocusInput,
    contact: async function (e) {
      e.preventDefault();
      if (
        !isNotEmpty(this.contactForm.fullname) ||
        !validateEmail(this.contactForm.email) ||
        !validateNumber(this.contactForm.phone) ||
        !isNotEmpty(this.contactForm.message)
      ) {
        //validate name
        if (!isNotEmpty(this.contactForm.fullname)) {
          this.errors.fullname = "Please enter name";
        } else if (!validateName(this.contactForm.fullname)) {
          this.errors.fullname = "Name should contain alphabets only";
        } else if (containsHtmlTags(this.contactForm.fullname)) {
          this.errors.fullname = "HTML tags are not allowed";
        } else {
          this.errors.fullname = null;
        }

        //validate message
        if (!isNotEmpty(this.contactForm.message)) {
          this.errors.message = "Please enter message";
        } else if (containsHtmlTags(this.contactForm.message)) {
          this.errors.message = "HTML tags are not allowed";
        } else if (this.contactForm.message.length > 150) {
          this.errors.message = "Message Limit in 150 characters";
        } else {
          this.errors.message = null;
        }

        //email validation
        if (!isNotEmpty(this.contactForm.email)) {
          this.errors.email = "Please enter your email";
        } else if (!validateEmail(this.contactForm.email)) {
          this.errors.email = "Please enter a valid email ";
        } else {
          this.errors.email = null;
        }

        //phone validation
        if (!isNotEmpty(this.contactForm.phone)) {
          this.errors.phone = "Please enter your phone number";
        } else if (!validateNumber(this.contactForm.phone)) {
          this.errors.phone = "Please enter a valid phone number";
        } else {
          this.errors.phone = null;
        }
      } else if (
        containsHtmlTags(this.contactForm.fullname) ||
        containsHtmlTags(this.contactForm.message)
      ) {
        if (containsHtmlTags(this.contactForm.fullname)) {
          this.errors.fullname = "HTML tags are not allowed";
        }
        if (containsHtmlTags(this.contactForm.message)) {
          this.errors.message = "HTML tags are not allowed";
        }
        this.isValid = false;
        this.submitError = "HTML tags are not allowed";
      } else {
        this.errors = {
          fullname: null,
          email: null,
          country: null,
          phone: null,
          message: null,
        };
        this.submitError = null;
        let payload = {
          full_name: this.contactForm.fullname,
          email: this.contactForm.email,
          country_of_residence: this.contactForm.country,
          phone_number: this.contactForm.phone,
          message: this.contactForm.message,
        };
        const result = await this.$store.dispatch("contact/contactForm", payload);
        if (result && !result.success) {
          this.submitError = result.message;
        } else {
          this.submitError = null;
        }
      }
    },
    isValidForm(field) {
      switch (field) {
        case "fullname":
          //validate name
          if (!isNotEmpty(this.contactForm.fullname)) {
            this.errors.fullname = "Please enter name";
          } else if (!validateName(this.contactForm.fullname)) {
            this.errors.fullname = "Name should contain alphabets only";
          } else if (containsHtmlTags(this.contactForm.fullname)) {
            this.errors.fullname = "HTML tags are not allowed";
          } else {
            this.errors.fullname = null;
          }
          break;
        case "email":
          if (!isNotEmpty(this.contactForm.email)) {
            this.errors.email = "Please enter your email";
          } else if (!validateEmail(this.contactForm.email)) {
            this.errors.email = "Please enter a valid email ";
          } else {
            this.errors.email = null;
          }
          break;
        case "message":
          if (!isNotEmpty(this.contactForm.message)) {
            this.errors.message = "Please enter message";
          } else if (containsHtmlTags(this.contactForm.message)) {
            this.errors.message = "HTML tags are not allowed";
          } else if (this.contactForm.message.length > 150) {
            this.errors.message = "Message Limit in 150 characters";
          } else {
            this.errors.message = null;
          }
          break;
        case "phone":
          if (!isNotEmpty(this.contactForm.phone)) {
            this.errors.phone = "Please enter your phone number";
          } else if (!validateNumber(this.contactForm.phone)) {
            this.errors.phone = "Please enter a valid phone number";
          } else {
            this.errors.phone = null;
          }

          break;
      }
      if (
        this.errors.fullname === null &&
        this.errors.email === null &&
        this.errors.phone === null &&
        this.errors.message == null
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    setCountryLabel(arg) {
      this.countryLabel = arg.label;
      this.contactForm.country = arg.label;
    },
    focusCountryDropdown() {
      const dropdown = document.getElementById("dropdown-country");
      const button = dropdown && dropdown.querySelector(".btn-secondary");
      if (button) {
        button.focus();
        button.click();
      }
    },
  },
  mounted() {
    scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>
