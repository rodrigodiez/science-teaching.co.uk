#!/usr/bin/env bash

rsync -rltDvz --delete -e "ssh" dist/ darwin.rodrigodiez.io:/var/www/laura-cascos.co.uk/
