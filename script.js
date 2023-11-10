// Width og height til SVG-elementet
const w = 700;
const h = 300;
const padding = 40;

d3.json("/data/albums.json").then(function(data) {
//SVG-elementet
const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

//Skala for x-aksen
const xScale = d3.scaleLinear()
  .domain([0, 160])
  .range([padding, w - padding]);

const yScale = d3.scaleLinear()
  .domain([0, 350])
  .range([h - padding, padding]);
  
//Scatter plot
svg
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
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

    
//Labels
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d[1];
  })
  .attr("x", function (d) {
    return xScale(d[0]) + 5;
  })
  .attr("y", function (d) {
    /**
     * Som med de andre tilfælde, hvor y-værdien skal bruges, skal vi rette koden til
     * den nye virkelighed.
     * Sidste gang skrev vi: return yScale(h - d[1]) - 5;
     * Nu skriver vi:
     **/
    return yScale(d[1]) - 5;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red");
  

/** --- Akser: --- */

// Definere akserne til x og y (læg mærke til de to typer!):
const xAxis = d3.axisBottom().scale(xScale).ticks(5);
const yAxis = d3.axisLeft().scale(yScale).ticks(5);

//Lægge akserne til SVG-elementet:

svg
  //Først laves en svg-group med "g"
  .append("g")
  //Så flyttes den til bunden af grafen
  .attr("transform", "translate(0," + (h - 30) + ")")
  //Magi som får akserne til at blive tegnet
  .call(xAxis);

svg
  .append("g")
  .attr("transform", "translate(" + 30 + ",0)")
  .call(yAxis);


})