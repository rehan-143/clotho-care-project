const ngodata=[
  {
    "state": "Delhi",
    "ngo_name": "Goonj",
    "contact": "goonj@goonj.org"
  },
  {
    "state": "Tamil Nadu",
    "ngo_name": "Asha Chennai",
    "contact": "chennai@ashanet.org"
  },
  {
    "state": "West Bengal",
    "ngo_name": "Calcutta Rescue",
    "contact": "info@calcuttarescue.org"
  },
  {
    "state": "Karnataka",
    "ngo_name": "Samarthanam Trust",
    "contact": "info@samarthanam.org"
  },
  {
    "state": "Maharashtra",
    "ngo_name": "Snehalaya",
    "contact": "snehalayaoffice@gmail.com"
  },
  {
    "state": "Uttar Pradesh",
    "ngo_name": "Smile Foundation",
    "contact": "info@smilefoundationindia.org"
  },
  {
    state: "Gujarat",
    ngo_name: "Manav Sadhna",
    contact: "connect@manavsadhna.org"
  },
  {
    "state": "Rajasthan",
    "ngo_name": "Seva Mandir",
    "contact": "info@sevamandir.org"
  }
]
const element = document.getElementById("ngo-data");
function getRandomStatus() {
  const rand = Math.random();
  if (rand < 0.33) return "Approved";
  else if (rand < 0.66) return "Pending";
  else return "Rejected";
}
function printNGOs() {
  let html = '';
  ngodata.forEach((ngo) => {
    const status = getRandomStatus();
    const statusClass = status.toLowerCase(); 
    html += `
      <div class="ngo-box">
        <h3>${ngo.ngo_name}</h3>
        <p>📍 ${ngo.state}</p>
        <p style="font-size: 13px;">${ngo.contact}</p>
        <div class="status-box ${statusClass}">${status}</div>
      </div>
    `;
  });
  element.innerHTML = html;
}
printNGOs();
    