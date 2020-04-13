const {RESTDataSource} = require('apollo-datasource-rest');

class Covid19API extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = "https://api.covid19api.com/";
    }


    async getCountries() {
        const countryResponse =  await this.get('countries');
        return Array.isArray(countryResponse) ? countryResponse.map(country => this.countryReducer(country)) : []
    }

    countryReducer(countryResponse) {
        return {
            name: countryResponse.Country,
            id: countryResponse.Slug
        }
    }
}

module.exports = Covid19API;