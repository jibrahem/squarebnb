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
        name: 'Elmo',
        description: 'Place where kids are welcome',
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
        name: "App Academy",
        description: "Place where web developers are created",
        price: 99
      },
      {
        ownerId: 3,
        address: "202 Lara St",
        city: "North Bergen",
        state: "NJ",
        country: "USA",
        lat: 89.348,
        lng: -124.234,
        name: "Google",
        description: "Place where web developers thrive",
        price: 300
      },
      {
        ownerId: 3,
        address: "1212 Hippo Lane",
        city: "Brooklyn",
        state: "NY",
        country: "USA",
        lat: 90.23458,
        lng: -57.23327,
        name: "Microsoft",
        description: "Place where web developers are eaten alive",
        price: 256
      }
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
