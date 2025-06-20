const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));
app.use(express.json());

const donorsJsonPath = path.join(__dirname, 'donors.json');

function loadDonorData() {
  try {
    if (fs.existsSync(donorsJsonPath)) {
      const data = fs.readFileSync(donorsJsonPath, 'utf8');
      return JSON.parse(data || '[]');
    }
  } catch (e) {
    console.error("❌ JSON parse error:", e);
  }
  return [];
}

app.post('/submit', upload.single('pdfFile'), (req, res) => {
  const donor = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
    filePath: req.file ? req.file.path : null
  };

  const donors = loadDonorData();
  donors.push(donor);

  fs.writeFile(donorsJsonPath, JSON.stringify(donors, null, 2), (err) => {
    if (err) {
      console.error('❌ Error saving donor to file:', err);
      return res.status(500).json({ message: 'Failed to save donor' });
    }

    console.log('✅ Donor saved:', donor);
    res.json({ message: 'Donor saved successfully with PDF!', donor });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


