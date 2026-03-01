// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

let lastScrollTop = 0;
const navbar = document.querySelector(".custom-navbar");

window.addEventListener(
  "scroll",
  function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add("nav-up");
    } else {
      // Scrolling Up - Show Navbar
      navbar.classList.remove("nav-up");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  },
  false,
);

setTimeout(() => {
  const alerts = document.querySelectorAll(".custom-flash");
  alerts.forEach((alert) => {
    const bsAlert = new bootstrap.Alert(alert);
    bsAlert.close();
  });
}, 4000);

window.addEventListener("pageshow", (event) => {
  const loader = document.getElementById("loader-overlay");
  if (loader) {
    // If the page is loaded from the back cache, hide the loader
    loader.style.display = "none";
  }

  //re-enabling any disabled buttons
  const submitBtns = document.querySelectorAll('button[type="submit"]');
  submitBtns.forEach((btn) => (btn.disabled = false));
});

const mainForm = document.querySelector(".needs-validation");
const loader = document.getElementById("loader-overlay");

mainForm.addEventListener("submit", function (event) {
  // Only show loader if the browser's built-in validation passes
  if (mainForm.checkValidity()) {
    loader.style.display = "flex";
  }
});

//copy url 
function copyUrl() {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied! Share it with your friends.");
}

function toggleSave(btn) {
  const icon = btn.querySelector("i");
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");
  icon.classList.toggle("text-rose");
  btn.classList.toggle("border-danger");
}
