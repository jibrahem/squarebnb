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
       spotId: 1,
       url: 'https://www.thespruce.com/thmb/Bhae19SVcbCiBP07x5dR6Ob15nE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-room-design-ideas-4126797-hero-a2fd3412abc640bc8108ee6c16bf71ce.jpg',
       preview: false
     },
     {
       spotId: 1,
       url: 'https://hips.hearstapps.com/hmg-prod/images/family-room-ideas-hbx0613000a-1611618370.jpg',
       preview: false
     },
     {
       spotId: 1,
       url: 'https://hips.hearstapps.com/hmg-prod/images/sitting-rooms-hilliard-locust-18-11-20-1578948041.jpg',
       preview: false
     },
     {
       spotId: 1,
       url: 'https://cdn.mos.cms.futurecdn.net/7goCf343cXsWspUtZ4Vuh3.jpg',
       preview: false
     },
    {
      spotId: 2,
      url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg',
      preview: true
     },
    {
      spotId: 2,
      url: 'https://www.thespruce.com/thmb/Bhae19SVcbCiBP07x5dR6Ob15nE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-room-design-ideas-4126797-hero-a2fd3412abc640bc8108ee6c16bf71ce.jpg',
      preview: false
     },
    {
      spotId: 2,
      url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg',
      preview: false
     },
    {
      spotId: 2,
      url: 'https://media.architecturaldigest.com/photos/58066f0c13027a4c2910537f/1:1/w_2211,h_2211,c_limit/modern-living-rooms-27.jpg',
      preview: false
     },
     {
       spotId: 3,
       url: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/44207/44207-b600.jpg',
       preview: true
     },
     {
       spotId: 3,
       url: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=x_489,y_97,h_1252,w_1252,c_crop',
       preview: false
     },
     {
       spotId: 3,
       url: 'https://media.architecturaldigest.com/photos/56f5b53918aebd4c543726ad/16:9/w_2580,c_limit/family-rooms-06.jpg',
       preview: false
     },
     {
       spotId: 3,
       url: 'https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg',
       preview: false
     },
     {
       spotId: 3,
       url: 'https://www.mydomaine.com/thmb/4XgOvTls-MWufHgzPMSWgk5lCKk=/1258x0/filters:no_upscale():strip_icc()/scandinavian-living-room-0053d7b8bc884845851db77b97d0c80d.png',
       preview: false
     },
     {
       spotId: 2,
       url: 'https://thumbs.dreamstime.com/b/modern-house-46517595.jpg',
       preview: false
     },
     {
       spotId: 4,
       url: 'https://wallpaperaccess.com/full/1700222.jpg',
       preview: true
     },
     {
       spotId: 4,
       url: 'https://hips.hearstapps.com/hmg-prod/images/edc100121fernandez-008-1631204495.jpg',
       preview: false
     },
     {
       spotId: 4,
       url: 'https://cdn.mos.cms.futurecdn.net/c2njDNM95nLxvCYf8o4ngi-1200-80.jpg',
       preview: false
     },
     {
       spotId: 4,
       url: 'https://www.ikea.com/images/a-fyresdal-day-bed-with-two-mattresses-with-sommarsloeja-bed-58a3253330318ae1a53e4c43a567532f.jpg',
       preview: false
     },
     {
       spotId: 4,
       url: 'https://media.istockphoto.com/id/1293762741/photo/modern-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=iZ561ZIXOtPYGSzqlKUnLrliorreOYVz1pzu8WJmrnc=',
       preview: false
     },
     {
       spotId: 5,
       url: 'https://www.thespruce.com/thmb/2mQ6hYtoaFcuxnQx_EX5I7xR87w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/a-frame-houses-4772019-hero-7cacd243cfe74fb8b06f44760ea59f35.jpg',
       preview: true
     },
     {
       spotId: 5,
       url: 'https://www.southernliving.com/thmb/YUg5RCBmbvUC4FXkWDaKfM01Qtk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2580601_hanna_944-2000-649113c5795840868d2ebaa1d982fdc3.jpg',
       preview: false
     },
     {
       spotId: 5,
       url: 'https://www.payrent.com/wp-content/uploads/2022/02/pexels-mw-studios-90317.jpg',
       preview: false
     },
     {
       spotId: 5,
       url: 'https://media.designcafe.com/wp-content/uploads/2020/02/21010329/modern-living-room-design-ideas-768x512.jpg',
       preview: false
     },
     {
       spotId: 5,
       url: 'https://media.architecturaldigest.com/photos/5eac5fa22105f13b72dede45/1:1/w_1067,h_1067,c_limit/111LexowAve_Aug18-1074.jpg',
       preview: false
     },
     {
       spotId: 6,
       url: 'https://www.charlestonrealestate.com/blog/wp-content/uploads/80Rutledge-KeenEyeMarketing-103-1024x683.jpg',
       preview: true
     },
     {
       spotId: 6,
       url: 'https://cf.ltkcdn.net/feng-shui/images/std/245816-800x549r1-bedroom-in-evening.jpg',
       preview: false
     },
     {
       spotId: 6,
       url: 'https://www.home-designing.com/wp-content/uploads/2018/10/Open-plan-living-room.jpg',
       preview: false
     },
     {
       spotId: 6,
       url: 'https://hips.hearstapps.com/elledecor/assets/16/29/1469205174-bedroom-design-ideas-lead.jpg',
       preview: false
     },
     {
       spotId: 6,
       url: 'https://www.bestar.com/wp-content/uploads/2019/04/home-office-with-wooden-furniture.jpeg',
       preview: false
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
    await queryInterface.bulkDelete(options);
  }
};
