// 1. Setup & Basics
console.log("Welcome to the Community Portal");
window.onload = () => {
  alert("Page fully loaded");
  populateEventDropdown();
  displayEvents();
};

// 2. Event Data
const events = [
  { name: "Music Fest", date: "2025-06-10", seats: 5, type: "Music" },
  { name: "Baking Workshop", date: "2025-07-01", seats: 0, type: "Workshop" },
  { name: "Jazz Night", date: "2024-05-20", seats: 10, type: "Music" }
];

// 3. Display Events with Conditions
function displayEvents() {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";
  const today = new Date();

  events.forEach((event, index) => {
    const eventDate = new Date(event.date);
    if (eventDate > today && event.seats > 0) {
      const card = document.createElement("div");
      card.className = "eventCard";
      card.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Type: ${event.type}</p>
        <p>Seats Left: ${event.seats}</p>
        <button onclick="register(${index})">Register</button>
      `;
      container.appendChild(card);
    }
  });
}

// 4. Registration Logic
function register(index) {
  try {
    if (events[index].seats > 0) {
      events[index].seats--;
      alert(`Registered for ${events[index].name}`);
      displayEvents();
    } else {
      throw new Error("No seats left!");
    }
  } catch (error) {
    alert(error.message);
  }
}

// 5. Object Constructor
function Event(name, date, seats, type) {
  this.name = name;
  this.date = date;
  this.seats = seats;
  this.type = type;
}
Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

// 6. Filter Events
document.getElementById("categoryFilter").onchange = function () {
  const selected = this.value;
  const filtered = selected === "All" ? events : events.filter(e => e.type === selected);
  displayFilteredEvents(filtered);
};

function displayFilteredEvents(filteredEvents) {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";
  filteredEvents.forEach(event => {
    const card = document.createElement("div");
    card.className = "eventCard";
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Seats Left: ${event.seats}</p>
    `;
    container.appendChild(card);
  });
}

// 7. Populate Dropdown
function populateEventDropdown() {
  const select = document.getElementById("eventSelect");
  events.forEach((e, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.text = e.name;
    select.appendChild(option);
  });
}

// 8. Form Handling
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const eventIndex = form.elements.eventType.value;

  if (!name || !email || eventIndex === "") {
    document.getElementById("messageArea").textContent = "Please fill all fields.";
    return;
  }

  register(eventIndex);
  document.getElementById("messageArea").textContent = "Successfully Registered!";
});

// 9. Search with Key Events
document.getElementById("searchBar").addEventListener("keydown", function (e) {
  const text = e.target.value.toLowerCase();
  const filtered = events.filter(event => event.name.toLowerCase().includes(text));
  displayFilteredEvents(filtered);
});

// 10. ES6 Refactor Example
const cloneEvents = [...events];
const [firstEvent] = cloneEvents;
const { name: firstName } = firstEvent;
console.log(`Cloned first event name: ${firstName}`);

// 11-12. Fetch Simulation
function fakeRegister() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ name: "User", event: "Music Fest" }),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("messageArea").textContent = "Server registered!";
    })
    .catch(err => console.error("Server error", err));
}

// 13. Debug Tips in Console (log form values)
// See console on form submission

// 14. jQuery Example (if jQuery is loaded)
// $('#registerBtn').click(() => alert("Registered with jQuery"));
