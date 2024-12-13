const darkModeToggle = document.getElementById("dark-mode-toggle");

const feedbackForm = document.getElementById("feedback-form");

const resetDataBtn = document.getElementById("reset-data");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  if (darkModeToggle) {
    darkModeToggle.textContent = "Enable Light Mode";
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
      darkModeToggle.textContent = "Enable Dark Mode";
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
      darkModeToggle.textContent = "Disable Dark Mode";
    }
  });
}

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const feedbackText = document.getElementById("feedback-text").value;
    const feedbackEmail = document.getElementById("feedback-email").value;

    if (!feedbackText) {
      alert("Please provide some feedback before submitting");
    }
    console.log(`Feedback submitted: `, {
      feedback: feedbackText,
      email: feedbackEmail,
    });

    alert("Thank you for your feedback");

    document.getElementById("feedback-text").value = "";
    document.getElementById("feedback-email").value = "";
  });
}

if (resetDataBtn) {
  resetDataBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const { movementsArr, datesArr, descriptionsArr, receiverArr, updateUI } =
      window.sharedData;

    localStorage.clear();

    movementsArr.length = 0;
    datesArr.length = 0;
    descriptionsArr.length = 0;
    receiverArr.length = 0;
    updateUI();

    document.body.classList.remove("dark-mode");
    if (darkModeToggle) {
      darkModeToggle.textContent = "Enable Dark Mode";
    }
  });
}
