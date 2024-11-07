// app.js

//login.html

document.getElementById("loginBtn").addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const pTest = document.getElementById("pTest");

    try {
        const response = await fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        // Display response message
        if (result.success) {
            pTest.textContent = 'Login successful!';
            window.location.href = "../pages/menu.html"; // Redirect to menu page
        } else {
            pTest.textContent = result.message; // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        pTest.textContent = 'An error occurred. Please try again.';
    }
});

//menu.html

