
// RequireJS configuration for static assets. This configuration is only for testing during development phase.
// Javascript file here is served to the browser by running a simple HTTP server on the machine.
require.config({
    paths: {
        'msa' : '//localhost:8000/msa_bundle'
    }
});

define(['jquery', 'underscore', 'jupyter-js-widgets', 'msa'], function ($, _, widgets, msa){

  // Creating a new instance of MSA
  //var m = new msa.msa();


  var msaView = widgets.DOMWidgetView.extend({
    render : function(){
      //msaView.__super__.render.apply(this, arguments);
      console.log("Rendering the MSA Widget");
      var divID = this.model.get('div_id');
      this.$el.append("<div id='" + divID + "' position='relative'>Displaying the sequence</div>");
      _.bindAll(this, "init_viewer");

      // Wait for the element to be added to the DOM
      this.displayed.then(this.init_viewer);
    },


    //Update the view whenever seqs is changed
    init_viewer : function(){
      console.log("Updating the view");

      //Create a new instance of MSA
      if(!this.model.get('msaObject')){
        var m = new msa.msa();
        console.log("New MSA object created!");
      } else {
        var m = this.model.get('msaObject');
      }

      m.el = document.getElementById(this.model.get('div_id'));
      this.model.set('msaObject', m);

      var seqs = this.model.get('seqs');
      var url = this.model.get('url');
      console.log(url);
      if (url){
        this.importUrl(this.model.get('msaObject'));
      }


      //Some listeners
      this.listenTo(this.model, 'change:js_seqs', this.plot);

      this.listenTo(this.model, 'change:url', this.importUrl);

    },


    // Some functions

    plot : function(){
      console.log("Plotting the sequence");
      console.log(this.model.get('msaObject'));
      var m = this.model.get('msaObject');
      var msa_view = m.render();
      this.$el.append($(msa_view.el));
      this.model.set('msaObject', m);
    },

    importUrl : function(m){
      var url = this.model.get('url');
      m.u.file.importURL(url, function(err, model){
        if(!err){
          console.log("Imported from URL: " + url );
        }
      });
      this.model.set('msaObject', m); //update the model
      this.plot(m);
    }

  });

  return { msaView : msaView }
});
