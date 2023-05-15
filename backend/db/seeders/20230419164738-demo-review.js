'use strict';

const { query } = require('express');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Reviews';

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
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      review: 'Was a great place to stay',
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: 'Was an okay place',
      stars: 3
    },
     {
       spotId: 1,
       userId: 2,
       review: 'Nice service',
       stars: 4
     },
     {
       spotId: 2,
       userId: 3,
       review: 'Was gross',
       stars: 1
     },
     {
       spotId: 3,
       userId: 1,
       review: 'Amazing place',
       stars: 5
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options);
  }
};
