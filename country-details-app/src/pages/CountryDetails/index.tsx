import { AppBar, SelectChangeEvent, Toolbar, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import "./style.css";
import "../../App.css";
import Navbar from "../../components/Navbar";
import SearchAndFilter from "../../components/SearchAndFilter";
interface CountryDetailsProps {
  handleCountryClick: (country: any) => void;
  style: any;
  mode: string;
}

const CountryDetails = ({
  handleCountryClick,
  style,
  mode,
}: CountryDetailsProps) => {
  const [countryList, setCountryList] = useState<any>([]);
  const [filters, setFilters] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const handleFilterChange = (e: any) => {
    setFilterValue(e.target.value);
  };
  type DebouncedFunction<F extends (...args: any[]) => any> = (
    ...args: Parameters<F>
  ) => void;

  function debounce<F extends (...args: any[]) => any>(
    func: F,
    delay: number
  ): DebouncedFunction<F> {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      const context = this;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const debouncedSearchResult = useCallback(
    debounce(async (searchValue) => {
      try {
        let response = await fetch(
          `https://restcountries.com/v3.1/name/${searchValue}`
        );
        let countries: any = await response.json();
        setCountryList(countries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1000),
    []
  );
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    if (searchValue) {
      debouncedSearchResult(searchValue);
    } else {
      const fetchData = async () => {
        try {
          let response = await fetch("https://restcountries.com/v3.1/all");
          let countries: any = await response.json();
          const uniqueRegions = Array.from(
            new Set(countries.map((item: any) => item.region))
          ); // Convert Set to array
          setFilters(uniqueRegions);
          setCountryList(countries);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [searchValue]);
  useEffect(() => {
    if (filterValue) {
      const fetchData = async () => {
        try {
          let response = await fetch(
            `https://restcountries.com/v3.1/region/${filterValue}`
          );
          let countries: any = await response.json();
          setCountryList(countries);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [filterValue]);

  return (
    <>
      <SearchAndFilter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
        searchValue={searchValue}
        mode={mode}
        handleSearchChange={handleSearchChange}
        filters={filters}
      />
      <div
        style={{ width: "100%" }}
        className="flex space-around flex-wrap container"
      >
        {countryList.length > 0 &&
          countryList.map((item: any, index: number) => (
            <div key={index}>
              <div
                style={
                  mode === "light" ? style.light.subBody : style.dark.subBody
                }
                className="countryCard"
                onClick={() => handleCountryClick(item)}
              >
                <img
                  src={item.flags.svg}
                  style={{
                    height: "160px",
                    width: "267px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ margin: "20px 20px" }}>
                  <div className="name-heading">{item.name.common}</div>
                  <div className="detail">
                    <b>Population:</b> {item.population.toLocaleString("en-IN")}
                  </div>
                  <div className="detail">
                    <b>Region:</b> {item.region}
                  </div>
                  <div className="detail">
                    <b>Capital:</b> {item.capital}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CountryDetails;
