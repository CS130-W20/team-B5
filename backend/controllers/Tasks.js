'use strict';

var utils = require('../utils/writer.js');
var Tasks = require('../service/TasksService');

module.exports.createTask = function createTask (req, res, next) {
  var session_token = req.swagger.params['session_token'].value;
  var data = req.swagger.params['data'].value;
  var type = req.swagger.params['type'].value;
  var model = req.swagger.params['model'].value;
  Tasks.createTask(session_token,data,type,model)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteTask = function deleteTask (req, res, next) {
  var task_id = req.swagger.params['task_id'].value;
  var session_token = req.swagger.params['session_token'].value;
  Tasks.deleteTask(task_id,session_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTask = function getTask (req, res, next) {
  var session_token = req.swagger.params['session_token'].value;
  Tasks.getTask(session_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.stopTask = function stopTask (req, res, next) {
  var task_id = req.swagger.params['task_id'].value;
  var session_token = req.swagger.params['session_token'].value;
  Tasks.stopTask(task_id,session_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
