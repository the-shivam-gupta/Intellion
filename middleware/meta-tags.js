const FALLBACK_META = {
  '/investor-info': "A complete resource hub from Intellion Offices by TATA Realty, download CSR, compliance reports, annual returns, AGM notices and more.",
  '/tata-code-of-conduct': "Read the Tata Code of Conduct for Intellion - a clear guideline detailing the principles, ethics & conduct expected across all Tata employees and partners.",
  '/sustainability/edge-gurugram': "Discover Intellion\u2019s EDGE-certified Gurugram campus, built with energy-efficient design, sustainable materials, and eco-friendly practices.",
  '/sustainability/park-chennai': "Discover Intellion\u2019s EDGE-certified Chennai campus, built with energy-efficient design, sustainable materials, and eco-friendly practices.",
  '/sustainability/park-gurugram': "Explore Intellion Park Gurugram, a sustainable workplace ecosystem designed with green architecture, energy efficiency, & eco-friendly initiatives.",
  '/sustainability/park-navi-mumbai': "Discover Intellion Park Navi Mumbai - sustainable, green-designed commercial space with energy efficiency, eco-initiatives & modern amenities.",
  '/sustainability/square-mumbai': "Explore Intellion Square Mumbai - a thoughtfully designed, sustainable commercial hub with eco-conscious infrastructure and energy-efficient systems.",
  '/csr-activities/csr-at-intellion-park-chennai': "Learn about CSR efforts at Intellion Park Chennai - community outreach, social welfare initiatives, and sustainable development for local communities.",
  '/csr-activities/csr-at-intellion-edge-gurugram': "Discover CSR initiatives at Intellion EDGE Gurugram - community welfare, sustainable development and social impact efforts for local communities.",
  '/csr-activities/csr-at-intellion-square-mumbai': "Explore CSR initiatives at Intellion Square Mumbai - community development, sustainability drives, and social welfare efforts to uplift local neighbourhoods.",
  '/newsroom/clothes-dont-retire-they-rewire': "Read how Intellion\u2019s initiative 'Clothes Don\u2019t Retire, They Rewire' promotes garment recycling to reduce waste and support sustainable fashion.",
  '/newsroom/rics-built-environment-conference-2025': "Discover highlights from RICS Built Environment Conference 2025 - insights and takeaways shaping sustainable real estate and modern development.",
  '/newsroom/furrfiesta-a-tail-wagging-success': "Read about FurrFiesta - Intellion\u2019s tail-wagging success that celebrates pets, animal welfare, community spirit and a fun-filled day for fur families."
};

export default ({ route, store }) => {
  if (Object.prototype.hasOwnProperty.call(route.params, "project")) {
    return;
  }

  const pagesMeta = store.getters["meta"];

  // Always start with fallback if route has one
  const fallbackDesc = FALLBACK_META[route.path];
  if (fallbackDesc) {
    store.dispatch("updateMeta", {
      seo_meta_description: fallbackDesc,
      seo_meta_title: "Tata Intellion"
    });
  }

  // Then try API data to override (takes priority when available)
  if (pagesMeta && pagesMeta.length) {
    for (let i = 0; i < pagesMeta.length; i++) {
      const apiMeta = pagesMeta[i];
      if (route.name == apiMeta.page_route) {
        store.dispatch("updateMeta", apiMeta);
        break;
      }
    }
  }
};
