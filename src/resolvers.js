const resolvers = {
    Query: {
        listCountries: async (_, _args,  { dataSources }) => {
            const countries = await dataSources.covid19API.getCountries();
            return countries;
        }
    }
};

module.exports = resolvers;