import React, { Component } from 'react';
import logo from './logo.svg';
import "./App.css";
import Album from "./Album/Album"

class App extends Component {
  // Mock data, will be replaced by retrieving data from back end server
  state = {
    albums: [
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


    ]
  }
  //

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Album Search</h1>
        </header>
        <p className="App-intro">
         List of all albums within personal database
        </p>
        <TableComponent albums={this.state.albums} />
      </div>
    );
  }
}

class TableComponent extends Component {


  render() {
    return (
      <table border="1" >
        <tbody align="right">
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Release Date</th>
            <th>Songs</th>
          </tr>
          {this.props.albums.map(function (album, index) {
            return <Album
              key={album.artist + album.title}
              title={album.title}
              artist={album.artist}
              releaseDate={album.releaseDate}
              songs={Array.from(album.songs).length} />
          })}
        </tbody>
      </table>
    )
  }
}


export default App;
