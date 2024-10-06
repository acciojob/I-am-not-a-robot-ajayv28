//your code here
const images = [
    'img1', 'img2', 'img3', 'img4', 'img5'
];

// Generate random images with one duplicate
function generateImages() {
    const selectedImages = [];
    const randomIndex = Math.floor(Math.random() * images.length);
    const duplicateImage = images[randomIndex];

    // Select 5 unique images
    while (selectedImages.length < 5) {
        const index = Math.floor(Math.random() * images.length);
        if (!selectedImages.includes(images[index])) {
            selectedImages.push(images[index]);
        }
    }

    // Add the duplicate image
    selectedImages.push(duplicateImage);
    
    // Shuffle the images
    return selectedImages.sort(() => Math.random() - 0.5);
}

// Initialize the game
let clickedImages = [];
let selectedClasses = generateImages();
const imageContainer = document.getElementById('image-container');

function renderImages() {
    imageContainer.innerHTML = '';
    selectedClasses.forEach((cls, index) => {
        const img = document.createElement('img');
        img.className = cls;
        img.dataset.index = index; // Store the index for verification
        img.addEventListener('click', handleImageClick);
        imageContainer.appendChild(img);
    });
}

// Handle image click
function handleImageClick(event) {
    const clickedClass = event.target.className;

    // Prevent double clicking the same image
    if (clickedImages.includes(clickedClass)) return;

    clickedImages.push(clickedClass);
    event.target.classList.add('selected');

    // Show the reset button
    document.getElementById('reset').style.display = 'block';

    // Show the verify button if two images are clicked
    if (clickedImages.length === 2) {
        document.getElementById('verify').style.display = 'block';
    }
}

// Reset function
function reset() {
    clickedImages = [];
    document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('para').textContent = '';
    renderImages();
}

// Verify function
function verify() {
    if (clickedImages[0] === clickedImages[1]) {
        document.getElementById('para').textContent = 'You are a human. Congratulations!';
    } else {
        document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    document.getElementById('verify').style.display = 'none'; // Hide verify button
}

// Event listeners
document.getElementById('reset').addEventListener('click', reset);
document.get
