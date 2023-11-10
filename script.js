const w3 = 800;
const h3 = 600;
const padding3 = 40;
 
const xScale3 = d3.scaleLinear()
  .domain([0, 160])
  .range([padding3, w3 - padding3]);
 
const yScale3 = d3.scaleLinear()
  .domain([0, 350])
  .range([h3 - padding3, padding3]);
 
const xAxis = d3.axisBottom()
  .scale(xScale3)
  .ticks(10);
 
const yAxis = d3.axisLeft()
  .scale(yScale3)
  .ticks(10);
 
 
d3.json("/data/albums.json").then(function(data) {
  const svg3 = d3.select("#graph3")
    .append("svg")
    .attr("width", w3)
    .attr("height", h3);
 
    svg3
    .selectAll("circle")
    .data(data)
    .enter()
    .selectAll("circle")
    .data(function(d) {
      return d.trackList;
    })
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return xScale3(d.songNumber);
    })
    .attr("cy", function(d) {
      return yScale3(d.timesPlayed);
    })
    .attr("r", 2.5)
    .on("mouseover", function() {
      let xPosition3 = parseFloat(d3.select(this).attr("cx"));
      let yPosition3 = parseFloat(d3.select(this).attr("cy"));
   
      const data = d3.select(this).data()[0];
   
      d3.select("#tooltip3") // tooltip for times played show value
      .style("left", xPosition3 + "px")
      .style("top", yPosition3 + 320 + "px")
      .select("#value3")
      .text("Times Played: " + data.timesPlayed);
   
    d3.select("#tooltip3") // tooltip for track title name value
      .select("#toolName3")
      .text("Track Title: " + data.trackTitle);
   
   
      d3.select("#tooltip3").classed("hidden", false);
    })
   
    .on("mouseout", function(d) {
     
      d3.select("#tooltip3").classed("hidden", true);
    });
 
  svg3.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h3 - padding3) + ")")
    .call(xAxis);
 
  svg3.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding3 + ",0)")
    .call(yAxis);
 
  svg3.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", w3)
  .attr("y", h3 - 50)
  .text("Song number");
 
  svg3.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", 50)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Times played");
 
  //add title
  svg3
  .append("text")
  .attr("x", w3 / 2)
  .attr("y", 30)
  .attr("text-anchor", "middle")
  .style("font-size", "24px")
  .text("Most played songs");
 
});