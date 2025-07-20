import { pagesTools } from '../../tools/pages';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

describe('Pages Tools', () => {
  describe('pagesTools', () => {
    it('should be an array of tools', () => {
      expect(Array.isArray(pagesTools)).toBe(true);
      expect(pagesTools.length).toBeGreaterThan(0);
    });

    it('should contain valid Tool objects', () => {
      pagesTools.forEach((tool: Tool) => {
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('inputSchema');
        expect(typeof tool.name).toBe('string');
        expect(typeof tool.description).toBe('string');
        expect(typeof tool.inputSchema).toBe('object');
      });
    });

    it('should have list_pages tool', () => {
      const listPagesTool = pagesTools.find(tool => tool.name === 'list_pages');
      expect(listPagesTool).toBeDefined();
      expect(listPagesTool?.description).toBe('List pages from a Notion database');
      expect(listPagesTool?.inputSchema).toHaveProperty('properties.database_id');
      expect(listPagesTool?.inputSchema).toHaveProperty('required');
      expect((listPagesTool?.inputSchema as any).required).toContain('database_id');
    });

    it('should have get_page tool', () => {
      const getPageTool = pagesTools.find(tool => tool.name === 'get_page');
      expect(getPageTool).toBeDefined();
      expect(getPageTool?.description).toBe('Get a specific page by ID');
      expect(getPageTool?.inputSchema).toHaveProperty('properties.page_id');
      expect(getPageTool?.inputSchema).toHaveProperty('required');
      expect((getPageTool?.inputSchema as any).required).toContain('page_id');
    });

    it('should have create_page tool', () => {
      const createPageTool = pagesTools.find(tool => tool.name === 'create_page');
      expect(createPageTool).toBeDefined();
      expect(createPageTool?.description).toBe('Create a new page in a Notion database');
      expect(createPageTool?.inputSchema).toHaveProperty('properties.parent');
      expect(createPageTool?.inputSchema).toHaveProperty('properties.properties');
      expect(createPageTool?.inputSchema).toHaveProperty('required');
      expect((createPageTool?.inputSchema as any).required).toContain('parent');
      expect((createPageTool?.inputSchema as any).required).toContain('properties');
    });

    it('should have update_page tool', () => {
      const updatePageTool = pagesTools.find(tool => tool.name === 'update_page');
      expect(updatePageTool).toBeDefined();
      expect(updatePageTool?.description).toBe('Update an existing page');
      expect(updatePageTool?.inputSchema).toHaveProperty('properties.page_id');
      expect(updatePageTool?.inputSchema).toHaveProperty('properties.properties');
      expect(updatePageTool?.inputSchema).toHaveProperty('required');
      expect((updatePageTool?.inputSchema as any).required).toContain('page_id');
      expect((updatePageTool?.inputSchema as any).required).toContain('properties');
    });

    it('should have correct schema types for all tools', () => {
      pagesTools.forEach((tool: Tool) => {
        const schema = tool.inputSchema as any;
        expect(schema.type).toBe('object');
        expect(schema.properties).toBeDefined();
        expect(typeof schema.properties).toBe('object');
        
        if (schema.required) {
          expect(Array.isArray(schema.required)).toBe(true);
        }
      });
    });

    it('should have unique tool names', () => {
      const toolNames = pagesTools.map(tool => tool.name);
      const uniqueNames = new Set(toolNames);
      expect(toolNames.length).toBe(uniqueNames.size);
    });
  });
}); 