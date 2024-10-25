document.getElementById('menu-toggle').addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    // Toggle the menu visibility
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    
    event.stopPropagation(); // Prevent the click event from bubbling up
});

// Close the dropdown-menu if clicking outside of it
window.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    if (menu.style.display === 'block' && !event.target.matches('#menu-toggle')) {
        menu.style.display = 'none';
    }
});
document.getElementById('username-toggle').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    var dropdown = document.querySelector('.username-dropdown');
    dropdown.classList.toggle('active');
});

// Close the dropdown if clicking outside of it
window.onclick = function(event) {
    if (!event.target.matches('#username-toggle')) {
        var dropdowns = document.getElementsByClassName("username-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('active')) {
                openDropdown.classList.remove('active');
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // Get the dropdown button and content
    var dropdownBtn = document.querySelector('.dropbtn');
    var dropdownContent = document.querySelector('.dropdown-content');
    
    // Detect if screen size is small (less than 768px width)
    function isSmallScreen() {
        return window.innerWidth < 768; // You can adjust the breakpoint as needed
    }

    // Add click functionality for small screens
    dropdownBtn.addEventListener('click', function (event) {
        if (isSmallScreen()) {
            // Toggle the dropdown content on click
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            event.preventDefault(); // Prevent default link action if it's an anchor link
        }
    });

    // Optional: Close the dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (isSmallScreen() && !dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none'; // Close the dropdown if clicked outside
        }
    });
});


function openChatbot() {
    document.getElementById('chatbot-window').style.display = 'flex';
    document.body.classList.add('no-scroll'); // Disable page scroll
}

// Function to close the chatbot window
function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
    document.body.classList.remove('no-scroll'); // Enable page scroll
}

// Handle the "Enter" key press for sending messages
function handleInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Function to send the message

function selectPrompt(promptText) {
    document.getElementById("chatbox").value = promptText;
}
function selectPrompt(promptText) {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");

    // Set the selected prompt text in the input field
    chatInput.value = promptText;

    // Enable the send button since a prompt was selected
    sendButton.disabled = false;
}


// Function to check if input box has content
function checkInput() {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");

    // Log current value for debugging
    console.log(`Current input value: "${chatInput.value.trim()}"`);

    if (chatInput.value.trim() === "") {
        sendButton.disabled = true;  // Disable the button if the input is empty
        sendButton.style.cursor = "not-allowed";  // Change cursor to indicate disabled state
    } else {
        sendButton.disabled = false;  // Enable the button if the input has text
        sendButton.style.cursor = "pointer";  // Change cursor to indicate it's clickable
    }
}


function sendMessage() {
    const chatInput = document.getElementById("chatbox");
    const message = chatInput.value.trim();
    if (message !== "") {
        fetch("/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usermsg: message })
        })
        .then(response => response.json())
        .then(data => {
            const chatContent = document.querySelector('.chat-messages'); // Ensure this selector matches your chat container
            const userMessage = document.createElement('div');
            userMessage.classList.add('user-message');
            userMessage.textContent = message;
            chatContent.appendChild(userMessage);
            chatContent.scrollTop = chatContent.scrollHeight;
            chatInput.value = "";
            document.getElementById("send-btn").disabled = true; 
            document.querySelector('.suggested-prompts').style.display = 'none';
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = data.response;
            chatContent.appendChild(botMessage);
            chatContent.scrollTop = chatContent.scrollHeight;
            document.getElementById("send-btn").disabled = false;
        });
        
    }
}

let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let totalSlides = slides.length;

// Initialize by showing the first slide
slides[slideIndex].classList.add("active");

function showSlides() {
    // Get the current slide and the next slide
    let currentSlide = slides[slideIndex];
    let nextSlide = slides[(slideIndex + 1) % totalSlides]; // Loop to the first after the last

    // Move the current slide out to the left
    currentSlide.style.transform = "translateX(-100%)";
    currentSlide.style.transition = "transform 1s ease-in-out";
    
    // Prepare the next slide to come in from the right
    nextSlide.style.display = "flex";
    nextSlide.style.transform = "translateX(100%)"; // Start off-screen to the right
    nextSlide.style.transition = "none"; // No transition for initial placement
    
    // After a short delay, slide the next one into view
    setTimeout(function() {
        nextSlide.style.transition = "transform 1s ease-in-out";
        nextSlide.style.transform = "translateX(0)"; // Slide into place
    }, 50); // Small delay to ensure smooth transition

    // Update the slideIndex to the next slide
    slideIndex = (slideIndex + 1) % totalSlides;

    // After the animation is done, reset the previous slide for future use
    setTimeout(function() {
        currentSlide.style.display = "none"; // Hide the old slide
        currentSlide.style.transform = "translateX(100%)"; // Reset position off-screen to the right
    }, 1000); // Match this to the transition time (1s)
}

// Start the slideshow with a 10-second interval
setInterval(showSlides, 9000); // Change slide every 10 seconds

