// Volunteer Form Submission
const volunteerForm = document.getElementById('volunteer-form');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = volunteerForm.elements['name'].value;
        const city = volunteerForm.elements['city'].value;
        const role = volunteerForm.elements['role'].value;
        const email = volunteerForm.elements['email'].value;

        const params = new URLSearchParams({
            'entry.1303205680': name,
            'entry.347142550': city,
            'entry.829702467': role,
            'entry.1051556226': email
        });

        const url = 'https://docs.google.com/forms/d/e/1FAIpQLScLS78T_RFXC6JOhOODWMDz2zkuLOicFlEIs4BT9j9Uc0fhsg/viewform?usp=pp_url&' + params.toString();
        window.open(url, '_blank');
    });
}

// Theme Toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle-btn';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// --- Story Section Logic (for both index.html and stories.html) ---

// Sample Story Data (Replace with real data later)
const stories = [
    {
        id: 1,
        image: 'assets/story1.jpg',
        category: 'rescue',
        title: 'Rescuing Rover',
        shortDescription: 'Our team in Mumbai helped Rover find a forever home!',
        fullStory: 'Rover, a timid stray, was found wandering the streets of Mumbai. Our dedicated rescue team intervened, providing him with much-needed medical care and a safe haven. After weeks of rehabilitation, Rover found his forever home with a loving family who showered him with affection and care. His story is a testament to the power of compassion and second chances.'
    },
    {
        id: 2,
        image: 'assets/story2.jpg',
        category: 'community',
        title: 'Community Park Makeover',
        shortDescription: 'Volunteers transformed a park into a pet-friendly zone.',
        fullStory: 'Our community came together to transform a neglected local park into a vibrant, pet-friendly oasis. Volunteers spent countless hours cleaning, planting, and installing new amenities like waste stations and dog-friendly water fountains. The park is now a beloved spot where pets and their owners can enjoy quality time together, fostering a stronger, more connected community.'
    },
    {
        id: 3,
        image: 'assets/story3.jpg',
        category: 'adoption',
        title: 'Whiskers Finds a Home',
        shortDescription: 'The heartwarming tale of Whiskers, a tiny kitten who found a loving family.',
        fullStory: 'Whiskers, a tiny, abandoned kitten, was brought to our shelter with little hope. Thanks to the tireless efforts of our adoption counselors and foster families, Whiskers blossomed into a playful and affectionate cat. He soon captured the heart of a young couple, who welcomed him into their home, proving that even the smallest creatures can bring the greatest joy.'
    },
    {
        id: 4,
        image: 'assets/story4.jpg',
        category: 'rescue',
        title: 'Journey of Hope: From Streets to Sanctuary',
        shortDescription: 'A dog\'s remarkable recovery and journey to a safe sanctuary.',
        fullStory: 'Found emaciated and injured, Hope\'s journey began with uncertainty. Our rescue partners provided immediate medical attention and a nurturing environment. Through dedicated care and unwavering support, Hope not only recovered physically but also regained her trust in humans. She now lives a peaceful life at our sanctuary, a symbol of resilience and the impact of dedicated rescue efforts.'
    }
];

let storyDetailsModal; // Declare globally for broader access

// Function to initialize story section (called on relevant pages)
function initializeStorySection() {
    const storiesGrid = document.getElementById('storiesGrid');
    const storySearchInput = document.getElementById('storySearch');
    const filterButtons = document.querySelectorAll('[data-filter]');

    if (storiesGrid) {
        // Initialize the story details modal if present
        const modalElement = document.getElementById('storyDetailsModal');
        if (modalElement) {
            storyDetailsModal = new bootstrap.Modal(modalElement);
        }
        
        renderStories(); // Initial render of all stories

        // Add event listeners for filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const filter = event.target.dataset.filter;
                renderStories(filter);
                
                // Update active state of buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-primary');
                });
                event.target.classList.add('active');
                event.target.classList.remove('btn-outline-primary');
                event.target.classList.add('btn-primary');
            });
        });

        // Add event listener for search input
        if (storySearchInput) {
            storySearchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                renderStories(undefined, searchTerm); // Render with search term
            });
        }
    }
}

