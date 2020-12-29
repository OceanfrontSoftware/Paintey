
// layers object contains properties for each layer
var _layers = {};

var drawingHistory = {

    "a": "test",
    // adds to the drawingHistory of a layer
    "add": function(layerId, data){
        // layer is an array property on the _layers object, eg _layers.layer0 = [];
        var layer = _layers["layer" + layerId];

        // if the layer doesn't exist create it
        if(layer == null){
            _layers["layer" + layerId] = [];
            layer = _layers["layer" + layerId];
        }
            
        // add the data to the layer object
        layer.push(data);
    }, 
    // gets the drawingHistory for a layer
    "get": function(layerId){
        return _layers["layer" + layerId];
    },
    // gets data from all layers as a single array
    "getAll": function(){
        var result = [];
        for(var p in _layers){
            var layer = _layers[p];
            result.push(layer);
        }
        return result;
    },
    // removes a layer
    "remove": function(layerId){
        _layers["layer" + layerId] = [];
    },
    // clears all layers
    "reset": function(){
        _layers = {};
    },
    // test out the feature
    "test": function(){
        // reset before testing
        _layers = {};
        var message = "";

        // test #1 - add an object to layer 0
        var layerId = 0;
        var a = {"layer": layerId, "value": "a"};
        drawingHistory.add(layerId, a);
        var b = {"layer": layerId, "value": "b"};
        drawingHistory.add(layerId, b);
        
        
        var layer = drawingHistory.get(layerId);
        // layer length test
        if(layer.length != 2)
            message += "layer test failed test layer.length \r\n";
        // layer value test
        if(layer[0].value != "a" || layer[1].value != "b")
            message += "layer test failed test layer.values \r\n";
        

        return message;
    }




}


var drawingHistoryTest = drawingHistory.test();
console.log("drawingHistory test messages: " + drawingHistoryTest);