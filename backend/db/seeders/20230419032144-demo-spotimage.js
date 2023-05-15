'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages';

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
       url: 'https://www.thehousedesigners.com/images/plans/URD/bulk/6583/the-destination-side-rendering_1.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg',
      preview: true
     },
     {
       spotId: 3,
       url: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/44207/44207-b600.jpg',
       preview: true
     },
     {
       spotId: 1,
       url: 'https://thumbs.dreamstime.com/b/modern-house-46517595.jpg',
       preview: true
     },
     {
       spotId: 4,
       url: 'https://wallpaperaccess.com/full/1700222.jpg',
       preview: true
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
    await queryInterface.bulkDelete(options);
  }
};
