<template>
  <div class="all_cards_wrapper">
    <div
      class="nt_card_wrapper nt_card_wrapper--two"
      v-if="from === 'Media' && content"
    >
      <div class="news_type_content">
        <div>
          <div class="nt_date">{{ content.date }}</div>
          <div class="nt_info">{{ content.title }}</div>
        </div>
        <div class="nt_docs">
          MEDIA RELEASE
          <a
            :href="content.media_releases_type.media_release_file"
            target="_blank"
            v-if="content.media_releases_type.media_release_file"
          >
            | PDF
          </a>
          <a
            :href="content.media_releases_type.media_release_url"
            target="_blank"
            v-if="content.media_releases_type.media_release_url"
          >
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 10 10"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>MEDIA RELEASE</title>
              <g
                
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  
                  transform="translate(-721.000000, -3477.000000)"
                  fill="#7A6958"
                  fill-rule="nonzero"
                >
                  <g  transform="translate(135.000000, 3272.000000)">
                    <g  transform="translate(1.000000, 73.000000)">
                      <g
                        
                        transform="translate(417.000000, 0.000000)"
                      >
                        <g
                          
                          transform="translate(168.000000, 132.000000)"
                        >
                          <path
                            d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z"
                            
                          />
                          <polygon
                            
                            points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444"
                          />
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
</template>
<script>
export default {
  props: {
    content: Object,
    from: String,
  },
  methods: {
    splitDate(args) {
      return args.split(',')[1];
    }
  },
  mounted() {
    // console.log(this.content);
  },
};
</script>
