const Typesense = require('typesense');


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
        {'name': 'title', 'type': 'string'},
        {'name': 'author', 'type': 'string'},
        {'name': 'postType', 'type': 'string', 'facet': true},
        {'name': 'rating', 'type': 'int32'},




    ],
    'default_sorting_field': 'rating'
};

client.collections().create(postSchema)
    .then(function (data) {
        console.log(data);
});
