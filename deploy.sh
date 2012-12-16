#!/usr/bin/env bash

#yeoman build


DIR="dev"

if [[ $1 = "pro" ]]; then
  DIR="production"
fi

scp -r dist/* gouda@blopker.com:public/$DIR/jnbphotovideo
