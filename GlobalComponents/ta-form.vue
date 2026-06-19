<template>
  <b-form @submit="submit" autocomplete="off">
    <div class="row">
      <!-- full name -->
      <div class="col-lg-12">
        <div
          class="form-group"
          :class="[{ 'error-box': errors.fullname !== null },{isIos: $device.isIos}
          ]"
        >
          <label
            for="fullname"
            :class="{active: isHighlight === 'fullname' || enquireForm.fullname !== ''}"
            @click="autoFocusInput('fullname')"
          >FULL NAME*</label>
          <b-form-input
            v-model="enquireForm.fullname"
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
            :class="{active: isHighlight === 'email' || enquireForm.email !== ''}"
            @click="autoFocusInput('email')"
          >EMAIL*</label>
          <b-form-input
            v-model="enquireForm.email"
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
      <!-- phone -->
      <div class="col-lg-12">
        <div
          class="form-group"
          :class="[{ 'error-box': errors.phone !== null },{isIos: $device.isIos}]"
        >
          <label
            for="phone"
            :class="{active: isHighlight === 'phone' || enquireForm.phone !== ''}"
            @click="autoFocusInput('phone')"
          >Phone NUmber*</label>
          <b-form-input
            v-model="enquireForm.phone"
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

      <!-- city -->
      <div class="col-lg-12" v-if="from === 'enquire'">
        <div
          class="form-group"
          :class="[{ 'error-box': errors.city !== null },{isIos: $device.isIos}]"
        >
          <label
            style="transform: unset;
    top: -20px;"
            :style="{ display:$device.isIos?'none':'inline-block' }"
          >Select City*</label>
          <b-dropdown split id="dropdown-city" :text="cityLabel" class="ta__dropdown">
            <b-dropdown-item
              v-for="(city,index) in cities"
              :key="'city-'+index"
              @click="setCityLabel(city)"
            >{{city.label}}</b-dropdown-item>
          </b-dropdown>
          <!-- <span for="city_error" class="error">{{ errors.city }}</span> -->
        </div>
      </div>

      <!-- project -->
      <div class="col-lg-12" v-if="from === 'enquire'">
        <div
          class="form-group"
          :class="[{ 'error-box': errors.project !== null },{isIos: $device.isIos}]"
        >
          <label
            style="transform: unset;
    top: -20px;"
            :style="{ display:$device.isIos?'none':'inline-block' }"
          >Project Interested*</label>
          <b-dropdown
            split
            id="dropdown-project"
            class="ta__dropdown"
            :key="'project-' + enquireForm.city"
          >
            <template #button-content>{{ projectLabel }}</template>
            <b-dropdown-item
              v-for="(project,index) in projects"
              :key="'project-'+index"
              @click="setProjectLabel(project)"
            >{{project.label}}</b-dropdown-item>
          </b-dropdown>
          <!-- <span for="project_error" class="error">{{ errors.project }}</span> -->
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
            :class="{active: isHighlight === 'message' || enquireForm.message !== ''}"
            @click="autoFocusInput('message')"
          >MESSAGE (LIMIT 150 Words)*</label>
          <b-form-textarea
            v-model="enquireForm.message"
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
        <!-- <ta-cta btnStyle="ta__btn--primary" type="submit" text="submit"></ta-cta> -->
        <button class="ta__btn ta__btn--primary" id="btn__enquire__submit" :disabled="!isValid">submit</button>
        <span v-if="submitError" class="error d-block mt-2">{{ submitError }}</span>
      </div>
    </div>
  </b-form>
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
export default {
  props: {
    from: String,
  },
  data() {
    return {
      isHighlight: false,
      isValid: false,
      countryLabel: "India",
      cityLabel: "Mumbai",
      projectLabel: "Square",
      selectedProject: "square",
      cities: [
        { label: "Mumbai", value: "mumbai" },
        { label: "Gurugram", value: "gurugram" },
        { label: "Chennai", value: "chennai" },
        { label: "Navi Mumbai", value: "navi-mumbai" },
        { label: "Pune", value: "pune" },
        { label: "Bengaluru", value: "bengaluru" },
      ],
      projects: [{ label: "Square", value: "square" }],
      errors: {
        fullname: null,
        email: null,
        country: null,
        city: null,
        project: null,
        phone: null,
        message: null,
      },
      enquireForm: {
        fullname: "",
        email: "",
        country: "",
        city: "mumbai",
        project: "square",
        phone: "",
        message: "",
      },
      submitError: null,
    };
  },
  methods: {
    autoFocusInput: autoFocusInput,
    submit: async function (e) {
      e.preventDefault();
      if (
        !isNotEmpty(this.enquireForm.fullname) ||
        !validateEmail(this.enquireForm.email) ||
        !validateNumber(this.enquireForm.phone) ||
        !isNotEmpty(this.enquireForm.message)
      ) {
        //validate name
        if (!isNotEmpty(this.enquireForm.fullname)) {
          this.errors.fullname = "Please enter name";
        } else if (!validateName(this.enquireForm.fullname)) {
          this.errors.fullname = "Name should contain alphabets only";
        } else if (containsHtmlTags(this.enquireForm.fullname)) {
          this.errors.fullname = "HTML tags are not allowed";
        } else {
          this.errors.fullname = null;
        }

        //validate message
        if (!isNotEmpty(this.enquireForm.message)) {
          this.errors.message = "Please enter message";
        } else if (containsHtmlTags(this.enquireForm.message)) {
          this.errors.message = "HTML tags are not allowed";
        } else if (this.enquireForm.message.length > 150) {
          this.errors.message = "Message Limit in 150 characters";
        } else {
          this.errors.message = null;
        }

        //email validation
        if (!isNotEmpty(this.enquireForm.email)) {
          this.errors.email = "Please enter your email";
        } else if (!validateEmail(this.enquireForm.email)) {
          this.errors.email = "Please enter a valid email ";
        } else {
          this.errors.email = null;
        }

        //phone validation
        if (!isNotEmpty(this.enquireForm.phone)) {
          this.errors.phone = "Please enter your phone number";
        } else if (!validateNumber(this.enquireForm.phone)) {
          this.errors.phone = "Please enter a valid phone number";
        } else {
          this.errors.phone = null;
        }
      } else if (
        containsHtmlTags(this.enquireForm.fullname) ||
        containsHtmlTags(this.enquireForm.message)
      ) {
        if (containsHtmlTags(this.enquireForm.fullname)) {
          this.errors.fullname = "HTML tags are not allowed";
        }
        if (containsHtmlTags(this.enquireForm.message)) {
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
          full_name: this.enquireForm.fullname,
          email: this.enquireForm.email,
          number: this.enquireForm.phone,
          city: this.enquireForm.city,
          project: this.enquireForm.project,
          message: this.enquireForm.message,
        };
        const result = await this.$store.dispatch("submitEnquiry", payload);
        if (result && result.success) {
          this.enquireForm.fullname = "";
          this.enquireForm.email = "";
          this.enquireForm.phone = "";
          this.enquireForm.message = "";
          this.submitError = null;
          if (this.from === "enquire" && this.$bvModal) {
            this.$bvModal.hide("enquiry-modal");
          }
        } else if (result && !result.success) {
          this.submitError = result.message;
        }
      }
    },
    isValidForm(field) {
      switch (field) {
        case "fullname":
          //validate name
          if (!isNotEmpty(this.enquireForm.fullname)) {
            this.errors.fullname = "Please enter name";
          } else if (!validateName(this.enquireForm.fullname)) {
            this.errors.fullname = "Name should contain alphabets only";
          } else if (containsHtmlTags(this.enquireForm.fullname)) {
            this.errors.fullname = "HTML tags are not allowed";
          } else {
            this.errors.fullname = null;
          }
          break;
        case "email":
          if (!isNotEmpty(this.enquireForm.email)) {
            this.errors.email = "Please enter your email";
          } else if (!validateEmail(this.enquireForm.email)) {
            this.errors.email = "Please enter a valid email ";
          } else {
            this.errors.email = null;
          }
          break;
        case "message":
          if (!isNotEmpty(this.enquireForm.message)) {
            this.errors.message = "Please enter message";
          } else if (containsHtmlTags(this.enquireForm.message)) {
            this.errors.message = "HTML tags are not allowed";
          } else if (this.enquireForm.message.length > 150) {
            this.errors.message = "Message Limit in 150 characters";
          } else {
            this.errors.message = null;
          }
          break;
        case "phone":
          if (!isNotEmpty(this.enquireForm.phone)) {
            this.errors.phone = "Please enter your phone number";
          } else if (!validateNumber(this.enquireForm.phone)) {
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
      this.enquireForm.country = arg.label;
    },
    setCityLabel(arg) {
      this.cityLabel = arg.label;
      this.enquireForm.city = arg.value;

      const cityProjects = {
        pune: {
          projects: [{ label: "Edge", value: "edge" }],
          projectLabel: "Edge",
          project: "edge",
        },
        bengaluru: {
          projects: [{ label: "Park", value: "park" }],
          projectLabel: "Park",
          project: "park",
        },
        chennai: {
          projects: [{ label: "Park", value: "park" }],
          projectLabel: "Park",
          project: "park",
        },
        mumbai: {
          projects: [{ label: "Square", value: "square" }],
          projectLabel: "Square",
          project: "square",
        },
        gurugram: {
          projects: [
            { label: "Edge", value: "edge" },
            { label: "Park", value: "park" },
          ],
          projectLabel: "Edge",
          project: "edge",
        },
        "navi-mumbai": {
          projects: [{ label: "Park", value: "park" }],
          projectLabel: "Park",
          project: "park",
        },
      };

      const config = cityProjects[arg.value];
      if (config) {
        this.projects = config.projects;
        this.projectLabel = config.projectLabel;
        this.enquireForm.project = config.project;
      }
    },
    setProjectLabel(arg) {
      this.projectLabel = arg.label;
      this.enquireForm.project = arg.value;
    },
  },
};
</script>
