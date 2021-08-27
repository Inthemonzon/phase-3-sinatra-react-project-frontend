import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import React, { useState, useEffect} from "react";

function App() {
  const [songData, setSongData] = useState([])
  const [albumData, setAlbumData] = useState([])

  const [newSongData, setNewSongData] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/songs")
      .then((Response) => Response.json())
      .then(data => {
        setSongData(data)
        console.log(data)
      })
    fetch("http://localhost:9292/albums")
      .then((Response) => Response.json())
      .then(data => {
        setAlbumData(data)
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
  })}

  function update_song(song_id, song_index) {
    fetch("http://localhost:9292/songs/" + song_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData[song_index])
  }).then(data => {
      console.log(data)
  })}

  function create_song() {
    fetch("http://localhost:9292/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSongData)
  })
  .then((Response) => Response.json())
  .then(data => {
      console.log(data)
      let songs = [...songData]
      songs.push(data)
      setSongData(songs)
  })}

  return (
    <div className="App">
      <Header />
      <center>
        <table>
          <tr>
            <td colSpan="2">
              <h3 className="centeredTitle">Add new song</h3>
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td><input type="text" defaultValue="" onChange={(event) => {
              let song = {...newSongData}
              song["title"] = event.target.value;
              setNewSongData(song)
            }}/></td>
          </tr>
          <tr>
            <td>Release Year</td>
            <td><input type="number" defaultValue="" onChange={(event) => {
              let song = {...newSongData}
              song["release_date"] = parseInt(event.target.value);
              setNewSongData(song)
            }}/></td>
          </tr>
          <tr>
            <td>Album</td>
            <td>
              <select name="album" onChange={(event) => {
                let song = {...newSongData}
                song["album_id"] = event.target.value;
                setNewSongData(song)
              }}>
                <option disabled selected value> -- select an album -- </option>
                {
                  albumData.map((album, album_index) => (
                    <option value={album.id}>{album.title}</option>
                  ))
                }
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <input type="button" value="Add song" onClick={() => {
                console.log(newSongData)
                create_song()
              }}/>
            </td>
          </tr>
        </table>

        <br></br>

        <table>
          <tr>
            <td colSpan="5">
              <h3 className="centeredTitle">Song list</h3>
            </td>
          </tr>
          <tr>
            <th>Title</th>
            <th>Release Year</th>
            <th>Album</th>
            <th></th>
            <th></th>
          </tr>
          {
            songData.map((song, song_index) => (
              <tr>
                <td><input type="text" defaultValue={song.title} onChange={event => {
                  let songs = [...songData]
                  songs[song_index]["title"] = event.target.value;
                  setSongData(songs)
                }}/></td>
                <td><input type="number" defaultValue={song.release_date} onChange={event => {
                  let songs = [...songData]
                  songs[song_index]["release_date"] = parseInt(event.target.value);
                  setSongData(songs)
                }}/></td>
                <td>
                  {/* <input type="text" defaultValue={song.album_id} /> */}
                  <select name="album" onChange={(event) => {
                    let songs = [...songData]
                    songs[song_index]["album_id"] = parseInt(event.target.value);
                    setSongData(songs)
                  }}>
                    {
                      albumData.map((album, album_index) => (
                        <option value={album.id} selected={
                          (album.id === song["album_id"])
                            ? true
                            : false
                        } >{album.title}</option>
                      ))
                    }
                  </select>
                </td>
                <td><input type="button" value='update' onClick={
                  () => {
                    update_song(song["id"], song_index)
                    // update_album(album)
                  }
                }/></td>
                <td><input type="button" value='delete' onClick={
                  () => {
                    let songs = [...songData]
                    songs.splice(song_index, 1)
                    setSongData(songs)
                    delete_song(song.id)
                  }
                }/></td>
              </tr>
            ))
          }
        </table>
      </center>
    </div>
  )};

export default App;
