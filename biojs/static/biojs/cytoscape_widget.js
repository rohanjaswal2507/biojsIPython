// RequireJS configuration for static assets. This configuration is only for testing during development phase.
// Javascript file here is served to the browser by running a simple HTTP server on the machine.
require.config({
    paths: {
        'cytoscape' : '//cytoscape.github.io/cytoscape.js/api/cytoscape.js-latest/cytoscape.min'
    }
});

define(['jquery', 'underscore', 'jupyter-js-widgets', 'cytoscape'],
function($, _, widgets, cytoscape){

  var cytoscapeView = widgets.DOMWidgetView.extend({
    render : function(){
      console.log("Rendering the cytoscape widget 2");
      var divID = this.model.get('div_id');
      this.$el.append("<div id='" + divID + "'></div>");
      _.bindAll(this, "init_viewer");

      // Wait for the element to be added to the DOM
      this.displayed.then(this.init_viewer);
    },

    init_viewer : function(){
      var viewerDiv = document.getElementById(String(this.model.get('div_id')));
      viewerDiv.style.left = 0;
      viewerDiv.style.top = 0;
      viewerDiv.style.width = "700px";
      viewerDiv.style.height = "600px";
      viewerDiv.style.position = "relative";

      // collect and organise data from the model.
      var options = this.model.get('options');
      options.container = viewerDiv;
      options.ready = function(){
        console.log('rendering finished.');
      };
      var cytoObject = cytoscape(options);
      cytoObject.on('tap', 'node', function(){
        var nodes = this;
        var tapped = nodes;
        var food = [];

        nodes.addClass('eater');

        for(;;){
          var connectedEdges = nodes.connectedEdges(function(){
            return !this.target().anySame( nodes );
          });

          var connectedNodes = connectedEdges.targets();

          Array.prototype.push.apply( food, connectedNodes );

          nodes = connectedNodes;

          if( nodes.empty() ){ break; }
        }

        var delay = 0;
        var duration = 500;
        for( var i = food.length - 1; i >= 0; i-- ){ (function(){
          var thisFood = food[i];
          var eater = thisFood.connectedEdges(function(){
            return this.target().same(thisFood);
          }).source();

          thisFood.delay( delay, function(){
            eater.addClass('eating');
          } ).animate({
            position: eater.position(),
            css: {
              'width': 10,
              'height': 10,
              'border-width': 0,
              'opacity': 0
            }
          },
          {
            duration: duration,
            complete: function(){
              thisFood.remove();
            }
          });

          delay += duration;
        })();
      } // for

      });
      console.log("finish");
      //this.update(cytoObject);
    },

    update : function(cytoObject){
      var result = cytoObject.on('tap', 'node', function(){
        var nodes = this;
        var tapped = nodes;
        var food = [];

        nodes.addClass('eater');

        for(;;){
          var connectedEdges = nodes.connectedEdges(function(){
            return !this.target().anySame( nodes );
          });

          var connectedNodes = connectedEdges.targets();

          Array.prototype.push.apply( food, connectedNodes );

          nodes = connectedNodes;

          if( nodes.empty() ){ break; }
        }

        var delay = 0;
        var duration = 500;
        for( var i = food.length - 1; i >= 0; i-- ){ (function(){
          var thisFood = food[i];
          var eater = thisFood.connectedEdges(function(){
            return this.target().same(thisFood);
          }).source();

          thisFood.delay( delay, function(){
            eater.addClass('eating');
          } ).animate({
            position: eater.position(),
            css: {
              'width': 10,
              'height': 10,
              'border-width': 0,
              'opacity': 0
            }
          },
          {
            duration: duration,
            complete: function(){
              thisFood.remove();
            }
          });

          delay += duration;
        })();
      } // for

      });
      console.log(result);
    }

  });

  return {
    cytoscapeView : cytoscapeView
  }
});
