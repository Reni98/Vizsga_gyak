var url = "http://localhost:4003/view";
var id = "view";

async function generator(url, id) {
  var request = await new XMLHttpRequest();

  request.open("GET", url, true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    view(data, request, id);
  };

  request.send();
}

function view(data, request, id) {
  if (id == "view") {
    if (request.status >= 200 && request.status < 400) {
      data.forEach((query) => {
        console.log(request.status);
        var div = document.createElement("tr");
        var mainContainer = document.getElementById(id);
        div.innerHTML =
          "<td>" +
          query.id +
          "</td><td><input id='veznev" +
          query.id +
          "' placeholder='" +
          query.veznev +
          "' value='" +
          query.veznev +
          "'/></td><td><input id='kernev" +
          query.id +
          "' placeholder='" +
          query.kernev +
          "' value='" +
          query.kernev +
          "'/></td><td><input id='phone" +
          query.id +
          "' placeholder='" +
          query.phone +
          "' value='" +
          query.phone +
          "'/></td><td><input id='email" +
          query.id +
          "' placeholder='" +
          query.email +
          "' value='" +
          query.email +
          "'/></td>" +
          "<button onclick = 'deleterecord(" +
          query.id +
          ")' type = 'submit' value='Submit'>Delete</button>" +
          "<button onclick = 'update(" +
          query.id +
          ")'>Update</button>";
        mainContainer.appendChild(div);
      });
    } else {
      console.log("error");
    }
  }
}

async function generate_html() {
  await generator(url, id);
}

function deleterecord(id) {
  navigator.sendBeacon("http://localhost:4003/deleterecord/" + id);
  console.log(id);
}
function update(id) {
  const data =
    id +
    ";" +
    document.getElementById("name" + id).value +
    ";" +
    document.getElementById("age" + id).value +
    ";" +
    document.getElementById("phone" + id).value +
    ";" +
    document.getElementById("email" + id).value;

    navigator.sendBeacon("http://localhost:4001/update/" + data);
    console.log(data);
}

generate_html();
