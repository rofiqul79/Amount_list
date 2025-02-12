const buttons = document.querySelectorAll('.main-btn');
let activeDetails = null;

buttons.forEach((mainBtn, index) => {
  const details = mainBtn.nextElementSibling;
  const arrow = details.querySelector('.arrow');
  const buttonContainer = mainBtn.parentElement;

  mainBtn.addEventListener('click', function() {
    // Collapse previously expanded details if they exist
    if (activeDetails && activeDetails !== details) {
      activeDetails.classList.remove('open');
      activeDetails.querySelector('.arrow').style.opacity = '1';
      activeDetails.querySelector('.arrow').style.visibility = 'visible';
      activeDetails.parentElement.classList.remove('shift-up', 'shift-down'); // Reset movement effects
    }

    // Apply shrink and shift effects for the other buttons
    buttons.forEach((otherButton, otherIndex) => {
      const otherContainer = otherButton.parentElement;
      if (otherIndex !== index) {
        if (otherIndex < index) {
          otherContainer.classList.add('shrink-up');
        } else {
          otherContainer.classList.add('shrink-down');
        }
      }
    });

    // Apply shift effect for the clicked button
    buttonContainer.classList.add('shift-up');

    // Toggle button height animation
    mainBtn.classList.add('clicked');
    setTimeout(() => {
      mainBtn.classList.remove('clicked');
    }, 300);

    // Toggle details expansion
    details.classList.toggle('open');

    // Hide or show the arrow based on the details state
    if (details.classList.contains('open')) {
      arrow.style.opacity = '0';
      arrow.style.visibility = 'hidden';
      activeDetails = details;
    } else {
      arrow.style.opacity = '1';
      arrow.style.visibility = 'visible';
      activeDetails = null;
    }

    // Apply expand-contract animation to the button when collapsing
    if (!details.classList.contains('open')) {
      mainBtn.classList.add('expand');
      setTimeout(() => {
        mainBtn.classList.remove('expand');
      }, 300);
    }

    // Reset the position of the buttons after the click
    setTimeout(() => {
      buttonContainer.classList.remove('shift-up');
      buttons.forEach((otherButton, otherIndex) => {
        const otherContainer = otherButton.parentElement;
        otherContainer.classList.remove('shrink-up', 'shrink-down');
      });
    }, 300);
  });
});

let isMenuOpen = false;

function toggleMenu() {
  const menu = document.querySelector('.menu');
  const menuItems = document.querySelectorAll('.menu li');
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!isMenuOpen) {
    menu.style.display = 'block';
    sidebar.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, index * 100); // Delay for each item
    });
  } else {
    sidebar.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove('show');
        if (index === menuItems.length - 1) {
          menu.style.display = 'none';
        }
      }, index * 100); // Delay for each item
    });
  }

  isMenuOpen = !isMenuOpen;
}

// Scroll animation example (if needed)
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.getElementById('feedback-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var feedbackText = document.querySelector('textarea[name="feedback"]').value;

  // AJAX request to send feedback
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'send_feedback.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      showPopup('Feedback sent successfully!');
    } else {
      showPopup('Server problem. Failed to send feedback. Please try again another ways.');
    }
  };
  xhr.send('feedback=' + encodeURIComponent(feedbackText));
});

function showPopup(message) {
  document.getElementById('popup-message').textContent = message;
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector(".search");
  const searchButton = document.querySelector(".search-btn");

  function searchRoll() {
    const rollNumber = searchInput.value.trim();

    if (rollNumber !== "") {
      const buttons = document.querySelectorAll(".main-btn .btn-text");
      let found = false;

      buttons.forEach(button => {
        if (button.textContent === rollNumber) {
          const buttonContainer = button.closest(".button-container");

          // স্ক্রল করে কেন্দ্রে নিয়ে আসা
          buttonContainer.scrollIntoView({ behavior: "smooth", block: "center" });

          // আকার পরিবর্তন করার অ্যানিমেশন
          buttonContainer.style.transition = "transform 0.5s ease-in-out";
          buttonContainer.style.transform = "scale(0.1)";

          setTimeout(() => {
            buttonContainer.style.transform = "scale(1)";
          }, 500);

          found = true;
        }
      });

      if (!found) {
        alert("Couldn’t find your information.");
      }
    }
  }

  // এন্টার কী চাপলে সার্চ করা
  searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchRoll();
    }
  });

  // এন্টার বাটনে ক্লিক করলে সার্চ করা
  searchButton.addEventListener("click", searchRoll);
});

// Function to update total donor count and total amount dynamically
function updateDonorInfo() {
  let totalDonors = document.querySelectorAll(".button-container").length; // Total donors count
  let totalAmount = 0;

  // Loop through each donor's details and extract the amount
  document.querySelectorAll(".button-container .details .text").forEach(textElement => {
    let amount = parseInt(textElement.textContent.replace(/\D/g, ""), 10); // Extract only numeric values

    if (!isNaN(amount)) {
      totalAmount += amount; // Add to total amount
    }
  });

  // Update the table values
  document.querySelector("table tbody tr th:nth-child(1)").textContent = totalDonors;
  document.querySelector("table tbody tr th:nth-child(2)").textContent = totalAmount;
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateDonorInfo);