const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Covid19API = require('./datasources/covid19API');

const dataSources = () => ({
    covid19API: new Covid19API()
});

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources
});

server.listen(8080).then(({ url }) => {
    console.log(`Server is ready at ${ url}`);
});
