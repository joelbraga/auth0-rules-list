'use strict';

var request = require('request');
var express = require('express');
var auth0Config = require('../config/auth0.config');
var router = express.Router();

function helper(data){
    var _data = {
        All: []
    };
    var regex = /context.clientName *={3} *('|")[A-Za-z0-9]+/g;
    var regexReplace = /context.clientName *={3} *('|")/g;

    var sortedData = data.sort(function(a, b) {
        var x = a['order']; var y = b['order'];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    sortedData.forEach(function(elm){
        var match = elm.script.match(regex);
        if(match !== null){
            var app = match[0].replace(regexReplace, '');
            if(_data[app]){
                _data[app].push(elm);
            }
            else {
                _data[app] = [elm];
            }
        }
        else {
            _data.All.push(elm);
        }
    });
    return _data;
}

router.get('/list', function (req, res) {
    request
        .get('https://'+auth0Config.domain+'/api/v2/rules', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try{
                    var object = JSON.parse(body);

                    if(object instanceof Array){
                        return res.status(200).send(helper(object));
                    }
                    return res.status(500).send('[Code 1] Error getting rules');
                }
                catch (e){
                    return res.status(500).send('[Code 2] Error getting rules');
                }
            }
            return res.status(500).send('[Code 3] Error getting rules');
        })
        //TODO Generate Rules Token Dynamically
        .auth(null, null, true, auth0Config.rulesToken);
});

module.exports = router;