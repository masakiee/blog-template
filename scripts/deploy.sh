#! /bin/bash

# show error message and exit 1 if `aws` command is not found
if ! command -v aws &> /dev/null
then
    echo "aws command not found. Install awscli to use this script."
    exit 1
fi

# Build
npm run build

# Sync the blog to the server
aws s3 sync ./build/ s3://<BUCKET_NAME>/ --region ap-northeast-1 --delete

# Invalidate the CloudFront cache
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*" --region ap-northeast-1
