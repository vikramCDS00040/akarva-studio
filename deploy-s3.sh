#!/bin/bash

# Build the static site
npm run build

# Upload to S3 bucket (replace YOUR_BUCKET_NAME with your actual bucket)
aws s3 sync out/ s3://YOUR_BUCKET_NAME --delete

# Set up website configuration
aws s3 website s3://YOUR_BUCKET_NAME --index-document index.html --error-document 404.html

echo "Deployment complete!"
echo "Your website should be available at: http://YOUR_BUCKET_NAME.s3-website-REGION.amazonaws.com"
