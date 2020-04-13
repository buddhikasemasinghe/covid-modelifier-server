const resolvers = {
    Query: {
        listCountries: async (_, _args,  { dataSources }) => {
            return await dataSources.covid19API.getCountries();
        },
        worldDailySummary: async (_, _args,  { dataSources }) => {
            return await dataSources.covid19API.worldSummary();
        },
        countryDailySummary: async (_, { slug },  { dataSources }) => {
            return await dataSources.covid19API.countrySummary(slug);
        },
        findFromDayOne: async (_, { slug, status },  { dataSources }) => {
            return await dataSources.covid19API.findFromDayOne(slug, status);
        }
    }
};

module.exports = resolvers;