const categoriesAndCourses = [
    {
      category: "Marine Ecosystems",
      courses: [
        "Intro to Marine Ecosystems",
        "Marine Foodwebs and Biodiversity",
        "Coral Reefs: Guardians of the Ocean",
        "Human Impact on Marine Ecosystems"
      ]
    },
    {
      category: "Fishing Techniques",
      courses: [
        "Sustainable Fishing Practices",
        "Commercial Fishing Methods",
        "Artisanal Small-scale Fishing",
        "Bycatch Reduction and Fisheries Management"
      ]
    },
    {
      category: "Risk Management",
      courses: [
        "Ocean Risk Assessment and Management",
        "Disaster Preparedness in Coastal Regions",
        "Maritime Law and Risk Mitigation",
        "Oil Spills: Prevention and Response"
      ]
    },
    {
      category: "Weather Patterns",
      courses: [
        "Oceanic and Atmospheric Interactions",
        "Marine Meteorology: Understanding Ocean Weather",
        "Cyclones and Storm Surges: Coastal Impacts",
        "Climate Change and Oceanic Weather Patterns"
      ]
    },
    {
      category: "Navigation",
      courses: [
        "Fundamentals of Marine Navigation",
        "Celestial Navigation for Mariners",
        "Electronic Navigation Systems",
        "Route Planning and Weather Routing"
      ]
    },
    {
      category: "Survival and Safety",
      courses: [
        "Marine Survival Techniques",
        "First Aid and Medical Care at Sea",
        "Firefighting and Emergency Response on Ships",
        "Surviving in Extreme Ocean Conditions"
      ]
    }
  ];
  document.addEventListener("DOMContentLoaded", function() {
    const categoryMenu = document.getElementById("categoryMenu");
    
    categoriesAndCourses.forEach(categoryData => {
      // Create the main category list item
      const categoryLi = document.createElement("li");
      categoryLi.classList.add("has-submenu");
  
      // Create the category link
      const categoryLink = document.createElement("a");
      categoryLink.href = "#";
      categoryLink.innerHTML = `${categoryData.category} <span class="arrow">></span>`;
  
      // Create the submenu for courses
      const submenuUl = document.createElement("ul");
      submenuUl.classList.add("submenu");
  
      // Loop through each course and create its list item
      categoryData.courses.forEach(course => {
        const courseLi = document.createElement("li");
        const courseLink = document.createElement("a");
        courseLink.href = "#";  // Replace with appropriate course link
        courseLink.textContent = course;
  
        // Append course link to the list item, and the item to the submenu
        courseLi.appendChild(courseLink);
        submenuUl.appendChild(courseLi);
      });
  
      // Append the category link and the submenu to the category list item
      categoryLi.appendChild(categoryLink);
      categoryLi.appendChild(submenuUl);
  
      // Finally, append the category list item to the dropdown menu
      categoryMenu.appendChild(categoryLi);
    });
  });
    

// Sample course data (this would normally be fetched from the database)
const courses = [
    {
        name: "Intro to Marine Ecosystems",
        description: "Explore the various types of marine ecosystems, such as coral reefs, mangroves, and deep-sea environments.",
        level: "All Levels",
        image: "course1.jpeg",
    },
    {
        name: "Sustainable Fishing Practices",
        description: "This course covers techniques like selective fishing, gear modifications, and aquaculture for a balanced marine ecosystem.",
        level: "Intermediate",
        image: "course2.jpg",
    },
    {
        name: "Disaster preparedness in coastal regionss",
        description: "Focus on preparing coastal communities and industries for natural disasters like tsunamis.Covers emergency response protocols, disaster recovery strategies.",
        level: "Advanced",
        image: "course3.jpg",
    },
    {
        name: "Oceanic and Atmospheric Interactions",
        description: "This course covers ocean-atmosphere interactions, such as El Niño, La Niña, and their impacts on global climates and marine life.",
        level: "Advanced",
        image: "course4.jpg",
    },
    {
        name: "Coral Reefs: Guardians of the Ocean",
        description: "Learn about their formation, species interactions, and conservation efforts to protect them from bleaching and human impact.",
        level: "All levels",
        image: "course5.jpg",
    },
    {
        name: "Oil Spills: Prevention and Response",
        description: "Learn about technologies and policies designed to prevent spills and the best practices for responding to such disasters.",
        level: "Intermediate",
        image: "course6.jpg",
    },
    {
        name: "Cyclones and Storm Surges: Coastal Impacts",
        description: "Study the formation of tropical cyclones and the mechanisms behind storm surges. Understand the potential damage they cause to coastal communities and the measures for mitigation.",
        level: "Advanced",
        image: "course7.jpg",
    },
    {
        name: "Bycatch Reduction and Fisheries Management",
        description: "This course covers innovative technologies,techniques to reduce bycatch (unintended catch of non-target species) and examines fisheries management policies.",
        level: "Intermediate",
        image: "course8.jpg",
    }
    // Add more courses as necessary
];

// Function to generate course cards
function generateCourses(courseData) {
    const courseContainer = document.getElementById('courseContainer');

    courseData.forEach(course => {
        // Create the course card container
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        // Add course image
        const courseImage = document.createElement('img');
        courseImage.src = course.image; // Image URL from object
        courseImage.alt = course.name;
        courseImage.classList.add('course-img');
        courseCard.appendChild(courseImage);
        
        // Add course name
        const courseName = document.createElement('div');
        courseName.classList.add('course-name');
        courseName.textContent = course.name;
        courseCard.appendChild(courseName);

        // Create the hidden details div
        const courseDetails = document.createElement('div');
        courseDetails.classList.add('course-details');
        
        const detailsHTML = `
            <h3>${course.name}</h3>
            <ul>
                <li><b>${course.level}</b></li>
            </ul>
            <p>${course.description}</p>
            <div class="start-now">Start now</div>
        `;
        courseDetails.innerHTML = detailsHTML;

        // Append the hidden details to the card
        courseCard.appendChild(courseDetails);

        // Append the course card to the container
        courseContainer.appendChild(courseCard);
    });
}

// Call the function to generate the course cards
generateCourses(courses);









