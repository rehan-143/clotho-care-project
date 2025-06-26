
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donorForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const donorData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        submissionDate: new Date().toISOString(),
        id: Date.now() // Simple ID generation
    };

    try {
        // Save data to JSON file
        await saveDonorData(donorData);
        
        // Show thank you card
        showThankYouCard(donorData.name);
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        console.error('Error saving donor data:', error);
        alert('There was an error submitting your form. Please try again.');
    }
}

async function saveDonorData(donorData) {
    // Get existing data from localStorage (simulating file read)
    let existingData = [];
    try {
        const stored = localStorage.getItem('donorData');
        if (stored) {
            existingData = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error reading existing data:', error);
    }
    
    // Add new data
    existingData.push(donorData);
    
    // Save to localStorage (simulating file storage)
    localStorage.setItem('donorData', JSON.stringify(existingData));
    
    // Create and download JSON file to data folder
    const jsonData = JSON.stringify(existingData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link to simulate saving to data folder
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data/donor_data.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Donor data saved:', donorData);
    console.log('JSON file downloaded to data folder');
}

function showThankYouCard(name) {
    // Create thank you card HTML with green theme
    const thankYouHTML = `
        <div class="thank-you-overlay" id="thankYouOverlay">
            <div class="thank-you-card">
                <div class="thank-you-animation">
                    <div class="heart-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="checkmark">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <h2>Thank You, ${name}!</h2>
                <p>Your donation details have been submitted successfully.</p>
                <p>We'll contact you soon to arrange the pickup.</p>
                <div class="sparkles">
                    <div class="sparkle"></div>
                    <div class="sparkle"></div>
                    <div class="sparkle"></div>
                    <div class="sparkle"></div>
                    <div class="sparkle"></div>
                </div>
                <button class="close-btn" onclick="closeThankYouCard()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', thankYouHTML);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeThankYouCard();
    }, 5000);
}

function closeThankYouCard() {
    const overlay = document.getElementById('thankYouOverlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}
=======
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
