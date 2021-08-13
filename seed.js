/*
This file is merely used to create fake documents to test createSchema.js and typesense-rawdata.js
Since you would just be pulling collection from firestore I recommend you focus on createSchema.js and typesense-rawdata.js

*/


const Typesense = require('typesense');
const fake = require('faker'); //Used to create fake data
//Connect to typesense client in admin-mode
let client = new Typesense.Client({
    'nodes': [{
      'host': '20fy6ohlsb4pz7mdp-1.a1.typesense.net', // For Typesense Cloud use xxx.a1.typesense.net
      'port': '443',      // For Typesense Cloud use 443
      'protocol': 'https'   // For Typesense Cloud use https
    }],
    'apiKey': 'K9hiqoAZFGOMU9Oc7vPTTJi6ExwnVU5b',
    'connectionTimeoutSeconds': 2
});
//rand elements for document creation
var title = ["That is just the luck of the Draw", "Piece of Cake", "Drive me Nuts", "A Lemon", "Close but No Cigar", "A Cold Day in Hell", "Everything but the Kitchen Sink", "Son of a Gun", "Fight Fire with Fire", "Beating a Dead Horse", "Rain on your Parade"];
//All psuedoposts are part of these types
var postType = [
    'Data Science',
    'Computer Science',
    'Software Engineering',
    'Object Oriented Programming',
    'Web Scraping',
    'Machine Learning',
    'Capture the Flag',
    'Video Game Development'
];
var ratingCeiling = 10000;
//Tags are what was used to make the repository
var tags = [
    'C',
    'C++',
    'C#',
    'Javascript',
    'Java',
    'Python',
    'Ruby',
    'Fortran',
    'PASCAL',
    'Basic',
    'SQL',
    '.NET',
    'Node.js'

];
//Create a random list of tags
function getTags(num) {
    let strlist = [];
    for(var i = 0; i < num; i++) {
        strlist.push(tags[Math.floor(Math.random() * tags.length)])
    }
    //Clean duplicates
    let uniqueTags = strlist.filter((c, index) => {
        return strlist.indexOf(c) === index;
    });
    return uniqueTags;


}

//TODO: Rand gen for proposers and versions

//Used for nodeID, versionID
function getRandomString(length, num, flag) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if(flag) {
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    } else {
        var resulthash = '';
        let list = []
        for(var j = 0; j < num; j++) {
            for ( var i = 0; i < length; i++ ) {
                resulthash += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            }
            list.push(resulthash);
            resulthash = '';
        }
        
        return list;
    }
    

}
function getProposers(num) {
    var list = [];
    for(var i = 0; i < num; i++) {
        list.push(fake.internet.userName());
    }
    return list
}


//Gets random integer for upvotes/downvotes
function genUpDownVote(flag) {
    if(flag) {
        return Math.floor(Math.random() * 255);
    } else {
        return Math.floor(Math.random() * 128);
    }
}
//Gets random integer for either Bookmark or views
function genBookmarkViews(flag) {
    if(!flag) {
        return Math.floor(Math.random() * 1024);
    } else {
        return Math.floor(Math.random() * 64);
    }
}
//Gets random type
function randType() {
    return postType[Math.floor(Math.random() * postType.length)];
}
//Gets random title
function createTitle() {
    const randTitle = Math.floor(Math.random() * title.length);
    return title[randTitle];
}

//Gets random floating point for rating
function getRandomFloat(){
    return (Math.random() * (1.120 - 9.9999) + 0.0200).toFixed(4) * -1;
}

/* Uses the functions above to randomly generate document data for typesense */
function uploadDocs() {
    var foo;
    for(var i = 0; i < 24; i++) {

        //Upload document to collection
        client.collections('posts').documents().create({
            "nodeID": getRandomString(24, 1, true),
            "title": createTitle(),
            "author": fake.internet.userName(),
            "nodeType": randType(),
            "tags": getTags(Math.floor(Math.random() * 5)),
            "proposers": getProposers(Math.floor(Math.random * 4)),
            
            "upvotes": genUpDownVote(true),
            "rating": getRandomFloat(),
            "createdAt": fake.date.past(5200), 
            "changedAt" : fake.date.future(5200),

            "downvoted": genUpDownVote(false),
            "viewers": genBookmarkViews(true),
            "bookmarks": genBookmarkViews(false),
            "versionID": getRandomString(24, (Math.random() * 5), false) //FIXME genRandomString 1-3 times


        });
    }
    console.log("Documents Successfully Uploaded!")
}
//Create seed documents for typesense cloud api
uploadDocs();



