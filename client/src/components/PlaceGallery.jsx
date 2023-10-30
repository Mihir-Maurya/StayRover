import React from 'react'

const PlaceGallery = ({place}) => {
  return (
    <div className="grid gap-2 grid-cols-[2fr_1fr]">
      <div>
        {place.photos?.[0] && (
          <img src={"http://localhost:4000/uploads" + place.photos[0]} alt="" />
        )}
      </div>
      <div className="grid ">
        {place.photos?.[1] && (
          <img src={"http://localhost:4000/uploads" + place.photos[1]} alt="" />
        )}
        {place.photos?.[2] && (
          <img src={"http://localhost:4000/uploads" + place.photos[2]} alt="" />
        )}
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
        {place.description}
      </div>
    </div>
  );
}

export default PlaceGallery