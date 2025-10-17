const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Luxury Ski Chalet in Whistler",
    description: "Experience world-class skiing from this luxurious chalet in Whistler. Perfect for winter sports enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1591824438706-4a9c6d23c67b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpJTIwY2hhbGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Whistler",
    country: "Canada",
  },
  {
    title: "Boutique Hotel in Santorini",
    description: "Stay in this beautiful boutique hotel with stunning caldera views in iconic Santorini.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudG9yaW5pfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Jungle Eco-Lodge in Costa Rica",
    description: "Immerse yourself in nature at this sustainable eco-lodge surrounded by tropical rainforest.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29zdGElMjByaWNhJTIwamluZ2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Monteverde",
    country: "Costa Rica",
  },
  {
    title: "Modern Apartment in Singapore",
    description: "Explore the vibrant city-state from this sleek, modern apartment in the heart of Singapore.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2luZ2Fwb3JlJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Singapore",
    country: "Singapore",
  },
  {
    title: "Desert Camp in Morocco",
    description: "Sleep under the stars in this authentic Berber desert camp in the Sahara Desert.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9yb2NjbyUyMGRlc2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 450,
    location: "Merzouga",
    country: "Morocco",
  },
  {
    title: "Lakeside Cabin in Norway",
    description: "Enjoy the stunning fjord views from this cozy cabin nestled by a crystal-clear lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5vcndheSUyMGZqb3JkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Geiranger",
    country: "Norway",
  },
  {
    title: "Traditional Ryokan in Kyoto",
    description: "Experience authentic Japanese culture in this traditional ryokan with tatami rooms and kaiseki meals.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lvdG8lMjByeW9rYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 850,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Vineyard Estate in Napa Valley",
    description: "Stay amidst rolling vineyards in this luxurious estate with wine tasting experiences included.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFwYSUyMHZhbGxleXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Napa Valley",
    country: "United States",
  },
  {
    title: "Beach Villa in Seychelles",
    description: "Paradise found in this stunning beach villa with private access to pristine white sand beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2V5Y2hlbGxlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Mahe",
    country: "Seychelles",
  },
  {
    title: "Historic Riad in Marrakech",
    description: "Discover the magic of Marrakech from this beautifully restored traditional riad in the medina.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcnJha2VjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 750,
    location: "Marrakech",
    country: "Morocco",
  },
  {
    title: "Alpine Lodge in Switzerland",
    description: "Breathtaking alpine views await at this cozy lodge in the Swiss Alps, perfect for hiking and skiing.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN3aXNzJTIwYWxwc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Interlaken",
    country: "Switzerland",
  },
  {
    title: "Overwater Bungalow in Bora Bora",
    description: "The ultimate luxury experience in this stunning overwater bungalow with direct lagoon access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9yYSUyMGJvcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5500,
    location: "Bora Bora",
    country: "French Polynesia",
  },
  {
    title: "City Penthouse in Dubai",
    description: "Luxury living at its finest in this stunning penthouse with panoramic views of Dubai's skyline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4800,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Countryside Farmhouse in Tuscany",
    description: "Experience authentic Italian countryside life in this charming farmhouse surrounded by olive groves.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHVzY2FueSUyMGZhcm1ob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Siena",
    country: "Italy",
  },
  {
    title: "Mountain View A-Frame Cabin",
    description: "Charming A-frame cabin with spectacular mountain views, perfect for a romantic getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyYW1lJTIwY2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Big Bear",
    country: "United States",
  }
];

module.exports = { data: sampleListings };