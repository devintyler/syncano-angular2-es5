var syncanoService = require('./syncano-service.js');

// App Component
var AppComponent = ng
    .Component({
        selector: 'my-app',
        services: [syncanoService]
    })
    .View({
        template:'<h1>Syncano in Angular 2 (ES5)</h1>' +
        '<syncano-component></syncano-component>',
        directives: [SyncanoComponent, ng.NgFor, ng.NgIf]
    })
    .Class({
        constructor: function () {
            // App component constructor
        },
        afterContentLoaded: function(){
            // functions for after component content loads
        }

    });

// Syncano Component
function SyncanoComponent() {
    // Declare Variables
    var self = this;
    this.list = [];

    //syncanoService.getList().then(function(res){self.list.push(res)});

    // Load API Keys -  use this method so your API isn't directly
    //                  in the code; *** not securely encoded ***
    fetch("APIKey.JSON").then(function(response) {
        return response.json();
    }).then(function(data) {
        syncanoService.loadAPI(data); // loads api into App Object
        self.getInitialData(); // local function getting/setting initial data
    }).catch(function() {
        console.log("Couldn't fetch API.");
    });

    this.getInitialData = function(){ // gets initial set of data using Syncano Service
        syncanoService.getData() // Get List Items
            .then(function(res){
                for(i = 0; i < res.objects.length; i++){ // loads each item one by one to list
                    self.list.push(res.objects[i].id);
                }
                document.getElementById('textEntry').focus(); // temporary async fix
            });
    };
    this.addItem = function(item) { // add item to list
        syncanoService.setData(item) // pushes item to Syncano
            .then(function(res){ // if successfull...
                self.addItemToList(res.title);
                self.triggerDigest();
            })
            .catch(function(err){
                console.log(err);
            });
    };
    this.addItemToList = function(itemTitle){
        self.list.push(itemTitle);
    };
    this.doneTyping = function($event) { // watches for keys when done typing
        if($event.which === 13) { // 'enter' key
            this.addItem($event.target.value);
            $event.target.value = null;
        }
    };
    this.clearBox = function(){
        document.getElementById('textEntry').value = null; // clears box after clicking 'Add'
        document.getElementById('textEntry').focus(); // resets focus
    };
    this.triggerDigest = function(){
        document.getElementById('submitButton').focus(); // async workaround
        document.getElementById('textEntry').focus(); // resets focus
    };
    this.contentLoaded = function(){ // Temporary fix for async data binding (page load)
        // nothing goes here
    };
}

SyncanoComponent.annotations = [
    new ng.Component({
        selector: "syncano-component",
        changeDetection: "ON_PUSH"
    }),
    new ng.View({
        template:
            '<ul>' +
            '<li *ng-for="#item of list">' +
            '{{ item }}' +
            '</li>' +
            '</ul>' +
            '<input id="textEntry" (focus)="contentLoaded()" #textbox (keyup)="doneTyping($event)">' +
            '<button id="submitButton" (click)="addItem(textbox.value);clearBox()">Add Item</button>',
        directives: [ng.NgFor, ng.NgIf]
    })
];


// Bootstrap for DOM
document.addEventListener('DOMContentLoaded', function () {
    ng.bootstrap(AppComponent);
});