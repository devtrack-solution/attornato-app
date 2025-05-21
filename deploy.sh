#!/bin/bash

export AWS_DEFAULT_PROFILE=attornato
export AWS_PROFILE=attornato
export AWS_S3_REPOSITORY=s3://attornato-site-client-repository

aws s3 ls $AWS_S3_REPOSITORY --profile $AWS_PROFILE

aws s3 rm $AWS_S3_REPOSITORY --recursive --profile $AWS_PROFILE

aws s3 sync ./dist $AWS_S3_REPOSITORY --profile $AWS_PROFILE

aws cloudfront create-invalidation --distribution-id E17W96AC4K1K51 --paths "/*" --profile $AWS_PROFILE
