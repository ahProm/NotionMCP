// Notion API related types
export interface NotionPage {
  id: string;
  object: 'page';
  created_time: string;
  last_edited_time: string;
  parent: any;
  properties: Record<string, any>;
  url: string;
}

export interface NotionDatabase {
  id: string;
  object: 'database';
  title: Array<{ type: string; text: { content: string } }>;
  properties: Record<string, any>;
}

export interface NotionBlock {
  id: string;
  object: 'block';
  type: string;
  [key: string]: any;
}

export interface ListPagesArgs {
  database_id: string;
  filter?: any;
  sorts?: any[];
  page_size?: number;
}

export interface GetPageArgs {
  page_id: string;
}

export interface CreatePageArgs {
  parent: {
    database_id?: string;
    page_id?: string;
  };
  properties: Record<string, any>;
  children?: any[];
}

export interface UpdatePageArgs {
  page_id: string;
  properties: Record<string, any>;
} 