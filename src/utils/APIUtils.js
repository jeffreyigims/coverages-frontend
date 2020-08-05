function resolve(response) {
  return response;
}

function reject(response) {
  return response;
}

export function runAjax(link, method = "GET", data = {}, rejectWithValue = {}) {
  var promiseObject = new Promise(async function (resolve, reject) {
    let options;
    if (method === "GET") {
      options = {
        method: "GET",
      };
      link = link + "?" + new URLSearchParams(data);
    } else {
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      };
    }

    let response = await fetch(link, options);
    const r = response;
    if (!response.ok) {
      let res = await response.json().catch((error) => {
        resolve(rejectWithValue({ status: r.statusText }));
      });
      return resolve(rejectWithValue(res));
    }
    // if (method === "DELETE") {
    //   return "Success";
    // }
    return resolve(response.json());
  });
  // console.log(promiseObject)
  return promiseObject;
}

// export function runAjax(link, method = "GET", data = {}) {
//   var promiseObject = new Promise(async function (resolve, reject) {
//     let options;
//     if (method == "GET") {
//       options = { method: method };
//     } else {
//       options = {
//         method: method,
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "same-origin",
//       };
//     }
//
//     fetch(link, options)
//       .then((response) => {
//         if (!response.ok) {
//           throw response;
//         }
//         return reject(response.json());
//       })
//       .then((result) => {
//         // callback(result);
//       })
//       .catch((error) => {
//         if (error.statusText) {
//           reject(error)
//         }
//       });
//   });
// }
