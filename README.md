# 👕 Clotho Cares - Clothing Donation Platform

## 🌟 Project Description

**Clotho Cares** is a web platform that bridges the gap between individual **donors** and **NGOs** supporting clothing distribution. 

- Donors can upload details like clothing type, size, condition, and images.
- They can also **schedule pickups** or **choose drop-off locations** based on their availability and location.
- NGOs are **matched based on location proximity**, ensuring efficient logistics.
- A **live map interface** highlights nearby donation opportunities.
- A **status tracker** offers visibility for both donors and NGOs, promoting trust and transparency.

This platform fosters a **respectful, fast, and scalable network** to repurpose clothes and restore dignity to those in urgent need.

---

## 🧩 Problem Statement

Millions of underprivileged people lack access to proper clothing, while **usable clothes are discarded** due to fast fashion or wardrobe clutter.

There’s currently **no seamless system** that connects willing donors to the right recipients — especially in local, time-sensitive scenarios.

Clotho Cares solves this by building a bridge using **technology + community**.

---

## 🚀 Features

- 📥 Donor form with name, contact, location & PDF uploads
- 📍 Location-based NGO suggestions
- 🗺️ Interactive map to show nearby NGOs
- 📊 Donation status tracker
- 🔐 Backend API built with Express.js
- 📂 File upload support using `multer`

---

## 🛠️ Getting Started (Local Setup)

Follow these steps to run the project on your local machine:

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/clotho-cares.git
cd clotho-cares
```

### 2. Install Dependencies
```bash
npm init -y
npm install express multer cors
```

### 3. Start the Server & Open Frontend
```bash
node server.js
#The backend server will now be running at:http://127.0.0.1:5000

#Open
http://127.0.0.1:3000
```
---

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Toastify.js
- **Backend**: Node.js, Express.js
- **File Uploads**: Multer
- **Data Storage**: JSON files (can be replaced with MongoDB in future)
- **Deployment**: Localhost or any Node-compatible host

---

## 📌 Future Improvements
- Add MongoDB for persistent donor/NGO storage

- Admin panel for NGOs to update donation status

- OTP/email verification for contact info

- AI-based sorting of clothing condition