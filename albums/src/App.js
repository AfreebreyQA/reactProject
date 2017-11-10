import React, { Component } from 'react';
import logo from './logo.svg';
import "./App.css";
//import Album from "./Album/Album"

import { getAlbums, deleteAlbum } from "./API/albumsAPI"

class App extends Component {
  constructor() {

    super();

    this.state = {
      albums: []
    }

    this.loadAlbums();
  }

  loadAlbums = () => {
    getAlbums().then((a) => {
      this.setState({ albums: a })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Album Search</h1>
        </header>
        <div className="NewAlbumInput">
          <CreateAlbumFormComponent />
        </div>
        <p className="App-intro">
          List of all albums within personal database
        </p>
        <TableComponent albums={this.state.albums} loadAlbumsFromApp={this.loadAlbums} />

      </div>
    );
  }
}

class TableComponent extends Component {

  render() {
    return (
      <table border="1" align="center">
        <tbody align="right">
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Release Date</th>
            <th>Songs</th>
          </tr>

          {
            this.props.albums.map((album, index) => {
              return <AlbumRow
                key={album.id}
                id={album.id}
                title={album.title}
                artist={album.artist}
                releaseDate={album.releaseDate}
                songs={Array.from(album.songs).length}
                loadAlbumsFromApps={this.props.loadAlbumsFromApp} />
            })}
        </tbody>
      </table>
    )
  }
}

class AlbumRow extends Component {
  
  removeAlbum = () => {
    deleteAlbum(this.props.id).then(() => this.props.loadAlbumsFromApps());
  }

  render() {
    return (
      <tr>
        <td> {this.props.title}</td>
        <td> {this.props.artist}</td>
        <td> {this.props.releaseDate}</td>
        <td> {this.props.songs}</td>
        <td> <button onClick={this.removeAlbum}>X</button></td>
      </tr>
    )
  }
}

class CreateAlbumFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAlbumTitle: "",
      newAlbumArtist: "",
      newAlbumSongs: [],
      newAlbumReleaseDate: ""
    }

    this.handleChange = (valueName) => (event) => this.setState({ [valueName]: event.target.value });

  }

  render() {
    return (
      <div align="left">
        <p>
          Album Title:
        </p>
        <p>
          <input type="text" align="right" value={this.state.newAlbumTitle} onChange={this.handleChange("newAlbumTitle")}></input>
        </p>
        <p>
          Album Artist:
        </p>
        <p>
          <input type="text" align="right" value={this.state.newAlbumArtist} onChange={this.handleChange("newAlbumArtist")}></input>
        </p>
        <p>
          Album Songs:
        </p>
        {/* Textboxes for songs already in */}
        <AddSongTextComponent />
        <p>
          Album Release Date:
        </p>
        <p>
          <input type="date" align="right" value={this.state.newAlbumReleaseData} onChange={this.handleChange("newAlbumReleaseDate")}></input>
        </p>
        <button>Add New Album</button>
      </div>
    )
  }
}

class AddSongTextComponent extends Component {
  render() {
    return (
      <div>
        <input type="text" ></input><br /><button>+</button><button>-</button>
      </div>
    )
  }
}

export default App;
