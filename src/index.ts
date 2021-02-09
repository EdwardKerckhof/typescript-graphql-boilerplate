import { ApolloServer } from 'apollo-server-express'
import 'dotenv-safe/config'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { __prod__ } from './constants'
import { HelloResolver } from './resolvers/hello'

const main = async () => {
  // Create express app
  const app = express()
  // Application PORT
  const PORT = process.env.PORT

  // Create apollo server (GraphQL)
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false // Disable default GraphQL errors
    }),
    context: ({ req, res }) => ({ req, res }) // Enables use of context (with request and response) in resolvers
  })

  apolloServer.applyMiddleware({ app })

  // Single REST endpoint to simply test API
  app.get('/', (_, res) => {
    res.send(
      `<h1 style="text-align:center;">🚀 server successfully running on port: ${PORT} 🚀</h1>`
    )
  })

  // Start express server
  app.listen(PORT, () => {
    console.log(`🚀 server started on http://localhost:${PORT} 🚀`)
  })
}

// Catch any errors that may occur
main().catch((err) => {
  console.error(err)
})
