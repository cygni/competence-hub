# Cygni Competence Hub

This Nuxt.js app is created in order to be able to show all in-house competence projects and share knowledge and also get help in your project if you are stuck on something.

### Techstack

- [Nuxt.js](https://nuxt.com/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Firestore](https://firebase.google.com/docs/firestore)
- [VueFire](https://vuefire.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)

## Firestore

In order to fetch required data there are an .env file that is required locally to run it locally, those are added into vercel where the application is hosted.

User used to create firestore in firebase:
cygnivasttech@gmail.com

## Vercel

The app is hosted via Vercel. You can access the app via https://competence-hub.vercel.app/

The repo that is hosted is used using the username "cygnivasttech" in github, that user have forked the competence-hub repo from the original repo. The fork needs to be updated in order to get vercel up to speed. All the code changes is done against the original repo.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
