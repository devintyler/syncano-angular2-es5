// Main JS
var AppComponent = ng
    .Component({
        selector: 'my-app',
        changeDetection: 'ON_PUSH'
    })
    .View({
        template:'<h1>My First Angular 2 App</h1>' +
            '<p id="things">{{thing | async}}</p>' +
            '<display></display>',
        directives: [DisplayComponent]
    })
    .Class({
        constructor: function () {
            this.thing = (function action(){
                return account.instance('bitter-bush-5094').class('file').dataobject().list()
                    .then(function(res){
                        console.log(res);
                        items = toArray(res);
                        return Promise.resolve(items);
                    })
                    .catch(function(err){
                        console.log(err);
                        return false;
                    });
            })();
        }

    });

// Global Variables
var account = new Syncano({accountKey: "239c4fce89830a70229b598f03dbc61e91409bac"});

// Content Component
function DisplayComponent() {
    var self = this;
    this.myName = "Alice";
    this.names = ["Aarav", "Martín", "Shannon", "Ariana", "Kai"];
    this.list = [];
}

DisplayComponent.annotations = [
    new ng.ComponentAnnotation({
        selector: "display",
        changeDetection: 'ON_PUSH'
    }),
    new ng.ViewAnnotation({
        templateUrl: 'content.html',
        directives: [ng.NgFor, ng.NgIf]
    })
];

function itemList() {
    return account.instance('bitter-bush-5094').class('file').dataobject().list()
        .then(function(res){
            console.log(res);
            items = toArray(res);
            return items;
        })
        .catch(function(err){
            console.log(err);
            return false;
        });
}

function toArray(itemObj) {
    var listItems = [];
    for (i = 0; i < itemObj.objects.length; i++){
        listItems[i] = ' ' + itemObj.objects[i].id;
    }
    return listItems;
}

// Bootstrap for DOM
document.addEventListener('DOMContentLoaded', function () {
    ng.bootstrap(AppComponent);
});