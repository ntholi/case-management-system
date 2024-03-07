import { Resource } from '../../admin-core/repository/repository';

export interface Post extends Resource {
  title: string;
  slug: string;
  caption: string;
  body: string;
  category?: {
    id: string;
    name: string;
  };
  author?: {
    id: string;
    name: string;
  };
  image: string;
  published: boolean;
  publishedAt: Date | null;
}
