#!/usr/bin/env bash

rsync -rltDvz --delete -e "ssh" dist/ 5.56.60.253:/var/www/laura-cascos.co.uk/
