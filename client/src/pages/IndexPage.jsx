import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom';

const IndexPage = () => {
    const [places,setPlaces] = useState([]);
     
    useEffect(()=>{
      axios.get('/places').then(response=>{
        setPlaces(response.data);
      })
    },[]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6 ">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/'+place._id}>
            <div className="bg-gray-500 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl"
                  src={"http://localhost:4000/uploads" + place.photos?.[0]}
                />
              )}
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
            <div>
              <span className='font-bold'>
             ${place.price }
              </span>
              
               per night</div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage