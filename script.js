function fetchData() {
    let educationData;
    let countyData;

    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
    .then(response => response.json())
    .then(response => {
        educationData = response;
    })
    
    // topojson.feature() converts the data from topojson to GeoJSON format for D3
    // All data is fetched first before calling the function with D3 methods

    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    .then(response => response.json())
    .then(response => {
        countyData = topojson.feature(response, response.objects.counties).features;
        visualizeData(educationData, countyData)

    })
}

function visualizeData(education, counties) {
    let width = 950;
    let height = 650;
    let tooltip = d3.select('#tooltip');

    // Draw the SVG canvas

    const svg = d3.select("#choropleth-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    // Each county is a path element in the SVG canvas
    // All path elements are filled according to educational data

    // Because educational data is in a separate dataset, the data
    // is matched based on the fips/id connection

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
            return 'rgba(0, 132, 255, 0.1)'
        } else if(percentage <= 15) {
            return 'rgba(0, 132, 255, 0.2)'
        } else if(percentage <= 20) {
            return 'rgba(0, 132, 255, 0.3)'
        } else if(percentage <= 25) {
            return 'rgba(0, 132, 255, 0.4)'
        } else if(percentage <= 30) {
            return 'rgba(0, 132, 255, 0.5)'
        } else if(percentage <= 35) {
            return 'rgba(0, 132, 255, 0.6)'
        } else if(percentage <= 40) {
            return 'rgba(0, 132, 255, 0.7)'
        } else if(percentage <= 45) {
            return 'rgba(0, 132, 255, 0.8)'
        } else if(percentage <= 50) {
            return 'rgba(0, 132, 255, 0.9)'
        } else if(percentage > 50) {
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
    .on('mouseover', (event) => {
        let d = event.target.__data__;

        let tooltipCounty = education.find((item) => {
            return item.fips === d.id
        })

        tooltip.transition()
        .style('visibility', 'visible')

        tooltip.attr('data-education', tooltipCounty.bachelorsOrHigher)
        
        tooltip.html(`
        <p>${tooltipCounty.area_name}, ${tooltipCounty.state}</p>
        <p>${tooltipCounty.bachelorsOrHigher}%</p>`)

    })
    .on('mouseout', () => {
        tooltip.transition()
        .style('visibility', 'hidden')
    })

}

fetchData();
