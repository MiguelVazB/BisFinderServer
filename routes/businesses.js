import express from "express"
import * as dotenv from 'dotenv'
import axios from "axios"

dotenv.config()

const businessRouter = express.Router()

const apiKey = process.env.API_KEY

businessRouter.get("/bis/:id", (req, res) => {
    let businessId = req.params.id.trim("")
    let numberOfBusinesses = 3
    
    const options = {
        method: 'GET',
        url: `https://api.yelp.com/v3/businesses/${businessId}/reviews?limit=${numberOfBusinesses}&sort_by=yelp_sort`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      };
      
    axios.request(options)
    .then(function (response) {
        res.json(response.data)
    })
    .catch(function (error) {
        console.error(error);
    });
})

businessRouter.get("/:cityName", (req, res) => {
    let city = req.params.cityName.trim("")
    let numberOfBusinesses = 10
    
    const options = {
        method: 'GET',
        url: `https://api.yelp.com/v3/businesses/search?location=${city}&sort_by=best_match&limit=${numberOfBusinesses}`,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    };

    axios.request(options)
    .then(function (response) {
        res.json(response.data)
    })
    .catch(function (error) {
        console.error(error);
    });
})

export default businessRouter;