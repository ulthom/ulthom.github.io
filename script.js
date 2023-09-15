const dogImage = document.getElementById("dogImage");
const getDogButton = document.getElementById("getDogButton");

// Funktion, um ein zufälliges Hundebild abzurufen und anzuzeigen
function getDogImage() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            dogImage.src = imageUrl;
        })
        .catch(error => {
            console.error("Error fetching dog image:", error);
        });
}

// Das Hundebild beim Laden der Seite abrufen
getDogImage();

// Den Button hinzufügen, um bei Bedarf ein neues Bild abzurufen
getDogButton.addEventListener("click", getDogImage);