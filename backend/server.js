const express = require('express');
const { exec } = require('child_process'); // Import child_process to run shell commands
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;
const cors = require('cors');

// Middleware for parsing JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Enable CORS for all origins
app.use(cors());

// Helper function to read a JSON file and send as a response
const sendJsonFile = (res, filename) => {
    const filePath = path.join(__dirname, `${filename}.json`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filename}.json:`, err);
            res.status(500).send('Error reading the file.');
        } else {
            res.json(JSON.parse(data));
        }
    });
};

// Endpoints for JSON files
app.get('/dataBreachNews', (req, res) => sendJsonFile(res, 'dataBreachNews'));
app.get('/cyberAttackNews', (req, res) => sendJsonFile(res, 'cyberAttackNews'));
app.get('/vulnerabilityNews', (req, res) => sendJsonFile(res, 'vulnerabilityNews'));
app.get('/malwareNews', (req, res) => sendJsonFile(res, 'malwareNews'));
app.get('/securityNews', (req, res) => sendJsonFile(res, 'securityNews'));

// Endpoint to update JSON files by running a Python script
app.post('/update-json', (req, res) => {
    // Execute the Python script
    exec('python script.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script.py: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send(`Error: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send('JSON files updated successfully!');
    });
});


// Path to emails.txt (adjust as needed)
const EMAILS_FILE = path.join(__dirname, 'emails.txt');

// Add Email Endpoint
// 
// Body should look like: { "email": "example@domain.com" }
app.post('/add-email', (req, res) => {
    const { email } = req.body;

    // Basic validation
    if (!email) {
        return res.status(400).json({ error: 'No email provided.' });
    }

    // Read the file, parse lines, then add email if not present
    fs.readFile(EMAILS_FILE, 'utf8', (err, data) => {
        if (err) {
            // If file not found, we can create it, or handle error
            console.error(`Error reading emails.txt: ${err.message}`);
            // We'll treat it as if the file was empty
            data = '';
        }

        // Turn file content into an array of emails (filter out empty lines)
        const lines = data.split('\n').map(line => line.trim()).filter(Boolean);

        // Check if the email is already in the list
        if (lines.includes(email)) {
            return res.status(409).json({ error: 'Email already in the list.' });
        }

        // Add the new email
        lines.push(email);

        // Write back to the file
        fs.writeFile(EMAILS_FILE, lines.join('\n') + '\n', 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error writing to emails.txt: ${writeErr.message}`);
                return res.status(500).json({ error: 'Could not write to file.' });
            }

            // Success
            res.json({ message: `Email ${email} added successfully!` });
        });
    });
});


// Remove Email Endpoint
// Body should look like: { "email": "example@domain.com" }
app.post('/remove-email', (req, res) => {
    const { email } = req.body;

    // Basic validation
    if (!email) {
        return res.status(400).json({ error: 'No email provided.' });
    }

    fs.readFile(EMAILS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading emails.txt: ${err.message}`);
            return res.status(500).json({ error: 'Could not read email file.' });
        }

        const lines = data.split('\n').map(line => line.trim()).filter(Boolean);

        // Check if the email is in the list
        if (!lines.includes(email)) {
            return res.status(404).json({ error: 'Email not found in the list.' });
        }

        // Filter out the email to remove
        const updatedLines = lines.filter(line => line !== email);

        // Write the updated list to file
        fs.writeFile(EMAILS_FILE, updatedLines.join('\n') + '\n', 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error writing to emails.txt: ${writeErr.message}`);
                return res.status(500).json({ error: 'Could not write to file.' });
            }

            res.json({ message: `Email ${email} removed successfully!` });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
