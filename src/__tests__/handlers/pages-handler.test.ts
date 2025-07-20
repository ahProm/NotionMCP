import { Client as NotionClient } from '@notionhq/client';
import { PagesHandler } from '../../handlers/pages-handler';
import { ListPagesArgs, GetPageArgs, CreatePageArgs, UpdatePageArgs } from '../../types/notion';

// Mock the Notion client
jest.mock('@notionhq/client');

describe('PagesHandler', () => {
  let pagesHandler: PagesHandler;
  let mockNotionClient: any;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create a mock Notion client with proper jest mock functions
    mockNotionClient = {
      databases: {
        query: jest.fn(),
      },
      pages: {
        retrieve: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    pagesHandler = new PagesHandler(mockNotionClient);
  });

  describe('handleListPages', () => {
    it('should list pages from database successfully', async () => {
      const mockResponse = {
        results: [
          {
            id: 'page-1',
            object: 'page',
            properties: { title: { title: [{ text: { content: 'Test Page' } }] } },
          },
        ],
        has_more: false,
      };

      mockNotionClient.databases.query.mockResolvedValue(mockResponse);

      const args: ListPagesArgs = {
        database_id: 'test-database-id',
        page_size: 50,
      };

      const result = await pagesHandler.handleListPages(args);

      expect(mockNotionClient.databases.query).toHaveBeenCalledWith({
        database_id: 'test-database-id',
        page_size: 50,
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: JSON.stringify(mockResponse, null, 2),
          },
        ],
      });
    });

    it('should handle list pages with filter and sorts', async () => {
      const mockResponse = { results: [], has_more: false };
      mockNotionClient.databases.query.mockResolvedValue(mockResponse);

      const args: ListPagesArgs = {
        database_id: 'test-database-id',
        filter: { property: 'Status', select: { equals: 'Done' } },
        sorts: [{ property: 'Created time', direction: 'descending' }],
        page_size: 100,
      };

      await pagesHandler.handleListPages(args);

      expect(mockNotionClient.databases.query).toHaveBeenCalledWith({
        database_id: 'test-database-id',
        filter: { property: 'Status', select: { equals: 'Done' } },
        sorts: [{ property: 'Created time', direction: 'descending' }],
        page_size: 100,
      });
    });

    it('should handle errors from Notion API', async () => {
      const error = new Error('Notion API error');
      mockNotionClient.databases.query.mockRejectedValue(error);

      const args: ListPagesArgs = {
        database_id: 'test-database-id',
      };

      await expect(pagesHandler.handleListPages(args)).rejects.toThrow('Notion API error');
    });
  });

  describe('handleGetPage', () => {
    it('should get page by ID successfully', async () => {
      const mockResponse = {
        id: 'page-1',
        object: 'page',
        properties: { title: { title: [{ text: { content: 'Test Page' } }] } },
      };

      mockNotionClient.pages.retrieve.mockResolvedValue(mockResponse);

      const args: GetPageArgs = {
        page_id: 'page-1',
      };

      const result = await pagesHandler.handleGetPage(args);

      expect(mockNotionClient.pages.retrieve).toHaveBeenCalledWith({
        page_id: 'page-1',
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: JSON.stringify(mockResponse, null, 2),
          },
        ],
      });
    });

    it('should handle errors when getting page', async () => {
      const error = new Error('Page not found');
      mockNotionClient.pages.retrieve.mockRejectedValue(error);

      const args: GetPageArgs = {
        page_id: 'invalid-page-id',
      };

      await expect(pagesHandler.handleGetPage(args)).rejects.toThrow('Page not found');
    });
  });

  describe('handleCreatePage', () => {
    it('should create page successfully', async () => {
      const mockResponse = {
        id: 'new-page-id',
        object: 'page',
        properties: { title: { title: [{ text: { content: 'New Page' } }] } },
      };

      mockNotionClient.pages.create.mockResolvedValue(mockResponse);

      const args: CreatePageArgs = {
        parent: { database_id: 'test-database-id' },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'New Page',
                },
              },
            ],
          },
        },
      };

      const result = await pagesHandler.handleCreatePage(args);

      expect(mockNotionClient.pages.create).toHaveBeenCalledWith({
        parent: { database_id: 'test-database-id' },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'New Page',
                },
              },
            ],
          },
        },
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: JSON.stringify(mockResponse, null, 2),
          },
        ],
      });
    });

    it('should create page with children blocks', async () => {
      const mockResponse = {
        id: 'new-page-id',
        object: 'page',
      };

      mockNotionClient.pages.create.mockResolvedValue(mockResponse);

      const args: CreatePageArgs = {
        parent: { database_id: 'test-database-id' },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'New Page',
                },
              },
            ],
          },
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'This is a paragraph.',
                  },
                },
              ],
            },
          },
        ],
      };

      await pagesHandler.handleCreatePage(args);

      expect(mockNotionClient.pages.create).toHaveBeenCalledWith({
        parent: { database_id: 'test-database-id' },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'New Page',
                },
              },
            ],
          },
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'This is a paragraph.',
                  },
                },
              ],
            },
          },
        ],
      });
    });
  });

  describe('handleUpdatePage', () => {
    it('should update page successfully', async () => {
      const mockResponse = {
        id: 'page-1',
        object: 'page',
        properties: { title: { title: [{ text: { content: 'Updated Page' } }] } },
      };

      mockNotionClient.pages.update.mockResolvedValue(mockResponse);

      const args: UpdatePageArgs = {
        page_id: 'page-1',
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'Updated Page',
                },
              },
            ],
          },
        },
      };

      const result = await pagesHandler.handleUpdatePage(args);

      expect(mockNotionClient.pages.update).toHaveBeenCalledWith({
        page_id: 'page-1',
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'Updated Page',
                },
              },
            ],
          },
        },
      });

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: JSON.stringify(mockResponse, null, 2),
          },
        ],
      });
    });

    it('should handle errors when updating page', async () => {
      const error = new Error('Page update failed');
      mockNotionClient.pages.update.mockRejectedValue(error);

      const args: UpdatePageArgs = {
        page_id: 'page-1',
        properties: {},
      };

      await expect(pagesHandler.handleUpdatePage(args)).rejects.toThrow('Page update failed');
    });
  });
}); 