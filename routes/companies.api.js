var express = require('express');
var router = express.Router();
var data = require('../data/data.json');
let keys = data[0].keys();

/* CREATE */
router.post('/', (req, res) => {
    const company = {}
    for (const param of keys) {
        if (req.body[param]) {
            company[param] = req.body[param];
        }
    }
    companies.push(company);
    res.send(company);
})

/* RETRIEVE */
router.get('/', function (req, res, next) {
    let response = data.companies;
    let page = req.query.page || 0;

    if (req.query.page || !req.query) {
        response = response.slice(0+20*page, 19+20*page)
    }    
    if (req.query.name) {
        response = response.filter((company) => company.name === req.query.name);
    }
    if (req.query.city) {
        response = response.filter((company) => company.city === req.query.city);
    }
    if (req.query.cities) {
        response = response.filter((company) => req.query.cities.includes(company.city));
    }

    if (req.query.sortBy === "ratings") {
        if (req.query.order === "asc") {
            response = response.sort((a, b) => a.numOfRatings - b.numOfRatings);
        }
        if (req.query.order === "desc") {
            response = response.sort((a, b) => b.numOfRatings - a.numOfRatings);
        }
    }

    res.send(response);
});

/* UPDATE */
router.patch("/:id", (req, res) => {
    companies = data.map((company) => {
        if (company.id == req.params.id) {
            company.enterprise = true;
        }
        return company;
    })

    res.send(companies);
})

/* DELETE */
router.delete('/:id', function (req, res, next) {
    let response = data.companies;
    response = response.filter(company => company.id !== parseInt(req.params.id));
    res.send(response);
});

module.exports = router;
