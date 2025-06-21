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
