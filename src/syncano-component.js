var Test = (function() {
    // SYNCANO COMPONENT
    Test.annotations = [
        new ng.Component({
            selector: "test"
        }),
        new ng.View({
            template:
            '<ul>' +
            '<li *ng-for="#todo of todos">' +
            '{{ todo }}' +
            '</li>' +
            '</ul>' +
            '<input #textbox (keyup)="doneTyping($event)">' +
            '<button (click)="addTodo(textbox.value);">Add Todo</button>',
            directives: [ng.NgFor, ng.NgIf]
        })
    ];

    function Test() {
        this.todos = ["Eat Breakfast", "Walk Dog", "Breathe"];
        this.addTodo = function(todo) {
            this.todos.push(todo);
        };
        this.doneTyping = function($event) {
            if($event.which === 13) {
                this.addTodo($event.target.value);
                $event.target.value = null;
            }
        }
    }

    return Test;

})();

exports.Test = Test;