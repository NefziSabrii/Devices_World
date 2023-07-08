const cloudinary = require ('cloudinary').v2;

//configuration 

cloudinary.config({ 
    cloud_name:'dea2stgpq',
    api_key:'437318668492327', 
    api_secret:'95bm7AB4HTu8JsPZDBLd-pwfyjQ'
  });

  module.exports = cloudinary;