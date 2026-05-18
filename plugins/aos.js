import AOS from "aos";

import "aos/dist/aos.css";

export default ({ app }) => {
  app.AOS = new AOS.init({ disable: false, easing: 'ease-in-out', duration: 700, once: true }); // eslint-disable-line new-cap
};
