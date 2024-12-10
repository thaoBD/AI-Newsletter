import dotenv from 'dotenv';

dotenv.config();
var NEWS_API_KEY = process.env.NEWS_API_KEY;
var esc = encodeURIComponent;
var requestOptions = {
    method: 'POST'
};

export async function POST(req) {
    var url = "https://api.thenewsapi.com/v1/news/all?" + createQuery(parseUserFilters(await req.json()));

    try {
        const response = await fetch(url, requestOptions)
        if (!response.ok) { throw new Error(response.status); }
        return new Response(await response.text(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to get articles.' }), { status: 500 });
    }
}  

// Parses user filters into an object accepted by the API
function parseUserFilters(params) {
    // Parse domain filters
    const domains = params.domains.join(',')

    // Parse search filters
    const exceptions = ["+", "|", "-", "\"", "*"]
    let keywords = ''
    for (let i = 0; i < params.keywords.length; i++) {
        if ((exceptions.includes(params.keywords[i].charAt(0))) || 
            (params.keywords[i].charAt(0) == "(" && params.keywords[i].charAt(stringLength - 1) == ")")) {
            keywords += params.keywords[i]
        } else {
            keywords = keywords + "+" + params.keywords[i]
    }}
    

    return {
        api_token: NEWS_API_KEY,
        search_fields: 'title,description,keywords,main_text',
        language: 'en',
        search: keywords,
        domains: domains,
        sort: 'published_on',
        limit: '3'
    }
}

// Send a query to the API
function createQuery(params) {
    return Object.keys(params)
        .map(function(k) {return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);})
        .join('&');
}