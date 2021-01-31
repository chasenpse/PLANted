const express = require('express');
const app = express();

const userRoute = require('./routes/users');
const cropRoute = require('./routes/crops');
const instanceRoute = require('./routes/instances');

app.use('/api/users', userRoute);
app.use('/api/crops', cropRoute);
app.use('/api/instances', instanceRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
