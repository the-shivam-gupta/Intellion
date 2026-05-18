<template>
     <div class="row">
      <div
        class="col-lg-12"
        v-for="(card, index) in cards"
        :key="index"
      >
        <div class="all_cards_wrapper">
          <div class="nt_card_wrapper">
            <div class="row nt_row">
              <div class="col-lg-2 col-md-2 col-sm-2">
                <div class="nt_date_time_wrapper">
                  <div class="nt_date">{{ card.date }}</div>
                  <div class="nt_published_by">
                    {{ card.publisher }}
                  </div>
                </div>
              </div>
              <div class="col-lg-7 col-md-7 col-sm-6">
                <div class="news_type_content news_type_content--two">
                  <div class="nt_date_mob">
                    <div class="nt_date">
                      {{ card.date }} <span>| {{ card.publisher }}</span>
                    </div>
                  </div>
                  <div class="nt_docs nt_docs--two">
                    {{ card.type }}
                    <a :href="card.link" target="_blank">
                      <!-- SVG icon -->
                      <svg
                        width="10px"
                        height="10px"
                        viewBox="0 0 10 10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>{{ card.type }}</title>
                        <g fill="#7A6958" fill-rule="nonzero">
                          <path
                            d="M5.67.67V0H.33A.33.33 0 000 .33v9.34c0 .18.15.33.33.33h9.34c.18 0 .33-.15.33-.33V4.33h-.67v5H.67V.67h5z"
                          />
                          <polygon
                            points="10 0 7.17 0 7.17 .56 9.04 .56 5 4.61 5.39 5 9.45 .94 9.45 2.82 10 2.82"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div class="nt_info nt_info--two">
                    {{ card.title }}
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4">
                <!-- Optional space -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StaticMedia",
    data() {
      return {
        cards: [
          {
            date: "15 March 25",
            publisher: "The Hindu",
            type: "MEDIA RELEASE",
            link: "https://clientportal.conceptbiu.com/mv/ad/1371-251190688-1207",
            title: "Decoding Als role in commercial real estate",
          },
          {
            date: "3 February 25",
            publisher: "Responsible Us",
            type: "MEDIA RELEASE",
            link: "https://clientportal.conceptbiu.com/mv/oad/1371-503597612",
            title: "Tata Realty Secures Rs 825 Crore from IFC to Refinance Green IT Park Project in Chennai",
          },
          {
            date: "14 January 25",
            publisher: "Realty Plus",
            type: "MEDIA RELEASE",
            link: "https://clientportal.conceptbiu.com/mv/oad/1371-501741836",
            title: "How Indias GCC growth shaping the future of commercial workspaces",
          },
          {
            date: "26 December 24",
            publisher: "The Economic Times",
            type: "MEDIA RELEASE",
            link: "https://clientportal.conceptbiu.com/mv/ad/1371-244761352-1207",
            title: "Office Realty on a High as IBM Closes in on Gurugram Lease",
          },

          {
            date: "25 December 24",
            publisher: "The Economic Times",
            type: "MEDIA RELEASE",
            link: "https://clientportal.conceptbiu.com/mv/ad/1371-244747116-1207",
            title: "IBM in Talks to Lease Space in Tata Realtys Ggram Tower",
          },
        ],
      };
    },
  };
  </script>
  