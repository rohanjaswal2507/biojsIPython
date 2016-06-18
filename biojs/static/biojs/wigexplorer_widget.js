// RequireJS configuration for static assets. This configuration is only for testing during development phase.
// Javascript file here is served to the browser by running a simple HTTP server on the machine.
require.config({
    paths: {
        'wig-explorer' : '//localhost:8000/wigexplorer_bundle'
    }
});

define(['jquery', 'underscore', 'jupyter-js-widgets', 'wig-explorer'],
function($, _, widgets, wigExplorer){

  var wigExplorerView = widgets.DOMWidgetView.extend({
    render : function (){
      console.log("Rendering wig-explorer widget");
      var divID = this.model.get('div_id');
      this.$el.append("<div id='" + divID + "'>Displaying the Data</div>");
      _.bindAll(this, 'init_viewer');
      this.displayed.then(this.init_viewer);
    },

    init_viewer : function(){
      if(this.model.get('wigExplorerObject')){
        var m = this.model.get('wigExplorerObject');
      } else {
        console.log("Creating a new instance of wig explorer");
        var options = this.model.get('options');
        options.target = this.model.get('div_id');
        this.model.set('options', options);
        var m = new wigExplorer(this.model.get('options'));
        this.model.set('wigExplorerObject', m);
      }
    }
  });

  return {
    wigExplorerView : wigExplorerView
  }
});
