import {
  MenuItem,
  Select,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

const SearchAndFilter = ({
  filters,
  mode,
  searchValue,
  handleSearchChange,
  filterValue,
  handleFilterChange,
}: {
  filters: any;
  mode: string;
  searchValue: string;
  handleSearchChange: (e: any) => void;
  filterValue: string;
  handleFilterChange: (e: any) => void;
}) => {
  return (
    <div
      className="flex space-between flex-wrap"
      style={{ padding: "20px 40px" }}
    >
      <FormControl variant="standard" sx={{ m: 2, width: "500px" }}>
        <Input
          value={searchValue}
          onChange={handleSearchChange}
          style={{
            color: mode == "dark" ? "white" : "black",
            borderBottom: "1px solid white",
          }}
          placeholder="Search for a country..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: mode == "dark" ? "white" : "black" }} />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard" sx={{ m: 2, width: "240px" }}>
        <Select
          style={{
            color: mode == "dark" ? "white" : "black",
            borderBottom: "1px solid white",
          }}
          value={filterValue}
          onChange={handleFilterChange}
          displayEmpty
        >
          <MenuItem disabled value="">
            Filter by Region
          </MenuItem>
          {filters.map((filter: string) => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchAndFilter;
