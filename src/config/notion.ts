import { Client as NotionClient } from '@notionhq/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Notion client
export const notionClient = new NotionClient({
  auth: process.env.NOTION_API_KEY,
});

// Export Notion Database ID from environment
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Validate required environment variables
export function validateEnvironment() {
  console.log('Validating environment variables...');
  console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY ? 'set' : 'not set');
  console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID ? 'set' : 'not set');
  
  if (!process.env.NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY environment variable is required');
  }
} 