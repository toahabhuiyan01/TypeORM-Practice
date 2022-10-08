# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

Steps to migration:
1. Run `npm run generate ./src/migration/{migration_name}` to create a migration.
2. Run `npm run run-mig` to run the migration.
