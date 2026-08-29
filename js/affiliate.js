/**
 * ==============================================================================
 * MASTER AFFILIATE & SITE CONFIGURATION FILE
 * ==============================================================================
 * 
 * Edit this single file to update all affiliate scripts, partner links, 
 * widget IDs, contact info, and site settings across the entire website.
 * 
 * ==============================================================================
 */

const affiliateConfig = {
  // ==========================================
  // ⭐️ WORDPRESS SOURCE URL (POSTS, PRODUCTS & CATEGORIES)
  // ==========================================
  // Change this URL to your WordPress site or WPGraphQL endpoint.
  // All blog posts, WooCommerce products, and category details will automatically fetch live from this URL.
  wordpressUrl: "https://admin.getawayscout.com/",

  // ==========================================
  // GENERAL SITE BRANDING & CONTACT INFO
  // ==========================================
  siteName: "Getawayscout.com",
  contactEmail: "Christian.reu1998@gmx.at",
  newsletterEmail: "Christian.reu1998@gmx.at",
  newsletterAction: "https://formsubmit.co/Christian.reu1998@gmx.at",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com"
  },
  simBookingLink: "https://drimsim.tpm.lv/ujiSxKSo",
  insuranceLink: "https://ektatraveling.com/?sub_id=ce936106e758475091d2baa8b-767941&utm_source=travelpayouts",
  eventLink: "https://gocity.tpx.li/z9tGcfbO",
  simSearchWidget: `<script async src="https://tpemb.com/content?campaign_id=541&promo_id=8588&no_labels=true&plain=false&border_radius=5&special=%23C4C4C4&light=%23FFFFFF&dark=%2311100f&secondary=%23FFFFFF&color_focused=%23f2685f&color_button=%23E6911A&powered_by=false&locale=en&shmarker=767941&trs=566488" charset="utf-8"></script>`,

  // ==========================================
  // FLIGHT COMPENSATION WIDGET (COMPENSAIR)
  // ==========================================
  compensationSearchWidget: `<script async src="https://tpemb.com/content?trs=566488&shmarker=767941&locale=en&border_radius=21&plain=true&powered_by=false&promo_id=3408&campaign_id=86" charset="utf-8"></script>`,

  // ==========================================
  // FLIGHT PAGE WIDGETS & EMBEDS
  // ==========================================
  flightSearchWidget: `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=7879&plain=true&border_radius=21&color_focused=%2332a8dd&special=%23C4C4C4&secondary=%23FFFFFF&light=%23FFFFFF&dark=%23262626&color_icons=%2332a8dd&color_button=%23E6911A&primary_override=%2332a8dd&searchUrl=www.aviasales.com%2Fsearch&locale=en&powered_by=false&show_hotels=false&shmarker=767941&trs=566488" charset="utf-8"></script>`,

  flightDealsWidgets: {
    "London": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=5&locale=en&target_host=www.aviasales.com%2Fsearch&destination=VIE&shmarker=767941&trs=566488" charset="utf-8"></script>`,
    "New York": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=6&locale=en&target_host=www.aviasales.com%2Fsearch&destination=NYC&shmarker=767941&trs=566488" charset="utf-8"></script>`,
    "Dubai": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=6&locale=en&target_host=www.aviasales.com%2Fsearch&destination=DXB&shmarker=767941&trs=566488" charset="utf-8"></script>`,
    "Bangkok": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=6&locale=en&target_host=www.aviasales.com%2Fsearch&destination=BKK&shmarker=767941&trs=566488" charset="utf-8"></script>`,
    "Geneva": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=6&locale=en&target_host=www.aviasales.com%2Fsearch&destination=GVA&shmarker=767941&trs=566488" charset="utf-8"></script>`,
    "Tokyo": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=6&locale=en&target_host=www.aviasales.com%2Fsearch&destination=TYO&shmarker=767941&trs=566488" charset="utf-8"></script>`,
    "Berlin": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=6&locale=en&target_host=www.aviasales.com%2Fsearch&destination=BER&shmarker=767941&trs=566488" charset="utf-8"></script>`,
    "Rome": `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4044&primary=%230097A7&powered_by=false&limit=6&locale=en&target_host=www.aviasales.com%2Fsearch&destination=ROM&shmarker=767941&trs=566488" charset="utf-8"></script>`
  },

  flightRoundTripCalendar: `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4041&achieve=%2345AD35&light=%23FFFFFF&dark=%23000000&color_background=%23ffffff&primary=%23E6911A&range=7%2C14&period=year&only_direct=false&one_way=false&powered_by=false&locale=en&searchUrl=www.aviasales.com%2Fsearch&shmarker=767941&trs=566488" charset="utf-8"></script>`,
  flightRoundTripMap: `<script async src="https://tpemb.com/content?currency=usd&campaign_id=100&promo_id=4054&zoom=4&height=500&width=1500&light=%23ffffff&secondary=%233FABDB&primary=%233FABDB&scrollwheel=false&show_logo=false&disable_zoom=false&draggable=true&radius=1&only_direct=false&round_trip=true&value_max=1000000&value_min=0&origin=VIE&locale=en&search_host=www.aviasales.com%2Fsearch&powered_by=false&lng=16.3738189&lat=48.2081743&shmarker=767941&trs=566488" charset="utf-8"></script>`,

  // ==========================================
  // HOTEL PAGE WIDGETS & EXPEDIA LINKS
  // ==========================================
  hotelSearchWidget: `<div class="eg-widget" data-widget="search" data-program="us-expedia" data-lobs="stays" data-network="pz" data-camref="1011l5Q62j" data-pubref="Getawayscout"></div>
<script class="eg-widgets-script" src="https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js"></script>`,

  hotelDestinations: {
    "Maldives": "https://expedia.com/affiliate/WXRc5mb",
    "London": "https://expedia.com/affiliate/dscy6xP",
    "Vienna": "https://expedia.com/affiliate/QtNicV3",
    "Bali": "https://expedia.com/affiliate/uSkyrvy",
    "Paris": "https://expedia.com/affiliate/UHLJme3",
    "Dubai": "https://expedia.com/affiliate/8XnZJl0",
    "New York": "https://expedia.com/affiliate/u13vCbb"
  },

  // ==========================================
  // CAR RENTAL PAGE WIDGETS & LINKS
  // ==========================================
  carSearchWidget: `<script async src="https://tpemb.com/content?campaign_id=10&promo_id=4480&color_button_text=%23ffffff&color_input_text=%23000000&color_text=%23000000&color_button=%23E6911A&color_background=%23FFFFFFff&show_logo=true&plain=true&border_radius=5&powered_by=false&locale=en&shmarker=767941&trs=566488" charset="utf-8"></script>`,
  carBestPricesWidget: `<script async src="https://tpemb.com/content?promo_id=2082&campaign_id=10&powered_by=false&height=100&width=100&locale=en&shmarker=767941&trs=566488" charset="utf-8" async="true"></script>`,

  // ==========================================
  // CAB & AIRPORT TRANSFERS PAGE WIDGETS
  // ==========================================
  cabSearchWidget: `<script async src="https://tpemb.com/content?currency=USD&promo_id=1486&campaign_id=1&powered_by=false&theme=6&language=en&shmarker=767941&trs=566488" charset="utf-8"></script>`,

  // ==========================================
  // BIKE & SCOOTER RENTALS (WIDGETS & LINKS)
  // ==========================================
  bikeSearchWidget: `<script async src="https://tpemb.com/content?campaign_id=57&promo_id=5472&color_button=%23E6911A&color_background=%23ffffff&plain=true&border_radius=21&powered_by=false&locale=en&shmarker=767941&trs=566488" charset="utf-8"></script>`,
  bikesBookingLinks: {
    bicycle: "https://bikesbooking.tpx.li/rzbIrFDn",
    motorcycle: "https://bikesbooking.tpx.li/rzbIrFDn",
    quad: "https://bikesbooking.tpx.li/rzbIrFDn",
  },

  // ==========================================
  // TOURS & EXPERIENCES PAGE WIDGETS & LINKS
  // ==========================================
  toursSearchWidget: `<div data-gyg-href="https://widget.getyourguide.com/default/activities.frame" data-gyg-locale-code="en-US" data-gyg-widget="activities" data-gyg-number-of-items="30" data-gyg-partner-id="CUNP4U8" data-gyg-q="Austria"><span>Powered by <a target="_blank" rel="sponsored" href="https://www.getyourguide.com/austria-l169004/">GetYourGuide</a></span></div>
<script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="CUNP4U8"></script>`,
  toursMainLink: "https://www.getyourguide.com/austria-l169004/",
  toursBookMoreLink: "https://www.getyourguide.com/paris-l16/?adults=1&searchSource=8&partner_id=CUNP4U8&utm_medium=online_publisher&cmp=TOUR_FRANCE",

  // ==========================================
  // 🇦🇹 HOME PAGE - TOP DESTINATIONS IN AUSTRIA (CURATED EXPERIENCES)
  // ==========================================
  austriaTopDestinations: [
    {
      id: "vienna",
      name: "Vienna",
      location: "Vienna, Austria",
      title: "Schönbrunn Palace & Classical Concert Experiences",
      link: "https://www.getyourguide.com/vienna-l7/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Vienna",
      image: "images/dest_vienna_austria.jpg",
      tag: "Imperial Capital",
      price: "$32",
      oldPrice: "$48",
      rating: 4.9,
      reviews: "18,450"
    },
    {
      id: "salzburg",
      name: "Salzburg",
      location: "Salzburg, Austria",
      title: "Hohensalzburg Fortress & Sound of Music Highlights",
      link: "https://www.getyourguide.com/salzburg-l4/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Salzburg",
      image: "images/dest_salzburg_austria.jpg",
      tag: "Mozart's City",
      price: "$36",
      oldPrice: "$52",
      rating: 4.9,
      reviews: "12,380"
    },
    {
      id: "hallstatt",
      name: "Hallstatt",
      location: "Hallstatt, Austria",
      title: "Alpine Lake Viewing & Historic Salt Mine Tours",
      link: "https://www.getyourguide.com/hallstatt-l32535/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Hallstatt",
      image: "images/dest_hallstatt_austria.jpg",
      tag: "Alpine Gem",
      price: "$45",
      oldPrice: "$65",
      rating: 4.9,
      reviews: "8,920"
    },
    {
      id: "innsbruck",
      name: "Innsbruck",
      location: "Innsbruck, Austria",
      title: "Nordkette Cable Car & Imperial Hofburg Alpine Tours",
      link: "https://www.getyourguide.com/innsbruck-l164/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Innsbruck",
      image: "images/dest_innsbruck_austria.jpg",
      tag: "Top of Innsbruck",
      price: "$42",
      oldPrice: "$58",
      rating: 4.8,
      reviews: "6,410"
    }
  ],

  // ==========================================
  // 🌟 HOME PAGE - "WE'VE GOT SOME GREAT DEALS" (10 CITIES GRID)
  // ==========================================
  greatDeals: [
    {
      city: "Athens, Greece",
      activity: "Abbey City Tours",
      price: "$45",
      image: "images/deal_barcelona.png",
      link: "https://www.getyourguide.com/athens-l91/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Athenes"
    },
    {
      city: "Singapore",
      activity: "Pacific Explorer",
      price: "$62",
      image: "images/deal_london.png",
      link: "https://www.getyourguide.com/singapore-l170/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Singapore"
    },
    {
      city: "Amsterdam, NL",
      activity: "Northern Dawn",
      price: "$38",
      image: "images/dest_amsterdam.png",
      link: "https://www.getyourguide.com/amsterdam-l36/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Amsterdam"
    },
    {
      city: "Cape Town, SA",
      activity: "Mountain Day Trips",
      price: "$55",
      image: "images/deal_dubai.png",
      link: "https://www.getyourguide.com/cape-town-l103/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_capetown"
    },
    {
      city: "Lisbon, Portugal",
      activity: "Costa Ralls",
      price: "$41",
      image: "images/dest_paris.png",
      link: "https://www.getyourguide.com/lisbon-l42/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Lisbon"
    },
    {
      city: "Bangkok, Thailand",
      activity: "Travel Leisurely",
      price: "$29",
      image: "images/dest_tokyo.png",
      link: "https://www.getyourguide.com/bangkok-l169/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Bangkok"
    },
    {
      city: "Venice, Italy",
      activity: "Go Visa Tours",
      price: "$73",
      image: "images/dest_bali.png",
      link: "https://www.getyourguide.com/venice-l35/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Venice"
    },
    {
      city: "Istanbul, Turkey",
      activity: "On Vacation",
      price: "$36",
      image: "images/dest_istanbul.png",
      link: "https://www.getyourguide.com/istanbul-l56/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Instanbul"
    },
    {
      city: "Rome, Italy",
      activity: "Forbidden Ferry",
      price: "$52",
      image: "images/dest_rome.png",
      link: "https://www.getyourguide.com/rome-l33/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Rome"
    },
    {
      city: "Prague, Czech",
      activity: "Travel Inbound",
      price: "$44",
      image: "images/dest_prague.png",
      link: "https://www.getyourguide.com/prague-l10/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Prague"
    }
  ],

  // ==========================================
  // CURATED EXPERIENCES (HOME PAGE LINKS)
  // ==========================================
  curatedExperienceLinks: {
    vienna: "https://www.getyourguide.com/vienna-l7/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Vienna",
    salzburg: "https://www.getyourguide.com/salzburg-l4/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Salzburg",
    hallstatt: "https://www.getyourguide.com/hallstatt-l32535/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Hallstatt",
    innsbruck: "https://www.getyourguide.com/innsbruck-l164/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Innsbruck",
    barcelona: "https://www.getyourguide.com/barcelona-l45/sagrada-familia-skip-the-line-t29293/?ranking_uuid=fad7b593-fc76-49a7-ac25-4e5f9cc20e82",
    london: "https://www.getyourguide.com/tower-bridge-l2713/",
    manhattan: "https://www.getyourguide.com/manhattan-l3459/air-helicopter-tours-tc44/",
    dubai: "https://www.getyourguide.com/s/?q=Dubai&lc=173&et=61841&searchSource=3&src=search_bar"
  },

  // ==========================================
  // TOP DESTINATIONS (HOME PAGE EXPLORE)
  // ==========================================
  destinationLinks: {
    Vienna: "https://www.getyourguide.com/vienna-l7/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Vienna",
    Salzburg: "https://www.getyourguide.com/salzburg-l4/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Salzburg",
    Hallstatt: "https://www.getyourguide.com/hallstatt-l32535/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Hallstatt",
    Innsbruck: "https://www.getyourguide.com/innsbruck-l164/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Innsbruck",
    Bali: "https://www.getyourguide.com/bali-l347/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_bali",
    Amsterdam: "https://www.getyourguide.com/amsterdam-l36/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_amsterdam",
    Berlin: "https://www.getyourguide.com/berlin-l17/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Berlin",
    Paris: "https://www.getyourguide.com/paris-l16/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Paris",
    Tokyo: "https://www.getyourguide.com/tokyo-l193/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_tokyo",
    Rome: "https://www.getyourguide.com/rome-l33/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Rome",
    Maldives: "https://www.getyourguide.com/maldives-l169135/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_maldives",
    Prague: "https://www.getyourguide.com/prague-l10/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_prague",
    Santorini: "https://www.getyourguide.com/santorini-l753/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_santorini",
    Istanbul: "https://www.getyourguide.com/istanbul-l56/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_instanbul"
  }
};

// Export to window object for vanilla browser usage
window.affiliateConfig = affiliateConfig;
