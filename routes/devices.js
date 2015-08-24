var myrequest = require('./httprequest/httprequest');

/*
* methods to access all device related services from the BlueApp platform
*/

									// ################## DEVICES ################## //

exports.getDeviceTypes = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/devicetypes', 'GET', successHandler, errorHandler);
};

exports.addDevice = function(params, successHandler, errorHandler){
	
	var device = params;
	var tagsuccessHandler = function(tag_ids){
		device.tag_ids = tag_ids;
		myrequest.sendHttpRequests(device, '/v1/organizations/'+device.orgid+'/devices', 'POST', successHandler, errorHandler);
	};

	var tagerrorHandler = function(){
		console.error('Tags error when device add')
	};

	var tags = '';
	if(params.tags && params.tags != '' && Object.prototype.toString.call( params.tags ) === '[object Array]'){
		for(var i = 1 ; i < params.tags.length ; i++){
	        params.tags[i] = params.tags[i].charAt(0).toUpperCase()+ params.tags[i].substr(1);
	    }
		tags = params.tags;
	}else{
		tags = '';
	}
	myrequest.sendHttpRequests({tags:tags}, '/v1/tags', 'POST', tagsuccessHandler, tagerrorHandler);
};

exports.deleteDevice = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/devices/'+params.deviceid, 'DELETE', successHandler, errorHandler);
};

exports.getDevices = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/devices', 'GET', successHandler, errorHandler);
};

exports.getGateways = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/gateways', 'GET', successHandler, errorHandler);
};

exports.getPeripherals = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/peripherals', 'GET', successHandler, errorHandler);
};

exports.getDevice = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/devices/'+params.deviceid, 'GET', successHandler, errorHandler);
};

exports.updateDevice = function(params, successHandler, errorHandler){

	var device = params;
	var tagsuccessHandler = function(tag_ids){
		console.log('tag_ids', tag_ids);
		device.tag_ids = tag_ids;
		console.log('device with Ids', device);
		myrequest.sendHttpRequests(device, '/v1/organizations/'+device.orgid+'/devices/'+device.deviceid, 'PUT', successHandler, errorHandler);		
	};

	var tagerrorHandler = function(){
		console.error('Tags error when device add')
	};

	var tags = '';
	if(params.tags && params.tags != '' && Object.prototype.toString.call( params.tags ) === '[object Array]'){
		for(var i = 1 ; i < params.tags.length ; i++){
	        params.tags[i] = params.tags[i].charAt(0).toUpperCase()+ params.tags[i].substr(1);
	    }
		tags = params.tags;
	}else{
		tags = '';
	}
	myrequest.sendHttpRequests({tags:tags}, '/v1/tags', 'POST', tagsuccessHandler, tagerrorHandler);	
};

exports.getUUIDsFromDevice = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/devices/'+params.device_id+'/uuid', 'GET', successHandler, errorHandler);
};

exports.findDeviceByUUID = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/devices/'+params.uuid+'/macaddress/', 'GET', successHandler, errorHandler);
};

									// ################## TAGS ################## //

exports.getAllTags = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/organizations/'+params.orgid+'/tags', 'GET', successHandler, errorHandler);
};

exports.addTagForDevice = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests(params, '/v1/createtag/'+params.device_id, 'PUT', successHandler, errorHandler);
};

									// ################## NOTIFICATIONS ################## //

exports.getNotifications = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/notifications', 'GET', successHandler, errorHandler);
};

exports.createNotification = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests(params, '/v1/notifications', 'POST', successHandler, errorHandler);
};

exports.deleteNotification = function(params, successHandler, errorHandler){
    myrequest.sendHttpRequests('', '/v1/notifications/'+params.token+'/'+params.noti_stat, 'DELETE', successHandler, errorHandler);
};

