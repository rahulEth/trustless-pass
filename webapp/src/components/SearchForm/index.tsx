import { Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";

const SearchForm = () => {
  return (
    <div className="flex flex-row items-end gap-2">
      <TextField
        id="search"
        label="Search"
        variant="standard"
        className="flex-grow"
      />
      <IconButton color="primary" aria-label="search" size="large" className="">
        <Search />
      </IconButton>
    </div>
  );
};

export default SearchForm;
