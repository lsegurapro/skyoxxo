try {
  const Dotenv = require('dotenv');
  const path = require('path');
  const NestEnvConfiguration = require('./apps/src/Config/NestEnvConfiguration');
  const EnvConfiguration = require("./apps/src/Config/EnvFilePathConfiguration");
  const { ModulesContainer } = require('@nestjs/core');
  
  let envData = Dotenv.config({ path: `${path.join(process.env.PWD)}/${EnvConfiguration.envFilePathConfiguration()}` }).parsed
  let envs = NestEnvConfiguration.envModelTransformer(envData);
  module.exports = {
      ...envs.DATABASE,
      migrations: [ "apps/src/Migrations/**/*.{ts,js}" ],
      entities: [ "apps/src/Models/Entities/**/*.{ts,js}" ],
      cli: {
          entitiesDir: "apps/src/Models/Entities",
          migrationsDir: "apps/src/Migrations"
      }
  };
} catch (error) {
  module.exports = {};
}