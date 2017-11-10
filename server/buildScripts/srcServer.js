// eslint rules //
/* eslint no-console: 0 */ 
/* eslint no-unused-vars: 0 */

// Dependancies
const express = require("express");
const open = require("open");
const bodyParser = require("body-parser");

// Express
const app = express();
const port = 3001;
const router = express.Router();

let nextID = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.use("/", router);

// Get all albums
router.get("/api/album", (req, res) => {
    res.json(albums);
});

// Get single album
router.get("/api/album/:id", (req, res) =>{
    const albumID = req.params.id;
    const currentAlbum = albums.find((album) => album.id == albumID);
    if(currentAlbum){
        res.json(currentAlbum);
    }
    else{
        res.sendStatus(404);        
    }
});

// Post Request
router.post("/api/album/", (req, res) => {
    const postAlbum = req.body;
    // check the if the data sent is valid and if it does not already exist in the database
    const isValid = isValidAlbum(postAlbum) && !(albums.find((a) => (a.artist == postAlbum.artist && a.title == postAlbum.title)));
    if (isValid) {
        // server assignes the data with its "unique" ID and "creates" a new id to be used next time
        postAlbum.id = nextID;
        nextID++;

        // adds sent data to "database"
        albums.push(postAlbum);
        res.send(postAlbum);
    }
    else {
        res.sendStatus(500);
    }
});

/* PUT REQUESTS */
// Take a album object at a specific ID url e.g. /api/album/1 Replace contents of the
// album with that id, with the album recieved, not including the ID.
router.put("/api/album/:id", (req, res) => {
    const albumID = req.params.id;
    const currentAlbum = albums.find((album) => album.id == albumID);
    if (currentAlbum) {
        const putAlbum = req.body;
        const isValid = isValidAlbum(putAlbum);
        if (isValid) {
            // Populate stored data with new data
            currentAlbum.title = putAlbum.title;
            currentAlbum.artist = putAlbum.artist;
            currentAlbum.releaseDate = putAlbum.releaseDate;
            currentAlbum.songs = putAlbum.songs;
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
});

/* DELETE REQUESTS */
// Doesn't take any information, a delete request at a specific ID endpoint will
// delete the object.
router.delete("/api/album/:id", (req, res) => {
    const albumID = req.params.id;
    const currentAlbum = albums.findIndex((album) => album.id == albumID);
    if (currentAlbum !== -1) {
        albums.splice(currentAlbum, 1);
        res.json(null);
        //res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Mock Data
const albums = [
    {
        id: 1,
        title: "Thank You, Happy Birthday",
        artist: "Cage the Elephant",
        releaseDate: "2011-01-11",
        songs: [
            "Always Something",
            "Aberdeen",
            "Indy Kidz",
            "Shake Me Down",
            "2024",
            "Sell Yourself",
            "Rubber Ball",
            "Right Before My Eyes",
            "Around My Head",
            "Sabertooth Tiger",
            "Japanese Buffalo",
            "Flow",
            "Right Before My Eyes (Alternate Version) (Hidden Track)"
        ]
    },

    {
        id: 2,
        title: "The Big Come Up",
        artist: "The Black Keys",
        type: "CD",
        releaseDate: "2002-05-14",
        songs: [
            "Busted",
            "Do the Rump",
            "I'll Be Your Man",
            "Countdown",
            "The Breaks",
            "Run Me Down",
            "Leavin' Trunk",
            "Heavy Soul",
            "She Said, She Said",
            "Them Eyes",
            "Yearnin'",
            "Brooklyn Bound",
            "240 Years Before Your Time"
        ]
    }
];

function isValidAlbum(_album){
    return ("id" in _album && "title" in _album && "artist" in _album && "songs" in _album && "releaseDate" in _album);
}

// Run Server
app.listen(port, (err) => {
    if (err) { console.log(err); }
    else { open(`http://localhost:${port}/api/album/`);}
});