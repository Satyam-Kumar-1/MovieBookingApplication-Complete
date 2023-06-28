// import React, { useState } from 'react';

//  function AddMovie(props) {
//   const [movieName,setMovieName]=useState('');
//   const [moviePoster,setMoviePoster]=useState(null);
//     async function handleSubmit(e){
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('movieName',movieName);
//     formData.append('moviePoster',moviePoster);
//     let response= await fetch('http://localhost:5000/movies',{
//       method:'post',
//       body:formData
//     });
//     let result=await response.json();
//     console.log(response);
//     console.log(result);
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor='moviename'>Movie Name: </label>
//           <input 
//           type='text'
//           id='moviename'
//           value={movieName}
//           onChange={(e)=>{setMovieName(e.target.value)}}
//           />
//         </div>
//         <div>
//           <label htmlFor='moviePoster'>Movie Poster : </label>
//           <input 
//           type='file'
//           id='moviePoster'
//           accept="image/*"
//           onChange={(e)=>{setMoviePoster(e.target.files[0])}}
//           />
//         </div>
//         <button type='submit' >Add </button>
//       </form>
      
//     </div>
//   );
// }

// export default AddMovie;

import React, { useState } from 'react';
import './AddMovie.css'
import { BASE_URL } from '../URL';
function AddMovie(props) {
  const [movieName, setMovieName] = useState('');
  const [moviePoster, setMoviePoster] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('movieName', movieName);
    formData.append('moviePoster', moviePoster);
    let response = await fetch(`${ BASE_URL }/Add-movies`, {
      method: 'post',
      body: formData
    });
    let result = await response.json();
    if(response.ok){
      window.alert('Added Successfully');
      setMovieName('');
      setMoviePoster(null);
      setImagePreview(null);
    }
    // console.log(response);
    // console.log(result);
  }

  function handlePosterChange(e) {
    setMoviePoster(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className='AddMovie-container'>
      <div className='AddMovie-heading'>
      <h2 >Add New Movie</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='AddMovie-form-input'>
          <label htmlFor='moviename'>Movie Name: </label>
          <input
            type='text'
            id='moviename'
            value={movieName}
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
        </div>
        <div className='AddMovie-form-input-image-select'>
          <label htmlFor='moviePoster'>Movie Poster: </label>
          <input
            type='file'
            id='moviePoster'
            accept='image/*'
            onChange={handlePosterChange}
          />
          {imagePreview && (
            <img className='AddMovie-form-poster-preview' src={imagePreview} alt='Movie Poster Preview'  />
          )}
        </div>
        <div className='AddMovie-button-container'>
        <button className='AddMovie-button' type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