function renderStories(filter = 'all', searchTerm = '') {
    const storiesGrid = document.getElementById('storiesGrid');
    if (!storiesGrid) return;

    storiesGrid.innerHTML = ''; // Clear existing stories

    let filteredStories = stories;

    // Apply filter
    if (filter !== 'all') {
        filteredStories = filteredStories.filter(story => story.category === filter);
    }

    // Apply search
    if (searchTerm) {
        filteredStories = filteredStories.filter(story => 
            story.title.toLowerCase().includes(searchTerm) || 
            story.shortDescription.toLowerCase().includes(searchTerm) ||
            story.fullStory.toLowerCase().includes(searchTerm)
        );
    }

    filteredStories.forEach(story => {
        const storyCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${story.image}" class="card-img-top" alt="${story.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${story.title}</h5>
                        <p class="card-text">${story.shortDescription}</p>
                        <button class="btn btn-outline-primary" onclick="openStoryDetails(${story.id})">Read More</button>
                    </div>
                </div>
            </div>
        `;
        storiesGrid.innerHTML += storyCard;
    });
}

function openStoryDetails(storyId) {
    const story = stories.find(s => s.id === storyId);
    if (!story || !storyDetailsModal) return;

    const storyDetailsContent = document.getElementById('storyDetailsContent');
    if (storyDetailsContent) {
        storyDetailsContent.innerHTML = `
            <div class="text-center mb-4">
                <img src="${story.image}" class="img-fluid rounded" alt="${story.title}" style="max-height: 400px; object-fit: cover;">
            </div>
            <h3 class="mb-3">${story.title}</h3>
            <p class="lead">${story.fullStory}</p>
        `;
        storyDetailsModal.show();
    }
}

// --- End Story Section Logic ---

// Function to open adoption modal
function openAdoptionModal(petName) {
    const modalElement = document.getElementById('adoptionModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        const petInput = modalElement.querySelector('input[name="petPreference"]');
        if (petInput) {
            petInput.value = petName;
        }
        modal.show();
    }
}

// --- Story Modal (Share Your Story) ---
// This modal is used for sharing new stories, distinct from story details.
// Its HTML is now in index.html and stories.html directly, so we just need functions to open/submit.

function openStoryModal() {
    const storyModalElement = document.getElementById('storyModal');
    if (storyModalElement) {
        const storyModal = new bootstrap.Modal(storyModalElement);
        storyModal.show();
    }
}

// Main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    // Initialize story section if elements exist on the page
    initializeStorySection();

    // Pet Adoption Carousel (only on index.html)
    const carousel = document.getElementById('adoptionCarousel');
    if (carousel) {
        // Sample pet data (in a real application, this would come from an API)
        const pets = [
            {
                name: "Max",
                description: "A playful 2-year-old Labrador. Loves playing fetch and is great with children.",
                image: "assets/pet1.jpg",
                age: "2 years",
                breed: "Labrador",
                gender: "Male",
                health: "Vaccinated & Neutered"
            },
            {
                name: "Luna",
                description: "A gentle 1-year-old Siamese cat. Very affectionate and loves cuddles.",
                image: "assets/pet2.jpg",
                age: "1 year",
                breed: "Siamese",
                gender: "Female",
                health: "Vaccinated & Spayed"
            },
            {
                name: "Rocky",
                description: "An energetic 3-year-old Danish-Swedish Farmdog. Great guard dog and loves outdoor activities.",
                image: "assets/pet3.jpg",
                age: "3 years",
                breed: "Danish-Swedish Farmdog",
                gender: "Male",
                health: "Vaccinated & Neutered"
            },
            {
                name: "Bella",
                description: "A sweet 2-year-old Beagle. Perfect family dog, loves walks and playing in the park.",
                image: "assets/pet4.jpg",
                age: "2 years",
                breed: "Beagle",
                gender: "Female",
                health: "Vaccinated & Spayed"
            },
            {
                name: "Charlie",
                description: "A friendly 1-year-old Beagle. Great with kids and loves swimming.",
                image: "assets/pet5.jpg",
                age: "1 year",
                breed: "Beagle",
                gender: "Male",
                health: "Vaccinated & Neutered"
            },
            {
                name: "Milo",
                description: "A playful 2-year-old Siamese cat. Very social and loves attention.",
                image: "assets/pet6.jpg",
                age: "2 years",
                breed: "Siamese",
                gender: "Male",
                health: "Vaccinated & Neutered"
            }
        ];

        // Create carousel items
        const carouselInner = carousel.querySelector('.carousel-inner');
        if (carouselInner) {
            carouselInner.innerHTML = ''; // Clear existing items
            pets.forEach((pet, index) => {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                if (index === 0) item.classList.add('active');

                item.innerHTML = `
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${pet.image}" class="card-img-top" alt="${pet.name}" style="height: 300px; object-fit: cover;">
                                <div class="card-body">
                                    <h5 class="card-title">${pet.name}</h5>
                                    <p class="card-text">${pet.description}</p>
                                    <button class="btn btn-primary w-100" onclick="openAdoptionModal('${pet.name}')">
                                        <i class="fas fa-heart me-2"></i>Adopt Me
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                carouselInner.appendChild(item);
            });
        }
    }

    // Handle story form submission (exists on both index.html and stories.html)
    const storyForm = document.getElementById('story-form'); 
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = storyForm.elements['storyName'].value;
            const email = storyForm.elements['storyEmail'].value;
            const storyText = storyForm.elements['storyText'].value; 

            fetch('https://script.google.com/macros/s/AKfycbwf5klHdDnt1TrpkukaNnqWLhrNiqTK8_AX4G3CYIjYUjSjR0x__GvPM9m238qm-88FvA/exec', {
                method: 'POST',
                body: JSON.stringify({ name, email, story: storyText }), 
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                alert('Thank you for sharing your story!');
                storyForm.reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('storyModal'));
                if (modal) modal.hide();
            })
            .catch(() => {
                alert('There was an error submitting your story. Please try again later.');
            });
        });
    }
});

