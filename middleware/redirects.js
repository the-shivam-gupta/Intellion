export default ({ route, redirect, from }) => {
  let redirectTo = false;
  let params = route.path.split("/");
  
  const rerouteObj = {
    projects: "commercial-projects",
    news: "newsroom",
    csr: "csr-activities",
    leader: "leadership"
  }


  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'https://www.intellion.com'

  if (env === 'production' && host !== 'intellion.com') {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
    //redirect(redirectTo);
  }

  if (params[1] === "page") {
    const pageObj = {
      "news-room-page": "newsroom",
      "csr-listing-page": "csr-activities",
      "sustainability-overview-page": "sustainability",
      "terms-and-condition-page": "terms-conditions",
      "privacy-policy-page": "privacy-policy",
      "project-listing-page": "commercial-projects",
      "leadership-page": "leadership",
      "about-us-page": "about-us",
      "home-page": "",
      "contact-us-page": "contact-us"
    }
    params[1] = pageObj[params[2]];
    params.pop();
    redirectTo = params.join("/");

    
  } else if (Object.prototype.hasOwnProperty.call(rerouteObj, params[1])) {
    params[1] = rerouteObj[params[1]];
    if (params[1] === "leadership") {
      params[2] = `?leader=${params[2]}`
    }
    console.log(params , "modified params");
    redirectTo = params.join("/");
  }
  if (redirect !== false) {
    redirect(redirectTo);
  }
};
