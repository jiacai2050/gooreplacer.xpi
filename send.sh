#!/usr/bin/env bash

#https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/
#For test
if [ -f gooreplacer.xpi ];then
    rm gooreplacer.xpi
fi
cfx xpi
wget --post-file=gooreplacer.xpi http://localhost:8888
