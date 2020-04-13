const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Covid19API = require('./datasources/covid19API');

// const dataSources = () => 
// return {
//     covid19API: new Covid19API()
// };

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
            covid19API: new Covid19API(),
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`Server is ready at ${ url}`);
});
