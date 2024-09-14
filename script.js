document.addEventListener("DOMContentLoaded", () => {
    const eventTitleInput = document.getElementById("eventTitle");
    const eventDateTimeInput = document.getElementById("eventDateTime");
    const addEventBtn = document.getElementById("addEventBtn");
    const eventList = document.getElementById("eventList");
    const reminder = document.getElementById("reminder");
    const reminderText = document.getElementById("reminderText");
    const closeReminder = document.getElementById("closeReminder");

    let events = [];

    // Add event function
    addEventBtn.addEventListener("click", () => {
        const title = eventTitleInput.value;
        const dateTime = eventDateTimeInput.value;

        if (title === "" || dateTime === "") {
            alert("Please fill in all fields");
            return;
        }

        const event = {
            title: title,
            dateTime: new Date(dateTime),
        };

        events.push(event);
        displayEvents();
        checkReminders();

        eventTitleInput.value = "";
        eventDateTimeInput.value = "";
    });

    // Display events on the UI
    function displayEvents() {
        eventList.innerHTML = "";

        events.forEach((event, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${event.title} - ${event.dateTime.toLocaleString()}</span>
                <button onclick="deleteEvent(${index})">Delete</button>
            `;
            eventList.appendChild(li);
        });
    }

    // Delete event
    window.deleteEvent = function(index) {
        events.splice(index, 1);
        displayEvents();
    };

    // Check for reminders
    function checkReminders() {
        setInterval(() => {
            const now = new Date();

            events.forEach(event => {
                const timeDiff = event.dateTime - now;

                if (timeDiff > 0 && timeDiff <= 60000) { // 1 minute before event
                    showReminder(event.title);
                }
            });
        }, 10000); // Check every 10 seconds
    }

    // Show reminder popup
    function showReminder(title) {
        reminderText.textContent = `Reminder: ${title} is happening soon!`;
        reminder.style.display = "block";
    }

    // Close reminder
    closeReminder.addEventListener("click", () => {
        reminder.style.display = "none";
    });
});
