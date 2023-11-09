import React, { useState } from "react";

const items = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Carrot" },
  { id: 4, name: "Date" },
  { id: 5, name: "Eggplant" },
  { id: 6, name: "Anoti" },
  { id: 7, name: "Bonam" },
  { id: 8, name: "Cague" },
  { id: 9, name: "Datti" },
  { id: 10, name: "Eggrow" },
];

export const NewSearchBar = () => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchText, setSearchText] = useState();
  const [suggestion, setSuggestion] = useState([]);

  const filterItem = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredItems(filtered);
    const filteredSuggestions = filteredItems.filter((item) => {
      return item.name.toLowerCase().startsWith(value);
    });
    setSuggestion(filteredSuggestions);
  };

  const handleSuggestionClick = (item) => {
    setSearchText(item.name);
    setSuggestion([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Product..."
        onChange={filterItem}
        value={searchText}
      />

    
      {suggestion.length > 0 && (
        <div>
          {suggestion.map((item) => (
            <div key={item.id} onClick={() => handleSuggestionClick(item)}>
              <span>{item.name} </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


