import React from 'react'
import { Link, useLocation } from 'react-router-dom';
const AccountNav = () => {
  const {pathname} = useLocation();
  let subpage = pathname.split('/')?.[2];
  if(subpage===undefined){
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "py-2 px-6";

    if (type === subpage) {
      classes += " bg-primary rounded-full";
    }
    return classes;
  }

  
    return (
    <nav className="w-full flex justify-center mt-6 gap-2 mb-4">
      <Link className={linkClasses("profile")} to={"/account"}>
        My Profile
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        My Bookings
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        My Accommodations
      </Link>
    </nav>
  );
}

export default AccountNav