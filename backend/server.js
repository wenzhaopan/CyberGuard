const express = require('express');
const { exec } = require('child_process'); // Import child_process to run shell commands
const app = express();
const port = 5000;

// Middleware for parsing JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Function to read JSON files and send as a response
const fs = require('fs');
const path = require('path');
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
app.get('/generalNews', (req, res) => sendJsonFile(res, 'generalNews'));
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
