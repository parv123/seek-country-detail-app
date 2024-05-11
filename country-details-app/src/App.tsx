import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CountryDetails from "./pages/CountryDetails";
import CountryPage from "./pages/CountryPage";

function App() {
  const [mode, setMode] = useState('light')
  const style : any = {
    dark :{
      body:{
        backgroundColor:"hsl(207, 26%, 17%)",
        color: "white"
      },
      subBody:{
        backgroundColor:"hsl(209, 23%, 22%)",
        color: "white",
        boxShadow: "0px 0px 10px #282828"
      }
    },
    light:{
      body:{
        backgroundColor:"hsl(0, 0%, 98%)",
        color: "black"
      },
      subBody:{
        backgroundColor:"white",
        color: "black",
        boxShadow: "0px 0px 10px #d4d4d4"
      }
    }
  }
  const handleModeChange=()=>{
    if(mode == 'light')
    setMode('dark')
    else
    setMode('light')
  }
  const [selectedCountry, setSelectedCountry] = useState<any>({});
  const handleCountryClick = (item: any) => {
    setSelectedCountry(item);
  };
  return (
    <div  style={mode === "light"? style.light.body :  style.dark.body } >
      {" "}
      <Navbar style = {style} mode={mode} handleModeChange={handleModeChange} heading="Where in the world?" />
      <div style={{marginTop:"90px"}}>
      {selectedCountry?.name?.common ? (
        <CountryPage handleCountryClick={handleCountryClick} country={selectedCountry} />
      ) : (
        <CountryDetails style = {style}  mode={mode} handleCountryClick={handleCountryClick} />
      )}
      </div>
    </div>
  );
}

export default App;
