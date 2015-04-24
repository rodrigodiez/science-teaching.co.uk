#!/usr/bin/env bash

rsync -rltDvz --delete -e "ssh" main-template/* darwin.rodrigodiez.io:/var/www/www.science-teaching.co.uk/laura-cascos
