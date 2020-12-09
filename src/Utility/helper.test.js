import "@testing-library/jest-dom";
import { filterCountries, sortData, filterCityMonth } from "./helpers";

describe("testing utility function", () => {
  const stubData = [
    { country: "Australia", city: "Sydney", temp: 18, month: "05", year: 2015 },
    { country: "Australia", city: "Sydney", temp: 19, month: "05", year: 2015 },
  ];

  it("should return flattened array", () => {
    const actual = filterCountries(stubData, "country", ["city", "month"]);
    const expected = [
      {
        country: "Australia",
        city: "Sydney",
        temp: 37,
        month: "05",
        year: 2015,
        maxTemp: 19,
        minTemp: 18,
        avg: "18.00",
        count: 2,
      },
    ];
    expect(actual).toEqual(expected);
  });

  it("should return sorted array in ascending order", () => {
    const actual = sortData(stubData, "asc");
    const expected = [
      {
        country: "Australia",
        city: "Sydney",
        temp: 18,
        month: "05",
        year: 2015,
      },

      {
        country: "Australia",
        city: "Sydney",
        temp: 19,
        month: "05",
        year: 2015,
      },
    ];

    expect(actual).toEqual(expected);
  });

  it("should return data in desc order", () => {
    const actual = sortData(stubData, "desc");
    const expected = [
      {
        country: "Australia",
        city: "Sydney",
        temp: 19,
        month: "05",
        year: 2015,
      },

      {
        country: "Australia",
        city: "Sydney",
        temp: 18,
        month: "05",
        year: 2015,
      },
    ];

    expect(actual).toEqual(expected);
  });

  it("should return filtered data as per city", () => {
    const data = [
      {
        country: "Australia",
        city: "Melbourne",
        temp: 18,
        month: "05",
        year: 2015,
      },
      {
        country: "Australia",
        city: "Sydney",
        temp: 19,
        month: "05",
        year: 2015,
      },
    ];

    const actual = filterCityMonth(data, "Melbourne");
    const expected = [
      {
        country: "Australia",
        city: "Melbourne",
        temp: 18,
        month: "05",
        year: 2015,
      },
    ];
    expect(actual).toEqual(expected);
  });
});
