import "./App.css";
import {
  Card,
  MenuItem,
  Select,
  FormControl,
  CardContent,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import InfoBox from "./components/InfoBox";

import Table from "./components/Table";
import { sortData } from "./util";
import LineGraph from "./components/LineGraph";
import 'leaflet/dist/leaflet.css'
import TheMap from "./components/Map";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
    console.log(countryInfo);
  };
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      const data = await axios.get("https://disease.sh/v3/covid-19/countries");
      const countries = data.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(data.data);
      setTableData(sortedData);
      setCountries(countries);
    };
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> Covider </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">World wide</MenuItem>
              {countries.map((country) => (
                <MenuItem value="wroldwid" value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title={"Coronaviurs cases"}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title={"Recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title={"Death"}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <TheMap  /> 
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3> Worldwide new cases </h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
