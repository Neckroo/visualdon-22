import * as d3 from 'd3'

import expectancy from '../data/life_expectancy_years.csv';

/* 
// set the dimensions and margins of the graph
const margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then( function(data) {

  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 10000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  const z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 1, 40]);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", d => x(d.gdpPercap))
      .attr("cy", d => y(d.lifeExp))
      .attr("r", d => z(d.pop))
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")

})
 */
let listCountries = []

expectancy.forEach(row => {
  let countryData = {};
  countryData[row['country']] = row['2021']
  listCountries.push(countryData)
});
console.log(listCountries);

let margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 650 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

let svg = d3.select("#graph")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);

  // Map and projection
let path = d3.geoPath();
let projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);
  
// Data and color scale
let data = new Map();
let colorScale = d3.scaleThreshold()
  .domain([50, 60, 70, 80, 90, 100])
  .range(d3.schemeGreens[7]);

  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(d){
      // Draw the map
      svg.append("g")
      .selectAll("path")
      .data(d.features)
      .join("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set id
      .attr("id", function(d){ return d.properties.name;})
      .attr("fill", function (d) {
        let number = 0;
        listCountries.forEach(country => {
            if (typeof country[this.id] != "undefined") {
              console.log(country[this.id]);
              number = country[this.id]
            }
        })
        console.log(number);
        return colorScale(number);
      })
  })