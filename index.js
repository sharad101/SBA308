const dog = document.getElementById('dog');
const breedInput = document.getElementById('breedInput');
const searchBtn = document.getElementById('searchBtn');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;

// Fetch random dog image
async function fetchRandomDogImage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const jsonData = await response.json();
    return jsonData.message;
}

// Fetch dog images by breed
async function fetchDogsByBreed(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const jsonData = await response.json();
    return jsonData.message;
}

// Render dog image
function renderDogImage(element, url) {
    element.src = url;
}

// Render pagination
function renderPagination(container, totalPages) {
    container.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.dataset.action = 'page';
        container.appendChild(button);
    }
}

// Initial load
getNewDog();

// Event listeners
dog.addEventListener("click", getNewDog);
searchBtn.addEventListener("click", searchByBreed);

// Get a new random dog image
async function getNewDog() {
    try {
        dog.style.cursor = 'wait';
        const url = await fetchRandomDogImage();
        renderDogImage(dog, url);
        dog.style.cursor = 'pointer';
    } catch (error) {
        console.error('Error fetching random dog image:', error);
    }
}

// Search dog images by breed
async function searchByBreed() {
    const breed = breedInput.value.trim();
    if (breed) {
        try {
            const urls = await fetchDogsByBreed(breed);
            renderDogImage(dog, urls[0]);
            renderPagination(paginationContainer, urls.length);
            currentPage = 1;
        } catch (error) {
            console.error('Error fetching dogs by breed:', error);
        }
    }
}

// Pagination event listener
paginationContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const action = event.target.dataset.action;
        if (action === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (action === 'next' && currentPage < paginationContainer.children.length) {
            currentPage++;
        }
        renderDogImage(dog, dogImages[currentPage - 1]);
    }
});
