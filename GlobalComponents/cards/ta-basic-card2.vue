<template>
  <!-- media full CSR is Full -->
  <div class="ta__card basic" :class="[type, type === 'press' ? 'simple' : '']">
    <div class="basic__info" v-if="type !== 'simple' && type !== 'press'">
      <div class="date">{{ content.date }}</div>
      <div class="place" v-if="type === 'events'">{{ content.place }}</div>
      <div class="publish" v-if="type === 'media'">{{ content.publised }}</div>
    </div>

    <div class="basic__content">
      <!-- <h5 class="year" v-if="type === 'simple'">{{content.year}}</h5> -->
      <!-- <h5 class="yearevents" v-if="type !== 'simple'">May 21, 2020 | Hindustan Times</h5> -->
      <h5 class="year date" v-if="type === 'press'">{{ content.date }}</h5>
      <!-- <h3 class="title ta__h3" v-if="type!=='simple'">{{ content.title }}</h3> -->
      <h4 class="title ta__h4" v-if="type === 'press'">{{ content.title }}</h4>
      <!-- <h5 class="award-name" v-if="type === 'simple' && !!content.awardby">{{content.awardby}}</h5> -->
      <h5 class="press-release" v-if="type === 'press'">
        Press Release
        <a
          :href="content.press_releases_type.press_release_file.url"
          rel="noopener"
          target="_blank"
          v-if="
            content.press_releases_type.press_release_file &&
              content.press_releases_type.press_release_file.url !== ''
          "
        >
          <span class="icon">
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 10 10"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>noun_External Link_1167422</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  id="TATA-Intellion-Website_Desktop_o2_v3"
                  transform="translate(-721.000000, -3477.000000)"
                  fill="#7A6958"
                  fill-rule="nonzero"
                >
                  <g id="TATA-Intellion-Website_Desktop_o2_v3-Group" transform="translate(135.000000, 3272.000000)">
                    <g id="TATA-Intellion-Website_Desktop_o2_v3-Group-2" transform="translate(1.000000, 73.000000)">
                      <g transform="translate(417.000000, 0.000000)">
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
          </span>
        </a>
        <a
          :href="content.press_releases_type.press_release_url"
          rel="noopener"
          target="_blank"
          v-if="content.press_releases_type.press_release_url !== ''"
        >
          <span class="icon">
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 10 10"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>noun_External Link_1167422</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  id="TATA-Intellion-Website_Desktop_o2_v3"
                  transform="translate(-721.000000, -3477.000000)"
                  fill="#7A6958"
                  fill-rule="nonzero"
                >
                  <g id="TATA-Intellion-Website_Desktop_o2_v3-Group" transform="translate(135.000000, 3272.000000)">
                    <g id="TATA-Intellion-Website_Desktop_o2_v3-Group-2" transform="translate(1.000000, 73.000000)">
                      <g transform="translate(417.000000, 0.000000)">
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
          </span>
        </a>
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: Object,
    type: String,
  },
};
</script>
