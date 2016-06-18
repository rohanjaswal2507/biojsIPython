// RequireJS configuration for static assets. This configuration is only for testing during development phase.
// Javascript file here is served to the browser by running a simple HTTP server on the machine.
require.config({
    paths: {
        'biojs-vis-sequence' : '//localhost:8000/sequence_bundle'
    }
});

define(['jquery', 'underscore', 'jupyter-js-widgets', 'biojs-vis-sequence'],
function($, _, widgets, sequence){

  var seqView = widgets.DOMWidgetView.extend({
    render : function(){
      console.log("Rendering the seq widget");
      var divID = this.model.get('div_id');
      this.$el.append("<div id='" + divID + "'></div>");
      _.bindAll(this, "init_viewer");
      this.displayed.then(this.init_viewer);
    },

    init_viewer : function(){
      var datasequence = this.model.get('sequence');
      var target = this.model.get('div_id');
      var format = this.model.get('format');
      var annotations = this.model.get('annotations');
      var highlights = this.model.get('highlights');

      var options = {
        sequence : datasequence,
        target : target,
        format : format,
        formatOptions : {
          title:false,
          footer:false
        },
        annotations : annotations,
        highlights : highlights
      };

      //create a new instance
      var mySequence = new Sequence(options);

    }
  });

  return {
    seqView : seqView
  }
});
