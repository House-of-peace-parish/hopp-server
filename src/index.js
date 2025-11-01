const express = require('express');
const cors = require('cors');
const { connection } = require('./config/connection');
const morgan = require('morgan');

const postVolunteer = require('./routes/volunteer/postVolunteer');
const fetchVolunteer = require('./routes/volunteer/fetchVolunteer');

const postWelfare = require('./routes/welfare/postWelfare');
const fetchWelfare = require('./routes/welfare/fetchWelfare');

const postContact = require('./routes/contact/postContact');
const fetchContactType = require('./routes/contact/fetchContactType');



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.post('/create_volunteer', postVolunteer)
app.get('/fetch_volunteer', fetchVolunteer)

app.post('/create_request', postContact)
app.get('/fetch_request/:reqType', fetchContactType)

app.post('/create_welfare', postWelfare)
app.get('/fetch_welfare', fetchWelfare)

connection({ app, port: process.env.PORT || 8000 });