import ipywidgets as widgets
import random
from traitlets import Unicode, List, Dict
from IPython.display import display


class msaWidget(widgets.DOMWidget):
    _view_module = Unicode("nbextensions/biojs/msa_widget").tag(sync=True)
    _view_name = Unicode('msaView').tag(sync=True)
    div_id = Unicode('').tag(sync=True)
    seqs = List([]).tag(sync=True)
    #js_seqs = List([]).tag(sync=True)
    url = Unicode('').tag(sync=True)



    def importURL(self, url):
        print("Importing from the given URL")
        self.url = url

class msa():
    seqs = []
    url = ''

    def __init__(self):
        self.widget = msaWidget()
        self.widget.div_id = str(int((random.random()*100000)/10))

    def plot(self):
        display(self.widget)

    def importURL(self, url):
        self.url = url
        self.widget.url = url


# Fasta Section

class fasta(widgets.DOMWidget):
    _view_module = Unicode('nbextensions/biojs/fasta_widget').tag(sync=True)
    _view_name = Unicode('fastaView').tag(sync=True)
    url = Unicode('').tag(sync=True)

    def read(self, url):
        self.url = url


# cytoscape Section

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
        self.widget.options = self.options

    def plot(self):
        self.widget.options = self.options # To check if anything has changed
        display(self.widget)
