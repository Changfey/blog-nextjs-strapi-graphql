module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env(
        "DATABASE_HOST",
        "strapi-database-0924.cukwk65vlm3s.ap-southeast-2.rds.amazonaws.com"
      ),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi-database-0924"),
      user: env("DATABASE_USERNAME", "strapi_db_psql"),
      password: env("DATABASE_PASSWORD", "Gmail0511~!"),
    },
    useNullAsDefault: true,
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
