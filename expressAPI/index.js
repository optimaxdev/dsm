import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

import * as express from 'express';
const app = express();

import * as axios from "axios";
const axios = axios.default

import * as dotenv from "dotenv";
dotenv.config()

app.get('/', function (req, res) {
  return res.status(403).send('Please use a valid request url')
})

app.get('/header', function (req, res) {
  if ('url' in req.query == false) {
    return res.status(403).send('You are missing a required field!')
  }

  axios
    .get(`${req.query['url']}?apikey=${process.env.APIKEY}`)
    .then((response) => {
      res.send({
        score: response.data.score.stars,
        numberOfReviews: response.data.numberOfReviews.total,
      })
    })
})
app.get('/reviews', function (req, res) {
  let params = [`apikey=${process.env.APIKEY}`, 'perPage=40']
  let data = []

  // Make sure there is a url included
  if ('url' in req.query == false) {
    return res.status(403).send('You are missing a required field!')
  }

  // If stars change the default to the number specified
  if ('stars' in req.query) {
    params.push(`stars=${req.query['stars'].split(',')}`)
  } else {
    params.push(`stars=4,5`)
  }

  // If a tag is specified filter it by the tag
  if ('tags' in req.query) {
    params.push(`tagValue=${req.query['tags']}`)
  }

  params = params.join('&')

  axios.get(`${req.query['url']}?${params}`).then((response) => {
    if (response.data.reviews == undefined)
      return res.status(404).send('Reviews not found for this request!')
    response.data.reviews.forEach((e) => {
      data.push({
        title: e.title,
        stars: e.stars,
        author: e.consumer.displayName,
        text: e.text,
        date: e.createdAt,
      })
    })
    res.send(data)
  })
})

// var http = require('http'),
//   https = require('https')
// var fs = require('fs')

http.createServer(app).listen(1818)
https
  .createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    },
    app,
  )
  .listen(1819)

// app.listen(1818, () => {
//   console.log(`Example app listening at http://localhost:1818`)
// })
