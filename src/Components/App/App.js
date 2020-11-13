// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import './App.css';
// import Dropdown from '../Dropdown'
// import { Credentials } from '../../Credentials'

// const App =() => {

//   const spotify = Credentials()

//   console.log("RENDERING APP.JS")

//   const data = [
//     {value: 1, name: "A"},
//     {value: 2, name: "B"},
//     {value: 3, name: "C"}
//   ]
  
//   const [token, setToken] = useState('');
//   const [genres, setGenres] = useState({selectedGenres: "", listOfGenresFromAPI: []});

//   async function getData(){
//     await axios('https://accounts.spotify.com/api/token', {
//       headers: {
//         'Content-Type' : 'application/x-www-form-urlencoded',
//         'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
//       },
//       data: 'grant_type=client_credentials',
//       method: 'POST'
//     })
//     .then(tokenResponse => {
//       console.log(tokenResponse.data.access_token)
//       setToken(tokenResponse.data.access_token)

//       axios('https://api.spotify.com/v1/tracks', {
//         method: "GET",
//         headers: {"Authorization" : "Bearer " + tokenResponse.data.access_token}
//       })
//       .then(genreResponse => {
//         setGenres({
//           selectedGenre: genres.selectedGenre,
//           listOfGenresFromAPI: genreResponse.data.categories.items
//         })
//       });
//     })
    
//   }


//   useEffect(() => {
//     getData()
//   }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret])

//   const genreChanged = val => {
//     setGenres({
//       selectedGenre: val,
//       listOfGenresFromAPI: genres.listOfGenresFromAPI
//     });
//   }

//   return (
//     <form onSubmit={() => {}}>
//       <div className="App">
//         <Dropdown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
//         <Dropdown options={data} />
//         <button type="submit">
//           Search
//         </button>
//       </div>
//     </form>
//   );
// }

// export default App;

import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Profile from '../Profiler';
import Gallery from '..Gallery';

class App extends Component {

constructor(props){
  super(props);
  this.state={
    query:'',
    artist:null,
    tracks:[]
  }
}

search(){

  const BASE_URL='https://api.spotify.com/v1/search?';
  let FETCH_URL =BASE_URL+'q='+this.state.query
  +'&type=artist&limit=1';
  const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
 const auth_token = 'Bearer BQBl2u0z7RrZ7RbP4wtxSFnRJA6KIsI1SVr_48dWHff9GfYBQAB09BSwi41EoXdOaU35inz8qDfOEgnE1zA';


  fetch(FETCH_URL,{
    method:'GET',
    headers: {
      'Content-Type' :'application/json',
      'Authorization': auth_token,
      },
    mode: 'cors',
    cache:'default'
  })

  .then(response =>
      Promise.resolve({
      data:response.json(),
      status: response.status
    })
    .then(post => post.data)
    .then(json =>json.artists)
    .then(items =>{
      console.log(items);
        const artist=items.items[0];
          this.setState(artist);
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
          fetch(FETCH_URL,{
            method:'GET',
            headers: {
              'Content-Type' :'application/json',
              'Authorization': auth_token,
              },
          })
          .then(response =>response.json())
          .then(json => {
            console.log('artist',json);
            const tracks=json.tracks;
            this.setState({tracks});
          })

  })
  );

}


render(){
      return (
        <div className="App-out">
          <div className="App-title"> React-Spotify</div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search music"
                value ={this.state.query}
                onChange={event =>{this.setState({query:event.target.value})}}
                onKeyPress={event=>{
                  if(event.key==='Enter')
                    this.search();

                }}
              />

        <InputGroup.Addon onClick={()=>this.search()}>
        </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      {
        this.state !==null
        ?
          <div>
            <Profile
              artist={this.state}
          />
          <Gallery
            tracks={this.state.tracks}
          />
          </div>
     :<div></div>
  }
  </div>
)

}

}
export default App;