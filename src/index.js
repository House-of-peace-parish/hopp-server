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

const postEvent = require('./routes/event/postEvent');
const fetchEvent = require('./routes/event/fetchEvent');
const editEvent = require('./routes/event/editEvent');
const deleteEvent = require('./routes/event/deleteEvent');
const logAdmin = require('./routes/admin/logAdmin');
const contactRead = require('./routes/contact/contactRead');
const welfareRead = require('./routes/welfare/welfareRead');
const volunteerRead = require('./routes/volunteer/volunteerRead');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.post('/log_admin', logAdmin)

app.post('/create_volunteer', postVolunteer)
app.get('/fetch_volunteer', fetchVolunteer)
app.put('/read_volunteer/:id', volunteerRead)

app.post('/create_request', postContact)
app.get('/fetch_request', fetchContactType)
app.put('/read_request/:id', contactRead)

app.post('/create_welfare', postWelfare)
app.get('/fetch_welfare', fetchWelfare)
app.put('/read_welfare/:id', welfareRead)

app.post('/post_event', postEvent)
app.get('/fetch_event', fetchEvent)
app.put('/edit_event/:id', editEvent)
app.delete('/delete_event/:id', deleteEvent)

connection({ app, port: process.env.PORT || 8000 });