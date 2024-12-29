const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store to-do items
let todos = [];

// Create (POST) a new to-do item
app.post("/todos", (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const newTodo = {
        id: todos.length + 1,
        title,
        description: description || "",
        completed: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Read (GET) all to-do items
app.get("/todos", (req, res) => {
    res.status(200).json(todos);
});

// Read (GET) a single to-do item by ID
app.get("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((item) => item.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: "To-Do item not found" });
    }

    res.status(200).json(todo);
});

// Update (PUT) a to-do item by ID
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = todos.find((item) => item.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: "To-Do item not found" });
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    res.status(200).json(todo);
});

// Delete (DELETE) a to-do item by ID
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "To-Do item not found" });
    }

    const deletedTodo = todos.splice(index, 1);
    res.status(200).json({ message: "To-Do item deleted", todo: deletedTodo });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});