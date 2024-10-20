import express from 'express';
import controller from './controller.js';  

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.get('/api/items', controller.getItems);
app.post('/api/items', controller.createItem);
app.put('/api/items/:id', controller.updateItem);
app.delete('/api/items/:id', controller.deleteItem);

// Start the server
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});

export default app;  
