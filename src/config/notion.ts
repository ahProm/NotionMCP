import { Client as NotionClient } from '@notionhq/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Notion client
export const notionClient = new NotionClient({
  auth: process.env.NOTION_API_KEY,
});

// Validate required environment variables
export function validateEnvironment() {
  if (!process.env.NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY environment variable is required');
  }
} 