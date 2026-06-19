<template>
  <!-- Hero Section -->
  <div id="project-detail-page">
    <template v-if="!$fetchState.pending">
      <section class="section">
        <ta-hero
          heroStyle="transparent"
          type="two"
          :content="project.hero_section"
        ></ta-hero>
        <ta-pagemarks
          v-if="project.filters.city && project.filters.project_category"
          :content="project.tabs_list"
          :type="project.filters.project_category.slug"
          :isLogo="true"
          :city="project.filters.city.slug"
        />
        <div class="brand__logo">
          <img
            src="~/assets/images/logos/edge_black.svg"
            alt="Tata Intellion Edge"
            v-if="project.filters.project_category.slug === 'edge'"
          />
          <img
            src="~/assets/images/logos/prime_black.svg"
            alt="Tata Intellion Prime"
            v-if="project.filters.project_category.slug === 'prime'"
          />
          <img
            src="~/assets/images/logos/square_black.svg"
            alt="Tata Intellion Square"
            v-if="project.filters.project_category.slug === 'square'"
          />
          <template v-if="project.filters.project_category.slug === 'park'">
            <img
              src="~/assets/images/logos/park.svg"
              alt="Tata Intellion Park"
              v-if="project.filters.city.slug === 'chennai'"
              :class="project.filters.city.slug"
            />
            <img
              src="~/assets/images/logos/park_black.svg"
              alt="Tata Intellion Park"
              v-else
            />
          </template>
        </div>
      </section>
      <!-- Hero Section -->

      <!-- About Section -->
      <section class="section section-padding" id="about">
        <div class="container">
          <div class="row">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li class="breadcrumb-item">
                <NuxtLink to="/commercial-projects">Commercial Projects</NuxtLink>
                </li>
                <li class="breadcrumb-item active">
                {{project.title}}
                </li>
              </ol>
            </nav>
          </div>
          <div class="row row-eq-height">
            <div class="col-lg-4 col-sm-12">
              <div class="section__heading">
                <h2 class="section__subtitle" data-aos="fade-up">
                  {{ project.about_us_section.sub_title }}
                </h2>
                <h3 class="section__title" data-aos="fade-up">
                  {{ project.about_us_section.title }}
                </h3>
              </div>
              <div class="section__content" data-aos="fade-up">
                <p class="ta__para">
                  {{ project.about_us_section.description }}
                </p>
              </div>
              <div
                class="section__btn"
                v-if="project.about_us_section.downloadable_brochure !== ''"
                data-aos="fade-in"
              >
                <ta-cta
                  v-if="project.about_us_section.downloadable_brochure"
                  type="downloadLink"
                  btnStyle="ta__btn--primary"
                  text="DOWNLOAD BROCHURE"
                  :url="project.about_us_section.downloadable_brochure"
                ></ta-cta>
              </div>
            </div>
            <div class="col-lg-8 col-sm-12">
              <div class="slider">
                <slick v-if="isNuxtReady" :options="aboutOptions">
                  <div
                    class="slider__image"
                    v-for="(slide, index) in project.about_us_section.slider"
                    :key="'slide_' + index"
                  >
                    <img :src="slide.image.src" :alt="(slide.image.alt!='')?slide.image.alt:'Tata Intellion'" data-aos="fade-in"/>
                    <button
                      class="ta__btn--video"
                      v-if="slide.youtube_video_url !== ''"
                      type="button"
                      v-b-modal="'video-modal'"
                      @click="setVideoUrl(slide.youtube_video_url)"
                    >
                      <span class="ta__play">
                        <span class="icon-play"></span>
                      </span>
                      <span>Watch Video</span>
                    </button>
                  </div>
                </slick>
              </div>
            </div>
            <div class="col-lg-12 col-sm-12">
              <div class="features">
                <div
                  class="feature"
                  v-for="(feature, index) in project.about_us_section.features"
                  :key="'feature_' + index"
                >
                  <div class="image" data-aos="fade-in">
                    <img
                      :src="feature.feature_icon.src"
                      :alt="feature.feature_icon.alt"
                    />
                  </div>
                  <div class="content" data-aos="fade-in">{{ feature.feature_content }}</div>
                  <div class="name" data-aos="fade-in">{{ feature.feature_name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- About Section -->

      <!-- Amenities Section -->
      <section
        class="section"
        id="amenities"
        v-if="project.amenity_section.amenities.length > 0"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <ta-heading-inner-page
                :subtitle="project.amenity_section.sub_title"
                :title="project.amenity_section.title"
                :isTrans="true"
                :transhead="project.amenity_section.background_title"
              ></ta-heading-inner-page>
              <div class="section__content" data-aos="fade-in">
                <p class="ta__para" v-html="project.amenity_section.description">
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <slick v-if="isNuxtReady" :options="amenityOptions">
                <div
                  class="ta__card amenity"
                  v-for="(amenity, index) in project.amenity_section.amenities"
                  :key="'amenity_' + index"
                >
                  <div class="ta__card--image" data-aos="fade-in">
                    <img
                      :src="amenity.featured_image.src"
                      :alt="(amenity.featured_image.alt!='')?amenity.featured_image.alt:'Tata Intellion amenities'"
                    />
                  </div>
                  <div class="ta__card--body">
                    <h3 class="ta__card--title" data-aos="fade-up">{{ amenity.title }}</h3>
                    <div class="ta__card--text" data-aos="fade-up">
                      <p class="ta__para" v-html="amenity.description"></p>
                    </div>
                  </div>
                </div>
              </slick>
            </div>
          </div>
        </div>
      </section>
      <!-- Amenities Section -->

      <!-- Location Section -->
      <section
        class="section section-padding"
        id="location"
        v-if="project.location_section.famous_nearby_venue_list.length > 0"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <ta-heading
                :subtitle="project.location_section.sub_title"
                :title="project.location_section.title"
                :isTrans="
                  project.location_section.background_title !== ''
                    ? true
                    : false
                "
                :transhead="project.location_section.background_title"
              ></ta-heading>
              <div class="section__content" data-aos="fade-in">
                <p class="ta__para" v-html="project.location_section.map_highlight_text">
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <Location /> -->
        <Location
          v-if="project.location_section.famous_nearby_venue_list.length > 0"
          :places="project.location_section.famous_nearby_venue_list"
          :title="project.location_section.map_highlight_text"
          :location="project.location_section.project_location"
          :type="project.filters.project_category.slug"
        />
      </section>
      <!-- Location Section -->

      <!-- Infrastructure Section -->
      <section
        class="section"
        id="infrastructure"
        v-if="project.infrastructure_section.infrastructure_features.length > 0"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <ta-heading
                :subtitle="project.infrastructure_section.sub_title"
                :title="project.infrastructure_section.title"
                :isTrans="
                  project.infrastructure_section.background_title !== ''
                    ? true
                    : false
                "
                :transhead="project.infrastructure_section.background_title"
              ></ta-heading>
              <div class="section__content">
                <p class="ta__para" data-aos="fade-in" v-html="project.infrastructure_section.description">
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="slider">
                <slick v-if="isNuxtReady" :options="infraOptions">
                  <div
                    class="ta__card infrastructure"
                    v-for="(feature, index) in project.infrastructure_section
                      .infrastructure_features"
                    :key="'infrastructure_' + index"
                  >
                    <div class="ta__card--body">
                      <h3 class="ta__card--title" data-aos="fade-up">{{ feature.title }}</h3>
                      <div class="ta__card--text" data-aos="fade-up">
                        <p class="ta__para">{{ feature.description }}</p>
                      </div>
                    </div>
                    <div class="ta__card--image" data-aos="fade-in">
                      <img
                        :src="feature.featured_image.src"
                        :alt="(feature.featured_image.alt!='')?feature.featured_image.alt:'Tata Intellion infrastructure'"
                      />
                    </div>
                  </div>
                </slick>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Infrastructure Section -->

      <!-- Testmonials Section -->
      <section
        class="section"
        id="testimonial"
        v-if="project.testimonials_section.testimonies.length > 0"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h4 class="section__subtitle" data-aos="fade-up">TESTIMONIALS OF OUR TENANTS</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <slick v-if="isNuxtReady" :options="testimonyOptions">
                <div
                  class="carousel__item"
                  v-for="(testimony, index) in project.testimonials_section
                    .testimonies"
                  :key="'testimony' + index"
                >
                  <ta-testimonial-card
                    :content="testimony"
                  ></ta-testimonial-card>
                </div>
              </slick>
            </div>
          </div>
        </div>
      </section>
      <!-- Testmonials Section -->

      <!-- Floor Plan -->
      <section
        class="section section-padding"
        v-if="project.floor_section.floor_map_image"
        id="floorplan"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <ta-heading
                :subtitle="project.floor_section.sub_title"
                :title="project.floor_section.title"
                :isTrans="
                  project.floor_section.background_title !== '' ? true : false
                "
                :transhead="project.floor_section.background_title"
              ></ta-heading>

              <div class="section__content" data-aos="fade-in">
                <p class="ta__para">{{ project.floor_section.description }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="section__image" data-aos="fade-in">
                <img
                  :src="project.floor_section.floor_map_image.src"
                  :alt="project.floor_section.floor_map_image.alt"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Floor Plan -->

      <!-- News Projects -->
      <NewsSection 
  v-if="project.filters.project_category.slug !== 'square'"
  :newslist="project.latest_news_section.news" 
/>


      <!-- News Projects -->


             <!-- Approvals --> 
      
  <section class="section section-news-types custom-fade-in" id="approvals" v-if="project.about_us_section.title =='A sprawling work campus that captivates growth'">
  <div class="container">
    <div class="container_brbt ">
      <div class="row">
        <div class="col-lg-12">
          <div class="news_type">
            <div class="news_type_title news-type-title">Approvals</div>
            <!--<div class="nt_view">
                   <button type="button" @click="openTab(1)">
                     {{ pageDetails.sections.policies.button.text }}
                   </button>
                 </div>-->
          </div>
        </div>
      </div>
      <div class="row">
      

	<!-- Content Added on 1st April 2026 by Abhiman-->
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">CTE Phase 2 - 23.03.2026</div>
                </div>

                <div class="nt_docs">
                  <a href="https://webapi.intellion.in/wp-content/uploads/2026/04/CTE-Phase-2-23.03.2026.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
      <!-- Ends 1st April 2026-->


      <!-- Content Added on 14th Jan 2026 by Abhiman-->
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">Phase 2 Environmental Clearance - 08.01.26</div>
                </div>

                <div class="nt_docs">
                  <a href="https://webapi.intellion.in/wp-content/uploads/2026/01/Phase-2-Environmental-Clearance-08.01.26.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
      <!-- Ends 14th Jan 2026-->

      <!-- Content Added on 14th Jan 2026 by Abhiman-->
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">Phase 2 Environmental Clearance - 08.01.26 (Letter submitted to Ex Engg MIDC)</div>
                </div>

                <div class="nt_docs">
                  <a href="https://webapi.intellion.in/wp-content/uploads/2026/01/Phase-2-Environmental-Clearance-08.01.26-Letter-submitted-to-Ex-Engg-MIDC.jpg" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
      <!-- Ends 14th Jan 2026-->

      <!-- Content Added on 14th Jan 2026 by Abhiman-->
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">Public Notice - English (The Free Press Journal) - Phase 2 Environmental Clearance - 08.01.26</div>
                </div>

                <div class="nt_docs">
                  <a href="https://webapi.intellion.in/wp-content/uploads/2026/01/Public-Notice-English-The-Free-Press-Journal-Phase-2-Environmental-Clearance-08.01.26.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
      <!-- Ends 14th Jan 2026-->
        <!-- Content Added on 14th Jan 2026 by Abhiman-->
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">Public Notice - Marathi (Navshakti) - Phase 2 Environmental Clearance - 08.01.26</div>
                </div>

                <div class="nt_docs">
                  <a href="https://webapi.intellion.in/wp-content/uploads/2026/01/Public-Notice-Marathi-Navshakti-Phase-2-Environmental-Clearance-08.01.26.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
      <!-- Ends 14th Jan 2026-->

        <!-- Content Added on 3rd March 2025 by Abhiman-->
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">Environment Clearance (Apr 2024 – Sept 2024)</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2025/03/EC-6-mths-comp-rep-04-24-to-09-24_14-11-24.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
      <!-- 3rd March 2025-->


<!-- Content Added on 18th Nov 2024 by Abhiman-->

        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">Environment Clearance No. SEIAA-EC-0000002300, dated: 15.01.2020</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/11/3_Industrial_Minerals___Chemical_CO._Pvt._Ltd._Intellion_IT_Park___December_2024_Parivesh.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <!-- 18th Nov 2024-->

      <!-- Content Added on 18th Nov 2024 by Abhiman-->

        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">Environment Clearance No. SEIAA-EC-0000002300, dated: 15.01.2020</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/11/3_Industrial_Minerals___Chemical_CO._Pvt._Ltd._Intellion_IT_Park___December_2024_Parivesh.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <!-- 18th Nov 2024-->

        <!-- Content Added on 29th Oct 2024 by Abhiman-->

        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                
                <div>
                  <div class="nt_info">NOC by NHSRCL (Bldg No. 1) – Dt. 22nd July 2020</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/10/NOC-by-NHSRCL-for-Bldg-no.-1-dt-22nd-July-20.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <!-- 29th Oct-->

        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info">News Paper advt in Marathi for EC</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/07/News-Paper-advt-in-Marathi-for-EC.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info" >EC of Bldg No. 1 dt 15th Jan 2020</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/07/EC-of-Bldg-No.-1-dt-15th-Jan-2020.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info" >News Paper advt in English for EC</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/07/News-Paper-advt-in-English-for-EC.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info" >Online Submitted Form V IMCC 2023-2024</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/08/3_Online_Submitted_Form_V_IMCC_2023-2024.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info" >Industrial Minerals & Chemical CO. Pvt. Ltd. Intellion IT Park @ December 2023</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/07/2_Industrial_Minerals__Chemical_CO._Pvt._Ltd._Intellion_IT_Park_%40_December_2023.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info" >Industrial Minerals & Chemical CO. Pvt. Ltd. Intellion IT Park @ June 2024</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/08/2_Industrial_Minerals___Chemical_CO._Pvt._Ltd._Intellion_IT_Park___June_2024.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
        <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info" >IMCC Online Submitted Form IV FY 2023-24</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/08/IMCC_Online_Submitted_Form_IV_FY_2023-24.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
         <div class="col-lg-4 col-md-6">
          <div class="all_cards_wrapper">
            <div class="nt_card_wrapper nt_card_wrapper--two">
              <div class="news_type_content">
                <div>
                  <div class="nt_info" >TATA IMCC JUNE 2024</div>
                </div>

                <div class="nt_docs">
                  <a href="https://media.intellion.in/wp-content/uploads/2024/08/TATA_IMCC_JUNE_2024.pdf" target="_blank" download>Download
                    <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>link title</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="" transform="translate(-721.000000, -3477.000000)"
                          fill="#7A6958" fill-rule="nonzero">
                          <g id=""
                            transform="translate(135.000000, 3272.000000)">
                            <g id=""
                              transform="translate(1.000000, 73.000000)">
                              <g transform="translate(417.000000, 0.000000)">
                                <g transform="translate(168.000000, 132.000000)">
                                  <path
                                    d="M5.66666667,0.666666667 L5.66666667,0 L0.333333333,0 L0.333333333,0 C0.15,0 0,0.15 0,0.333333333 L0,9.66666667 C0,9.85 0.15,10 0.333333333,10 L9.66666667,10 L9.66666667,10 C9.85,10 10,9.85 10,9.66666667 L10,4.33333333 L9.33333333,4.33333333 L9.33333333,9.33333333 L0.666666667,9.33333333 L0.666666667,0.666666667 L5.66666667,0.666666667 Z" />
                                  <polygon
                                    points="10 0 7.17451524 0 7.17451524 0.555555556 9.04432133 0.555555556 5 4.61111111 5.38781163 5 9.44598338 0.944444444 9.44598338 2.81944444 10 2.81944444" />
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
<!-- Approvals --> 
      <!-- Related Projects -->
      <section class="section" id="related-projects">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section__heading">
                <div class="ta__flex">
                  <h2 class="section__title" data-aos="fade-up">Other Projects by Intellion</h2>
                  <ta-cta
                    btnStyle="ta__btn--ternary"
                    text="ALL PROJECTS"
                    type="link"
                    :isicon="true"
                    url="/commercial-projects"
                  ></ta-cta>
                </div>
              </div>
            </div>
          </div>
          <div class="row custom-margin">
            <div class="col-lg-12">
            <slick :options="projectOptions" v-if="isNuxtReady">
                <ta-primary-card
                  v-for="(projectContent, index) in project.other_projects"
                  :key="'project_' + index"
                  :content="projectContent"
                  from="other"
                ></ta-primary-card>
              </slick>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 ta__show--sm">
              <ta-cta
                btnStyle="ta__btn--ternary"
                text="ALL PROJECTS"
                type="link"
                :isicon="true"
                url="/commercial-projects"
              ></ta-cta>
            </div>
          </div>
        </div>
      </section>
      <!-- Related Projects -->
    </template>
    <template v-if="$fetchState.pending">
      <section class="section">
        <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
      </section>
      <section class="section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader
                class="mt-2"
                width="50"
                height="5"
              ></ta-skeleton-loader>
              <ta-skeleton-loader
                class="mt-3"
                width="100"
                height="15"
              ></ta-skeleton-loader>
              <div class="mt-3">
                <ta-skeleton-loader
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
                <ta-skeleton-loader
                  class="mt-2"
                  width="100"
                  height="10"
                ></ta-skeleton-loader>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6">
              <ta-skeleton-loader width="100" height="350"></ta-skeleton-loader>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
const slick = () =>
  window && window !== undefined ? import("vue-slick") : null;
import NewsSection from "~/components/NewsSection";
import Location from "~/components/Location";
import { youtube_parser } from "~/middleware/utils";
import { schemaMap } from "~/utils/schemaMap";
export default {
  async fetch() {
    const { params, store, router } = this.$nuxt.context;
    let newparams = {
      filter: 1,
      slug: params.project,
      project_city: params.city
    };
    await store.dispatch("projects/getProjects", newparams);
  },
  head() {
  const path = this.$route.path;
  console.log("Path ",path);
  const schemaData = schemaMap[path] || null;
  console.log("Schema found:", !!schemaData);
    return {
      htmlAttrs: {
        lang: "en"
      },
      title: this.metaTitle,
      meta: this.meta,
      link: [
        ...this.link,
        { rel: 'canonical', href: `https://www.intellion.in${this.$route.fullPath}` }
      ],
      script: schemaData
        ? [
            {
              hid: "schema",
              type: "application/ld+json",
              innerHTML: JSON.stringify(schemaData)
            }
          ]
        : [],
      __dangerouslyDisableSanitizersByTagID: {
        schema: ["innerHTML"]
      }
    };
  },
  components: {
    NewsSection,
    slick,
    Location
  },
  data() {
    return {
      isNuxtReady: false,
      aboutOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        fade: true,
        nextArrow:
          "<button class='carousel-next' aria-label='next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>"
      },
      amenityOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        fade: true,
        nextArrow:
          "<button class='carousel-next' aria-label='next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>"
      },
      infraOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        fade: true,
        nextArrow:
          "<button class='carousel-next' aria-label='next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>"
      },
      testimonyOptions: {
        slidesToShow: 1,
        arrows: true,
        dots: true,
        nextArrow:
          "<button class='carousel-next' aria-label='next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev' aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>"
      },
      projectOptions: {
        arrows: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
        nextArrow:
          "<button class='carousel-next ta__btn--navigation' aria-label='next'> <span class='ta__icon icon-next'></span></button>",
        prevArrow:
          "<button class='carousel-prev ta__btn--navigation'  aria-label='Previous'> <span class='ta__icon icon-prev'></span></button>",
        responsive: [
          {
            breakpoint: 769,
            settings: {
              arrows: true,
              dots: true,
              centerMode: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              arrows: true,
              dots: true,
              centerMode: false,
              variableWidth: true,
              centerPadding: "0",
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    };
    
  },
  computed: {
    project: function() {
      return this.$store.state.projects.projects[0];
    },
    metaTitle: function() {
      let meta_title = (this.$store.state.projects.metaTitle != '') ? this.$store.state.projects.metaTitle : '';

      if(meta_title == '')
      meta_title = (meta_title == '' && this.$store.state.projects.projects[0]) ? "Tata Intellion - " + this.$store.state.projects.projects[0].filters.project_category.name + " " + this.$store.state.projects.projects[0].filters.city.name : "Tata Intellion";

      return meta_title;
    },

    link: function() {
      let link  = this.$store.state.projects.projects[0].meta_data ? this.$store.state.projects.link : this.$store.state.link;
      
      return link;
    }
  },
  watch: {
    "$route.query": "$fetch"
  },
  methods: {
    refresh() {
      this.$fetch();
    },
    setVideoUrl(url) {
      let videoId = youtube_parser(url);
      this.$store.commit(
        "updateVideoUrl",
        "https://www.youtube.com/embed/" + videoId + "?autoplay=1"
      );
    }
  },

  mounted() {
    if (process.browser) {
      this.isNuxtReady = true;
    }
  }
};
</script>

