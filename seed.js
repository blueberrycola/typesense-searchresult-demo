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

var fname = ["Chase", "Shayla", "Drew", "Grant", "Ashlee", "Melissa", "Jeff", "Albert", "Larry", "Kanye", "Donda"];
var lname = ["Johnston", "Fisher", "Smith", "Obama", "Biden", "Musk", "Johnson", "West", "Huestis", "East", "Einstein"];
var title = ["That is just the luck of the Draw", "Piece of Cake", "Drive me Nuts", "A Lemon", "Close but No Cigar", "A Cold Day in Hell", "Everything but the Kitchen Sink", "Son of a Gun", "Fight Fire with Fire", "Beating a Dead Horse", "Rain on your Parade"];
var postType = ["Data Science", "Mathematics", "Statistics", "Web Development", "Psychology", "Video Game Development", "Software Development"];
var ratingCeiling = 10000;

function createName() {
    const randfName = Math.floor(Math.random() * fname.length);
    const randlName = Math.floor(Math.random() * lname.length);
    let str = fname[randfName];
    str += ' ';
    str += lname[randlName];
    return str;
}

function createTitle() {
    const randTitle = Math.floor(Math.random() * title.length);
    return title[randTitle];
}

function createType() {
    const randType = Math.floor(Math.random() * postType.length);
    return postType[randType];
}
/* Uses the functions above to randomly generate document data for typesense */
function uploadDocs() {

    for(var i = 0; i < 20; i++) {
        var namestr = createName();
        var titlestr = createTitle();
        var createstr = createType();
        var ratingnum = Math.floor(Math.random() * ratingCeiling);
        
        
        //Upload document to collection
        client.collections('posts').documents().create({
            "title": titlestr,
            "author": namestr,
            "postType": createstr,
            "rating": ratingnum,

        });
    }
    console.log("Documents Successfully Uploaded!")
}

uploadDocs();


