import { notionClient, validateEnvironment } from '../../config/notion';

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Mock the Notion client
jest.mock('@notionhq/client', () => ({
  Client: jest.fn().mockImplementation(() => ({
    auth: 'mock-auth-token',
    databases: {
      query: jest.fn(),
    },
    pages: {
      retrieve: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  })),
}));

describe('Notion Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('validateEnvironment', () => {
    it('should not throw error when NOTION_API_KEY is set', () => {
      process.env.NOTION_API_KEY = 'test-api-key';
      
      expect(() => {
        validateEnvironment();
      }).not.toThrow();
    });

    it('should throw error when NOTION_API_KEY is not set', () => {
      delete process.env.NOTION_API_KEY;
      
      expect(() => {
        validateEnvironment();
      }).toThrow('NOTION_API_KEY environment variable is required');
    });

    it('should throw error when NOTION_API_KEY is empty', () => {
      process.env.NOTION_API_KEY = '';
      
      expect(() => {
        validateEnvironment();
      }).toThrow('NOTION_API_KEY environment variable is required');
    });
  });

  describe('notionClient', () => {
    it('should be an instance of Notion Client', () => {
      expect(notionClient).toBeDefined();
      expect(notionClient).toHaveProperty('databases');
      expect(notionClient).toHaveProperty('pages');
    });
  });
}); 