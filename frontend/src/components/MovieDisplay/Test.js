import React from 'react';
import movie1 from '../Poster/bheed-poster.jpg';
import movie2 from '../Poster/bhola-poster.jpg';
import movie3 from '../Poster/changiz-poster.jpg';
import movie4 from '../Poster/gaslight-poster.jpg';
import movie5 from '../Poster/Gumraah-poster.jpg';
import movie6 from '../Poster/Kisi-Ka-Bhai-Kisi-Ki-Jaan-Poster.jpg';
import movie7 from '../Poster/lakadbagha-poster.jpg';
import movie8 from '../Poster/pathan-poster.jpg';
import movie9 from '../Poster/selfiee-poster.avif';
import movie10 from '../Poster/shehzada-poster.jpg';
import movie11 from '../Poster/tuJhootiMaiMakkar-Poster.jpg';
import movie12 from '../Poster/zwigato-poster.jpg';
import './Test.css';
import { BrowserRouter, Link } from 'react-router-dom';
function Test(props) {
    const movieList=[movie1,movie2,movie3,movie4,movie5,movie6,movie7,movie8,movie9,movie10,movie11,movie12];
    // const smallarray=[
    //     [movie1,movie2,movie3,movie4],[movie5,movie6,movie7,movie8],[movie9,movie10,movie11,movie12]
    // ];
    const smallarray=chunk(movieList,4);
    function chunk(movieList,size){
        const result=[];
        for (let i = 0; i < movieList.length; i += size) {
            let arr = movieList.slice(i, i + size);
            result.push(arr);
        }
        return result;
}

    return (
        <div>
            {
            smallarray.map((arr,index)=>(
                
                  <div className='movie-row'>
                      {
                        arr.map((item,index)=>(
                            <BrowserRouter>
                            <Link to=''><img className='poster-img' src={item} alt='img'></img></Link>
                            </BrowserRouter>
                        ))
                      }
                  </div>
                
            ))
            }
        </div>
    );
}

export default Test;

