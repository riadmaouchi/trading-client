require('../../public/assets/styles/loading.scss');
require('../../public/assets/styles/custom.scss');
var $ = require('jquery');

$(function() {
  $('#root').html(
    ' <div id="loading"> \
                      <div id="heading"><h4>Trading System</h4></div> \
                      <div class="spinner"> \
                        <div class="rect1"></div> \
                        <div class="rect2"></div> \
                        <div class="rect3"></div> \
                        <div class="rect4"></div> \
                      </div> \
                      <div id="js"></div>\
                   </div>'
  );

  $('#js').text('loading ...');

  require.ensure(
    ['./index'],
    function(require) {
      let Main = require('./index').default;
      const React = require('react');
      const render = require('react-dom').render;
      render(<Main />, document.getElementById('root'));
    },
    null,
    'index'
  );
});
