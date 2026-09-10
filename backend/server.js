// const express = require("express");
// const path = require("path");

// const app = express();

// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Serve frontend
// app.use(express.static(path.join(__dirname, "../frontend")));

// // Health check
// app.get("/api/health", (req, res) => {
//     res.json({
//         status: "UP",
//         message: "Task Manager application is running"
//     });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        application: "Task Manager",
        version: process.env.APP_VERSION || "1.0.0"
    });
});

app.get("/api/info", (req, res) => {
    res.json({
        message: "Task Manager DevOps Application",
        environment: process.env.NODE_ENV || "development",
        version: process.env.APP_VERSION || "1.0.0"
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Task Manager running on port ${PORT}`);
});