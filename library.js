"use strict";

var removeMd = require('remove-markdown-and-html');
var async = require('async');
var plugin = {};

//plugins.fireHook('filter:topic.create', { topic: topicData, data: data }, next);
//function (data, next) {
//	topicData = data.topic;
//	db.setObject('topic:' + topicData.tid, topicData, next);
//},
plugin.topicCreate = function(data, callback) {
	async.waterfall([
		function (next) {
			var excerpt = "";
			if(data.data.content){
				excerpt = getExcerpt(data.data.content);
			}
			data.topic.excerpt = excerpt;
			next(null, {topic:data.topic});
		},
	], callback);
};

//plugins.fireHook('filter:topic.edit', { req: data.req, topic: topicData, data: data }, next);
//function (results, next) {
//	db.setObject('topic:' + tid, results.topic, next);
//},
plugin.topicEdit = function(data, callback) {
	async.waterfall([
		function (next) {
			var excerpt = "";
			if(data.data.content){
				excerpt = getExcerpt(data.data.content);
			}
			data.topic.excerpt = excerpt;
			next(null, {topic:data.topic});
		},
	], callback);
};

function getExcerpt(content){
	var excerpt = "";
	var plainText = removeMd(content);
	plainText = plainText.replace(/\ +/g, ""); //去掉空格
	plainText = plainText.replace(/[ ]/g, "");    //去掉空格
	plainText = plainText.replace(/[\r\n]/g, ""); //去掉回车换行
	if(plainText.length<=100){
		excerpt = plainText;
	}else{
		excerpt = plainText.substring(0,99)+"...";
	}
	return excerpt;
}

module.exports = plugin;