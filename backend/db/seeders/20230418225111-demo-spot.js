'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Prune Street',
        city: 'San Diego',
        state: 'CA',
        country: 'US',
        lat: 37.3749,
        lng: 12.4535,
        name: 'Marshmere',
        description: 'Place where kids are welcome to have fun',
        price: 121
      },
      {
        ownerId: 2,
        address: "567 Disney Lane",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Feathermond",
        description: "Place where web developers are created",
        price: 99
      },
      {
        ownerId: 4,
        address: "202 Lara St",
        city: "North Bergen",
        state: "NJ",
        country: "USA",
        lat: 89.348,
        lng: -124.234,
        name: "Richstar",
        description: "Our luxurious home offers stunning views and all the amenities you need for a pampering stay",
        price: 97
      },
      {
        ownerId: 3,
        address: "1212 Hippo Lane",
        city: "Brooklyn",
        state: "NY",
        country: "USA",
        lat: 79.324,
        lng: -57.23327,
        name: "Newwell",
        description: "Place where web developers are eaten alive",
        price: 156
      },
      {
        ownerId: 4,
        address: "729 Playa Drive",
        city: "Santa Barbara",
        state: "CA",
        country: "USA",
        lat: 57.342,
        lng: -51.227,
        name: "The Oasis",
        description: "Place where you can relax and get away for sometime",
        price: 199
      },
      {
        ownerId: 4,
        address: "950 Main Street",
        city: "Ventura",
        state: "CA",
        country: "USA",
        lat: 25.298,
        lng: -11.297,
        name: "The Getaway",
        description: "Place where you can focus and get some work done",
        price: 137
      },
      {
        ownerId: 1,
        address: "661 Smoky Hollow Street",
        city: "Hayward",
        state: "CA",
        country: "USA",
        lat: 46.4434,
        lng: -148.5982,
        name: "Sleepy Hollow",
        description: "Place where you can relax and get away for some time",
        price: 90
      },
      {
        ownerId: 2,
        address: "9983 Leeton Ridge Dr.",
        city: "Pomona",
        state: "CA",
        country: "USA",
        lat: 25.298,
        lng: -11.297,
        name: "Eagleman",
        description: "Place where you can take your family for a weekend away",
        price: 72
      },
      {
        ownerId: 3,
        address: "172 Canal Street",
        city: "Huntington Park",
        state: "CA",
        country: "USA",
        lat: 34.334,
        lng: -135.7743,
        name: "Gillford",
        description: "Place where you can party your little heart out",
        price: 127
      },
      {
        ownerId: 4,
        address: "74 Rich House Drive",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 46.9375,
        lng: -137.3157,
        name: "The Mansion",
        description: "Place where you can come to meet new people and have fun",
        price: 1999
      },
      {
        ownerId: 1,
        address: "7 Heather Drive",
        city: "El Cajon",
        state: "CA",
        country: "USA",
        lat: 57.5547,
        lng: -89.9239,
        name: "Spenmer",
        description: "Place where you can come see the beautiful city of El Cajon",
        price: 90
      },
      {
        ownerId: 2,
        address: "9884 Deerfield Street",
        city: "Fresno",
        state: "CA",
        country: "USA",
        lat: 5.0531,
        lng: -176.9397,
        name: "Blackbrand",
        description: "Place where you can come to do whatever you want",
        price: 81
      },
      {
        ownerId: 3,
        address: "45 East Taylor Dr.",
        city: "Simi Valley",
        state: "CA",
        country: "USA",
        lat: 88.2417,
        lng: -23.982,
        name: "Rutherver",
        description: "Place where you can come and check out the valley",
        price: 98
      },
      {
        ownerId: 4,
        address: "993 Bear Hill Ave.",
        city: "Oxnard",
        state: "CA",
        country: "USA",
        lat: 23.2473,
        lng: -137.2308,
        name: "Conwen",
        description: "Place where you can be in the middle of all the action of Santa Barbara and Los Angeles",
        price: 70
      },
      {
        ownerId: 1,
        address: "394 La Sierra Dr.",
        city: "San Jose",
        state: "CA",
        country: "USA",
        lat: 83.6319,
        lng: -120.814,
        name: "Sweethall",
        description: "Place where you can see the beautiful city of San Jose",
        price: 110
      },
      {
        ownerId: 2,
        address: "293 S. Carpenter Rd.",
        city: "Hawthorne",
        state: "CA",
        country: "USA",
        lat: 3.4015,
        lng: -23.982,
        name: "Ravenbeard",
        description: "Place where you can come and have a beautiful stay at the Ravenbeard",
        price: 68
      },

    ], {});
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options);
  }
};