// Chatbot functionality
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatClose = document.getElementById('chat-close');

if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });
}

if (chatInput && chatSend) {
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Get bot response
        const response = getBotResponse(message);
        setTimeout(() => addChatMessage(response, 'bot'), 500);
    };
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    chatSend.addEventListener('click', sendMessage);
}

function addChatMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('volunteer') || message.includes('help')) {
        return "You can volunteer by filling out the form on our homepage. We're always looking for passionate people to join our cause!";
    } else if (message.includes('adopt') || message.includes('adoption')) {
        return "Check out our adoption section to see available pets. Each pet has been vetted and is ready for their forever home!";
    } else if (message.includes('donate') || message.includes('donation')) {
        return "Your donations help us continue our mission! You can donate through our secure payment portal on the website.";
    } else if (message.includes('story') || message.includes('share')) {
        return "We'd love to hear your story! Click the 'Share Your Story' button to tell us about your experience.";
    } else {
        return "I'm here to help! You can ask me about volunteering, adoption, donations, or sharing your story.";
    }
}

// Initialize EmailJS with your public key
(function() {
    emailjs.init("oQww6R6aELB8OWd1S");
})();

// Handle adoption request form submission
document.getElementById('adoption-request-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const templateParams = {
        to_email: 'jintojoseph.jo@gmail.com',
        from_name: formData.get('adopterName'),
        from_email: formData.get('adopterEmail'),
        phone: formData.get('adopterPhone'),
        pet_name: formData.get('petName'),
        adoption_reason: formData.get('adoptionReason')
    };

    emailjs.send('service_umxvayz', 'template_2v3ulhk', templateParams)
        .then(function(response) {
            alert('Adoption request submitted successfully! We will contact you soon.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('adoptionRequestModal'));
            modal.hide();
            document.getElementById('adoption-request-form').reset();
        }, function(error) {
            alert('Failed to submit adoption request. Please try again later.');
            console.error('EmailJS error:', error);
        });
});

// Handle pet surrender form submission
document.getElementById('surrender-pet-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const templateParams = {
        to_email: 'jintojoseph.jo@gmail.com',
        from_name: formData.get('ownerName'),
        from_email: formData.get('ownerEmail'),
        phone: formData.get('ownerPhone'),
        pet_name: formData.get('petName'),
        pet_type: formData.get('petType'),
        pet_age: formData.get('petAge'),
        pet_description: formData.get('petDescription'),
        surrender_reason: formData.get('surrenderReason')
    };

    emailjs.send('service_umxvayz', 'template_pwh03s9', templateParams)
        .then(function(response) {
            alert('Pet surrender request submitted successfully! We will contact you soon.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('surrenderPetModal'));
            modal.hide();
            document.getElementById('surrender-pet-form').reset();
        }, function(error) {
            alert('Failed to submit surrender request. Please try again later.');
            console.error('EmailJS error:', error);
        });
});

