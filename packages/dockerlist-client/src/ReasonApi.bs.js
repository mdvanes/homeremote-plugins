// Generated by ReScript, PLEASE EDIT WITH CARE


function myFunc(param) {
  return Promise.resolve({
              hd: "a",
              tl: /* [] */0
            });
}

function fetchDogs(param) {
  return fetch("https://dog.ceo/api/breeds/image/random/3").then(function (response) {
                  return response.json();
                }).then(function (jsonResponse) {
                return Promise.resolve(jsonResponse.message);
              }).catch(function (_err) {
              return Promise.resolve([]);
            });
}

function getDockerList(param) {
  return fetch("http://localhost:3100/api/dockerlist").then(function (response) {
                  return response.json();
                }).then(function (jsonResponse) {
                return Promise.resolve(jsonResponse.containers);
              }).catch(function (_err) {
              return Promise.resolve([]);
            });
}

export {
  myFunc ,
  fetchDogs ,
  getDockerList ,
  
}
/* No side effect */
