require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { permDeal } = require('./models/permDeals');
var { contractDeal } = require('./models/contractDeals');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.post('/contractDeal', authenticate, (req, res) => {
    var deal = new contractDeal({
        name: req.body.name,
        client: req.body.client,
        recruiter: req.body.recruiter,
        sales: req.body.sales,
        payRate: req.body.payRate,
        billRate: req.body.billRate,
        startDate: req.body.startDate,
        isActive: req.body.isActive,
        _creator: req.body._creator
    });
    deal.save().then((doc) => {
        console.log('doc', doc);
        res.status(200).send(doc);
    }, (e) => {
        console.log('eror', e);
        res.status(400).send('eror in post');
    });
});

app.post('/permDeal', authenticate, (req, res) => {
    var deal = new permDeal({
        name: req.body.name,
        client: req.body.client,
        recruiter: req.body.recruiter,
        sales: req.body.sales,
        salary: req.body.salary,
        fee: req.body.fee,
        startDate: req.body.startDate,
        isActive: req.body.isActive,
        _creator: req.body._creator
    });
    deal.save().then((doc) => {
        console.log('doc', doc);
        res.status(200).send(doc);
    }, (e) => {
        console.log('eror', e);
        res.status(400).send('eror in post');
    });
});


//get deals from logged in user
app.get('/deals', authenticate, (req, res) => {
    Deal.find({
        _creator: req.user._id
    }).then((deals) => {
        res.send({ deals });
    }, (e) => {
        res.status(400).send(e);
    })
});

//GET one specific deal
app.get('/deals/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Deal.findOne({
        _id: id,
        _creator: req.user._id
    }).then((deal) => {
        if (deal) {
            res.send({ deal });
        } else {
            return res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    })
});

// DELETE deal by ID
app.delete('/deals/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Deal.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((deal) => {
        if (!deal) {
            return res.status(404).send();
        } else {
            res.send({ deal });
        }
    }).catch((e) => {
        res.status(400).send();
    })
});

//PATCH update deal
app.patch('/deals/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Deal.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((deal) => {
        if (!deal) {
            return res.status(404).send();
        }
        res.send({ deal });
    }).catch((e) => {
        res.status(400).send();
    })

});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'isAdmin']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        console.log('user', user);
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log('error', e);
        res.status(400).send(e);
    })
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'isAdmin']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            console.log('jason walkow user', user);
            res.status(200).send(user);
            //  res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started express server on port ${port}`);
});

module.exports = { app };