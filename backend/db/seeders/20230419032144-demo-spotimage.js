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
     {
       spotId: 7,
       url: 'https://www.bhg.com/thmb/dWsbtD6tMV7XataX123mXcl7uIY=/1943x0/filters:no_upscale():strip_icc()/tudor-style-home-exterior-lush-landscaping-628aa053-0b135bb1d98a4d01974289c7d2c70217.jpg',
       preview: true
     },
     {
       spotId: 7,
       url: 'https://foyr.com/learn/wp-content/uploads/2022/05/master-bedroom-in-a-house-1024x795.jpg',
       preview: false
     },
     {
       spotId: 7,
       url: 'https://hips.hearstapps.com/hmg-prod/images/living-room-ideas-victoria-sass-prs-haroldson-19-copy-1670968437.jpg',
       preview: false
     },
     {
       spotId: 7,
       url: 'https://www.homestratosphere.com/wp-content/uploads/2017/06/Large-bedroom-cathedral-ceiling-oct30.jpg',
       preview: false
     },
     {
       spotId: 7,
       url: 'https://www.southernliving.com/thmb/uz1ZFTCUluEhK58SQAldhppFv1s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/keepingroom-2000-09717dc2963d42aba8f5ed8af15aaa4a.jpeg',
       preview: false
     },
     {
       spotId: 8,
       url: 'https://i.pinimg.com/originals/e5/9b/0e/e59b0e5ec4c0b6b163df938f823fc8cd.jpg',
       preview: true
     },
     {
       spotId: 8,
       url: 'https://media.architecturaldigest.com/photos/5eac5fa22105f13b72dede45/1:1/w_1067,h_1067,c_limit/111LexowAve_Aug18-1074.jpg',
       preview: false
     },
     {
       spotId: 8,
       url: 'https://decoholic.org/wp-content/uploads/2020/02/cozy-attic-living-room-720x900.jpg',
       preview: false
     },
     {
       spotId: 8,
       url: 'https://poshpennies.com/wp-content/uploads/2019/02/herzenstimme-cozy-room.jpg',
       preview: false
     },
     {
       spotId: 8,
       url: 'https://decoholic.org/wp-content/uploads/2021/09/cozy-bedoom-idea-720x900.jpg',
       preview: false
     },
     {
       spotId: 9,
       url: 'https://cdn.trendir.com/wp-content/uploads/old/house-design/2015/01/13/stylishly-simple-modern-1-story-house-3.jpg',
       preview: true
     },
     {
       spotId: 9,
       url: 'https://i.pinimg.com/originals/27/a6/4a/27a64a82e401b34a1d3c79f9aa6b6e3d.jpg',
       preview: false
     },
     {
       spotId: 9,
       url: 'https://cdn2.hubspot.net/hubfs/5208252/Imported_Blog_Media/Clear-170RS.jpg',
       preview: false
     },
     {
       spotId: 9,
       url: 'https://i.pinimg.com/originals/59/01/f5/5901f5c9a0a5255fb33e2819fb6877f1.jpg',
       preview: false
     },
     {
       spotId: 9,
       url: 'https://cdn.onekindesign.com/wp-content/uploads/2014/12/Fireplaces-in-Warm-Cozy-Living-Spaces-24-1-Kindesign.jpg',
       preview: false
     },
     {
       spotId: 10,
       url: 'https://images.squarespace-cdn.com/content/v1/62dfa656a2986f7b76f75c92/1662060924592-CRMGF1O861CO3QVABDYU/de-laurel-chateau-beverly-hills-villa-rental.jpg',
       preview: true
     },
     {
       spotId: 10,
       url: 'https://cdn.homedit.com/wp-content/uploads/2022/01/Mansion-living-room-decor-1024x653.jpg',
       preview: false
     },
     {
       spotId: 10,
       url: 'https://i.pinimg.com/736x/c6/6f/b7/c66fb7b279a660e3daf84e7d32efdf07--luxury-rooms-luxury-living.jpg',
       preview: false
     },
     {
       spotId: 10,
       url: 'https://i.pinimg.com/originals/73/e2/99/73e299743ded5bb95aa7ac78a6e8378a.jpg',
       preview: false
     },
     {
       spotId: 10,
       url: 'https://homedesignlover.com/wp-content/uploads/2014/04/15-jupiter.jpg',
       preview: false
     },
     {
       spotId: 11,
       url: 'https://www.architectureartdesigns.com/wp-content/uploads/2015/05/189-630x419.jpg',
       preview: true
     },
     {
       spotId: 11,
       url: 'https://i.pinimg.com/736x/a4/9e/f6/a49ef66945b043df02e328e4267217cd.jpg',
       preview: false
     },
     {
       spotId: 11,
       url: 'https://i.pinimg.com/736x/e4/67/32/e467326781e076bed0bb35b319efbf0d.jpg',
       preview: false
     },
     {
       spotId: 11,
       url: 'https://i.pinimg.com/originals/c4/5e/b7/c45eb78e7d4bc32c4e2bd49795920f70.jpg',
       preview: false
     },
     {
       spotId: 11,
       url: 'https://i.pinimg.com/736x/c5/86/3c/c5863ce55516b1de6d6ec57e8dd3213d.jpg',
       preview: false
     },
     {
       spotId: 12,
       url: 'https://i.pinimg.com/736x/7a/2c/7e/7a2c7eb239df4475a25e1aab58b14c2a.jpg',
       preview: true
     },
     {
       spotId: 12,
       url: 'https://i.pinimg.com/originals/7a/e3/af/7ae3affb5c0426b674b5a4fd09d196fe.jpg',
       preview: false
     },
     {
       spotId: 12,
       url: 'https://i.pinimg.com/originals/f1/50/85/f15085994f8a09803409e89a4e162267.jpg',
       preview: false
     },
     {
       spotId: 12,
       url: 'https://i.pinimg.com/736x/8e/25/06/8e2506588eff308ceef39fe82dc32614--living-room-contemporary-transitional-living-rooms.jpg',
       preview: false
     },
     {
       spotId: 12,
       url: 'https://i.pinimg.com/originals/4e/32/88/4e3288db6a4336af88f8d6411884a32e.jpg',
       preview: false
     },
     {
       spotId: 13,
       url: 'https://i.pinimg.com/originals/e6/dc/85/e6dc85ca773e88bd0e05e0d56b041ed9.jpg',
       preview: true
     },
     {
       spotId: 13,
       url: 'https://i.pinimg.com/originals/77/d8/31/77d831118a3ebad08fad58787ac35351.jpg',
       preview: false
     },
     {
       spotId: 13,
       url: 'https://i.pinimg.com/736x/2c/af/bb/2cafbb480ecb605d9e68c39b2a98f6a9.jpg',
       preview: false
     },
     {
       spotId: 13,
       url: 'https://i.pinimg.com/originals/79/0a/c6/790ac6a70d87c854bc23dbc9828918a3.jpg',
       preview: false
     },
     {
       spotId: 13,
       url: 'https://i.pinimg.com/736x/6a/1c/52/6a1c52d3afea3b5cb819af53f5e126da.jpg',
       preview: false
     },
     {
       spotId: 14,
       url: 'https://i.pinimg.com/originals/25/27/0d/25270dc0d589794f4ab516e660f1fff8.jpg',
       preview: true
     },
     {
       spotId: 14,
       url: 'https://i.pinimg.com/736x/dc/07/48/dc07486d4084ac7bb254688e1d2f83c8.jpg',
       preview: false
     },
     {
       spotId: 14,
       url: 'https://i.pinimg.com/736x/05/0f/05/050f05775f463dc99547cb26ed9bf696.jpg',
       preview: false
     },
     {
       spotId: 14,
       url: 'https://i.pinimg.com/originals/d6/87/5a/d6875aed055c4b8433349b89a8370a65.jpg',
       preview: false
     },
     {
       spotId: 14,
       url: 'https://i.pinimg.com/564x/ca/a1/5e/caa15e9221e2c52df09a052a0799ab9a.jpg',
       preview: false
     },
     {
       spotId: 15,
       url: 'https://i.pinimg.com/736x/21/34/53/21345382fb790fe150f873583994db7a.jpg',
       preview: true
     },
     {
       spotId: 15,
       url: 'https://i.pinimg.com/736x/32/b5/42/32b542c4d6771b5d6dbce3df5d59a0ac.jpg',
       preview: false
     },
     {
       spotId: 15,
       url: 'https://i.pinimg.com/736x/f8/ac/a2/f8aca294641ec4ebb6dff2668d04f881--white-family-rooms-white-living-rooms.jpg',
       preview: false
     },
     {
       spotId: 15,
       url: 'https://i.pinimg.com/736x/b2/21/a1/b221a1bcec44467e565787b0b8ff6e17--black-white-living-rooms.jpg',
       preview: false
     },
     {
       spotId: 15,
       url: 'https://i.pinimg.com/originals/cc/d2/6a/ccd26a5d8ecb559583f13b0bf42583e8.jpg',
       preview: false
     },
     {
       spotId: 16,
       url: 'https://www.theplancollection.com/admin/CKeditorUploads/Images/11-9.12.19.jpg',
       preview: true
     },
     {
       spotId: 16,
       url: 'https://i.pinimg.com/736x/e6/75/fd/e675fdaff9eff01341e1e4671b04bd4a--interior-design-portfolios-contemporary-interior-design.jpg',
       preview: false
     },
     {
       spotId: 16,
       url: 'https://i.pinimg.com/736x/3e/6f/01/3e6f01e1445b335485ef7f1f26cf0754.jpg',
       preview: false
     },
     {
       spotId: 16,
       url: 'https://i.pinimg.com/736x/ce/2c/d5/ce2cd5f2eee271f4c809a16dbc0210db--luxury-homes-beautiful-homes.jpg',
       preview: false
     },
     {
       spotId: 16,
       url: 'https://i.pinimg.com/736x/3f/57/26/3f57267b7d9ba4b10024474aba0b8a22.jpg',
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
