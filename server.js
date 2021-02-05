const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/users');
const cropRoute = require('./routes/crops');
const instanceRoute = require('./routes/instances');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/crops', cropRoute);
app.use('/api/instances', instanceRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
