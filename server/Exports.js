
var Autorisation = require('Controllers/ControllerAutorisation');
var UserInfo = require('Controllers/ControllerUserInfo');
var Search = require('Controllers/ControllerSearch');
var TopArray = require('Controllers/ControllerTopArray');
var SideBar = require('Controllers/ControllerSideBar');

var Memory = require('StorePair/Memory');

global.core = {};

// регистрация Store
global.core.stores = [];
global.core.stores['session'] = new Memory();

// регистрация контроллеров
global.core.controllers = [];
global.core.controllers['autorisation'] = new Autorisation();
global.core.controllers['user_info'] = new UserInfo();
global.core.controllers['search'] = new Search();
global.core.controllers['top_array'] = new TopArray();
global.core.controllers['sidebar'] = new SideBar();

// сопоставление контроллеров и Store
global.core.entity = [];
global.core.entity['autorisation'] = 'session'; 
global.core.entity['user_info'] = 'session';

global.core.GetStore = function (name){
    return global.core.stores[global.core.entity[name]];
}
module.exports = global.core;