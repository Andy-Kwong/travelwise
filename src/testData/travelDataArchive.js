let data;
data = {
  columns: {
    'my-itinerary': {
      _id: 'my-itinerary',
      title: 'Chicago Trip 2021',
      events: [],
      notes: '',
    },
    'itinerary-1': {
      _id: 'itinerary-1',
      title: 'Northerly Island Museums 1-Day',
      events: [
        {
          _id: 'poi-1',
          title: 'Hop-on Hop-off Big Bus Chicago Tour',
          content: 'This attraction is your perfect introduction to the Windy City. Your Chicago Hop-On Hop-Off Big Bus Tour will take you past all the top attractions and landmarks, and your knowledgeable and friendly tour guides will fill you in on all the important facts and insider info.',
          link: 'https://gocity.com/chicago/en-us/attractions/hop-hop-big-bus-chicago-1-day-classic-tour',
          location: 'Chicago, IL',
          length: 2,
        },
        {
          _id: 'poi-2',
          title: 'Shedd Aquarium',
          content: 'Home to 32,000 fascinating and unique creatures from a range of diverse habitats, Shedd is one of the best (if not the best) aquariums in the country.',
          link: 'https://gocity.com/chicago/en-us/products/all-inclusive/attractions/shedd-aquarium',
          location: 'Chicago, IL',
          length: 3,
        },
        {
          _id: 'poi-3',
          title: 'Adler Planetarium',
          content: 'The Adler Planetarium has a lot to offer curious visitors. With nine special exhibits, multiple theaters, and the historic Atwood Sphere experience, there are tons of fun activities that the whole family will enjoy.',
          link: 'https://gocity.com/chicago/en-us/products/all-inclusive/attractions/adler-planetarium',
          location: 'Chicago, IL',
          length: 1,
        },
        {
          _id: 'poi-4',
          title: 'The Field Museum',
          content: 'The Field Museum has spent over 100 years curating and adding to its collections, so you know their selection and breadth of artifacts and objects will be impressive.',
          link: 'https://gocity.com/chicago/en-us/products/all-inclusive/attractions/field-museum',
          location: 'Chicago, IL',
          length: 2,
        },
        {
          _id: 'poi-5',
          title: 'Kim And Carlo\'s Chicago Style Hot Dogs',
          content: 'Kim and Carlo\'s Chicago Style Hot Dogs has been around since 1995 and is now one of the last remaining hot dog stands in the city of Chicago.',
          link: 'https://www.yelp.com/biz/kim-and-carlos-hot-dog-stand-chicago',
          location: 'Chicago, IL',
          length: 0.5,
        },
        {
          _id: 'poi-6',
          title: 'Lou Malnati\'s Pizzeria',
          content: 'Flaky, buttery pizza crust, an exclusive sausage blend, vine ripened plum tomatoes from California, and Wisconsin cheese. Hungry yet?',
          link: 'https://www.loumalnatis.com/chicago-south-loop',
          location: 'Chicago, IL',
          length: 1.5,
        }
      ],
      notes: '',
    },
    'itinerary-2': {
      _id: 'itinerary-2',
      title: 'Navy Pier and Shop',
      events: [
        {
          _id: 'poi-7',
          title: 'Architecture River Cruise',
          content: 'This cruise only runs during the warmer months (and can be a bit too chilly during the early spring and late fall, even if it is running), so we recommend reserving this attraction for the warmest times of year.',
          link: 'https://gocity.com/chicago/en-us/products/all-inclusive/attractions/shoreline-architecture-river-cruise',
          location: 'Chicago, IL',
          length: 1.5,
        },
        {
          _id: 'poi-8',
          title: '360 Chicago',
          content: '360 CHICAGO is the newly renovated observation deck of the iconic John Hancock Tower, located on Michigan Avenue. A visit here is both a great photo opportunity and a good chance to learn more about Chicago’s famous architecture.',
          link: 'https://gocity.com/chicago/en-us/products/all-inclusive/attractions/360-chicago',
          location: 'Chicago, IL',
          length: 1,
        },
        {
          _id: 'poi-9',
          title: 'Magnificent Mile',
          content: 'Wander along Michigan Avenue (a.k.a. the Magnificent Mile) in search of some more fun. There\'s a boatload of shopping around,  including everything from affordable fashion to high-end boutiques that are just perfect for window-shopping.',
          link: '',
          location: 'Chicago, IL',
          length: 2,
        },
        {
          _id: 'poi-10',
          title: 'Water Tower Place Mall',
          content: 'Water Tower Place is a Chicago landmark on the Magnificent Mile and renowned for its vast selection of over 100 stores. Beyond shopping, the eight-story mall also houses a number of restaurants and entertainment options, including a live theater.',
          link: '',
          location: 'Chicago, IL',
          length: 1,
        },
        {
          _id: 'poi-11',
          title: 'Bike Rental',
          content: 'Rent a bike and enjoy the waterfront on two wheels! Chicago is a cyclist’s paradise, filled with trails, parks, and pathways just waiting to be explored.',
          link: 'https://gocity.com/chicago/en-us/products/all-inclusive/attractions/bike-and-roll-chicago-four-hour-bike-rental',
          location: 'Chicago, IL',
          length: 2,
        },
        {
          _id: 'poi-12',
          title: 'Navy Pier Centennial Wheel',
          content: 'Whether you\'ve tootled around on a bike or explored the Children\'s Museum, be sure to also reserve some time to explore the Pier itself. It’s Chicago’s most-visited free attraction and has tons to offer the out-of-town visitor.',
          link: 'https://gocity.com/chicago/en-us/products/all-inclusive/attractions/navy-pier-centennial-wheel-and-ride',
          location: 'Chicago, IL',
          length: 1,
        },
      ],
      notes: '',
    }
  },
  columnOrder: ['my-itinerary', 'itinerary-1', 'itinerary-2'],
};

export default data;
