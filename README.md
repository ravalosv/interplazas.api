## Versions

This app runs under Node 18.19.0

`nvm use 18.19.0`

## Initial setup

1. Modify the `.env` file to point to the database location.
2. Uncomment `eventosDB.sync(...)` in `src\core\config\mariadb.ts`.
3. Run the app. This will create the database structure.
4. Stop the app.
5. Run `npm run seed` to seed the initial database data.
6. Comment out the `eventosDB.sync(...)` code you uncommented in step 2 and save the changes.
7. Finish.
