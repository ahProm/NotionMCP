import { Client as NotionClient } from '@notionhq/client';
import { ListPagesArgs, GetPageArgs, CreatePageArgs, UpdatePageArgs } from '../types/notion.js';

export class PagesHandler {
  private notion: NotionClient;

  constructor(notion: NotionClient) {
    this.notion = notion;
  }

  async handleListPages(args: ListPagesArgs) {
    const { database_id, filter, sorts, page_size = 100 } = args;
    
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
    const { parent, properties, children } = args;
    
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