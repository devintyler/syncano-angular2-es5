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