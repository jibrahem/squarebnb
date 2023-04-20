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
        address: '123 Sesame Street',
        city: 'Wonderland',
        state: 'CA',
        country: 'US',
        lat: 37.3749,
        lng: 12.4535,
        name: 'Elmo',
        description: 'Place where kids are welcome',
        price: 1000
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 3,
        address: "2022 Lara St",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 89.348,
        lng: -124.234,
        name: "Google",
        description: "Place where web developers thrive",
        price: 12356
      },
      {
        ownerId: 3,
        address: "1212 Hippo Lane",
        city: "Brooklyn",
        state: "New York",
        country: "United States of America",
        lat: 90.23458,
        lng: -57.23327,
        name: "Microsoft",
        description: "Place where web developers are eaten alive",
        price: 435896
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
