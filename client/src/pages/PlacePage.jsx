import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWiget from "../components/BookingWiget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    axios.get(`/places/${id}`).then((respone) => {
      setPlace(respone.data);
    });
  }, [id]);

  if (!place) return "";
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>

      <div className="flex items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        <AddressLink place={place} />
      </div>
      <PlaceGallery place={place} />
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
          <h2 className="font-semibold text-2xl">Extra Info</h2>
          <div className="mt-2 text-sm">{place.extraInfo}</div>
        </div>
        <div>
          <BookingWiget place={place} />
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
