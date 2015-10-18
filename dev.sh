#!/usr/bin/env bash

#https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/
bin=$(cd `dirname $0`;pwd)
cd $bin
#For test
if [ -f gooreplacer.xpi ];then
    rm gooreplacer.xpi
fi
cfx --pkgdir="$bin/src" xpi
wget --post-file=gooreplacer.xpi http://localhost:8888
