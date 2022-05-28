This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

1. Use node version `16.13.2`
2. Add `.env.local` file to the repo.

## Getting Started

1. Install the packages using `yarn`
2. Run the development server `yarn dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Relevant API Queries

- `/` : `*[_id == "home"]` - http://localhost:3333/desk/pages;homePage
- `initiative/` : `*[_id == "initiative"]` - http://localhost:3333/desk/pages;initiativePage
- `who-we-are/` : `*[_id == "whoweare"]` - http://localhost:3333/desk/pages;whoWeArePage
- `leadership/` : `*[_id == "leadership"]` - http://localhost:3333/desk/pages;leadershipPage
- `contact/` : `*[_id == "contact"]` - http://localhost:3333/desk/pages;contactPage

- `news/index.js` : `*[_id == "news"]` - http://localhost:3333/desk/pages;newsPage
- `news/[slug].js` : `*[_type == "article" && slug.current == $slug]`  - http://localhost:3333/desk/article
- `insights/index.js` : `*[_id == "insights"]` - http://localhost:3333/desk/pages;insightsPage
- `insights/[slug].js` : `*[_type == "insight" && slug.current == $slug]`  - http://localhost:3333/desk/insight
- `projects/index.js` : `*[_id == "projects"]` - http://localhost:3333/desk/pages;projectsPage
- `projects/[slug].js` : `*[_type == "project" && slug.current == $slug]` - http://localhost:3333/desk/project

- `actions/index.js` :  `*[_id == "actions"]` - http://localhost:3333/desk/pages;actionsPage
- `actions/[slug]/index.js` : `*[_type == "action" && slug.current == $slug]`  - http://localhost:3333/desk/action
- `actions/[slug]/[slug].js` : `*[_type == "actionTeam" && slug.current == $slug]`  - http://localhost:3333/desk/actionTeam

- `sectors/index.js` :  `*[_id == "sectors"]` - http://localhost:3333/desk/pages;actionsPage
- `sectors/[slug]/index.js` : `*[_type == "sectorCategory" && slug.current == $slug]`  - http://localhost:3333/desk/sectorCategory
- `sectors/[slug]/[slug].js` : `*[_type == "sector" && slug.current == $slug]`  - http://localhost:3333/desk/sector

