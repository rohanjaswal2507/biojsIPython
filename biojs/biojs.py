import ipywidgets as widgets
import random
from traitlets import Unicode, List, Dict
from IPython.display import display


class msa(widgets.DOMWidget):
    _view_module = Unicode("nbextensions/biojs/msa_widget").tag(sync=True)
    _view_name = Unicode('msaView').tag(sync=True)
    seqs = List([]).tag(sync=True)   #Needs to be changed because seqs should be a list
    #js_seqs = List([]).tag(sync=True)
    url = Unicode('').tag(sync=True)


    def plot(self):
        print("plotting")


    def importURL(self, url):
        print("Importing from the given URL")
        self.url = url


class fasta(widgets.DOMWidget):
    _view_module = Unicode('nbextensions/biojs/fasta_widget').tag(sync=True)
    _view_name = Unicode('fastaView').tag(sync=True)
    url = Unicode('').tag(sync=True)

    def read(self, url):
        self.url = url


class cytoscapeWidget(widgets.DOMWidget):
    _view_module = Unicode('nbextensions/biojs/cytoscape_widget').tag(sync=True)
    _view_name = Unicode('cytoscapeView').tag(sync=True)
    options = Dict().tag(sync=True)
    div_id = Unicode('').tag(sync=True)


class cytoscape():
    options = {}
    widget = cytoscapeWidget()

    def __init__(self, options):
        # Done to generate a random and most probably unique div id for each instance's widget
        self.options = options
        self.widget.div_id = str(int((random.random()*100000)))
        self.widget.options = self.options
        self.init_widget()

    def init_widget(self):
        print('widget created')
        #self.widget.options = self.options

    def plot(self):
        print(self.widget.div_id)
        self.widget.options = self.options # To check if anything has changed
        display(self.widget)
