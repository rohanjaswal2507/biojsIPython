import ipywidgets as widgets
from traitlets import Unicode

class msa(widgets.DOMWidget):
    _view_module = Unicode("nbextensions/biojs/msa_widget").tag(sync=True)
    _view_name = Unicode('msaView').tag(sync=True)
    seqs = Unicode('').tag(sync=True)   #Needs to be changed because seqs should be a list
    js_seqs = Unicode('').tag(sync=True)
    url = Unicode('').tag(sync=True)

    def plot(self):
        self.js_seqs = self.seqs

    def importURL(self, url):
        print("Importing from the given URL")
        self.url = url
