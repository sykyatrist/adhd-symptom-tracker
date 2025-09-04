document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tracker-form');
    const logContainer = document.getElementById('log-container');
    const printBtn = document.getElementById('print-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Update range value display dynamically
    form.querySelectorAll('input[type="range"]').forEach(range => {
        const valueSpan = range.nextElementSibling;
        valueSpan.textContent = range.value;
        range.addEventListener('input', () => {
            valueSpan.textContent = range.value;
        });
    });

    // Load existing entries from localStorage
    const loadEntries = () => {
        const entries = JSON.parse(localStorage.getItem('adhdLog')) || [];
        logContainer.innerHTML = ''; // Clear current log
        
        if (entries.length === 0) {
            logContainer.innerHTML = '<p>Your saved entries will appear here.</p>';
            return;
        }

        // Sort entries by date, newest first
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.classList.add('log-entry');
            
            const entryDate = new Date(entry.date).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short'
            });

            entryElement.innerHTML = `
                <h3>Entry for: ${entryDate}</h3>
                <p><strong>Times lost focus:</strong> ${entry.data.lostFocus}</p>
                <p><strong>Times misplaced items:</strong> ${entry.data.misplacedItems}</p>
                <p><strong>Zoned out in conversations:</strong> ${entry.data.zonedOut}</p>
                <p><strong>Difficulty with tasks (1-5):</strong> ${entry.data.taskDifficulty}</p>
                <hr>
                <p><strong>On time for commitments:</strong> ${entry.data.onTime}</p>
                <p><strong>Procrastinated on important task:</strong> ${entry.data.procrastination}</p>
                <p><strong>Workspace tidiness (1-10):</strong> ${entry.data.workspaceTidiness}</p>
                <hr>
                <p><strong>Times interrupted someone:</strong> ${entry.data.interrupted}</p>
                <p><strong>Made impulsive purchase:</strong> ${entry.data.impulsivePurchase}</p>
                <p><strong>Felt physically restless (1-5):</strong> ${entry.data.restless}</p>
                <hr>
                <p><strong>Average mood (1-10):</strong> ${entry.data.mood}</p>
                <p><strong>Times felt overwhelmed:</strong> ${entry.data.overwhelmed}</p>
                <hr>
                <p><strong>Hours of sleep:</strong> ${entry.data.sleepHours}</p>
                <p><strong>Sleep quality (1-10):</strong> ${entry.data.sleepQuality}</p>
                <p><strong>Did physical activity:</strong> ${entry.data.physicalActivity}</p>
            `;
            logContainer.appendChild(entryElement);
        });
    };

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const entryData = {
            lostFocus: document.getElementById('lostFocus').value,
            misplacedItems: document.getElementById('misplacedItems').value,
            zonedOut: document.getElementById('zonedOut').value,
            taskDifficulty: document.getElementById('taskDifficulty').value,
            onTime: document.getElementById('onTime').value,
            procrastination: document.getElementById('procrastination').value,
            workspaceTidiness: document.getElementById('workspaceTidiness').value,
            interrupted: document.getElementById('interrupted').value,
            impulsivePurchase: document.getElementById('impulsivePurchase').value,
            restless: document.getElementById('restless').value,
            mood: document.getElementById('mood').value,
            overwhelmed: document.getElementById('overwhelmed').value,
            sleepHours: document.getElementById('sleepHours').value,
            sleepQuality: document.getElementById('sleepQuality').value,
            physicalActivity: document.getElementById('physicalActivity').value,
        };

        const entries = JSON.parse(localStorage.getItem('adhdLog')) || [];
        entries.push({ date: new Date().toISOString(), data: entryData });
        localStorage.setItem('adhdLog', JSON.stringify(entries));

        loadEntries();
        form.reset();
        // Reset range value displays after form reset
        form.querySelectorAll('input[type="range"]').forEach(range => {
            range.nextElementSibling.textContent = range.value;
        });
    });

    // Print button functionality
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Clear data button functionality
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all saved entries? This action cannot be undone.')) {
            localStorage.removeItem('adhdLog');
            loadEntries();
        }
    });

    // Initial load of entries
    loadEntries();
});