document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector('.gallery');
    const breedSelect = document.getElementById('breedSelect');
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');

    const loadDogs = (breed = '', append = true) => {
        let endpoint = breed ? `https://dog.ceo/api/breed/${breed}/images/random/9` : 'https://dog.ceo/api/breeds/image/random/9';

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                if (!append) gallery.innerHTML = ''; // Clear the previous images only if not appending
                data.message.forEach(imageUrl => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    gallery.appendChild(imgElement);
                });
            })
            .catch(error => console.error("Fehler beim Abrufen von Hundebildern:", error));
    };

    const loadBreeds = () => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                for (const breed in data.message) {
                    const option = document.createElement('option');
                    option.value = breed;
                    option.textContent = breed;
                    breedSelect.appendChild(option);
                }
            })
            .catch(error => console.error("Fehler beim Abrufen von Hunderassen:", error));
    };

    breedSelect.addEventListener('change', (e) => {
        loadDogs(e.target.value, false);
    });

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            loadDogs(breedSelect.value);
        }
    });

    // Bild in Vollbild anzeigen, wenn es angeklickt wird
    gallery.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            fullscreenImage.src = event.target.src;
            fullscreenOverlay.style.display = 'flex';
        }
    });

    // Vollbild schließen, wenn auf den dunklen Hintergrund geklickt wird
    fullscreenOverlay.addEventListener('click', (event) => {
        if (event.target === fullscreenOverlay) {
            fullscreenOverlay.style.display = 'none';
        }
    });

    loadBreeds();
    loadDogs();
});