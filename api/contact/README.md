# Vogue Expo Contact Form API

This is a serverless API endpoint for handling contact form submissions on vegasvogueexpo.com.

## Setup Instructions

1. Create an AWS account if you don't have one
2. Install AWS CLI and configure it with your credentials
3. Set up Amazon SES:
   - Verify your domain in SES
   - Verify your email address
   - Request production access if needed (to send to non-verified emails)

4. Create a new Lambda function:
   ```bash
   cd api/contact
   npm install
   zip -r function.zip .
   aws lambda create-function \
     --function-name vogue-expo-contact \
     --runtime nodejs18.x \
     --handler index.handler \
     --zip-file fileb://function.zip \
     --role arn:aws:iam::[YOUR-ACCOUNT-ID]:role/[YOUR-LAMBDA-ROLE]
   ```

5. Create API Gateway:
   - Create a new REST API
   - Create a POST method and integrate it with your Lambda function
   - Enable CORS
   - Deploy the API to a stage (e.g., 'prod')

6. Update the frontend:
   - Update the API endpoint URL in main.js to match your API Gateway URL

## Environment Variables

Set these in your Lambda function:
- `AWS_REGION`: Your AWS region (e.g., us-west-2)
- `CORS_ORIGIN`: https://vegasvogueexpo.com

## Required IAM Permissions

The Lambda function needs these permissions:
- `ses:SendEmail`
- `ses:SendRawEmail`

Example policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
```

## Testing

Test the API with curl:
```bash
curl -X POST https://[YOUR-API-ID].execute-api.[REGION].amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","company":"Test Co","interest":"custom","message":"Test message"}'
```
