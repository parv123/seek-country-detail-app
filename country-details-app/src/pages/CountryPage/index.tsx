import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { style } from "@mui/system";
interface CountryPageProps {
  handleCountryClick: (country: any) => void;
  country: any;
  style: any;
  mode: string;
}
const CountryPage = ({
  handleCountryClick,
  country,
  style,
  mode,
}: CountryPageProps) => {
  console.log("country", country);
  return (
    <div style={{ padding: "80px 40px", height: "100vh !important" }}>
      <div
        style={{
          ...(mode === "light" ? style.light.subBody : style.dark.subBody),
          cursor: "pointer",
        }}
        className="smallBox"
        onClick={() => handleCountryClick({})}
      >
        <ArrowBackIcon sx={{ marginBottom: "-8px" }} /> Back
      </div>
      <div className="flex flex-wrap">
        <div
          style={{
            maxWidth: "560px",
            maxHeight: "401px",
            minWidth: "320px",
            minHeight: "229px",
            marginRight: "100px",
          }}
        >
          <img
            src={country.flags.svg}
            style={{ width: "100%", height: "100vh !important" }}
          />
        </div>
        <div style={{ width: "560px" }}>
          <h1>{country.name.common}</h1>
          <div className="flex flex-wrap space-between">
            <div>
              <div className="detail">
                <b>Native Name:</b>{" "}
                {
                  country.name.nativeName[
                    Object.keys(country.name.nativeName)[0]
                  ].official
                }
              </div>
              <div className="detail">
                <b>Population:</b> {country.population.toLocaleString("en-IN")}
              </div>
              <div className="detail">
                <b>Region:</b> {country.region}
              </div>
              <div className="detail">
                <b>Sub Region:</b> {country.subregion}
              </div>
              <div className="detail">
                <b>Capital: </b> {country.capital}
              </div>
            </div>
            <div>
              <div className="detail">
                <b>Top Level Domain:</b> {country.tld}
              </div>
              <div className="detail">
                <b>Currencies:</b>{" "}
                {country?.currencies &&
                  Object.keys(country?.currencies).join(", ")}
              </div>
              <div className="detail">
                <b>Languages:</b>{" "}
                {country?.languages &&
                  Object.values(country?.languages).join(", ")}
              </div>
            </div>
          </div>
          {country?.borders?.length && (
            <div
              className="flex flex-wrap"
              style={{ margin: "30px 0px", alignItems: "center" }}
            >
              <div style={{ width: "170px" }}>
                {" "}
                <b> Border Courtries:</b>
              </div>
              <div className="flex flex-wrap">
                {country.borders.map((border: string) => (
                  <div
                    style={{
                      ...(mode === "light"
                        ? style.light.subBody
                        : style.dark.subBody),
                      margin: "10px 20px 10px 0px",
                    }}
                    className="smallBox"
                  >
                    {border}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CountryPage;
