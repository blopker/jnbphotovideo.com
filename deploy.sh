#!/usr/bin/env bash

yeoman build

PROJECT=jnbphotovideo
DIR="dev"

if [[ $1 = "pro" ]]; then
  DIR="production"
fi
rsync -avc dist/* gouda@blopker.com:public/$DIR/$PROJECT
