#!/usr/bin/env bash
# bo is awesome
yeoman build

PROJECT=jnbphotovideo
DIR="dev"

if [[ $1 = "pro" ]]; then
  DIR="production"
fi
rsync -ahvc --delete dist/* gouda@blopker.com:public/$DIR/$PROJECT
