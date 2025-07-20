import { Client as NotionClient } from '@notionhq/client';
import { ListPagesArgs, GetPageArgs, CreatePageArgs, UpdatePageArgs } from '../types/notion.js';
import { NOTION_DATABASE_ID } from '../config/notion';

export class PagesHandler {
  private notion: NotionClient;

  constructor(notion: NotionClient) {
    this.notion = notion;
  }

  async handleListPages(args: ListPagesArgs) {
    const { database_id = NOTION_DATABASE_ID, filter, sorts, page_size = 100 } = args;
    if (!database_id) {
      throw new Error('database_id must be provided as an argument or set in the .env file as NOTION_DATABASE_ID');
    }
    const response = await this.notion.databases.query({
      database_id,
      filter,
      sorts,
      page_size,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async handleGetPage(args: GetPageArgs) {
    const { page_id } = args;
    
    const response = await this.notion.pages.retrieve({
      page_id,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async handleCreatePage(args: CreatePageArgs) {
    let { parent, properties, children } = args;
    // If parent is a database and database_id is missing, use default
    if (parent && !parent.database_id && NOTION_DATABASE_ID) {
      parent = { ...parent, database_id: NOTION_DATABASE_ID };
    }
    if (parent && !parent.database_id && !parent.page_id) {
      throw new Error('parent.database_id or parent.page_id must be provided, or set NOTION_DATABASE_ID in .env');
    }
    const response = await this.notion.pages.create({
      parent: parent as any,
      properties,
      children,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  async handleUpdatePage(args: UpdatePageArgs) {
    const { page_id, properties } = args;
    
    const response = await this.notion.pages.update({
      page_id,
      properties,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }
} 