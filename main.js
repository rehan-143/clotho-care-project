document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("donorForm");
    const donorBox = document.getElementById("donorBox");
    const thankYouBox = document.getElementById("thankYouBox");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form); 

        try {
            const res = await fetch("http://localhost:5000/submit", {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Network error");
            const result = await res.json();

            alert(result.message);
            donorBox.style.display = "none";
            thankYouBox.style.display = "block";

        } catch (err) {
            console.error(err);
            alert("Failed to submit donor details");
        }
    });
});
