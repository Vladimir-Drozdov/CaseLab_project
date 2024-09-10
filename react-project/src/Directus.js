import React, { useEffect } from 'react'; 

const Directus = () => {
    useEffect(() => {
        window.location.href = 'http://localhost:8055/admin/login';
    }, []); 
    return <div>Перенаправление...</div>;
};

export default Directus; 