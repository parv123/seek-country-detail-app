interface CountryPageProps {
  handleCountryClick: (country: any) => void;
  country: any;
}
const CountryPage = ({ handleCountryClick, country }: CountryPageProps) => {
  return (
    <>
      <button onClick={() => handleCountryClick({})}>Back</button>
      <div className="flex">
          <div style={{width:"50%"}}>
              <img src={country.flags.svg}  style={{width:"560px",height:"401px"}}/>
          </div>
          <div style={{width:"50%"}}>{country.name.common}</div>
      
      </div>
    </>
  );
};
export default CountryPage;
