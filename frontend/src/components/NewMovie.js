import { useState } from "react"
import movieService from '../services/movies'

const NewMovie=({ handleSearch, searchTerm, handleChangingSearchTerm })=>{

    return(
        <div>
            <p>Add a new movie:</p>
            <form onSubmit={handleSearch}>
                <input
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={handleChangingSearchTerm}
                    id='searchTerm' />
                <button type="submit">search</button>
            </form>
            {}
        </div>
        
    )


}
    
export default NewMovie

/*
 const[newMovie, setNewMovie]=useState({})

    const handleChange=(event)=>{
        setNewMovie(event.target.value)
    }

    return(
        <div>
            <p>new movie</p>
            <form onSubmit={addMovie}>
                <input value={newMovie} 
                onChange={handleChange}
                />
            </form>
            <button type="submit">save movie</button>
        </div>
        
    )
     */