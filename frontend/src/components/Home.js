import React from 'react';
import './Style/Home.css'
import Slider from './slider/Slider';
import Movie from './MovieDisplay/Movie';
import Test from './MovieDisplay/Test';
import { UserContext } from '../User/UserContext';
import { useContext } from 'react';
function Home(props) {
    // const { userData } = useContext(UserContext);
    return (
        <div id='home'>
            <div id='search-bar'>

                <form >
                    <input type='text' placeholder='Search...' className='search'></input>
                </form>
            </div>
            <Slider />
            <Movie />
            {/* <Test/> */}
          
          
        </div>
    );
}

export default Home;



