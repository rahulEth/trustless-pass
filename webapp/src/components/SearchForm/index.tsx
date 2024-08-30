import { Search } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CredType } from "../../enums/CredTypeEnums";

const SearchForm = ({ className = "" }: { className?: string }) => {
  const [type, setType] = useState("all");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <div className={`flex flex-row items-end gap-2 ${className}`}>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          value={type}
          onChange={handleChange}
          label="type"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value={CredType.SOCIAL}>Social</MenuItem>
          <MenuItem value={CredType.PERSONAL}>Personal</MenuItem>
          <MenuItem value={CredType.BANKING}>Banking</MenuItem>
          <MenuItem value={CredType.OTHER}>Other</MenuItem>
        </Select>
      </FormControl>
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
