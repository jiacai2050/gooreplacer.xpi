#!/usr/bin/env bash

#https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/
bin=$(cd `dirname $0`;pwd)
cd $bin
#For test
if [ -f gooreplacer.xpi ];then
    rm gooreplacer.xpi
fi
cd src
jpm watchpost --post-url http://localhost:8888/
