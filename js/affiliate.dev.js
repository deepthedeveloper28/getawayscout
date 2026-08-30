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
  // ==============================================================================
  // ⭐️ MASTER SEO CONFIGURATION (TITLES, DESCRIPTIONS & KEYWORDS)
  // ==============================================================================
  // You can easily write and replace SEO keywords, page titles, and meta descriptions
  // below. All changes will instantly reflect across the entire website!
  // ==============================================================================
  seo: {
    // Default Fallback
    default: {
      siteName: "Getawayscout",
      titleSuffix: " | Getawayscout",
      canonicalDomain: "https://getawayscout.com",
      defaultKeywords: "cheap flights, flight booking, luxury hotels, hotel deals, cheap car rentals, airport transfers, vacation packages, travel deals, Getawayscout",
      ogImage: "https://getawayscout.com/images/hero_travel.png",
      twitterHandle: "@getawayscout"
    },

    // 1. Home Page (index.html / root)
    home: {
      title: "Getawayscout | Compare Cheap Flights, Luxury Hotels & Car Hire Deals",
      description: "Compare and book cheap flight tickets, 5-star luxury hotels, car rentals, and curated vacation tours with Getawayscout. Find the best travel deals worldwide.",
      keywords: "cheap flights, flight booking, compare flights, luxury hotels, hotel deals, cheap car rentals, airport transfers, vacation packages, travel deals, Getawayscout",
      ogTitle: "Getawayscout | Explore the World's Best Travel Deals",
      ogDescription: "Compare 1,000+ airlines and 5M+ hotels to find unbeatable airfares, stays, car rentals, and bucket-list vacation experiences.",
      canonical: "https://getawayscout.com/"
    },

    // 2. Flights Page (flights.html)
    flights: {
      title: "Cheap Flights, Airline Tickets & Flight Deals | Getawayscout",
      description: "Search & compare cheap flight tickets from 1,000+ airlines. Unlock cheap airfares, flexible calendar price tracking, low-fare destination map, and exclusive deals.",
      keywords: "cheap flights, cheap flight tickets, flight booking, compare airfares, airline tickets, low cost flights, flight price map, Aviasales flights, last minute flights",
      ogTitle: "Find & Book Cheap Flight Tickets | Getawayscout Flights",
      ogDescription: "Compare airfares from major airlines and low-cost carriers worldwide. Unlock secret flight deals, low-fare maps, and round-trip discounts.",
      canonical: "https://getawayscout.com/flights"
    },

    // 3. Hotels Page (hotels.html)
    hotels: {
      title: "Hotel Booking, Luxury Resorts & Best Hotel Deals | Getawayscout",
      description: "Compare 5M+ hotels, luxury beach resorts, boutique stays, and holiday apartments worldwide. Enjoy best price guarantee and member-only hotel discounts.",
      keywords: "hotel booking, cheap hotels, luxury resorts, boutique hotels, hotel deals, book hotel online, luxury villas, discount accommodations, best hotel prices",
      ogTitle: "Compare & Book 5M+ Hotels Worldwide | Getawayscout Hotels",
      ogDescription: "Discover exclusive hotel discounts, 5-star beachfront resorts, and boutique city stays with best price guarantee.",
      canonical: "https://getawayscout.com/hotels"
    },

    // 4. Car Rentals Page (cars.html)
    cars: {
      title: "Cheap Car Rentals & Airport Vehicle Hire | Getawayscout",
      description: "Compare car rental rates from 800+ trusted suppliers in 20,000+ locations. Free cancellation, zero hidden fees, unlimited mileage, and 24/7 support.",
      keywords: "cheap car rentals, airport car hire, rent a car, vehicle rental, car rental comparison, SUV rental, luxury car hire, best rental car deals, car hire worldwide",
      ogTitle: "Affordable Car Hire & Rental Deals Worldwide | Getawayscout Cars",
      ogDescription: "Find the lowest car rental rates from top brands across 20,000+ airports and city centers with zero hidden fees.",
      canonical: "https://getawayscout.com/cars"
    },

    // 5. Cabs & Airport Transfers Page (cabs.html)
    cabs: {
      title: "Airport Taxi Transfers & Private Chauffeur Rides | Getawayscout",
      description: "Book reliable airport taxi transfers and private chauffeur rides with fixed transparent pricing, flight tracking, meet & greet service, and 24/7 support.",
      keywords: "airport taxi, airport transfers, airport cab booking, private airport shuttle, chauffeur service, reliable taxi transfer, airport pickup service, fixed price cab",
      ogTitle: "Reliable Airport Taxi & Private Transfers | Getawayscout Cabs",
      ogDescription: "Guaranteed on-time airport pickups, meet & greet service, fixed rates, and comfortable private transfers worldwide.",
      canonical: "https://getawayscout.com/cabs"
    },

    // 6. Bikes & Scooters Page (bikes.html)
    bikes: {
      title: "Motorcycle, Scooter & Bicycle Rentals Worldwide | Getawayscout",
      description: "Rent motorcycles, Vespa scooters, quad bikes, and e-bikes in 40+ countries. Compare 950+ verified rental shops for the lowest rental rates and best insurance.",
      keywords: "scooter rental, motorcycle rental, rent a scooter, vespa hire, quad bike rental, e-bike rental, motorbike rental worldwide, holiday scooter rental",
      ogTitle: "Rent Scooters, Motorbikes & Bikes Worldwide | Getawayscout",
      ogDescription: "Discover coastal roads and city alleys on two wheels. Compare 950+ trusted motorcycle and scooter rental providers.",
      canonical: "https://getawayscout.com/bikes"
    },

    // 7. Tours & Activities Page (tours.html)
    tours: {
      title: "Top Tours, Sightseeing & Attraction Tickets | Getawayscout",
      description: "Book top-rated sightseeing tours, skip-the-line museum tickets, day trips, and outdoor adventures in 150+ countries with instant confirmation.",
      keywords: "tours and activities, attraction tickets, sightseeing tours, skip the line tickets, day trips, guided excursions, bucket list travel, GetYourGuide tours",
      ogTitle: "Unforgettable Tours & Bucket-List Activities | Getawayscout Tours",
      ogDescription: "Skip the ticket lines and discover world-famous monuments, guided local excursions, and thrilling adventures.",
      canonical: "https://getawayscout.com/tours"
    },

    // 8. eSIM & Mobile Data Page (sim.html)
    sim: {
      title: "Prepaid International eSIM & Global Roaming Data | Getawayscout",
      description: "Stay connected in 200+ countries with instant 4G/5G prepaid travel eSIMs. Zero roaming fees, instant QR code activation, and flexible worldwide data plans.",
      keywords: "prepaid travel esim, international esim, global roaming sim, buy esim online, travel data plan, Drimsim, instant esim activation, cheap data roaming, international mobile data",
      ogTitle: "Instant Travel eSIM & Global Data Plans | Getawayscout eSIM",
      ogDescription: "Stay connected in 200+ countries with instant QR-activated prepaid eSIMs. No physical SIM needed, zero expensive roaming fees.",
      canonical: "https://getawayscout.com/sim"
    },

    // 9. Flight Delay Compensation Page (compensation.html)
    compensation: {
      title: "Flight Delay Compensation - Claim Up to €600 | Getawayscout",
      description: "Flight delayed, cancelled, or overbooked in the past 3 years? Check your claim in 1 minute and get up to €600 compensation under EU261/UK261. No win, no fee.",
      keywords: "flight delay compensation, cancelled flight refund, EU261 claim, flight overbooked compensation, airline delay claim, compensair, flight passenger rights, claim flight refund",
      ogTitle: "Claim Up to €600 for Delayed or Cancelled Flights | Getawayscout",
      ogDescription: "Free 1-minute claim check under EU261 & UK261 airline passenger rights. 100% No Win, No Fee compensation guarantee.",
      canonical: "https://getawayscout.com/compensation"
    },

    // 10. Travel Journal / Blog (blog.html)
    blog: {
      title: "Travel Journal, Guides & Insider Destination Tips | Getawayscout",
      description: "Explore expert travel guides, luxury itineraries, secluded European hideaways, culinary stories, and smart travel tips curated by Getawayscout.",
      keywords: "travel blog, travel guides, destination tips, luxury travel itinerary, budget travel hacks, travel journal, hidden travel gems, vacation planning",
      ogTitle: "Travel Journal & Insider Destination Guides | Getawayscout",
      ogDescription: "Inspiring travel stories, curated itineraries, hidden European hideaways, and expert trip planning advice.",
      canonical: "https://getawayscout.com/blog"
    },

    // 11. Single Blog Article (blog-single.html)
    "blog-single": {
      title: "Travel Dispatch & Destination Guide | Getawayscout Journal",
      description: "Read in-depth travel insights, cultural guides, itinerary recommendations, and expert travel tips on Getawayscout Journal.",
      keywords: "travel article, destination review, travel dispatch, travel tips, Getawayscout journal",
      ogTitle: "Travel Journal Article | Getawayscout",
      ogDescription: "Expert travel insights, cultural guides, and insider destination recommendations.",
      canonical: "https://getawayscout.com/blog-single"
    },

    // 12. Boutique / Gear Shop (shop.html)
    shop: {
      title: "Luxury Travel Boutique - Luggage, Gear & Essentials | Getawayscout",
      description: "Discover aerospace-grade titanium luggage, noise-canceling acoustics, and alpine merino apparel designed for seamless global exploration.",
      keywords: "travel boutique, luxury luggage, premium travel gear, titanium suitcase, travel accessories, travel essentials, minimalist travel gear",
      ogTitle: "Luxury Travel Gear & Luggage Boutique | Getawayscout",
      ogDescription: "Curated expedition luggage, noise-cancelling acoustics, and minimalist travel essentials for seamless journeys.",
      canonical: "https://getawayscout.com/shop"
    },

    // 13. Single Boutique Product (product-single.html)
    "product-single": {
      title: "Luxury Travel Product Details | Getawayscout Boutique",
      description: "Explore handcrafted luxury travel gear, durable suitcases, and expedition essentials on Getawayscout Boutique.",
      keywords: "luxury travel gear, premium luggage review, travel accessories, boutique travel item",
      ogTitle: "Boutique Travel Piece | Getawayscout",
      ogDescription: "Discover handcrafted travel gear and premium luggage designed for modern globetrotters.",
      canonical: "https://getawayscout.com/product-single"
    },

    // 14. About Us (about.html)
    about: {
      title: "About Getawayscout - Our Mission & Global Travel Platform",
      description: "Learn about Getawayscout's mission to make global flight comparison, hotel bookings, and vacation planning transparent, accessible, and effortless.",
      keywords: "about Getawayscout, travel metasearch engine, travel comparison company, travel platform mission, transparent travel booking",
      ogTitle: "About Getawayscout - Empowering Global Explorers",
      ogDescription: "Learn about our mission to make global travel comparison, flight booking, and adventure planning effortless and transparent.",
      canonical: "https://getawayscout.com/about"
    },

    // 15. Contact Us (contact.html)
    contact: {
      title: "Contact Getawayscout | 24/7 Customer Support & Inquiries",
      description: "Have questions about flight comparison, hotel reservations, or partnership inquiries? Get in touch with Getawayscout's 24/7 customer support team.",
      keywords: "contact Getawayscout, customer support, travel help center, partnership inquiries, travel assistance",
      ogTitle: "Contact Getawayscout Support",
      ogDescription: "We are here to assist you 24/7 with travel bookings, partner queries, and general inquiries.",
      canonical: "https://getawayscout.com/contact"
    },

    // 16. FAQs (faq.html)
    faq: {
      title: "Frequently Asked Questions (FAQs) & Help | Getawayscout",
      description: "Find clear answers to common questions regarding flight searches, hotel reservations, car hire deposits, eSIM activation, and flight delay claims.",
      keywords: "travel faqs, flight booking questions, hotel reservation help, car rental questions, esim faq, flight compensation help",
      ogTitle: "Getawayscout FAQs & Help Center",
      ogDescription: "Get instant answers to questions regarding flight bookings, hotel reservations, car rentals, eSIMs, and compensation claims.",
      canonical: "https://getawayscout.com/faq"
    },

    // 17. Privacy Policy (privacy.html)
    privacy: {
      title: "Privacy Policy | Data Protection & Security - Getawayscout",
      description: "Read the Getawayscout Privacy Policy. Learn how we protect your personal data, ensure privacy compliance, and uphold GDPR standards.",
      keywords: "privacy policy, GDPR data protection, personal data rights, cookie privacy, Getawayscout privacy",
      ogTitle: "Getawayscout Privacy Policy",
      ogDescription: "Our commitment to protecting your personal information and respecting your data privacy rights.",
      canonical: "https://getawayscout.com/privacy"
    },

    // 18. Terms of Service (terms.html)
    terms: {
      title: "Terms of Service & User Agreement | Getawayscout",
      description: "Review the Terms of Service and user agreement governing your use of Getawayscout's travel comparison services and search tools.",
      keywords: "terms of service, user agreement, website terms, travel search terms and conditions",
      ogTitle: "Getawayscout Terms of Service",
      ogDescription: "Terms of service and conditions for using Getawayscout.com travel search and comparison platform.",
      canonical: "https://getawayscout.com/terms"
    },

    // 19. Cookie Policy (cookies.html)
    cookies: {
      title: "Cookie Policy | Tracking & Analytics - Getawayscout",
      description: "Understand how Getawayscout uses cookies and analytics tracking technologies to optimize performance and deliver tailored travel experiences.",
      keywords: "cookie policy, tracking cookies, analytics cookies, website privacy, cookie consent",
      ogTitle: "Getawayscout Cookie Policy",
      ogDescription: "How we use cookies to improve your travel search experience and site performance.",
      canonical: "https://getawayscout.com/cookies"
    },

    // 20. Affiliate Disclaimer (disclaimer.html)
    disclaimer: {
      title: "Affiliate Disclosure & Search Disclaimer | Getawayscout",
      description: "Getawayscout is an independent travel comparison engine. Learn about our affiliate partnerships, pricing transparency, and booking policies.",
      keywords: "affiliate disclosure, search disclaimer, price transparency, travel metasearch policy",
      ogTitle: "Getawayscout Affiliate & Search Disclaimer",
      ogDescription: "Transparency is our core value. Learn about our affiliate partnerships and free price comparison guarantee.",
      canonical: "https://getawayscout.com/disclaimer"
    },

    // 21. Thank You Page (thank-you.html)
    "thank-you": {
      title: "Thank You for Subscribing! | Getawayscout VIP Travel Club",
      description: "Welcome to the Getawayscout VIP Travel Club! Enjoy exclusive airfare drops, secret luxury resort sales, and curated destination guides.",
      keywords: "newsletter subscription, VIP travel deals, travel club, exclusive flight discounts",
      ogTitle: "Welcome to Getawayscout VIP Travel Club!",
      ogDescription: "You are now on the VIP list for insider airfare drops, secret luxury resort deals, and curated destination guides.",
      canonical: "https://getawayscout.com/thank-you"
    }
  },

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
  contactEmail: "support@getawayscout.com",
  newsletterEmail: "support@getawayscout.com",
  newsletterAction: "https://formsubmit.co/support@getawayscout.com",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    x: "https://x.com",
    twitter: "https://x.com"
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
  toursMainLink: "https://www.getyourguide.com/?cmp=brand&campaign_id=6656899609&adgroup_id=78792541373&target_id=kwd-297342945529&loc_physical_ms=9179407&match_type=e&ad_id=508913319731&keyword=get%20your%20guide&ad_position=&feed_item_id=&placement=&device=c&partner_id=CD951&gad_source=1&gad_campaignid=6656899609&gbraid=0AAAAADmzJCNe4KCbJLyM1nuDMRRMX4ILg&gclid=EAIaIQobChMI5ZOpv7rHlgMVXZJmAh2TEQLqEAAYASAAEgLaDPD_BwE&partner_id=CUNP4U8&utm_medium=online_publisher&cmp=tour_getyourguide",
  toursBookMoreLink: "https://www.getyourguide.com/?cmp=brand&campaign_id=6656899609&adgroup_id=78792541373&target_id=kwd-297342945529&loc_physical_ms=9179407&match_type=e&ad_id=508913319731&keyword=get%20your%20guide&ad_position=&feed_item_id=&placement=&device=c&partner_id=CD951&gad_source=1&gad_campaignid=6656899609&gbraid=0AAAAADmzJCNe4KCbJLyM1nuDMRRMX4ILg&gclid=EAIaIQobChMI5ZOpv7rHlgMVXZJmAh2TEQLqEAAYASAAEgLaDPD_BwE&partner_id=CUNP4U8&utm_medium=online_publisher&cmp=tour_getyourguide",

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
      image: "images/dest_vienna_austria.webp",
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
      image: "images/dest_salzburg_austria.webp",
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
      image: "images/dest_hallstatt_austria.webp",
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
      image: "images/dest_innsbruck_austria.webp",
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
      image: "images/deal_barcelona.webp",
      link: "https://www.getyourguide.com/athens-l91/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Athenes"
    },
    {
      city: "Singapore",
      activity: "Pacific Explorer",
      price: "$62",
      image: "images/deal_london.webp",
      link: "https://www.getyourguide.com/singapore-l170/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Singapore"
    },
    {
      city: "Amsterdam, NL",
      activity: "Northern Dawn",
      price: "$38",
      image: "images/dest_amsterdam.webp",
      link: "https://www.getyourguide.com/amsterdam-l36/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Amsterdam"
    },
    {
      city: "Cape Town, SA",
      activity: "Mountain Day Trips",
      price: "$55",
      image: "images/deal_dubai.webp",
      link: "https://www.getyourguide.com/cape-town-l103/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_capetown"
    },
    {
      city: "Lisbon, Portugal",
      activity: "Costa Ralls",
      price: "$41",
      image: "images/dest_paris.webp",
      link: "https://www.getyourguide.com/lisbon-l42/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Lisbon"
    },
    {
      city: "Bangkok, Thailand",
      activity: "Travel Leisurely",
      price: "$29",
      image: "images/dest_tokyo.webp",
      link: "https://www.getyourguide.com/bangkok-l169/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Bangkok"
    },
    {
      city: "Venice, Italy",
      activity: "Go Visa Tours",
      price: "$73",
      image: "images/dest_bali.webp",
      link: "https://www.getyourguide.com/venice-l35/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Venice"
    },
    {
      city: "Istanbul, Turkey",
      activity: "On Vacation",
      price: "$36",
      image: "images/dest_istanbul.webp",
      link: "https://www.getyourguide.com/istanbul-l56/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Instanbul"
    },
    {
      city: "Rome, Italy",
      activity: "Forbidden Ferry",
      price: "$52",
      image: "images/dest_rome.webp",
      link: "https://www.getyourguide.com/rome-l33/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=Home_Rome"
    },
    {
      city: "Prague, Czech",
      activity: "Travel Inbound",
      price: "$44",
      image: "images/dest_prague.webp",
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
  },
  viewAllDestinationsLink: "https://www.getyourguide.com/en-gb/austria-l169004/?partner_id=CUNP4U8&utm_medium=online_publisher&cmp=home_austria"
};

// Export to window object for vanilla browser usage
window.affiliateConfig = affiliateConfig;
