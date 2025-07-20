import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { notionClient, validateEnvironment } from '../config/notion';
import { PagesHandler } from '../handlers/pages-handler';
import { pagesTools } from '../tools/pages';

// Validate environment
validateEnvironment();

// Initialize handlers
const pagesHandler = new PagesHandler(notionClient);

// Create MCP server
const server = new Server(
  {
    name: 'notion-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: pagesTools,
  };
});

// Handle call tool request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_pages':
        return await pagesHandler.handleListPages(args as any);
      case 'get_page':
        return await pagesHandler.handleGetPage(args as any);
      case 'create_page':
        return await pagesHandler.handleCreatePage(args as any);
      case 'update_page':
        return await pagesHandler.handleUpdatePage(args as any);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
const transport = new StdioServerTransport();
server.connect(transport);

console.log('Notion MCP Server started'); 