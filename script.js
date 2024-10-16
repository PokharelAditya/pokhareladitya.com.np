// Countdown Timer and Birthday Date
const birthday = new Date("2024-10-17T00:00:00").getTime(); // Set her birthday date here
const countdownElement = document.getElementById('countdown');
const contentElement = document.getElementById('content');
const initialHappyBirthday = document.getElementById('initial-happy-birthday');
const backgroundMusic = document.getElementById('background-music');

// Countdown Timer Logic
const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Once the countdown reaches 0, show the content and start confetti animation
    if (distance < 0) {
        clearInterval(interval);
        countdownElement.innerHTML = ""; // Hide the countdown timer
        countdownElement.style.display = 'none';
        showInitialHappyBirthday();
    }
}, 1000);

// Function to show initial Happy Birthday message with confetti, then hide it
function showInitialHappyBirthday() {
    initialHappyBirthday.style.display = 'block'; // Show the initial "Happy Birthday" message

    // Confetti effect
    confetti({
        particleCount: 150,
        spread: 60,
        origin: { y: 0.6 }
    });

    // After 3 seconds, hide the initial Happy Birthday message and wait for user interaction
    setTimeout(() => {
        initialHappyBirthday.style.display = 'none';
        showContent();
    }, 3000);
}

// Function to show content after the timer ends and user interaction
function showContent() {
    contentElement.style.display = 'block'; // Show the birthday content

    // Add a click event listener to start music and images on user interaction
    document.body.addEventListener('click', startMusicAndImages, { once: true });
}

// Function to start the background music and display images one by one
function startMusicAndImages() {
    backgroundMusic.play(); // Play background music

    // Display the images one by one, with fade animation
    displayImagesSequence();
}

// Function to display images one by one
function displayImagesSequence() {
    const totalImages = 10;
    let currentImageIndex = 1;

    function showNextImage() {
        if (currentImageIndex > totalImages) {
            backgroundMusic.pause(); // Stop the music after the last image
            showFinalMessageWithBalloons(); // Show final message with balloons after images
            return;
        }

        const currentImage = document.getElementById(`image${currentImageIndex}`);
        currentImage.style.display = 'block'; // Show current image
        currentImage.style.animation = 'fadeIn 1s ease forwards'; // Fade in current image

        currentImage.addEventListener('click', () => {
            currentImage.style.animation = 'fadeOut 1s ease forwards'; // Fade out current image

            setTimeout(() => {
                currentImage.style.display = 'none'; // Hide current image after fade out
                currentImageIndex++; // Move to the next image
                showNextImage(); // Show next image
            }, 1000);
        });
    }

    showNextImage(); // Start showing images
}

// Function to show the final birthday message and balloons
function showFinalMessageWithBalloons() {
    const balloonContainer = document.getElementById('balloon-container');
    const birthdayMessage = document.getElementById('birthdayMessage');

    birthdayMessage.style.display = 'block'; // Show birthday message

    // Create floating balloons
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        balloon.style.animationDuration = 5 + Math.random() * 5 + 's'; // Random animation duration
        balloon.style.width = 50 + Math.random() * 100 + 'px'; // Random balloon size
        balloon.style.height = balloon.style.width; // Balloon width equals height
        balloonContainer.appendChild(balloon);
    }

    // Show balloons container
    balloonContainer.style.display = 'block';

    // After 10 seconds, hide the balloons
    setTimeout(() => {
        balloonContainer.style.animation = 'fadeOutBalloons 2s ease forwards'; // Fade out balloons
        setTimeout(() => balloonContainer.style.display = 'none', 2000); // Hide after fade-out
    }, 10000);
}
