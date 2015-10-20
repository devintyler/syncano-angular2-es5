var syncanoService = require('./syncano-service.js');

// App Component
var AppComponent = ng
    .Component({
        selector: 'my-app',
        changeDetection: 'ON_PUSH',
        services: [syncanoService]
    })
    .View({
        template:'<h1>Syncano in Angular 2 (ES5)</h1>' +
        '<test></test>',
        directives: [Test, ng.NgFor, ng.NgIf]
    })
    .Class({
        constructor: function () {

        }

    });

// SYNCANO COMPONENT
function Test() {
    // Declare Variables
    this.list = [];
    var self = this;

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
            });
    }

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
        selector: "test"
    }),
    new ng.View({
        template:
            '<ul>' +
            '<li *ng-for="#item of list">' +
            '{{ item }}' +
            '</li>' +
            '</ul>' +
            '<input id="textEntry" #textbox (keyup)="doneTyping($event)">' +
            '<button (click)="addTodo(textbox.value)">Add Todo</button><br>' +
            '<small>Start typing to see list.</small>',
        directives: [ng.NgFor, ng.NgIf]
    })
];


// Bootstrap for DOM
document.addEventListener('DOMContentLoaded', function () {
    ng.bootstrap(AppComponent);
});