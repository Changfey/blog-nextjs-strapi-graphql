module.exports = ({ env }) => {
  const environment = env("NODE_ENV", "local");
  const globalConfig = {
    scheduler: {
      enabled: true,
      config: {
        model: "scheduler",
      },
    },
    graphql: {
      config: {
        endpoint: "/graphql",
        shadowCRUD: true,
        playgroundAlways: true,
        depthLimit: 20,
        amountLimit: 100,
        apolloServer: {
          introspection: true,
          tracing: false,
        },
      },
    },
    "import-export-entries": {
      enabled: true,
    },
  };

  if (environment === "production") {
    return {
      ...globalConfig,
      upload: {
        config: {
          provider: "aws-s3",
          providerOptions: {
            s3Options: {
              accessKeyId: env("AWS_ACCESS_KEY_ID"),
              secretAccessKey: env("AWS_ACCESS_SECRET"),
              region: env("AWS_REGION"),
              params: {
                Bucket: env("AWS_BUCKET_NAME"),
              },
            },
          },
          // These parameters could solve issues with ACL public-read access — see [this issue](https://github.com/strapi/strapi/issues/5868) for details
          actionOptions: {
            upload: {
              ACL: null,
            },
            uploadStream: {
              ACL: null,
            },
          },
        },
      },
    };
  } else {
    return globalConfig;
  }
};
