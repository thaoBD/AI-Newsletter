import dotenv from 'dotenv';

dotenv.config();
var NEWS_API_KEY = process.env.NEWS_API_KEY;
var esc = encodeURIComponent;
var requestOptions = {
    method: 'POST'
};

export async function POST(req) {
    var url = "https://api.thenewsapi.com/v1/news/all?" + createQuery(parseUserFilters(req));
    
    try {
        const response = await fetch(url, requestOptions)
        if (!response.ok) { throw new Error(response.status); }
        return new Response(await response.text(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to send text' }), { status: 500 });
    }
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
        language: 'en',
        search: 'apples',
        limit: '3'
    }
}

// Send a query to the API
function createQuery(params) {
    return Object.keys(params)
    .map(function(k) {return esc(k) + '=' + esc(params[k]);})
    .join('&');
}