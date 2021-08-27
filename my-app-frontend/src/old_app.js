import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import React, { useState, useEffect} from "react";

function App() {
  const [detailedAlbumData, setDetailedAlbumData] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/songs")
      .then((Response) => Response.json())
      .then(data => {
        setDetailedAlbumData(data)
        console.log(data)
      })
  }, [])

  function delete_song(id) {
    fetch("http://localhost:9292/songs/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
  }).then(data => {
    console.log(data)
    // TODO: FIX
    window.location.reload()
  })}

  function update_song(song, reload = false) {
    fetch("http://localhost:9292/songs/" + song.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song)
  }).then(data => {
      console.log(data)
  })}

  function update_album(album, reload = false) {
    fetch("http://localhost:9292/albums/" + album.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(album)
  }).then(data => {
      console.log(data)
  })}

  return (
    <div className="App">
      <Header />
      <table>
        <tr>
          <th>Title</th>
          <th>Release Year</th>
          <th>Album</th>
          <th></th>
          <th></th>
        </tr>
        {
          detailedAlbumData.map((album, album_index) => (
            album.songs.map((song, song_index) => (
              <tr>
                <td><input type="text" defaultValue={song.title} onChange={event => {
                  console.log(event)

                  let albums = [...detailedAlbumData]
                  // albums[album_index]["songs"][song_index]["title"] = event.target.value;
                  
                  console.log(albums)
                  setDetailedAlbumData([albums])
                }}/></td>
                <td><input type="text" defaultValue={song.release_date} /></td>
                <td><input type="text" defaultValue={album.title} /></td>
                <td><input type="button" value='update' onClick={
                  () => {
                    update_song(song)
                    update_album(album)
                  }
                }/></td>
                <td><input type="button" value='delete' onClick={
                  () => {
                    delete_song(song.id)
                  }
                }/></td>
              </tr>
            ))
          ))
        }
      </table>      
    </div>
  )};

export default App;
