<template>
    <section id="news" class="section section-padding section-news-types section-news-sustainability" style="padding-top:0">
      <div class="container">
        <div class="container_brbt">
          <div class="row">
            <div class="col-lg-12">
              <div class="news_type">
                <div class="news_type_title news_type_title--two">
                  Media Releases
                </div>
               
              </div>
            </div>
          </div>
  
          <div class="row">
            <div class="col-lg-4" v-for="(news, index) in newsList" :key="index">
              <div class="all_cards_wrapper">
                <div class="nt_card_wrapper nt_card_wrapper--two">
                  <div class="news_type_content">
                    <div>
                      <div class="nt_date">{{ news.date }}</div>
                      <div class="nt_info">{{ news.title }}</div>
                    </div>
                    <div class="nt_docs">
                      MEDIA RELEASE
                      <a :href="news.link" target="_blank">
                        <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <title>MEDIA RELEASE</title>
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-721.000000, -3477.000000)" fill="#7A6958" fill-rule="nonzero">
                              <g transform="translate(135.000000, 3272.000000)">
                                <g transform="translate(1.000000, 73.000000)">
                                  <g transform="translate(417.000000, 0.000000)">
                                    <g transform="translate(168.000000, 132.000000)">
                                      <path d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z"></path>
                                      <polygon points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444"></polygon>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newsList: [
          {
            date: "15 March 25",
            link: "https://clientportal.conceptbiu.com/mv/ad/1371-251190688-1207",
            title: "Decoding Als role in commercial real estate",
          },
          {
            date: "3 February 25",
            link: "https://clientportal.conceptbiu.com/mv/oad/1371-503597612",
            title: "Tata Realty Secures Rs 825 Crore from IFC to Refinance Green IT Park Project in Chennai",
          },
          {
            date: "14 January 25",
            link: "https://clientportal.conceptbiu.com/mv/oad/1371-501741836",
            title: "How Indias GCC growth shaping the future of commercial workspaces",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS here if needed */
  </style>
  