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
                songs={album.songs}
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
      newAlbumSongs: 0,
      newAlbumReleaseDate: ""
    }

    this.handleChange = (valueName) => (event) => this.setState({ [valueName]: event.target.value });

  }

  addNewAlbum = () => {
    let obj = {
      title: this.state.newAlbumTitle,
      artist: this.state.newAlbumArtist,
      song: this.state.newAlbumSongs,
      releaseDate: this.state.newAlbumReleaseDate
    }
  }

  render() {
    return (
      <div align="left">
        Album Title:
        <br />
        <input type="text" align="right" value={this.state.newAlbumTitle} onChange={this.handleChange("newAlbumTitle")}></input>
        <br />
        Album Artist:
        <br />
        <input type="text" align="right" value={this.state.newAlbumArtist} onChange={this.handleChange("newAlbumArtist")}></input>
        <br />
        Album Songs:
        <br />
        <input type="number" align="right" value={this.state.newAlbumSongs} onChange={this.handleChange("newAlbumSongs")}></input>
        <br />
        Album Release Date:
        <br />
        <input type="date" align="right" value={this.state.newAlbumReleaseDate} onChange={this.handleChange("newAlbumReleaseDate")}></input>
        <br />
        <button onClick={this.addNewAlbum}>Add New Album</button>
      </div>
    )
  }
}


export default App;
