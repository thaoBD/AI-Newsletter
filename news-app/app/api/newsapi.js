import { NextApiRequest, NextApiResponse } from 'next'

// put api calls here
require('dotenv').config();

var NEWS_API_KEY = process.env.NEWS_API_KEY;
var esc = encodeURIComponent;
var requestOptions = {
    method: 'GET'
};

export const config = {
    api: {
      bodyParser: false,
    },
  }  

export default function newsHandler(req, res) {
    var query = createQuery(parseUserFilters(req))
    fetch("https://api.thenewsapi.com/v1/news/all?" + query, requestOptions)
    .then(response => response.text())
    .then(result => res.status(200).json({result}))
    .catch(error => res.status(500).json({ error: {error} }));
  }  

// Parses user filters into an object accepted by the API
function parseUserFilters(params) {
    // TODO - Parse the user filters into the return object
    // + signifies AND operation, | signifies OR operation, - negates a single token, 
    // " wraps a number of tokens to signify a phrase for searching, 
    // * at the end of a term signifies a prefix query, ( and ) signify precedence

    return {
        api_token: NEWS_API_KEY,
        search_fields: 'title,description,keywords,main_text',
        domains: 'google',
        exclude_domains: '',
        language: 'en',
        search: 'apple',
        limit: '10'
    }
}

// Send a query to the API
function createQuery(params) {
    return Object.keys(params)
    .map(function(k) {return esc(k) + '=' + esc(params[k]);})
    .join('&');
}