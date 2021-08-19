#!/bin/bash

# In current folder
pwd

# "install `canary-run`"
npm i -g @sixleaveakkm/aws-synthetics-local@latest

# install devDependencies
npm i

# run
canary-run index.handler
