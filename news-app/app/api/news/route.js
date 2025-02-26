import dotenv from 'dotenv';

dotenv.config();
var NEWS_API_KEY = process.env.NEWS_API_KEY;
var esc = encodeURIComponent;
var requestOptions = {
    method: 'POST'
};

export async function POST(req) {
    var url = "https://api.thenewsapi.com/v1/news/all?" + createQuery(parseUserFilters(await req.json()));
    console.log(url)
    // console.log(url)
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
    console.log(params)
    // Parse domain filters
    let incDomains = ''
    let excDomains = ''
    for  (let i=0; i < params.domains.length; i++) {
        if (params.domains[i].charAt(0) == '+') {
            incDomains += ',' + params.domains[i].slice(1)
        }
        if (params.domains[i].charAt(0) == '-') {
            excDomains += params.domains[i].slice(1)
        }
    }

    // Parse search filters
    let keywords = ''
    let tempKeys = ''
    for (let i = 0; i < params.and.length; i++) { keywords += ` +${params.and[i]}` }
    for (let i = 0; i < params.not.length; i++) { keywords += ` -${params.not[i]}` }
    for (let i = 0; i < params.or.length; i++) { tempKeys += ` |${params.or[i]}` }
    keywords += ` +(${tempKeys})`

    // Parse category filters
    const categories = Object.keys(params.categories).filter(key => params.categories[key] === true).join(',');

    return {
        api_token: NEWS_API_KEY,
        search_fields: 'title,description,keywords',
        language: 'en',
        search: keywords,
        domains: incDomains,
        exclude_domains: excDomains,
        categories: categories,
        published_on: new Date().toJSON().slice(0, 10),
        sort: 'relevance_score',
        limit: '3',
    }
}

// Send a query to the API
function createQuery(params) {
    return Object.keys(params)
        .map(function(k) {return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);})
        .join('&');
}