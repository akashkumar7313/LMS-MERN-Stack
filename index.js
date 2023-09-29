import app from './app.js';
import databaseconnect from './config/db.js';

const PORT = process.env.PORT || 5000


app.listen(PORT, async ( ) => {

    // connect to db
    await databaseconnect();

    console.log(`App is running at http://localhost:${PORT}`);
});