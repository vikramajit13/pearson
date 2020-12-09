import { reduce, map, filter, orderBy } from "lodash";
import { data } from "../stubData/stubData";

let finalObj = [];
const flatArray = (data) =>
  reduce(
    data,
    (result, obj) => {
      const interimData = map(obj, (val) => val);
      return [...result, ...interimData];
    },
    []
  );

const getMonthAndYear = (date) => {
  if (date) {
    const splitDate = date.split("/");
    const month = splitDate[1];
    const year = splitDate[2];
    return { month: splitDate[1], year: splitDate[2] };
  }
  return { month: "", year: "" };
};

/**
 * make an axios/Ajax call
 * async () => { ... await axios.get(....)}
 * as data is already object skipping this step
 */
export const getCountries = () => {
  const { countries } = data;

  return reduce(
    countries,
    (result, value) => {
      const { country, date, city, temp } = value;
      const { month, year } = getMonthAndYear(date);
      return [
        ...result,
        {
          country,
          city,
          temp,
          month,
          year,
        },
      ];
    },
    []
  );
};

const calculateValues = (data, key) => {
  return reduce(
    data,
    (result, value) => {
      const { month, year, temp, country, city } = value;
      const id = value[key];
      if (!result[id]) {
        result[id] = {
          month,
          temp: temp,
          avg: temp,
          maxTemp: temp,
          minTemp: temp,
          count: 1,
          country,
          city,
          year,
        };
      } else {
        result[id].count += 1;
        result[id].maxTemp =
          temp > result[id].maxTemp ? temp : result[id].maxTemp;
        result[id].minTemp =
          temp < result[id].minTemp ? temp : result[id].minTemp;
        result[id].temp += temp;
        result[id].avg = parseInt(result[id].temp / result[id].count).toFixed(
          2
        );
      }
      return { ...result };
    },
    {}
  );
};

const initReduce = (data, key) => {
  return reduce(
    data,
    (result, value) => {
      const id = value[key];
      if (result[id]) result[id] = [...result[id], { ...value }];
      else result[id] = [{ ...value }];
      return { ...result };
    },
    {}
  );
};

const genericReducer = (returnedData, keys, curr) =>
  reduce(
    returnedData,
    (result, data, id) => {
      if (curr + 1 === keys.length) {
        const newData = calculateValues(data, keys[curr]);
        finalObj = [...finalObj, { ...newData }];
        result[id] = newData;
      }
      if (curr + 1 < keys.length) {
        const reducedData = initReduce(data, keys[curr]);
        result[id] = genericReducer(reducedData, keys, curr + 1);
      }
      return result;
    },
    {}
  );

export const filterCountries = (data, groupBy, keys) => {
  const filteredData = initReduce(data, groupBy);
  genericReducer(filteredData, keys, 0);
  const flattenedArray = flatArray(finalObj);
  finalObj = [];
  return flattenedArray;
};

export const filterCityMonth = (dataSet, city, month) => {
  let data = [...dataSet];
  if (city) {
    data = filter(data, (x) => x.city === city);
  }
  if (month) {
    data = filter(data, (x) => x.month === month);
  }
  return data;
};

export const sortData = (dataSet, sort) => {
  let data = [...dataSet];
  if (sort) {
    return orderBy(data, ["temp"], [sort]);
  }
  return data;
};
