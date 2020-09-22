#!/bin/bash

# In current folder
pwd

# "install `canary-run`"
npm i -g @sixleaveakkm/aws-synthetics-logger-local@0.2.0

# install devDependencies
npm i

# run
canary-run index.handler