// Handle contact form submission (redirects to Google Form with pre-filled data)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const name = this.elements.name.value;
    const email = this.elements.email.value;
    const subject = this.elements.subject.value;
    const message = this.elements.message.value;

    // IMPORTANT: Replace these with the actual entry.xxxxxxxx IDs from your NEW Google Form
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf2jjItS8WeyvMIEcoRlRdPAINOQTiz-aN0qs3jq3RkKG78Kw/viewform?usp=pp_url"; // Updated Google Form URL
    
    // Correct entry IDs extracted from the provided pre-fill link
    const nameEntryId = "entry.509298931"; 
    const emailEntryId = "entry.159109244";
    const subjectEntryId = "entry.910979992"; 
    const messageEntryId = "entry.197902082"; 

    let prefilledUrl = `${googleFormUrl}`;
    if (name) prefilledUrl += `&${nameEntryId}=${encodeURIComponent(name)}`;
    if (email) prefilledUrl += `&${emailEntryId}=${encodeURIComponent(email)}`;
    if (subject) prefilledUrl += `&${subjectEntryId}=${encodeURIComponent(subject)}`;
    if (message) prefilledUrl += `&${messageEntryId}=${encodeURIComponent(message)}`;

    window.open(prefilledUrl, '_blank');
    this.reset(); // Reset the form after opening the Google Form
});

// Function to open adoption request modal with pet name
function openAdoptionRequest(petName) {
    document.getElementById('pet-name').value = petName;
    const adoptionModal = new bootstrap.Modal(document.getElementById('adoptionRequestModal'));
    adoptionModal.show();
}

// Sample pets data with local assets images
const pets = [
    {
        name: "Max",
        description: "A playful 2-year-old Labrador. Loves playing fetch and is great with children.",
        image: "assets/pet1.jpg",
        age: "2 years",
        breed: "Labrador",
        gender: "Male",
        health: "Vaccinated & Neutered"
    },
    {
        name: "Luna",
        description: "A gentle 1-year-old Siamese cat. Very affectionate and loves cuddles.",
        image: "assets/pet2.jpg",
        age: "1 year",
        breed: "Siamese",
        gender: "Female",
        health: "Vaccinated & Spayed"
    },
    {
        name: "Rocky",
        description: "An energetic 3-year-old Danish-Swedish Farmdog. Great guard dog and loves outdoor activities.",
        image: "assets/pet3.jpg",
        age: "3 years",
        breed: "Danish-Swedish Farmdog",
        gender: "Male",
        health: "Vaccinated & Neutered"
    },
    {
        name: "Bella",
        description: "A sweet 2-year-old Beagle. Perfect family dog, loves walks and playing in the park.",
        image: "assets/pet4.jpg",
        age: "2 years",
        breed: "Beagle",
        gender: "Female",
        health: "Vaccinated & Spayed"
    },
    {
        name: "Charlie",
        description: "A friendly 1-year-old Beagle. Great with kids and loves swimming.",
        image: "assets/pet5.jpg",
        age: "1 year",
        breed: "Beagle",
        gender: "Male",
        health: "Vaccinated & Neutered"
    },
    {
        name: "Milo",
        description: "A playful 2-year-old Siamese cat. Very social and loves attention.",
        image: "assets/pet6.jpg",
        age: "2 years",
        breed: "Siamese",
        gender: "Male",
        health: "Vaccinated & Neutered"
    }
];

