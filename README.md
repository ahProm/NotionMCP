# Notion MCP Server

A Model Context Protocol (MCP) server for interacting with Notion's API, specifically focused on Pages operations.

## Features

- **List Pages**: Query pages from a Notion database
- **Get Page**: Retrieve a specific page by ID
- **Create Page**: Create new pages in Notion databases
- **Update Page**: Update existing page properties

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your Notion API credentials:

```bash
cp env.example .env
```

Edit `.env` and add your Notion API key:

```
NOTION_API_KEY=your_notion_integration_token_here
NOTION_DATABASE_ID=your_database_id_here
```

### 3. Get Notion API Key

1. Go to [Notion Developers](https://developers.notion.com/)
2. Create a new integration
3. Copy the "Internal Integration Token"
4. Add the integration to your workspace

### 4. Build the Project

```bash
npm run build
```

## Usage

### As an MCP Server

The server can be used with any MCP-compatible client:

```bash
npm run mcp
```

### Available Tools

#### list_pages
List pages from a Notion database.

Parameters:
- `database_id` (required): The ID of the database
- `filter` (optional): Filter criteria
- `sorts` (optional): Sorting options
- `page_size` (optional): Number of pages to return (max 100)

#### get_page
Get a specific page by ID.

Parameters:
- `page_id` (required): The ID of the page to retrieve

#### create_page
Create a new page in a Notion database.

Parameters:
- `parent` (required): The parent object (database or page)
- `properties` (required): The properties of the page
- `children` (optional): Block content for the page

#### update_page
Update an existing page.

Parameters:
- `page_id` (required): The ID of the page to update
- `properties` (required): The properties to update

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## Notion API Documentation

For more information about the Notion API, visit:
- [Notion API Documentation](https://developers.notion.com/reference)
- [Pages API Reference](https://developers.notion.com/reference/post-page)
