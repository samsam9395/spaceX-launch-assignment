const functionsList = {
  headerVariablesInData: {
    "Mission Name": "mission_name",
    "Rocket Name": "rocket_name",
    "Rocket Type": "rocket_type",
    "Launch Date": "launch_date_local",
  },
  translateConditionDate: function (condition) {
    const monthList = {
      janurary: "1",
      feburary: "2",
      march: "3",
      april: "4",
      may: "5",
      june: "6",
      july: "7",
      august: "8",
      september: "9",
      october: "10",
      november: "11",
      december: "12",
    };

    const conditionArray = condition.toLowerCase().replace(/\s/g, "");
    const possible = [];

    for (let [key, value] of Object.entries(monthList)) {
      if (key[0] === conditionArray[0] && key.includes(conditionArray)) {
        possible.push(value);
      }
    }

    return possible;
  },
  handleSearch: function (inputCondition, data) {
    function checkInclude(item, inputCondition) {
      const condition = inputCondition.replace(/\s/g, "");
      if (!condition) return true;
      if (
        condition.length === 1 &&
        (item.mission_name.toLowerCase()[0] === condition ||
          item.rocket.rocket_name.toLowerCase()[0] === condition ||
          item.rocket.rocket_type.toLowerCase()[0] === condition ||
          item.launch_date_local.toLowerCase()[0] === condition)
      ) {
        return true;
      }
      if (
        condition.length > 1 &&
        (item.mission_name.toLowerCase().includes(condition) ||
          item.rocket.rocket_name.toLowerCase().includes(condition) ||
          item.rocket.rocket_type.toLowerCase().includes(condition) ||
          item.launch_date_local.toLowerCase().includes(condition))
      )
        return true;

      return false;
    }

    const filteredList = data.launches.filter((each) =>
      checkInclude(each, inputCondition)
    );

    if (typeof inputCondition === "string") {
      const meetConditions = [];
      const possibleDates =
        functionsList.translateConditionDate(inputCondition);

      if (possibleDates.length >= 1) {
        data.launches.forEach((eachData) => {
          possibleDates.forEach((date) => {
            if (
              parseInt(
                eachData.launch_date_local.split("T")[0].split("-")[1]
              ) === parseInt(date)
            ) {
              meetConditions.push(eachData);
            }
          });
        });
        return Array.from(new Set([...filteredList, ...meetConditions]));
      }
    }

    return filteredList;
  },
  handleSorting: function (titleName, setMutatedData, reverseSort) {
    setMutatedData((prev) =>
      setMutatedData([
        ...prev.sort((a, b) =>
          functionsList.compare(a, b, titleName, reverseSort)
        ),
      ])
    );
  },
  compare: function (a, b, titleName, reverseSort) {
    const convertedTItleName = functionsList.headerVariablesInData[titleName];
    switch (titleName) {
      case "Mission Name":
        if (a[convertedTItleName] < b[convertedTItleName]) {
          return reverseSort ? -1 : 1;
        }
        if (a[convertedTItleName] > b[convertedTItleName]) {
          return reverseSort ? 1 : -1;
        }
        return 0;
      case "Rocket Type":
      case "Rocket Name":
        if (a.rocket[convertedTItleName] < b.rocket[convertedTItleName]) {
          return reverseSort ? -1 : 1;
        }
        if (a.rocket[convertedTItleName] > b.rocket[convertedTItleName]) {
          return reverseSort ? 1 : -1;
        }
        return 0;
      case "Launch Date":
        if (new Date(a[convertedTItleName]) < new Date(b[convertedTItleName])) {
          return reverseSort ? -1 : 1;
        }
        if (new Date(a[convertedTItleName]) > new Date(b[convertedTItleName])) {
          return reverseSort ? 1 : -1;
        }
        return 0;

      default:
        return 0;
    }
  },
};

export default functionsList;
