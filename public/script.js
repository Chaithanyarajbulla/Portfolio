// scroll to top functionality
const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Nav hamburgerburger selections

const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

burger.addEventListener("click", () => {
    ul.classList.toggle("show");
  });

  // Close hamburger menu when a link is clicked

// Select nav links
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);


document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.querySelector(".text");
  const phrases = ["I am developer", "I am a designer", "Coder", "Gamer"];

  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetweenPhrases = 2000;
  let phraseIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < phrases[phraseIndex].length) {
      textElement.textContent += phrases[phraseIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetweenPhrases);
    }
  }

  function erase() {
    if (charIndex > 0) {
      textElement.textContent = phrases[phraseIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, typingSpeed);
    }
  }

  setTimeout(type, delayBetweenPhrases);
});
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["Software Developer"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;
function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}
function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}
document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
/*Contact Form*/
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("response-message");

    responseMessage.textContent = "Sending..."; // Show a message while sending
    responseMessage.style.color = "blue";

    try {
      const response = await fetch("/api/send-email.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      responseMessage.textContent = data.message;
      responseMessage.style.color = response.ok ? "green" : "red";
      if (response.ok) {
        setTimeout(() => {
          window.location.reload(); // Ensure full page refresh
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      responseMessage.textContent = "Error sending email.";
      responseMessage.style.color = "red";
    }
  });

