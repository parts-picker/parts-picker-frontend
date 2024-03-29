# parts-picker-ui

To run, you will need to set ENTRY_LINKS_URL as an evironment variable that points to the entry links endpoint in the backend.  
Use the following command to run it locally in dev mode:

```
ENTRY_LINKS_URL=http://localhost:8080/api/v1/entry npm run dev
```

TODO

## Utilities

### husky

husky is used to manage git hooks inside of this repository.
Hooks stored inside the .husky directory and will be run accordingly.  
Husky hooks will be automatically added when running `npm install`  
More information about husky can be found in its [repository](https://github.com/typicode/husky).

## Code Quality

### eslint

This project uses eslint as a linter.
Its embedded in next.js.
You can run the linter manually for all files with the following command:

```
npm run lint
```

husky will also run the linter before each commit, but only for staged files.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
