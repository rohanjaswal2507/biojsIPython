require.config({
    paths: {
        'fasta' : '//localhost:8000/fasta_bundle'
    },
    shim : {
        exports : 'fasta'
    }
});

define(['jquery', 'jupyter-js-widgets', 'fasta'], function($, widgets, Fasta){

    var fastaView = widgets.DOMWidgetView.extend({
        render : function(){
            console.log("Rendering");
            this.$el.text("hello from fasta. Check your console for fasta magic");

            this.parse();
            this.listenTo(this.model, 'change:url', this.parse);
        },

        parse : function(){
            var url = this.model.get('url');
            var p = Fasta.read(url);
            p.then(function(model) {
                // model is the parsed url
                console.log(model);
            }, function(err){
                console.error("err happened during downloading", err);
            });
        }
    });

    return {
        fastaView : fastaView
    }
});
