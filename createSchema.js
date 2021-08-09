const Typesense = require('typesense');

const createdAt = 'Sun Aug 08 2021 23:32:23 GMT-0400 (Eastern Daylight Time)';

let client = new Typesense.Client({
    'nodes': [{
      'host': '20fy6ohlsb4pz7mdp-1.a1.typesense.net', // For Typesense Cloud use xxx.a1.typesense.net
      'port': '443',      // For Typesense Cloud use 443
      'protocol': 'https'   // For Typesense Cloud use https
    }],
    'apiKey': 'K9hiqoAZFGOMU9Oc7vPTTJi6ExwnVU5b',
    'connectionTimeoutSeconds': 2
});
/*
    When a field with facet is set to true it can be used as a
    toggle box to filter search results
*/

let postSchema = {
    'name': 'posts',
    'fields': [
        {'name': 'nodeID', 'type': 'string'},
        {'name': 'title', 'type': 'string'},
        {'name': 'author', 'type': 'string'},
        {'name': 'nodeType', 'type': 'string', 'facet': true}, //Categorical Attributes should be faceted if you want to cluster results
        {'name': 'tags', 'type': 'string[]', 'facet': true},
        {'name': 'proposers', 'type': 'string[]'},
        {'name': 'upvotes', 'type': 'int32'},
        {'name': 'rating', 'type': 'float'},
        {'name': 'createdAt', 'type': 'string'},
        {'name': 'changedAt', 'type': 'string'},
        {'name': 'downvoted', 'type': 'int32'},
        {'name': 'viewers', 'type': 'int32'},
        {'name': 'bookmarks', 'type': 'int32'},
        {'name': 'versionID', 'type': 'string[]'}



    ],
    'default_sorting_field': 'rating'
};


client.collections().create(postSchema)
    .then(function (data) {
        console.log(data);
});
