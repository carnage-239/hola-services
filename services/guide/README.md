# Template for AWS Serverless Projects

A Serverless starter template that adds TypeScript, serverless-offline, linting, environment variables, and unit test support.

This template uses the [serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle) plugin and the [serverless-offline](https://github.com/dherault/serverless-offline) plugin. It supports:

- **Generating optimized Lambda packages with Webpack**
- **Run API Gateway locally**
  - Use `serverless offline start`
- **Support for unit tests**
  - Run `npm test` to run your tests
- **Sourcemaps for proper error messages**
  - Error message show the correct line numbers
  - Works in production with CloudWatch
- **Lint your code with ESLint**
- **Add environment variables for your stages**
- **No need to manage Webpack or Babel configs**
