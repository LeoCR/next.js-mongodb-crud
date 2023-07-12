export type Post = {
  _id: string;
  title: string;
  content: string;
  image_url: string;
  description: string;
  user_id: string;
  category: {
    name: string;
    image:string;
  };
  tags: Array<string>;
};
