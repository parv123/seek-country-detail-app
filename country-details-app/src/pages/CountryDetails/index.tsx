import { AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CountryDetails = () => {
  const [countryList, setCountryList] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://restcountries.com/v3.1/all");
        let countries = await response.json();
        setCountryList(countries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [countryList]);
 return (
    <>
      <AppBar component="nav">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Where in the World?
          </Typography>
        </Toolbar>
      </AppBar>
      {countryList.length > 0 &&
        countryList.map((item: any, index: number) => (
          <div key={index}>{item.name.common}</div>
        ))}
    </>
  );
};

export default CountryDetails;
