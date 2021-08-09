const Typesense = require('typesense');
const fake = require('faker');

let client = new Typesense.Client({
    'nodes': [{
      'host': '20fy6ohlsb4pz7mdp-1.a1.typesense.net', // For Typesense Cloud use xxx.a1.typesense.net
      'port': '443',      // For Typesense Cloud use 443
      'protocol': 'https'   // For Typesense Cloud use https
    }],
    'apiKey': 'K9hiqoAZFGOMU9Oc7vPTTJi6ExwnVU5b',
    'connectionTimeoutSeconds': 2
});

var title = ["That is just the luck of the Draw", "Piece of Cake", "Drive me Nuts", "A Lemon", "Close but No Cigar", "A Cold Day in Hell", "Everything but the Kitchen Sink", "Son of a Gun", "Fight Fire with Fire", "Beating a Dead Horse", "Rain on your Parade"];
var postType = ["Data Science", "Mathematics", "Statistics", "Web Development", "Psychology", "Video Game Development", "Software Development"];
var ratingCeiling = 10000;

//TODO: Rand gen for,  post-type,
// tags[]
//changedAt, createdAt, viewersINT, bookmarksINT

//Used for nodeID, versionID
function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
function getUser() {
    return fake.internet.userName();
}
//Loads function for tags and postType
//Bool is for if return should be str:str[]
function majorArrayOrMajorString(flag) {
    if(flag) {
        return 'fooo';
    } else {
        return 'foo';
    }
    
}

function genUpDownVote(flag) {
    if(flag) {
        return Math.random() * 255;
    } else {
        return Math.random() * 128;
    }
}

function genBookmarkViews(flag) {
    if(!flag) {
        return Math.random() * 1024;
    } else {
        return Math.random() * 64;
    }
}
//Used for created and changedAt: CREATED MUST BE < CHANGED
function randTimeStamps(flag) {
    if(flag) {

    } else {

    }
}

function randUser() {

}

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
    for(var i = 0; i < 25; i++) {

        //Upload document to collection
        client.collections('posts').documents().create({
            "nodeID": getRandomString(),
            "title": createTitle(),
            "author": getUser(),
            "nodeType": createstr, //FIXME
            "tags": foo, //FIXME
            "proposers": foo, //FIXME
            
            "upvotes": genUpDownVote(true),
            "rating": ratingnum,
            "createdAt": fake.date.past, 
            "changedAt" : fake.date.future,

            "downvoted": genUpDownVote(false),
            "viewers": genBookmarkViews(true),
            "bookmarks": genBookmarkViews(false),
            "versionID": foo //FIXME genRandomString 0-15 times


        });
    }
    console.log("Documents Successfully Uploaded!")
}



