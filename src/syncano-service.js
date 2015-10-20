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