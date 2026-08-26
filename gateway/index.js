const express = require('express');
const { PORT } = require('./src/config');
const expressApp = require('./src/express-app');

const StartServer = async () => {
    const app = express();
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`API Gateway is listening to Port ${PORT}`);
    });
}

StartServer();
