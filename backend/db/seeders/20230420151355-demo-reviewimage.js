'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'ReviewImages';

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
      reviewId: 1,
      url: 'image1.png'
    },
     {
       reviewId: 1,
       url: 'image2.png'
     },
     {
       reviewId: 2,
       url: 'image3.png'
     },
     {
       reviewId: 2,
       url: 'image4.png'
     },
     {
       reviewId: 3,
       url: 'image5.png'
     },
     {
       reviewId: 4,
       url: 'image6.png'
     },
     {
       reviewId: 5,
       url: 'image7.png'
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
