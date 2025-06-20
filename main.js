document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("donorForm");

    if (!form) {
        console.error("❌ Form element not found");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form); 

        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log("✅ Donor data saved successfully!");
                form.reset(); 
            } else {
                const err = await response.text();
                console.error("❌ Server error:", err);
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
        }
    });
});
