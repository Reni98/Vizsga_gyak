function sendPost() {
    const data =
      document.getElementById("veznev").value +
      ";" +
      document.getElementById("kernev").value +
      ";" +
      document.getElementById("phone").value +
      ";" +
      document.getElementById("email").value;
    console.log(data);
    navigator.sendBeacon("http:localhost:4003/savedetails/" + data);
    console.log(data);
  }
  