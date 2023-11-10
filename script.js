const w = 700;
const h = 300;
const padding = 40;

let LARM = new Audio('/onlymp3.to - Boring Elevator Music Sound Effect Perfect Cut -RYaibgKKvyQ-192k-1699625755.mp3');

function data() {

d3.select("svg").remove();

d3.json("/albums.json").then(function(data) {

    /* 
    Flatmap er en metode der tager alle elementer i et array og gør det til et flat array. 
    Vi bruger den for at undgå problemer i koden i forhold til arrays i arrays
    */
    const tracks = data.flatMap(album => album.trackList);

    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h).style("margin-top","20px");

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(tracks, track => track.songNumber)])
        .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(tracks, track => track.timesPlayed)])
        .range([h - padding, padding]);

    // Scatter plot 
    svg.selectAll("circle")
        .data(tracks)
        .enter()
        .append("circle")
        .attr("cx", track => xScale(track.songNumber))
        .attr("cy", h-h) // Start punkt
        .attr("r", 2.5)
        .transition() // Start på transition
        .duration(1000) 
        .delay((track, i) => i * 15) 
        .attr("cy", track => yScale(track.timesPlayed)); // slutpunkt

    // Definere akserne 
    const xAxis = d3.axisBottom().scale(xScale).ticks(5);
    const yAxis = d3.axisLeft().scale(yScale).ticks(5);

    // Lægge akserne til SVG-elementet:
    svg
        .append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    // Append x-axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", w)
        .attr("y", h - 50)
        .text("Song number");

    // Append y-axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 50)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Times played");

    // Append title
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .text("Most played songs");
        
});
}

function data2() {
    d3.select("svg").remove();
    
    LARM.play();

    d3.json("/albums.json").then(function(data) {
    
        const tracks = data.flatMap(album => album.trackList);
    
        const svg = d3.select("body").append("svg").attr("width", w).attr("height", h).style("margin-top","20px");
    
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(tracks, track => track.songNumber)])
            .range([padding, w - padding]);
    
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(tracks, track => track.trackTimeInSeconds)])
            .range([h - padding, padding]);
    
        // Scatter plot 
        svg.selectAll("circle")
            .data(tracks)
            .enter()
            .append("circle")
            .attr("cx", track => xScale(track.songNumber))
            .attr("cy", h+10) 
            .attr("r", 2.5)
            .transition() 
            .duration(500) 
            .delay((track, i) => i * 100) 
            .attr("cy", track => yScale(track.trackTimeInSeconds)); 
    
        // Definere akserne 
        const xAxis = d3.axisBottom().scale(xScale).ticks(5);
    
        const yAxis = d3.axisLeft().scale(yScale).ticks(5);
    
        // Lægge akserne til SVG-elementet:
        svg
            .append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);
    
        svg
            .append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);
            
        // Append x-axis label
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", w)
            .attr("y", h - 50)
            .text("Song number");
    
        // Append y-axis label
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Tracktime");
    
        // Append title
        svg.append("text")
            .attr("x", w / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .text("Song length");
    });
    }
