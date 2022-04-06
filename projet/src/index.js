import { json } from 'd3-fetch'
import * as d3 from 'd3';
//import Eastblue from '../data/EastbluePolygon.geojson'; 


d3.json('/data/EastBlueFixed.geojson').then((datas) => {
let eastblue = datas
console.log(eastblue);

const WIDTH = 1000
const HEIGHT = 500

d3.select("body").append("div").attr("class","mon-svg");
d3.select(".mon-svg").append("svg");


let projection = d3.geoMercator()
.fitSize([WIDTH,HEIGHT], datas)                
.scale(3000)
  
  let geoGenerator = d3.geoPath()
    .projection(projection);
  
  function update(eastblue) {
    let u = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT)
      .selectAll('path')
      .data(eastblue.features)
      

  
    u.enter()
      .append('path')
      .attr('d', geoGenerator)
      
  }
  
  update(eastblue);
})
  
  