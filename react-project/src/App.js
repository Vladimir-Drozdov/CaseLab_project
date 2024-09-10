import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './index2.css'

function App() {
    const [data, setData] = useState([]);
    const [amountOfImages, setAmountOfImages] = useState([]);
    const [error, setError] = useState(null);
    const [albumsFetched, setAlbumsFetched] = useState([]);
    const albums = ["Image_Collection", "Animal_Collection", "Building_Collection"];

    useEffect(() => {
        const fetchData = async (album) => {
          try {
            const response = await fetch(`http://localhost:8055/items/${album}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const jsonData = await response.json();
             
            setData((prevData) => [...prevData, jsonData.data[0].link]);
            setAmountOfImages((prevAmount) => [...prevAmount, jsonData.data.length]);
            setAlbumsFetched((prevAlbums) => [...prevAlbums, album]);
        
          } catch (error) {
            setError(error);
          }
        };
        albums.forEach((album) => {           
            fetchData(album);
        });
    }, []);
  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!data.length) { 
    return <div>Loading...</div>;
  }

  
  return (
    <div className="container">
    {albumsFetched.map((album) => {
      const albumIndex = albumsFetched.indexOf(album);
      const image = data[albumIndex];
      const amount = amountOfImages[albumIndex];

      return (
        <Link to={"/"+albumsFetched[albumIndex]} className="containerElement"
          key={album}>
          <img src={image} alt={album}/>
          <div>{album}</div>
          <div>{amount} фото</div>
          
        </Link>
      );
    })}
  </div>
  );
}

export default App;