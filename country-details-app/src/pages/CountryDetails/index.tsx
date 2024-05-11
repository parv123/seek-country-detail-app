import { AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import "../../App.css";
import Navbar from "../../components/Navbar";
import SearchAndFilter from "../../components/SearchAndFilter";
interface CountryDetailsProps {
  handleCountryClick: (country: any) => void;
  style : any,
  mode : string
}

const CountryDetails = ({ handleCountryClick, style, mode }: CountryDetailsProps) => {
  const [countryList, setCountryList] = useState<any>([]);
  const [filters, setFilters] = useState<any>([]);
  useEffect(() => {
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
  }, []);

  return (
    <>
      <SearchAndFilter filters={filters} />
      <div
        style={{width: "100%"}}
        className="flex space-around flex-wrap container"
      >
        {countryList.length > 0 &&
          countryList.map((item: any, index: number) => (
            <div key={index}>
              <div
              style={mode === "light"? style.light.subBody :  style.dark.subBody }
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
                    <b>Population:</b> {item.population}
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
