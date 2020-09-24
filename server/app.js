require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const cors = require('cors')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})

app.use(router)

module.exports = app