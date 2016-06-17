#BioJS-IPython

This repository is a collection of various IPython widgets which are developed to enable the use of various BioJS Components in Jupyter notebook.
So far, we have three very popular BioJS Components which are:
* MSA
* cytoscape.js
* biojs-io-fasta

##Installation

To use these widgets on your jupyter notebook, run this command on the root directory of this project.

`sudo pip install .`

For installing the javascript counterpart of the application, run:

`jupyter nbextension install biojs/static/ --user`

####Note:
Since, this project is in development phase, I use a simple HTTP Server to serve the Javascript extensions. To do that, you need to run a HTTP Server in the `biojs/static/biojs` directory. SimpleHTTPServer module of Python can be used to do that.
`Python -m SimpleHTTPServer`


More BioJS components will be added soon to this collection. Any kind of suggestions and contributions are welcome.
