'use strict';

// Load mongo module
var mongoose = require('mongoose');

// Car object schema
var carSchema = mongoose.Schema({
    fordonstyp:String,
    requiredDrivingLicense:String,
    brand:String,
    model:String,
    year:Number,
    gearbox:String,
    dagshyra:Number,
    fuel:String,
    imgLink:String,
    status: {
        type: Boolean,
        default: [true]
    }
});

var Cars = module.exports = mongoose.model('Cars', carSchema);

// Get all cars
module.exports.getCars = function(callback, limit) {
    Cars.find(callback).limit(limit);
}

// Get car by id
module.exports.getCarById = function(id, callback) {
    Cars.findById(id, callback);
}

// Add car
module.exports.addCar = function(data, callback) {
    Cars.create(data, callback);
}

// Filter cars by brand
module.exports.filterCars = function(condition, callback) {
    Cars.find({'brand': condition}, callback);
}

// Update car
module.exports.updateCar = function(_id, car, options, callback) {
    Cars.findOneAndUpdate({_id:_id}, car, options, callback);
}

// Remove Car
module.exports.removeCar = function(_id, callback) {
    Cars.findByIdAndRemove(_id, callback);
};

// Book Car
module.exports.bookCar = function(_id, car, options, callback) {
    Cars.findById(_id, function(err, success){
        if(success) {
            var dbCar = success;
            if (success.status === true) {
                dbCar.status = false;
                console.log('trying to BOOK...');
            } else {
                dbCar.status = true;
                console.log('trying to UNBOOK...');
            }
            Cars.findOneAndUpdate({_id:_id}, dbCar, options, callback);
        }
    });
}