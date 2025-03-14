const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); 
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/books', bookRoutes);

db.sequelize.sync().then(() => {
    console.log('Database connected.');
    app.listen(3000, () => console.log('Server running on port 3000'));
});