import React, { useEffect, useMemo, useState } from "react";
import {
  Styledselect,
  Searchdiv,
  SearchOuterdiv,
  Innerdiv,
  Styleddiv,
} from "./Countries.styles";

import {
  getCountries,
  filterCountries,
  filterCityMonth,
  sortData,
} from "../Utility/helpers";
import { TableComponent } from "../Component/TableComponent";

export const CountriesContainer = () => {
  const [allData, setAllData] = useState([]);
  const [allFilteredData, setAllFilteredData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [allThirdTable, setAllThirdTable] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    const countries = getCountries(); // async - await
    setAllData(countries);
    setSecondTableData(countries);
  }, []);

  useEffect(() => {
    const filteredData = filterCountries(allData, "country", ["city", "month"]);
    const thirdTableData = filterCountries(allData, "country", ["year"]);
    setFilteredData(filteredData);
    setAllThirdTable(thirdTableData);
    setAllFilteredData(filteredData);
  }, [allData]);

  useEffect(() => {
    const filterData = filterCityMonth(allFilteredData, city, month);
    setFilteredData(filterData);
  }, [city, month]);

  const tableOneColumns = useMemo(() => [
    {
      title: "Country",
      id: "country",
    },
    { title: "City", id: "city" },
    {
      title: "Month",
      id: "month",
    },
    {
      title: "Average Temp",
      id: "avg",
    },
  ]);
  const tableTwoColumns = useMemo(() => [
    {
      title: "Country",
      id: "country",
    },
    { title: "City", id: "city" },
    {
      title: "Month",
      id: "month",
    },
    {
      title: "Year",
      id: "year",
    },
    {
      title: "Temp",
      id: "temp",
    },
  ]);

  const tableThreeColumns = useMemo(() => [
    {
      title: "Country",
      id: "country",
    },
    {
      title: "Year",
      id: "year",
    },
    { title: "Max Temp", id: "maxTemp" },
    { title: "Min Temp", id: "minTemp" },
    {
      title: "Average Temp",
      id: "avg",
    },
  ]);

  const handleCitySelect = ({ target }) => {
    const { value } = target;
    setCity(value);
  };
  const handleMonthSelect = ({ target }) => {
    const { value } = target;
    setMonth(value);
  };

  const handleTempSort = ({ target }) => {
    const { value } = target;
    if (value) {
      const sortedData = sortData(allData, value);
      setSecondTableData(sortedData);
    } else {
      setSecondTableData(allData);
    }
  };

  return (
    <Styleddiv>
      <SearchOuterdiv>
        <Searchdiv>
          <Styledselect onChange={handleCitySelect}>
            <option value="">Select city</option>
            <option value="Sydney">Sydney</option>
            <option value="Melbourne">Melbourne</option>
            <option value="Adelaide">Adelaide</option>
            <option value="Perth">Perth</option>
            <option value="Auckland">Auckland</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Wellington">Wellington</option>
          </Styledselect>
          <Styledselect onChange={handleMonthSelect}>
            <option value="">Select month</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </Styledselect>
        </Searchdiv>
        <Innerdiv>
          <TableComponent data={filteredData} columns={tableOneColumns} />
        </Innerdiv>
      </SearchOuterdiv>
      <SearchOuterdiv>
        <Searchdiv>
          <Styledselect onChange={handleTempSort}>
            <option value="">Select Sorting Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </Styledselect>
        </Searchdiv>
        <Innerdiv>
          <TableComponent data={secondTableData} columns={tableTwoColumns} />
        </Innerdiv>
      </SearchOuterdiv>

      <Innerdiv>
        <TableComponent data={allThirdTable} columns={tableThreeColumns} />
      </Innerdiv>
    </Styleddiv>
  );
};
