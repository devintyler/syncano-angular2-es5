(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var syncanoService = require('./syncano-service.js');

// App Component
var AppComponent = ng
    .Component({
        selector: 'my-app',
        services: [syncanoService]
    })
    .View({
        template:'<h1>Syncano in Angular 2 (ES5)</h1>' +
        '<test></test>',
        directives: [Test, ng.NgFor, ng.NgIf]
    })
    .Class({
        constructor: function () {

        },

        afterContentInit: function(){

        }

    });

// SYNCANO COMPONENT
function Test() {
    // Declare Variables
    var self = this;
    this.list = [];
    this.update = new ng.EventEmitter();
    this.thing = "";

    // Load API
    var apiReq = new XMLHttpRequest();
    apiReq.addEventListener("load", reqListener);
    apiReq.open("GET", "APIKey.JSON");
    apiReq.send();
    function reqListener(e){
        syncanoService.LoadAPI(JSON.parse(this.responseText));

        // Get List Items
        syncanoService.getData()
            .then(function(res){
                for(i = 0; i < res.objects.length; i++){
                    self.list.push(res.objects[i].id);
                }
                document.getElementById('textEntry').focus();
            });
    }

    this.contentLoaded = function(){
        console.log('Content Loaded.');
    };
    this.addTodo = function(todo) {
        this.list.push(todo);
    };
    this.doneTyping = function($event) {
        if($event.which === 13) {
            this.addTodo($event.target.value);
            $event.target.value = null;
        }
    };
}

Test.annotations = [
    new ng.Component({
        selector: "test",
        changeDetection: "ON_PUSH",
        events: ["update"]
    }),
    new ng.View({
        template:
            '<ul>' +
            '<li *ng-for="#item of list">' +
            '{{ item }}' +
            '</li>' +
            '</ul>' +
            '<input id="textEntry" (focus)="contentLoaded()" #textbox (keyup)="doneTyping($event)">' +
            '<button (click)="addTodo(textbox.value)">Add Todo</button><br>' +
            '<small>Start typing to see list.</small>' +
            '<p>{{thing}}</p>',
        directives: [ng.NgFor, ng.NgIf]
    })
];


// Bootstrap for DOM
document.addEventListener('DOMContentLoaded', function () {
    ng.bootstrap(AppComponent);
});
},{"./syncano-service.js":2}],2:[function(require,module,exports){
(function() {

    SyncanoService = function(){
        this.apiObj = {};
    };

    SyncanoService.prototype = {

        LoadAPI: function(apiObj){
            this.apiObj = this.checkJSON(apiObj);
            return this.apiObj;
        },

        toArray: function(obj){
            var listItems = [];
            for (var i = 0; i < obj.objects.length; i++){
                listItems[i] = ' ' + obj.objects[i].id;
            }
            return listItems;
        },

        checkJSON: function(obj){
            var parsedObj;
            try {
                parsedObj = JSON.parse(obj);
            } catch(e) {
                return obj;
            }
            return parsedObj;
        },

        getData: function(){
            var account = new Syncano({accountKey: this.apiObj.AccountKey});

            return account.instance(this.apiObj.Instance).class(this.apiObj.Class).dataobject().list()
                .then(function(res){
                    //console.log(res);
                    return res;
                })
                .catch(function(err){
                    console.log(err);
                })
        }

    };

    module.exports = new SyncanoService;

})();
},{}]},{},[1]);
