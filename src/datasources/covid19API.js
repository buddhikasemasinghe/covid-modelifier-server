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

    async worldSummary() {
        const summary =  await this.get('summary');
        let worldSummary = this.summaryReducer(summary.Global);
        worldSummary.lastUpdated = summary.Date;
        return worldSummary;
    }

    async countrySummary(slug) {
        const summary =  await this.get('summary');
        const country = summary.Countries.find(country => country.Slug === slug);
        let countrySummary =  this.summaryReducer(country);
        countrySummary.slug = slug;
        countrySummary.countryName = country.Country;
        return countrySummary;
    }

    async topCasesOrderByStatus(status, range) {
        const summary =  await this.get('summary');
        const topRange = summary.Countries.sort((a, b) => b[status] - a[status]).splice(0, range);
        return Array.isArray(topRange) ? topRange.map(country => this.summaryReducer(country)) : [];
    }

    async findFromDayOne(slug, status) {
        const response =  await this.get(`/total/dayone/country/${slug}/status/${status.toLowerCase()} `);
        return Array.isArray(response) ? response.map(stat => this.statisticsReducer(stat)) : []
    }

    countryReducer(countryResponse) {
        return {
            name: countryResponse.Country,
            slug: countryResponse.Slug
        }
    }

    summaryReducer(response) {
        return {
            newConfirmed: response.NewConfirmed,
            totalConfirmed: response.TotalConfirmed,
            newDeaths: response.NewDeaths,
            totalDeaths: response.TotalDeaths,
            newRecovered: response.NewRecovered,
            totalRecovered: response.TotalRecovered,
            lastUpdated: response.Date,
            slug: response.Country
        }
    }
    statisticsReducer(response){
        return {
            lat: response.Lat,
            lon: response.Lon,
            noOfCases: response.Cases,
            status: response.Status,
            lastUpdated: response.Date,
            countryName: response.Country,
            state: response.Province
        }
    }

}

module.exports = Covid19API;