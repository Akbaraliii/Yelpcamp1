
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
 //   useCreateIndex: true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '62023a4f2f43c78ed61a2be8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor impedit, harum quisquam magnam odio debitis ducimus, cumque sit velit voluptatum facere eos, temporibus fuga dignissimos minus. Enim laborum sunt expedita?',
             price,
             geometry: {
                type: "Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude                
            ]
             },
             images:  [
                {
                  url: 'https://res.cloudinary.com/dgqybk7f0/image/upload/v1644709572/YelpCamp1/v8sgmf0herf97q5admx1.jpg',
                  filename: 'YelpCamp1/v8sgmf0herf97q5admx1',
                },
                {
                  url: 'https://res.cloudinary.com/dgqybk7f0/image/upload/v1644709567/YelpCamp1/efvhkukdoo7y4rtq9c4a.jpg',
                  filename: 'YelpCamp1/efvhkukdoo7y4rtq9c4a',
                }
              ],
       
        }) 

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});