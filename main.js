document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ main.js loaded");

  const form = document.getElementById("donorForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !submitBtn) {
    console.error("❌ Form or Submit Button not found");
    return;
  }

  submitBtn.addEventListener("click", async function (e) {
    e.preventDefault(); // Stop default
    e.stopPropagation(); // Extra safety
    console.log("📤 Submit button clicked");

    const formData = new FormData(form);

    try {
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        body: formData,
      });

      console.log("🔁 Server responded. Status:", response.status);

      if (response.ok) {
        Toastify({
          text: "✅ Donor data saved successfully!",
          duration: 5000,
          gravity: "top",
          position: "right",
          style: {
            background: "#4CAF50",
          },
        }).showToast();

        form.reset();
      } else {
        const err = await response.text();
        console.error("❌ Server error:", err);

        Toastify({
          text: "❌ Server error: " + err,
          duration: 4000,
          gravity: "top",
          position: "right",
          style: {
            background: "#f44336",
          },
        }).showToast();
      }
    } catch (error) {
      console.error("❌ Fetch error:", error.message);

      Toastify({
        text: "❌ Fetch error: " + error.message,
        duration: 4000,
        gravity: "top",
        position: "right",
        style: {
          background: "#f44336",
        },
      }).showToast();
    }
  });
});
