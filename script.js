const dogImage = document.getElementById("dogImage");
const getDogButton = document.getElementById("getDogButton");

getDogButton.addEventListener("click", () => {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            dogImage.src = imageUrl;
        })
        .catch(error => {
            console.error("Error fetching dog image:", error);
        });
});
