<p align="center">
  <a href="https://nextjs.org/docs" target="blank"><svg aria-label="Next.js logomark" class="next-mark_root__iLw9v" height="80" role="img" viewBox="0 0 180 180" width="80"><mask height="180" id=":R0:mask0_408_134" maskUnits="userSpaceOnUse" style="mask-type:alpha" width="180" x="0" y="0"><circle cx="90" cy="90" fill="black" r="90"></circle></mask><g mask="url(#:R0:mask0_408_134)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#:R0:paint0_linear_408_134)"></path><rect fill="url(#:R0:paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect></g><defs><linearGradient gradientUnits="userSpaceOnUse" id=":R0:paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id=":R0:paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient></defs></svg></a>
  <a target="_blank" href="https://github.com/docker/compose" target="blank"><img src="https://raw.githubusercontent.com/docker/compose/v2/logo.png" alt="Docker Compose" title="Docker Compose Logo" width="120"></a>
  <a target="_blank" href="https://www.docker.com/" target="blank"><img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="Docker Logo" title="Docker  Logo" width="120"></a>
<a target="_blank" href="https://www.mongodb.com/" target="blank"  style="height:'30px';"><img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" alt="MongoDB Logo" title="MongoDB Logo" width="120"></a>
</p>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), the purpose of this project is understand how we can use [React-Query](https://tanstack.com/query/v3/) with a custom REST API in order to execute CRUD operations with MongoDB.

# Configuration

You will need to create a new file in the root of the project named `.env` with this keys(feel free to change the values):

```env
DATABASE_URL=mongodb://your_username:your_password@localhost:27021
PORT=3011
DB_URL=mongodb://your_username:your_password@
DB_HOST=localhost
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_PORT=27021
DB_NAME=your_mongo_database_name
UI_URL=http://localhost:3011
```

# MongoDB Database Initial configuration

### 1. Install Docker Desktop
In order to use mongodb after create `.env` file you will need to create a Docker container and executed it, in my case I have already installed [Docker Desktop](https://www.docker.com/products/docker-desktop/).

### 2. Create the Docker Container

Once you have already installed Docker Desktop and the `.env` file with the credential, you need to execute this command in the root of the project:
`npm run docker:build`

### 3. Create the Collections

Then we will need to create the collections, in order to do that in the directory `./src/ddl/` of the root project I have some mongodb scripts. You can execute this mongo scripts from VSCode using the extension named [MongoDB for VSCode](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode) . For each file inside this folder you just need open each file and click the Play button, this sould to create the collections.

<img src="screenshots/play_button.png" alt="MongoDB Play Button"/>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3011](http://localhost:3011) with your browser to see the result.

# REST API

This project has CRUD Operations using MongoDB from a REST API, allowing you persist data.

## Endpoints

### GET Posts `/api/posts`

This endpoint return all the posts saved in the MongoDB.

#### GET Posts 200 Response
```json
[
    {
      _id: "64a6214642876325f7510f1b",
      title: "How to use GraphQL with Next.js",
      content: "In order to use GraphQL with Next.js you will need to install some node packages modules such as mongodb",
      image_url: "https://s.pstatic.net/static/www/u/2014/0328/mma_204243574.png",
      description: "GraphQL CRUD with Next.js",
      user_id: "64a61e5142876325f7510f16",
      category: {
        name: "Backend"
      },
    },
    {
      _id: "64a6219a42876325f7510f1d",
      title: "How to use MongoDB with Next.js",
      content: "In order to use MongoDB with Next.js you will need to install some node packages modules such as mongodb",
      image_url: "https://s.pstatic.net/static/www/u/2014/0328/mma_204243574.png",
      description: "MongoDB CRUD with Next.js",
      user_id: "64a61e5142876325f7510f16",
      category: {
        name: "Full stack"
      },
    }
]
```

### POST Create a Post `/api/posts`

This endpoint create a new post in the databse of MongoDB.

#### POST Request Body JSON
```json
{
    "title": "How to use MongoDB with Express.js",
    "content": "In order to use MongoDB with Express.js you will need to install some node packages modules such as mongodb",
    "image_url": "https://www.edureka.co/blog/wp-content/uploads/2019/05/logo.png",
    "description": "MongoDB CRUD with Express.js",
    "user_id": "64a61e5142876325f7510f16", 
    "tags": ["MongoDB", "Express.js", "Node.js"],
    "category":{
      "name":"Backend"
    }
}
```

#### POST Posts 200 Response
```json
{
	"message": "The Post was created successfully.",
	"post": {
		"id": "64aee0e0676f9dab45f00943",
		"title": "How to use MongoDB with Express.js",
		"content": "In order to use MongoDB with Express.js you will need to install some node packages modules such as mongodb",
		"image_url": "https://www.edureka.co/blog/wp-content/uploads/2019/05/logo.png",
		"description": "MongoDB CRUD with Express.js",
		"user_id": "64a61e5142876325f7510f16",
		"tags": [
			"MongoDB",
			"Express.js",
			"Node.js"
		],
		"category": {
			"name": "Backend"
		}
	}
}
```

### GET Post `/api/post/${id}`

This endpoint return one post by Post ID saved in the MongoDB.

#### GET Post 200 Response

```json
{
      _id: "64a6219a42876325f7510f1d",
      title: "How to use MongoDB with Next.js",
      content: "In order to use MongoDB with Next.js you will need to install some node packages modules such as mongodb",
      image_url: "https://s.pstatic.net/static/www/u/2014/0328/mma_204243574.png",
      description: "MongoDB CRUD with Next.js",
      user_id: "64a61e5142876325f7510f16",
      category: {
        name: "Backend"
      },
}
```

### GET Post `/api/post/user/${userId}`

This endpoint return all the posts that belongs to some user in the MongoDB.

#### GET Posts by userId 200 Response

```json
[
  {
    "_id": "64ac3777a2c0b5518315ffbc",
    "title": "How to use MongoDB with Express.js",
    "content": "In order to use MongoDB with Express.js you will need to install some node packages modules such as mongodb",
    "image_url": "https://www.edureka.co/blog/wp-content/uploads/2019/05/logo.png",
    "description": "MongoDB CRUD with Express.js",
    "user_id": "64a61e5142876325f7510f16",
    "category": {
      "name":"Backend"
    },
    "tags": ["MongoDB", "Express.js", "Node.js"]
  },
  {
    "_id": "64ad77386ab9ddbb676af1c6",
    "title": "How to use MongoDB with Next.js ",
    "content": "In order to use MongoDB with Next.js you will need to install some node packages modules such as mongodb",
    "image_url": "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
    "description": "MongoDB CRUD with Next.js",
    "user_id": "64a61e5142876325f7510f16",
    "category": {
      "name":"Backend"
    },
    "tags": ["MongoDB", "Next.js", "Node.js"]
  }
]
```

### DELETE Post `/api/post/${id}`

This endpoint deletes one Post by ID

#### DELETE Post 200 Response

```json
{
	"message": "The Post with the ID: 64aee339676f9dab45f00944 was deleted successfully."
}
```

### PUT Post `/api/post/${id}`

This endpoint updates one Post by ID

#### PUT Request Body JSON
```json
{
    "title": "How to use MongoDB with Express.js",
    "content": "In order to use MongoDB with Express.js you will need to install some node packages modules such as mongodb",
    "image_url": "https://www.edureka.co/blog/wp-content/uploads/2019/05/logo.png",
    "description": "MongoDB CRUD with Express.js",
    "user_id": "64a61e5142876325f7510f16", 
    "tags": ["MongoDB", "Express.js", "Node.js"],
    "category":{
      "name":"Backend"
    }
}
```

#### PUT Response 200

```json
{
	"post": {
		"acknowledged": true,
		"modifiedCount": 1,
		"upsertedId": null,
		"upsertedCount": 0,
		"matchedCount": 1
	}
}
```
# Google Fonts
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