// Initialize the carousel with pets
function initializeCarousel() {
    const carouselInner = document.querySelector('#adoptionCarousel .carousel-inner');
    if (!carouselInner) return;

    // Clear existing content
    carouselInner.innerHTML = '';

    // Add pet items
    pets.forEach((pet, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <div class="card h-100" style="max-width: 300px; margin: 0 auto;">
                <img src="${pet.image}" class="card-img-top" alt="${pet.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text small">${pet.description}</p>
                    <div class="pet-details mb-2">
                        <small class="theme-text">
                            <i class="fas fa-birthday-cake me-1"></i>${pet.age} | 
                            <i class="fas fa-paw me-1"></i>${pet.breed} | 
                            <i class="fas fa-venus-mars me-1"></i>${pet.gender}
                        </small>
                    </div>
                    <button class="btn btn-primary btn-sm mt-auto" onclick="openAdoptionRequest('${pet.name}')">
                        Adopt Me
                    </button>
                </div>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });

    // Initialize Bootstrap carousel with specific options
    const carousel = new bootstrap.Carousel(document.getElementById('adoptionCarousel'), {
        interval: 2000, // Auto-slide every 2 seconds
        wrap: true,
        pause: 'hover',
        keyboard: true
    });

    // Add custom styles for carousel controls
    const style = document.createElement('style');
    style.textContent = `
        #adoptionCarousel .carousel-control-prev,
        #adoptionCarousel .carousel-control-next {
            width: 40px;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            margin: 0 20px;
        }
        #adoptionCarousel .carousel-control-prev {
            left: 0;
        }
        #adoptionCarousel .carousel-control-next {
            right: 0;
        }
        #adoptionCarousel .carousel-control-prev-icon,
        #adoptionCarousel .carousel-control-next-icon {
            width: 20px;
            height: 20px;
        }
    `;
    document.head.appendChild(style);

    // Prevent carousel from auto-sliding when modal is open
    document.getElementById('adoptionRequestModal').addEventListener('show.bs.modal', function () {
        carousel.pause();
    });

    document.getElementById('adoptionRequestModal').addEventListener('hidden.bs.modal', function () {
        carousel.cycle();
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initializeCarousel();

    // Initialize all modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        new bootstrap.Modal(modal);
    });
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Update icon
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Add theme styles
const themeStyles = document.createElement('style');
themeStyles.textContent = `
    :root {
        --primary-color: #28a745;
        --text-color: #333;
        --bg-color: #ffffff;
        --card-bg: #ffffff;
        --border-color: #dee2e6;
        --navbar-bg: #ffffff;
        --btn-primary-bg: #28a745;
        --btn-primary-hover: #218838;
    }

    .dark-theme {
        --primary-color: #0d6efd;
        --text-color: #e9ecef;
        --bg-color: #212529;
        --card-bg: #2c3034;
        --border-color: #495057;
        --navbar-bg: #2c3034;
        --btn-primary-bg: #0d6efd;
        --btn-primary-hover: #0b5ed7;
    }

    body {
        background-color: var(--bg-color);
        color: var(--text-color);
        transition: background-color 0.3s, color 0.3s;
    }

    .navbar {
        background-color: var(--navbar-bg) !important;
    }

    .nav-link {
        color: var(--text-color) !important;
    }

    .nav-link:hover {
        color: var(--primary-color) !important;
    }

    .navbar-brand {
        color: var(--primary-color) !important;
    }

    .card {
        background-color: var(--card-bg);
        border-color: var(--border-color);
    }

    .theme-text {
        color: var(--text-color) !important;
    }

    .theme-image {
        filter: brightness(0.8) contrast(1.2);
    }

    .btn-primary {
        background-color: var(--btn-primary-bg);
        border-color: var(--btn-primary-bg);
    }

    .btn-primary:hover {
        background-color: var(--btn-primary-hover);
        border-color: var(--btn-primary-hover);
    }

    .btn-outline-primary {
        color: var(--primary-color);
        border-color: var(--primary-color);
    }

    .btn-outline-primary:hover {
        background-color: var(--primary-color);
        color: var(--bg-color);
    }

    .dark-theme .btn-outline-primary {
        color: var(--text-color);
        border-color: var(--text-color);
    }

    .dark-theme .btn-outline-primary:hover {
        background-color: var(--text-color);
        color: var(--bg-color);
    }

    .modal-content {
        background-color: var(--card-bg);
        color: var(--text-color);
    }

    .form-control {
        background-color: var(--bg-color);
        color: var(--text-color);
        border-color: var(--border-color);
    }

    .form-control:focus {
        background-color: var(--bg-color);
        color: var(--text-color);
        border-color: var(--primary-color);
    }

    .text-primary {
        color: var(--primary-color) !important;
    }

    .blockquote-footer {
        color: var(--primary-color) !important;
    }

    .feature-card {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
    }

    .feature-card i {
        color: var(--primary-color);
    }
`;
document.head.appendChild(themeStyles);