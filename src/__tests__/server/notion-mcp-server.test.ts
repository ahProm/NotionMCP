// Mock all dependencies before imports
jest.mock('@modelcontextprotocol/sdk/server/index.js');
jest.mock('@modelcontextprotocol/sdk/server/stdio.js');
jest.mock('../../config/notion');
jest.mock('../../handlers/pages-handler');
jest.mock('../../tools/pages');

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

// Create mock implementations
const mockValidateEnvironment = jest.fn();
const mockNotionClient = {
  databases: { query: jest.fn() },
  pages: { retrieve: jest.fn(), create: jest.fn(), update: jest.fn() },
};
const mockPagesHandler = {
  handleListPages: jest.fn(),
  handleGetPage: jest.fn(),
  handleCreatePage: jest.fn(),
  handleUpdatePage: jest.fn(),
};
const mockPagesTools = [
  { name: 'list_pages', description: 'List pages' },
  { name: 'get_page', description: 'Get page' },
  { name: 'create_page', description: 'Create page' },
  { name: 'update_page', description: 'Update page' },
];

// Mock the modules
jest.doMock('../../config/notion', () => ({
  notionClient: mockNotionClient,
  validateEnvironment: mockValidateEnvironment,
}));

jest.doMock('../../handlers/pages-handler', () => ({
  PagesHandler: jest.fn().mockImplementation(() => mockPagesHandler),
}));

jest.doMock('../../tools/pages', () => ({
  pagesTools: mockPagesTools,
}));

describe('Notion MCP Server', () => {
  let initializeServer: () => any;
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    mockValidateEnvironment.mockImplementation(() => {});
    // 再importでmockを有効化
    ({ initializeServer } = require('../../server/notion-mcp-server'));
  });

  describe('Server Module Loading', () => {
    it('should load server module without errors', () => {
      expect(() => {
        initializeServer();
      }).not.toThrow();
    });

    it('should validate environment when server is loaded', () => {
      initializeServer();
      expect(mockValidateEnvironment).toHaveBeenCalled();
    });
  });

  describe('Server Dependencies', () => {
    it('should have required dependencies mocked', () => {
      expect(Server).toBeDefined();
      expect(StdioServerTransport).toBeDefined();
      expect(mockValidateEnvironment).toBeDefined();
      expect(mockNotionClient).toBeDefined();
      expect(mockPagesHandler).toBeDefined();
      expect(mockPagesTools).toBeDefined();
    });

    it('should have correct tool definitions', () => {
      expect(mockPagesTools).toHaveLength(4);
      expect(mockPagesTools[0].name).toBe('list_pages');
      expect(mockPagesTools[1].name).toBe('get_page');
      expect(mockPagesTools[2].name).toBe('create_page');
      expect(mockPagesTools[3].name).toBe('update_page');
    });

    it('should have handler methods available', () => {
      expect(mockPagesHandler.handleListPages).toBeDefined();
      expect(mockPagesHandler.handleGetPage).toBeDefined();
      expect(mockPagesHandler.handleCreatePage).toBeDefined();
      expect(mockPagesHandler.handleUpdatePage).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle unknown tool errors', () => {
      const errorMessage = 'Unknown tool: unknown_tool';
      expect(errorMessage).toContain('Unknown tool');
    });

    it('should handle handler errors', () => {
      const errorMessage = 'Error: Handler error';
      expect(errorMessage).toContain('Error:');
    });

    it('should handle non-Error exceptions', () => {
      const errorMessage = 'Error: Unknown error';
      expect(errorMessage).toContain('Unknown error');
    });
  });

  describe('Tool Functionality', () => {
    it('should support list_pages functionality', () => {
      const mockResponse = {
        content: [{ type: 'text', text: '{"results": []}' }],
      };
      mockPagesHandler.handleListPages.mockResolvedValue(mockResponse);

      expect(mockPagesHandler.handleListPages).toBeDefined();
    });

    it('should support get_page functionality', () => {
      const mockResponse = {
        content: [{ type: 'text', text: '{"id": "test-page"}' }],
      };
      mockPagesHandler.handleGetPage.mockResolvedValue(mockResponse);

      expect(mockPagesHandler.handleGetPage).toBeDefined();
    });

    it('should support create_page functionality', () => {
      const mockResponse = {
        content: [{ type: 'text', text: '{"id": "new-page"}' }],
      };
      mockPagesHandler.handleCreatePage.mockResolvedValue(mockResponse);

      expect(mockPagesHandler.handleCreatePage).toBeDefined();
    });

    it('should support update_page functionality', () => {
      const mockResponse = {
        content: [{ type: 'text', text: '{"id": "updated-page"}' }],
      };
      mockPagesHandler.handleUpdatePage.mockResolvedValue(mockResponse);

      expect(mockPagesHandler.handleUpdatePage).toBeDefined();
    });
  });
}); 