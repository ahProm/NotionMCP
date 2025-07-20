import { Tool } from '@modelcontextprotocol/sdk/types.js';

// Define tools for Notion Pages API
export const pagesTools: Tool[] = [
  {
    name: 'list_pages',
    description: 'List pages from a Notion database',
    inputSchema: {
      type: 'object',
      properties: {
        database_id: {
          type: 'string',
          description: 'The ID of the database to list pages from (if omitted, uses NOTION_DATABASE_ID from .env)',
        },
        filter: {
          type: 'object',
          description: 'Optional filter to apply to the pages',
        },
        sorts: {
          type: 'array',
          description: 'Optional sorting options',
        },
        page_size: {
          type: 'number',
          description: 'Number of pages to return (max 100)',
        },
      },
      required: ['database_id'],
    },
  },
  {
    name: 'get_page',
    description: 'Get a specific page by ID',
    inputSchema: {
      type: 'object',
      properties: {
        page_id: {
          type: 'string',
          description: 'The ID of the page to retrieve',
        },
      },
      required: ['page_id'],
    },
  },
  {
    name: 'create_page',
    description: 'Create a new page in a Notion database',
    inputSchema: {
      type: 'object',
      properties: {
        parent: {
          type: 'object',
          description: 'The parent object (database or page). If parent.database_id is omitted, uses NOTION_DATABASE_ID from .env',
        },
        properties: {
          type: 'object',
          description: 'The properties of the page',
        },
        children: {
          type: 'array',
          description: 'Optional block content for the page',
        },
      },
      required: ['parent', 'properties'],
    },
  },
  {
    name: 'update_page',
    description: 'Update an existing page',
    inputSchema: {
      type: 'object',
      properties: {
        page_id: {
          type: 'string',
          description: 'The ID of the page to update',
        },
        properties: {
          type: 'object',
          description: 'The properties to update',
        },
      },
      required: ['page_id', 'properties'],
    },
  },
]; 