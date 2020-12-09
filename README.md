# pearson

Pearson test

# This code is for a Test and is not production ready.

# main functionality

Main functionality of the code is in helper.js.

Below mentioned function is the backbone of the application, it reduce the array of objects based on the keys supplied.

props are as follows
returnedData - data that is to be traversed - array of object.
Keys - keys supplied on which data has to be grouped - array of strings.
curr - is an internally used counter.

```Javascript
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

```

Following function - returns a flattened array so that looping in JSX is to the minimum

```Javascript
const flatArray = (data) =>
  reduce(
    data,
    (result, obj) => {
      const interimData = map(obj, (val) => val);
      return [...result, ...interimData];
    },
    []
  );
```

Following function is a generic function used for grouping and is used in genericReducer and initial grouping by country

```Javascript
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
```

other important functions include sorting and filtering, which do the task as described by there name.

remaining functions can be found in the code.

# Conatiner component

Due to lack of time, redux and redux-saga was ignored and all state is maintained internally

```Javascript

/// NOTE: all data is computed by only one function just by passing different arguments
/// contains entire data fetched helpful for grouping and supply to second table when not sorting
const [allData, setAllData] = useState([]);
// contains the entire filtered data from generic reducer, so that we don't need to compute it again.
  const [allFilteredData, setAllFilteredData] = useState([]);

  // data for second table saved to prevent computation and
  const [secondTableData, setSecondTableData] = useState([]);

  // grouped data for final table
  const [allThirdTable, setAllThirdTable] = useState([]);
```

Hooks used at relevant places.

Styling done with styled-components - nothing Fancy there.

# Component

created only one Table component which can be used again as columns are configurable.

# Unit Testing include

App.jsx
countries.jsx
helper.js
