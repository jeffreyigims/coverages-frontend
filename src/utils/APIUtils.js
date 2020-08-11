// const base = "https://coverages-backend.herokuapp.com";
const base = "http://localhost:3000";

// Utility function used in calls to the API service
export function runAjax(link, method = "GET", data = {}, rejectWithValue = {}) {
  var promiseObject = new Promise(async function (resolve, reject) {
    let options;
    if (method === "GET") {
      options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
      link = base + link + "?" + new URLSearchParams(data);
    } else {
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        credentials: "same-origin",
      };
      link = base + link;
    }

    let response = await fetch(link, options);
    if (!response.ok) {
      let res = await response.json().catch((error) => {
        resolve(rejectWithValue(error));
      });
      return resolve(rejectWithValue(res));
    } else {
      return resolve(response.json());
    }
  });

  return promiseObject;
}
