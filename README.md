# Clerk Fastify React Prisma Starter

<p align="center">
  <a href="https://clerk.dev?utm_source=github&utm_medium=clerk_javascript" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://images.clerk.dev/static/logo-dark-mode-400x400.png">
      <img src="https://images.clerk.dev/static/logo-light-mode-400x400.png" height="64">
    </picture>
  </a>
  <br />
</p>

This repo shows an example use case for how you setup a fullstack monorepo starter with [Clerk](https://clerk.dev?utm_source=github&utm_medium=starters&utm_campaign=cfrp), Fastify, React and Prisma to achieve authenticated cross-domain user access.

# Clerk Apartments Application

## The application

The **Clerk Apartments** application allows a user to claim apartments from the gallery and view them in his own collection. Any apartment that is "claimed" by a user, cannot be reclaimed unless "foregone" by the previous holder.

## Under the hood

The example is a fullstack application in a monorepo structure using:

- [Clerk](https://clerk.dev?utm_source=github&utm_medium=starters&utm_campaign=cfrp) as an authentication provider.
- [Fastify](https://www.fastify.io/) as the API server.
- [React](https://reactjs.org/) as the frontend library.
- [Prisma](https://www.prisma.io/) for data storage and model type sharing between client and server.
- [Yarn workspaces](https://yarnpkg.com/features/workspaces) for the monorepo management.

## Where the magic happens

Authenticating Prisma data access using Clerk works by introducing a thin and customizable access management layer on top of the Prisma generated API for our collection.

This ultimately gets handled in the Fastify API routes with simple logic and the use of the Clerk authentication [preHandler hook](./packages/server/src/auth/clerkHandler.ts), like in the [/apartments routes](./packages/server/src/routes/apartments.ts).

## Running the example

To run the example locally you need to:

1. Sign up for a Clerk account at [https://clerk.dev/](http://clerk.dev/?utm_source=github&utm_medium=starters&utm_campaign=cfrp).
2. Clone this repository `git clone git@github.com:clerkinc/clerk-fastify-react-prisma-starter.git`.
3. Setup the required API variables from your Clerk project as shown at the example env files. [Server](./.env.example) [Client](./packages/client/.env.example)
4. `yarn install` to install the required dependencies.
5. Setup your Prisma database, following the [instructions](./packages/db/README.md) at the `db` folder.
6. To start both the client and the server you need to run in separate terminals from the top level of the repository the commands: `yarn client:dev` and `yarn server:dev`

## Contact

If you have any specific use case or anything you would like to ask, please reach out!
