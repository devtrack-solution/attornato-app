#!/bin/bash

export AWS_PROFILE=attornato
export REPOSITORY=s3://attornato-app-client-repository
export DISTRIBUTION=E140W0IJS8BQ2O

# Validação e limpeza
aws s3 ls $REPOSITORY --profile $AWS_PROFILE
aws s3 rm $REPOSITORY --recursive --profile $AWS_PROFILE

# Envio correto do build
aws s3 sync ./dist/diamond-ng $REPOSITORY --profile $AWS_PROFILE

# Corrige Content-Type de arquivos JS
aws s3 sync ./dist/diamond-ng $REPOSITORY --exclude "*" --include "*.js" --content-type "application/javascript" --profile $AWS_PROFILE

# Invalidação do cache do CloudFront
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION --paths "/*" --profile $AWS_PROFILE
