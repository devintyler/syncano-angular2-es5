(function() {

    SyncanoService = function(){
        this.apiObj = {};
    };

    SyncanoService.prototype = {

        loadAPI: function(apiObj){ // loads API into App Object
            this.apiObj = this.checkJSON(apiObj);
        },

        toArray: function(obj){ // Puts items into an array
            var listItems = [];
            for (var i = 0; i < obj.objects.length; i++){
                listItems[i] = ' ' + obj.objects[i].id;
            }
            return listItems;
        },

        checkJSON: function(obj){ // checks if API is a JSON
            var parsedObj;
            try {
                parsedObj = JSON.parse(obj);
            } catch(e) {
                return obj;
            }
            return parsedObj;
        },

        getData: function(){ // Gets Data from Syncano
            var self = this;
            this.account = new Syncano({accountKey: this.apiObj.AccountKey});

            return this.account.instance(self.apiObj.Instance).class(self.apiObj.Class).dataobject().list()
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    console.log(err);
                });
        },

        setData: function(item){ // Sends new Item to Syncano (item is just a string)
            var account = new Syncano({accountKey: this.apiObj.AccountKey});
            var itemObj = {
                "title":item
            };

            return account.instance(this.apiObj.Instance).class(this.apiObj.Class).dataobject().add(itemObj)
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        },

        getList: function(){
            return Promise.resolve('hello');
        }

    };

    module.exports = new SyncanoService; // for Browserify

})();