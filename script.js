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

}

fetchData();
