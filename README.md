# Synoptic Project Recipe App

## Packages

### Server

- Used to interface with the database
- Will host a restful api for the client to fetch from (user data, recipes, etc)

### Client

- The actual website
- what the user will see

# HOW TO RUN

## Only do these once:

1. Install [docker desktop](https://www.docker.com/products/docker-desktop/) and open it
2. Run command in terminal: `npm install -g yarn`
3. Run command in
   terminal: `docker run -d -e POSTGRES_DB=synoptic -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -p 5432:5432 postgres`
4. Run command in terminal: `docker run --name redis-session -d -p 6379:6379 redis`
5. Run command in terminal in proejct root directory: `yarn install`
6. Add file called `.env` to server directory, and within the file add the lines:

```
DATABASE_URL=postgres://postgres:password@localhost:5432/synoptic?schema=public
JWT_SECRET=secret
```

7. Run command in terminal in server direcotry: `npx prisma migrate dev`
8. Run command in terminal in server directory: `npx prisma generate`
9. Run command in terminal in server directory: `npx prisma db seed`

When changes are made to the database [schema](packages/server/prisma/schema.prisma), delete the docker container from
the docker desktop app and rerun commands 3-7.

## Do this every time:

10. Run command in terminal in project root directory: `yarn run dev`

Then go to [http://localhost:3001/](http://localhost:3001/)

Or view api routes in [http://localhost:3000/](http://localhost:3000/)

# HOW TO USE WITH GIT

- Clone the repo onto your computer by running the command in your
  terminal: `git clone https://github.com/JacobJEdwards/synoptic-project`

- When you add a new file run the command in terminal: `git add -A`

- when you make changes run the command: `git commit -am "your message"`

- When you want to share the changes: `git push`

- When you want to get other peoples changes: `git pull`

- Sometimes there will be merge conflicts, im not sure how to deal with them maybe `git merge` or `git rebase`

- run `git pull` or `git status` often

- alterantively use VSCodes source control tab

any issues text me
