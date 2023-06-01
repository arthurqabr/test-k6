#!/bin/bash

# Localize todos os arquivos de teste e execute-os um por um
for file in $(find scripts -name '*.js'); do
  k6 run "$file"
done
