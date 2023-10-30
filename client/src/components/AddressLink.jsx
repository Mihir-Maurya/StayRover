import React from 'react'

const AddressLink = ({place}) => {
  return (
    <a
      target="_blank"
      href={"https:maps.google.com?q=" + place.address}
      className="my-2 block font-semibold underline"
    >
      {place.address}
    </a>
  );
}

export default AddressLink