import { notionClient, validateEnvironment } from '../config/notion';
import { PagesHandler } from '../handlers/pages-handler';
import { pagesTools } from '../tools/pages';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

export function initializeServer() {
  console.log('Initializing Notion MCP Server...');
  
  // Validate environment
  try {
    validateEnvironment();
    console.log('Environment validation passed');
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw error;
  }

  // Initialize handlers
  const pagesHandler = new PagesHandler(notionClient);
  console.log('Pages handler initialized');

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
  console.log('MCP Server created');

  // Handle list tools request
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.log('List tools request received');
    console.log('Available tools:', pagesTools.map(tool => tool.name));
    return {
      tools: pagesTools,
    };
  });

  // Handle call tool request
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    console.log('Call tool request received:', name);

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
      console.error('Tool execution error:', error);
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

  console.log('Server initialization complete');
  return server;
}

export function main() {
  console.log('Starting Notion MCP Server...');
  const server = initializeServer();
  // Start the server
  const transport = new StdioServerTransport();
  server.connect(transport);
  console.log('Notion MCP Server started and connected to transport');
}

if (require.main === module) {
  main();
} 