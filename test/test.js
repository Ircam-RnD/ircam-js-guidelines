var assert = require('chai').assert;

var Greeter = require("../index.js");

describe("Greeters", function(){
    it("should greet properly", function(){
        var name = "Victor";
        var greeter = new Greeter(name);
        assert.equal(greeter.greet(), 'Hola, ¿ Qué tal ' + name + ' ?');
    });
});
