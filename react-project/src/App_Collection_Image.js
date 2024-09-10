import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './index.css'

function App_Collection_Image() {
     
  const params=useParams();
  const title=params.title;
  const number=params.number;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleBack = () => {
    if (currentPage > 1) { 
      setCurrentPage(currentPage - 1);
    }
  };

  const handleForth = () => {
    if (currentPage < AmountOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const [pageNumbers, setPageNumbers] = useState([]);
  const [AmountOfPages, setAmountOfPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openModal = (imageLink) => {
    setIsModalOpen(true);
    setSelectedImage(imageLink);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8055/items/${title}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const jsonData = await response.json();
        setData(jsonData.data);
        } catch (error) {
        setError(error);
      }
    };
    

    fetchData(); 
  }, []); 
useEffect(()=>{
    if (number!==undefined){    
        for (let i=0; i<data.length; i++){
            if (parseInt(number)===i){            
                setIsModalOpen(true)
                setSelectedImage(data[i].link)            
            }
        }
    }
},[data])
  useEffect(() => {
    if (data) {
      setAmountOfPages(Math.ceil(data.length / 6));
    }
  }, [data]);

  useEffect(() => {
    setPageNumbers(Array.from({ length: AmountOfPages }, (_, i) => i + 1));
  }, [AmountOfPages]);

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!data.length) { 
    return <div>Loading...</div>;
  }

  const handleImageChange = (direction) => {
    const currentIndex = data.findIndex(item => item.link === selectedImage);
    if (direction === 'left' && currentIndex > 0) {
      setSelectedImage(data[currentIndex - 1].link);
    } else if (direction === 'right' && currentIndex < data.length - 1) {
      setSelectedImage(data[currentIndex + 1].link);
    }
  };
  return (
    <div>
      <div className="container">
        {data.slice((currentPage - 1) * 6, currentPage * 6).map((item) => (
          <div className="item_with_image" key={item.id} onClick={() => openModal(item.link)}>
            <img src={(item.link)} alt={item.link} /> 
          </div>
        ))}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <img src={selectedImage} alt={selectedImage} />
              <div className="signs_block">
                <div className="signs">
                  <div className="left_arrow_container" onClick={() => handleImageChange('left')}>
                    <div className="left_arrow"></div>
                  </div>
                  <div className="right_arrow_container" onClick={() => handleImageChange('right')}>
                    <div className="right_arrow"></div>
                  </div>
                  
                  <div className="close" onClick={closeModal}>&times;</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="pages">
          <div className="back" onClick={handleBack}></div>
          {pageNumbers.map((pageNumber) => (
            <button className="page" key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
          ))}
          <div className="forth" onClick={handleForth}></div>
        </div>
      </div>
      
    </div>
  );
}

export default App_Collection_Image;
