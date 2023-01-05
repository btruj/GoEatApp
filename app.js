window.onload = function() {
  // Get references to the form and the list of places
  const addForm = document.getElementById("add-form");
  const placesList = document.getElementById("places-list");
  const placeInput = document.getElementById("place-input");
  const saveButton = document.getElementById("save-button");

  saveButton.addEventListener("click", takeScreenshot);

  function takeScreenshot() {
// Get the placesList element
const placesList = document.getElementById("places-list");

// Create a new element to hold the message
const message = document.createElement("div");
message.innerHTML = "Grocery list:";
message.style.fontSize = "20px";
message.style.fontWeight = "bold";

// Append the message element to the placesList element
placesList.insertBefore(message, placesList.firstChild);

// Use html2canvas to capture the contents of the element as an image
html2canvas(placesList).then(canvas => {
  // Get the image data as a base64-encoded string
  const imageData = canvas.toDataURL("image/png");

  // Create a link element with the image data as the href
  const link = document.createElement("a");
  link.href = imageData;

  // Set the link's download attribute to the current date and time
  const now = new Date();
  link.download = now.toLocaleDateString() + "-" + now.toLocaleTimeString();

  // Click the link to trigger the download
  link.click();

  // Remove the message element from the DOM
  placesList.removeChild(message);
});
}
  // Create an array to store the favorite places
  const favoritePlaces = [];
  
  // Function to handle form submission
  function handleSubmit(event) {
    // Prevent the default action of the form submission
    event.preventDefault();

    // Get the value of the input field
    const place = placeInput.value;
  
    // Add the place to the array of favorite places
    favoritePlaces.push(place);
  
    // Clear the input field
    placeInput.value = "";
  
    // Update the list of places displayed on the page
    updatePlacesList();
  }
  
  // Function to update the list of favorite places displayed on the page
  function updatePlacesList() {
    // Create a new Date object to store the current date and time
    const currentDate = new Date();

    // Format the date and time as desired
    const dateString = currentDate.toLocaleDateString();
  
    // Create an empty string to store the list of places
    let listHTML = "";
  
    // Loop through the array of favorite places
    for (let i = 0; i < favoritePlaces.length; i++) {
      // Add the current date and time to the listHTML string
      listHTML += "<li>" + favoritePlaces[i] + " (" + dateString + ")</li>";
    }
  
    // Set the innerHTML of the placesList element to the listHTML string
    placesList.innerHTML = listHTML;
  }
  
  // Add an event listener to the form to handle submit events
  addForm.addEventListener("submit", handleSubmit);
};
