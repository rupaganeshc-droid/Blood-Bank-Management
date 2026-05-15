const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
  container.classList.add('right-panel-active')
);

signInButton.addEventListener('click', () =>
  container.classList.remove('right-panel-active')
);

// Forgot Password Modal Logic
const modal = document.getElementById('forgotModal');
const btn = document.getElementById('forgotPasswordLink');
const span = document.getElementsByClassName('close')[0];
const sendBtn = document.getElementById('sendReset');

btn.onclick = function(e) {
  e.preventDefault();
  modal.style.display = 'block';
}

span.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

sendBtn.onclick = function() {
  const email = document.getElementById('resetEmail').value;
  if (email) {
    alert("Reset link sent to: " + email); // Replace with backend logic
    modal.style.display = 'none';
  } else {
    alert("Please enter your email.");
  }
}
// Signup Handler
document.querySelector('.sign-up-container form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = this.querySelector('input[placeholder="Name"]').value;
  const email = this.querySelector('input[placeholder="Email"]').value;
  const password = this.querySelector('input[placeholder="Password"]').value;

  fetch('http://localhost:5000/student-signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert("Signup error: " + err));
});

/// Login Handler
document.querySelector('.sign-in-container form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.querySelector('input[placeholder="Email"]').value;
  const password = this.querySelector('input[placeholder="Password"]').value;

  // 🧠 Simple check — if admin logs in
  if (email === "admin@gmail.com" && password === "admin123") {
    alert("Admin Login Successful");
    localStorage.setItem("role", "admin"); // ✅ save role
    window.location.href = "home.html";
    return;
  }
  // =====================
// Role-based Navbar Control
// =====================
window.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem("role");
  const navItems = document.querySelectorAll(".navbar-nav .nav-item");

  if (navItems.length > 0) {
    if (role === "student") {
      navItems.forEach((item, index) => {
        if (![0, 2].includes(index)) {
          item.style.display = "none";
        }
      });
    } else if (role === "admin") {
      navItems.forEach(item => item.style.display = "block");
    } else {
      window.location.href = "login.html";
    }
  }
});


  // 🩸 Otherwise normal student login API
  fetch('http://localhost:5000/student-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.success) {
        localStorage.setItem("role", "student"); // ✅ save role
        window.location.href = "home.html";
      }
    })
    .catch(err => alert("Login error: " + err));
});
app.post("/register-donor", (req, res) => {
  const { name, regno, phone, dept, year, bloodgrp, latitude, longitude } = req.body;
  const sql = "INSERT INTO donors (name, regno, phone, dept, year, bloodgrp, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, regno, phone, dept, year, bloodgrp, latitude, longitude], (err, result) => { ... });
});

    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "Donor registered successfully with location!" });
  });
});

