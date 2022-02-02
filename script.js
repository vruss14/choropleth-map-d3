function fetchData() {
    let educationData;
    let countyData;

    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
    .then(response => response.json())
    .then(response => {
        educationData = response;
    })
    
    // topojson.feature() converts the data from topojson to GeoJSON format for D3

    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    .then(response => response.json())
    .then(response => {
        countyData = topojson.feature(response, response.objects.counties).features;
        visualizeData(educationData, countyData)

    })
}

function visualizeData(education, counties) {
    console.log(education);
    console.log(counties);

    let width = 950;
    let height = 650;
    let padding = 60;

    const svg = d3.select("#choropleth-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    svg.selectAll('path')
    .data(counties)
    .enter()
    .append('path')
    .attr('d', d3.geoPath())
    .attr('class', 'county')
    .attr('fill', (d) => {
        let county = education.find((item) => {
            return item.fips === d.id
        })

        let percentage = county.bachelorsOrHigher;

        if(percentage <= 10) {
            return 'rgba(0, 132, 255, 0.15)'
        } else if(percentage <= 15) {
            return 'rgba(0, 132, 255, 0.4)'
        } else if(percentage <= 20) {
            return 'rgba(0, 132, 255, 0.66)'
        } else if(percentage > 20) {
            return 'rgba(0, 132, 255, 1)'
        } else {
            return 'White'
        }
    })
    .attr('data-fips', (d) => d.id)
    .attr('data-education', (d) => {
        let correctCounty = education.find((item) => {
            return item.fips === d.id
        })
        return correctCounty.bachelorsOrHigher
    })

}

fetchData();
