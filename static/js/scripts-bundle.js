(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var 
    React = require('react');

module.exports = React.createClass({
    displayName: 'DemoChild',
    render: function(){
        console.log('Console output testing source maps: (demoChild.jsx)');
        return (
            React.createElement("ul", null, 
                React.createElement("li", null, "demoChild.jsx loaded and rendered properly."), 
                React.createElement("li", null, "demoChild appended to demoScript"), 
                React.createElement("li", null, "Much rejoicing.")
            )
        );
    }
});
},{"react":"react"}],2:[function(require,module,exports){
'use strict';

var 
    React = require('react'),
    DemoChild = require('./demoChild.jsx');

module.exports = React.createClass({
    displayName: 'DemoScript',
    render: function(){
        console.log('Console output testing source maps: (demoScript.jsx)');
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, " This is the demo script working as expected."), 
                React.createElement(DemoChild, null)
            )
        );
    }
});
},{"./demoChild.jsx":1,"react":"react"}],3:[function(require,module,exports){
var 
    React = require('react'),
    DemoScript = require('./demoScript.jsx');

React.render(React.createElement(DemoScript, null), document.body);
},{"./demoScript.jsx":2,"react":"react"}]},{},[3])


//# sourceMappingURL=scripts-bundle.js.map