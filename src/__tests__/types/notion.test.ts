import {
  NotionPage,
  NotionDatabase,
  NotionBlock,
  ListPagesArgs,
  GetPageArgs,
  CreatePageArgs,
  UpdatePageArgs,
} from '../../types/notion.js';

describe('Notion Types', () => {
  describe('NotionPage', () => {
    it('should have correct structure', () => {
      const page: NotionPage = {
        id: 'test-page-id',
        object: 'page',
        created_time: '2023-01-01T00:00:00.000Z',
        last_edited_time: '2023-01-01T00:00:00.000Z',
        parent: { type: 'database_id', database_id: 'test-database-id' },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'Test Page',
                },
              },
            ],
          },
        },
        url: 'https://notion.so/test-page',
      };

      expect(page.id).toBe('test-page-id');
      expect(page.object).toBe('page');
      expect(page.created_time).toBeDefined();
      expect(page.last_edited_time).toBeDefined();
      expect(page.parent).toBeDefined();
      expect(page.properties).toBeDefined();
      expect(page.url).toBeDefined();
    });
  });

  describe('NotionDatabase', () => {
    it('should have correct structure', () => {
      const database: NotionDatabase = {
        id: 'test-database-id',
        object: 'database',
        title: [
          {
            type: 'text',
            text: {
              content: 'Test Database',
            },
          },
        ],
        properties: {
          title: {
            title: {},
          },
        },
      };

      expect(database.id).toBe('test-database-id');
      expect(database.object).toBe('database');
      expect(database.title).toBeDefined();
      expect(Array.isArray(database.title)).toBe(true);
      expect(database.properties).toBeDefined();
    });
  });

  describe('NotionBlock', () => {
    it('should have correct structure', () => {
      const block: NotionBlock = {
        id: 'test-block-id',
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Test paragraph',
              },
            },
          ],
        },
      };

      expect(block.id).toBe('test-block-id');
      expect(block.object).toBe('block');
      expect(block.type).toBe('paragraph');
      expect(block.paragraph).toBeDefined();
    });
  });

  describe('ListPagesArgs', () => {
    it('should have correct structure', () => {
      const args: ListPagesArgs = {
        database_id: 'test-database-id',
        filter: {
          property: 'Status',
          select: {
            equals: 'Done',
          },
        },
        sorts: [
          {
            property: 'Created time',
            direction: 'descending',
          },
        ],
        page_size: 100,
      };

      expect(args.database_id).toBe('test-database-id');
      expect(args.filter).toBeDefined();
      expect(args.sorts).toBeDefined();
      expect(Array.isArray(args.sorts)).toBe(true);
      expect(args.page_size).toBe(100);
    });

    it('should work with minimal required fields', () => {
      const args: ListPagesArgs = {
        database_id: 'test-database-id',
      };

      expect(args.database_id).toBe('test-database-id');
      expect(args.filter).toBeUndefined();
      expect(args.sorts).toBeUndefined();
      expect(args.page_size).toBeUndefined();
    });
  });

  describe('GetPageArgs', () => {
    it('should have correct structure', () => {
      const args: GetPageArgs = {
        page_id: 'test-page-id',
      };

      expect(args.page_id).toBe('test-page-id');
    });
  });

  describe('CreatePageArgs', () => {
    it('should have correct structure with database parent', () => {
      const args: CreatePageArgs = {
        parent: {
          database_id: 'test-database-id',
        },
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
                    content: 'Test content',
                  },
                },
              ],
            },
          },
        ],
      };

      expect(args.parent).toBeDefined();
      expect(args.parent.database_id).toBe('test-database-id');
      expect(args.properties).toBeDefined();
      expect(args.children).toBeDefined();
      expect(Array.isArray(args.children)).toBe(true);
    });

    it('should have correct structure with page parent', () => {
      const args: CreatePageArgs = {
        parent: {
          page_id: 'test-page-id',
        },
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

      expect(args.parent).toBeDefined();
      expect(args.parent.page_id).toBe('test-page-id');
      expect(args.properties).toBeDefined();
      expect(args.children).toBeUndefined();
    });
  });

  describe('UpdatePageArgs', () => {
    it('should have correct structure', () => {
      const args: UpdatePageArgs = {
        page_id: 'test-page-id',
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

      expect(args.page_id).toBe('test-page-id');
      expect(args.properties).toBeDefined();
    });
  });
}); 