const modal = document.getElementById("modal");
const openmodal =  document.getElementById("OpenModal");
const closemodal = document.getElementById("closemodal");
const hireBtn = document.getElementById("hireBtn");

OpenModal.onclick = function () {
    modal.style.display = "block";
};

hireBtn.onclick = function () {
    modal.style.display ="block";
};

closemodal.onclick = function () {
    modal.style.display = "none";
};
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page refresh

  const formData = {
    fname: document.getElementById("fname").value,
    no: document.getElementById("no").value,
    email: document.getElementById("email").value,
    subj: document.getElementById("subj").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("https://setur-portfolio.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    document.getElementById("status").textContent = data.message;
    document.getElementById("status").style.color = data.success ? "green" : "red";
    setTimeout(() => {
  window.location.reload();
}, 2000);
  } catch (err) {
    document.getElementById("status").textContent = "Error sending message.";
    document.getElementById("status").style.color = "red";
  }
});

