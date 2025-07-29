const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      style={{ padding: "5px", marginBottom: "10px", width: "100%" }}
    />
  );
};

export default SearchBar;
