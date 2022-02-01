function fetchData() {
    let educationData;
    let countyData;

    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
    .then(response => response.json())
    .then(response => {
        educationData = response;
    })

    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    .then(response => response.json())
    .then(response => {
        countyData = response;
        visualizeData(educationData, countyData)

    })
}

function visualizeData(education, counties) {
    console.log(education);
    console.log(counties);
}

fetchData();
