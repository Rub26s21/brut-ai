/**
 * Main Server Entry Point
 * Auto Birthday Wish Sender API
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routes/contacts.js';
import messagesRouter from './routes/messages.js';
import logsRouter from './routes/logs.js';
import { startScheduler } from './scheduler/birthdayScheduler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Auto Birthday Wish Sender API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/contacts', contactsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/logs', logsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email service: ${process.env.SMTP_HOST}`);
    console.log(`🤖 AI service: ${process.env.GROQ_API_KEY ? 'Configured' : 'Not configured'}`);

    // Start the birthday scheduler
    if (process.env.SCHEDULER_ENABLED !== 'false') {
        startScheduler();
        console.log('⏰ Birthday scheduler started');
    } else {
        console.log('⏰ Birthday scheduler disabled');
    }
});

export default app;
