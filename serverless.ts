import type { AWS } from '@serverless/typescript';


import { getAllMoments, createMoment, getMoment, updateMomentStatus, updateIsFeatureMoment, deleteMoment } from '@functions/moments';

const serverlessConfiguration: AWS = {
  service: 'crickslab-serverless-catalog',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    region: 'eu-central-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:eu-central-1:*:table/CatalogMomentsTable",
        }],
      },
    },
  },
  // import the function via paths
  functions: { getAllMoments, createMoment, getMoment, updateMomentStatus, updateIsFeatureMoment, deleteMoment },
  package: { individually: true },
  custom: {
    CATALOG_MOMENTS_TABLE: "CatalogMomentsTable",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 8077,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      CatalogMomentsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "CatalogMomentsTable",
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  }
};
module.exports = serverlessConfiguration;