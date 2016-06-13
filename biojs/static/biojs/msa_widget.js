
// RequireJS configuration for static assets. This configuration is only for testing during development phase.
// Javascript file here is served to the browser by running a simple HTTP server on the machine.
require.config({
    paths: {
        'msa' : '//localhost:8000/msa_bundle'
    }
});

define(['jquery', 'jupyter-js-widgets', 'msa'], function ($, widgets, msa){

  // Creating a new instance of MSA
  var m = new msa.msa();

  var msaView = widgets.DOMWidgetView.extend({
    render : function(){
      //msaView.__super__.render.apply(this, arguments);
      console.log("Rendering the MSA Widget");
      this.$el.append("<div id='msaDiv'>Displaying the sequence</div>");
      _.bindAll(this, "init_viewer");

      // Wait for the element to be added to the DOM
      this.displayed.then(this.init_viewer);
      this.plot();
    },


    //Update the view whenever seqs is changed
    init_viewer : function(){
      console.log("Updating the view");

      //check if MSA object is created
      if (!m){
        var m = new msa.msa();
      } else {
        console.warn("Could not create an instance of MSA");
      }
      m.el = document.getElementById('msaDiv');

      var seqs = this.model.get('js_seqs');

      //Some listeners
      this.listenTo(this.model, 'change:js_seqs', this.plot);

      this.listenTo(this.model, 'change:url', this.importUrl);

    },


    // Some functions

    plot : function(){
      console.log("Plotting the sequence");
      var msa_view = m.render();
      this.$el.append($(msa_view.el));
    },

    importUrl : function(){
      var url = this.model.get('url');
      m.u.file.importURL(url, function(err, model){
        if(!err){
          console.log("Imported from URL: " + url );
        }
      });
      this.plot();
    }

  });

  return { msaView : msaView }
});
