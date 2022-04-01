import { json } from 'd3-fetch'
import * as d3 from 'd3';
//import Eastblue from '../data/EastbluePolygon.geojson'; 


d3.json('/data/EastbluePolygones.geojson').then((datas) => {
let eastblue = datas
console.log(eastblue);


let projection = d3.geoMercator()
    
  
  let geoGenerator = d3.geoPath()
    .projection(projection);
  
  function update(eastblue) {
    let u = d3.select('#content g.map')
      .selectAll('path')
      .data(eastblue.features);
  
    u.enter()
      .append('path')
      .attr('d', geoGenerator);
  }
  
  update(eastblue);




})
  
  