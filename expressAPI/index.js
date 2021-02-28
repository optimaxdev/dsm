var express = require('express')
var app = express()
const axios = require('axios').default
require('dotenv').config()

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

app.listen(1818, () => {
  console.log(`Example app listening at http://localhost:1818`)
})
