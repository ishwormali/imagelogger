'use strict';
//var utils=require('../utils/utils');
var Schema=require('mongoose').Schema;
// var BaseSchema=require(__dirname);
// var mongoose=require('mongoose');

module.exports = function (mongoose) {

	var schema = new Schema({
		imageName: 				       {type:String},
		// agencyType: 		     {type:String},
		currentTime: 			     {type:Date},
		otherInfo: 			     {type:Schema.Types.Mixed}
	},{

  });
    
  	return mongoose.model('ImageLog',schema);

};