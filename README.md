# Notion MCP Server

A custom MCP (Model Context Protocol) server for Notion, built with Node.js and TypeScript.

## Features

- **List Pages**: Query pages from Notion databases with filtering and sorting
- **Get Page**: Retrieve specific pages by ID
- **Create Page**: Create new pages in databases or as sub-pages
- **Update Page**: Update existing page properties

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file and configure your Notion API key:
   ```bash
   cp env.example .env
   ```
4. Add your Notion API key to the `.env` file:
   ```
   NOTION_API_KEY=your_notion_api_key_here
   ```

## Development

### Running the Server

```bash
# Development mode with hot reload
npm run dev

# Build and run
npm run build
npm start

# Run as MCP server
npm run mcp
```

### Testing

The project includes comprehensive test coverage for all components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI
npm run test:ci
```

#### Test Structure

- **Unit Tests**: Individual component testing
  - `src/__tests__/handlers/` - Handler logic tests
  - `src/__tests__/config/` - Configuration tests
  - `src/__tests__/tools/` - Tool definition tests
  - `src/__tests__/types/` - Type definition tests

- **Integration Tests**: Server integration testing
  - `src/__tests__/server/` - MCP server tests

#### Test Coverage

The test suite covers:
- ✅ Handler methods (list, get, create, update pages)
- ✅ Configuration validation
- ✅ Tool definitions and schemas
- ✅ Type definitions
- ✅ Server initialization and request handling
- ✅ Error handling and edge cases

## API Tools

### list_pages
List pages from a Notion database with optional filtering and sorting.

**Parameters:**
- `database_id` (required): The ID of the database
- `filter` (optional): Filter criteria
- `sorts` (optional): Sorting options
- `page_size` (optional): Number of pages to return (max 100)

### get_page
Retrieve a specific page by ID.

**Parameters:**
- `page_id` (required): The ID of the page

### create_page
Create a new page in a Notion database or as a sub-page.

**Parameters:**
- `parent` (required): Parent object (database or page)
- `properties` (required): Page properties
- `children` (optional): Block content for the page

### update_page
Update an existing page's properties.

**Parameters:**
- `page_id` (required): The ID of the page to update
- `properties` (required): Properties to update

## Configuration

The server requires the following environment variables:

- `NOTION_API_KEY`: Your Notion integration API key

## Error Handling

The server includes comprehensive error handling:
- Environment validation
- API error handling
- Unknown tool handling
- Exception handling with proper error messages

## Development Notes

- Built with TypeScript for type safety
- Uses Jest for testing with comprehensive coverage
- Follows MCP (Model Context Protocol) standards
- Includes proper error handling and logging
- Modular architecture for easy extension

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT
