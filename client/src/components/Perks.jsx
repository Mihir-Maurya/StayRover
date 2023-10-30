import React from 'react'

const Perks = ({selected,onChange}) => {

  function handleCbClick(e){
    const {checked,name} = e.target;
    if(checked){
      onChange([...selected,name]);
    }else{
      onChange([...selected.filter(selectedName => selectedName !==name)])
    }
  }

  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("wifi")}
          name="wifi"
          type="checkbox"
          onChange={handleCbClick}
        />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("parking")}
          name="parking"
          type="checkbox"
          onChange={handleCbClick}
        />
        <span>Free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("tv")}
          name="tv"
          type="checkbox"
          onChange={handleCbClick}
        />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("pets")}
          name="pets"
          type="checkbox"
          onChange={handleCbClick}
        />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={selected.includes("entrance")}
          name="entrance"
          onChange={handleCbClick}
          type="checkbox"
        />
        <span>Private entrance</span>
      </label>
    </>
  );
}

export default Perks