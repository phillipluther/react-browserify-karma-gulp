'use strict';

var 
    React = require('react'),
    DemoChild = require('./demoChild.jsx');

module.exports = React.createClass({
    displayName: 'DemoScript',
    render: function(){
        console.log('Console output testing source maps: (demoScript.jsx)');
        return (
            <div>
                <h1> This is the demo script working as expected.</h1>
                <DemoChild/>
            </div>
        );
    }
});
