FROM andrewosh/binder-base

USER root

RUN echo "root:root" | chpasswd
RUN echo "main:main" | chpasswd


USER main

# install demo support
RUN conda install \
    ipywidgets \


RUN /home/main/anaconda/envs/python3/bin/pip install --upgrade pip
RUN /home/main/anaconda/envs/python3/bin/pip install \



WORKDIR biojsIPython

RUN python setup.py install
RUN /home/main/anaconda/envs/python3/bin/python setup.py install

# jupyter-pip so crazy. this is cheating, as a real user wouldn't have
# the source checked out...
RUN jupyter nbextension install biojs/static/biojs --user --quiet
