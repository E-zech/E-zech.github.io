import React, { useState } from "react";

export default function SearchBar({ filterCards }) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (ev) => {
    const value = ev.target.value;
    setSearchText(value);
    filterCards(value); // Call the filterCards function with the search input
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </div>
  );
}