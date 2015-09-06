'use strict';

var 
    React = require('react');

module.exports = React.createClass({
    displayName: 'DemoChild',
    render: function(){
        console.log('Console output testing source maps: (demoChild.jsx)');
        return (
            <ul>
                <li>demoChild.jsx loaded and rendered properly.</li>
                <li>demoChild appended to demoScript</li>
                <li>Much rejoicing.</li>
            </ul>
        );
    }
});
