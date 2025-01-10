const tableBody = document.querySelector("#dynamicTable tbody");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const recordDetails = document.getElementById("recordDetails");
const refreshTableBtn = document.getElementById("refreshTable");

const records = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com" },
  { id: 4, name: "Dana Lee", email: "dana@example.com" },
];

// Function to shuffle array (for dynamic row positions)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to render table rows dynamically
function renderTable() {
  tableBody.innerHTML = ""; // Clear existing rows
  const shuffledRecords = shuffle([...records]); // Shuffle records
  shuffledRecords.forEach((record, index) => {
    const row = document.createElement("tr");
    row.className = `row-${index + 1}`;
    row.id = `row-id-${record.id}`;

    row.innerHTML = `
      <td>${record.id}</td>
      <td>${record.name}</td>
      <td>${record.email}</td>
      <td><button class="option-btn" data-id="${record.id}">View</button></td>
    `;

    tableBody.appendChild(row);
  });

  // Add event listeners to buttons
  document.querySelectorAll(".option-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const recordId = e.target.getAttribute("data-id");
      const record = records.find(r => r.id == recordId);
      showModal(record);
    });
  });
}

// Function to show modal
function showModal(record) {
  recordDetails.textContent = `ID: ${record.id}, Name: ${record.name}, Email: ${record.email}`;
  modal.style.display = "block";
}

// Close modal functionality
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Refresh table on button click
refreshTableBtn.addEventListener("click", renderTable);

// Initial table render
renderTable();
