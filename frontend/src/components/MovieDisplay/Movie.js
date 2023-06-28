// // import React from 'react';
// // import movie1 from '../Poster/bheed-poster.jpg';
// // import movie2 from '../Poster/bhola-poster.jpg';
// // import movie3 from '../Poster/changiz-poster.jpg';
// // import movie4 from '../Poster/gaslight-poster.jpg';
// // import movie5 from '../Poster/Gumraah-poster.jpg';
// // import movie6 from '../Poster/Kisi-Ka-Bhai-Kisi-Ki-Jaan-Poster.jpg';
// // import movie7 from '../Poster/lakadbagha-poster.jpg';
// // import movie8 from '../Poster/pathan-poster.jpg';
// // import movie9 from '../Poster/selfiee-poster.avif';
// // import movie10 from '../Poster/shehzada-poster.jpg';
// // import movie11 from '../Poster/tuJhootiMaiMakkar-Poster.jpg';
// // import movie12 from '../Poster/zwigato-poster.jpg';
// // import './Movie.css';
// // import { BrowserRouter, Link } from 'react-router-dom';

// // function Movie(props) {
// //     const movieList=[movie1,movie2,movie3,movie4,movie5,movie6,movie7,movie8,movie9,movie10,movie11,movie12];
// //     const movieChunks = chunkArray(movieList, 4);

// //     function chunkArray(array, size) {
// //         let result = [];
// //         for (let i = 0; i < array.length; i += size) {
// //             let chunk = array.slice(i, i + size);
// //             result.push(chunk);
// //         }
// //         return result;
// //     }

// //     return (
// //         <div>
// //             {movieChunks.map((chunk, index) => (
// //                 <div className="movie-row" key={index}>
// //                     {chunk.map((item, index) => (
// //                         <div className='movie-list' key={index}>
// //                             <img className='movie-poster'  src={item} alt='img'></img>

// //                             <div className='booking-buttn'>

// //                                <Link className='booking-link' to='/booking'>Book Ticket</Link>

// //                             </div>

// //                         </div>
// //                     ))}
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // }

// // export default Movie;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import './Movie.css';

// function Movie() {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/movies');
//       const data = await response.json();
//       console.log(response);
//       console.log(data);
//       setMovies(data);
//     } catch (error) {
//       console.error('Error retrieving movies:', error);
//     }
//   };

//   const movieChunks = chunkArray(movies, 4);

//       function chunkArray(array, size) {
//           let result = [];
//           for (let i = 0; i < array.length; i += size) {
//               let chunk = array.slice(i, i + size);
//               result.push(chunk);
//           }
//           return result;
//       }

// //   return (
// //     <div>
// //       {movies.map((movie, index) => (
// //         <div className="movie-list" key={index}>
// //           <img className="movie-poster" src={`http://localhost:5000/uploads/${movie.moviePoster}`} alt={movie.movieName} />
// //           <div className="booking-buttn">
// //             <Link className="booking-link" to="/booking">
// //               Book Ticket
// //             </Link>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// return (
//             <div>
//                 {movieChunks.map((chunk, index) => (
//                     <div className="movie-row" key={index}>
//                         {chunk.map((item, index) => (
//                             <div className='movie-list' key={index}>
//                                 <p>{item.movieName}</p>
//                                <img className="movie-poster" src={`http://localhost:5000/uploads/${item.moviePoster}`} alt={item.movieName} />

//                                 <div className='booking-buttn'>

//                                    <Link className='booking-link' to='/user/mybooking'>Book Ticket</Link>

//                                 </div>

//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// export default Movie;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Movie.css';
import '../Animation.css';
import { BASE_URL } from '../URL';
function Movie() {
    
    const [movies, setMovies] = useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movies`);
                const data = await response.json();
                // console.log(response);
                // console.log(data);
                setMovies(data);
            } catch (error) {
                console.error('Error retrieving movies:', error);
            }finally{
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

   if(loading){
    return  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
   }

    const movieChunks = chunkArray(movies, 4);

    function chunkArray(array, size) {
        let result = [];
        for (let i = 0; i < array.length; i += size) {
            let chunk = array.slice(i, i + size);
            result.push(chunk);
        }
        return result;
    }

    return (
        <div>
            {movieChunks.map((chunk, index) => (
                <div className="movie-row" key={index}>
                    {chunk.map((item, index) => (
                        <div className='movie-list' key={index}>
                            <p>{item.movieName}</p>
                            <img className="movie-poster" src={`${BASE_URL}/uploads/${item.moviePoster}`} alt={item.movieName} />
                            <div className='booking-buttn'>

                                <Link className='booking-link' to={`/booking/${item.movieName}/${item.moviePoster}`} >
                                    

                                    Book Ticket
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
          
        </div>
    );
}

export default Movie;

