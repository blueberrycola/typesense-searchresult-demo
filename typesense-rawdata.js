const Typesense = require('typesense');

//connect to typesense
let client = new Typesense.Client({
    'nodes': [{
      'host': '20fy6ohlsb4pz7mdp-1.a1.typesense.net', // For Typesense Cloud use xxx.a1.typesense.net
      'port': '443',      // For Typesense Cloud use 443
      'protocol': 'https'   // For Typesense Cloud use https
    }],
    'apiKey': 'NepBsc6acI7FLq84Ne4kbiToC317LvYe',
    'connectionTimeoutSeconds': 2
});




function singleSearch() {
    //Ask for a search for one query and return results into console.log()
    let searchParameters = {
        'q'         : 'Data Science',
        'query_by'  : 'postType',
        'sort_by'   : ''
    };

    client.collections('posts')
        .documents()
        .search(searchParameters)
        .then(function (searchResults) {
            console.log("RAW DATA:")
            console.log(searchResults);
            console.log("HITS:") //Somehow mathematics are returned as the last two results im unsure why that is
            console.log(searchResults['hits']); //Returned result
    });
}

function multiSearch() {

    //Ask searching for multiple queries by creating an array of searchParams
    let searchParams = {
        "queries": [
            {
                'q'         : 'That is just the luck of the Draw',
                'query_by'  : 'title',
                'sort_by'   : ''
            },
            {
                'q'         : 'Melissa Obama',
                'query_by'  : 'author',
                'sort_by'   : ''
            },
            {
                'q'         : 'Video Game Development',
                'query_by'  : 'postType',
                'sort_by'   : ''
            }
        ]
    }

    for(var i = 0; i < 3; i++) {
        client.collections('posts')
            .documents()
            .search(searchParams['queries'][i])
            .then(function (searchResults) {
                console.log(`RAW DATA[${i}]:`)
                console.log(searchResults);
                console.log(`HITS[${i}]:`) //Somehow mathematics are returned as the last two results im unsure why that is
                console.log(searchResults['hits']); //Returned result
        });
    }
}
/*
    WIP, NOT WORKING CORRECTLY: Faceted searches are a way to browse by category. This makes postType a great example.
    A facet can be defined in an attribute by setting it to true. SEE LINE 22 ON createSchema.js
    
    It works better now but since it filters by default in schema from highest rating as default so the relevant facets are at the bottom of the search result

*/
function facetSearch() {
    let searchParam = {
        'q'         : 'Drew',
        'query_by'  : 'author',
        'facet_by' : 'postType',
        'sort_by'   : ''
    }
    client.collections('posts')
        .documents()
        .search(searchParam)
        .then(function (searchResults) {
            console.log(`RAW DATA[]:`)
            console.log(searchResults);
            console.log(`HITS[]:`) //Somehow mathematics are returned as the last two results im unsure why that is
            console.log(searchResults['hits']); //Returned result
    });


}

//Main
singleSearch();
console.log("/*****************END OF SINGLE SEARCH*****************\\")
multiSearch();
console.log("/*****************END OF MULTI SEARCH*****************\\")
facetSearch();
console.log("/*****************END OF FACET SEARCH*****************\\")