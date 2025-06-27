# TMF632 Party Management API

A RESTful API for managing individual and organization party data following TMF632 specifications.

## Environment Variables

Set the following environment variables in your deployment platform:

- `MONGO_URI` - MongoDB connection string
- `NODE_ENV` - Set to 'production' for production deployment
- `PORT` - Port number (Render will set this automatically)

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /` - API information
- `/tmf-api/party/v5/individual` - Individual party management
- `/tmf-api/party/v5/organization` - Organization party management

## Deployment

This API is configured to run on Render.com with automatic deployment from GitHub.
