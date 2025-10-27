const express = require('express');
const cors = require('cors');
const { connection } = require('./config/connection');
const morgan = require('morgan');

const postSubscriber = require('./routes/subscriber/postSubscriber');
const fetchSubscribers = require('./routes/subscriber/fetchSubscribers');

const postWelfare = require('./routes/welfare/postWelfare');
const fetchWelfare = require('./routes/welfare/fetchWelfare');

const postContact = require('./routes/contact/postContact');
const fetchContactType = require('./routes/contact/fetchContactType');



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.post('/create_subscriber', postSubscriber)
app.get('/fetch_subscriber', fetchSubscribers)

app.post('/create_request', postContact)
app.get('/fetch_request/:reqType', fetchContactType)

app.post('/create_welfare', postWelfare)
app.get('/fetch_welfare', fetchWelfare)

connection({ app, port: process.env.PORT || 8000 });