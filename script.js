const w = 700;
const h = 300;
const padding = 40;

d3.json("/albums.json").then(function(data) {
    // Assuming data is an array of albums, we need to flatten it to get all tracks
    const tracks = data.flatMap(album => album.trackList);

    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(tracks, track => track.songNumber)])
        .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(tracks, track => track.timesPlayed)])
        .range([h - padding, padding]);

    // Scatter plot with animation
    svg.selectAll("circle")
        .data(tracks)
        .enter()
        .append("circle")
        .attr("cx", track => xScale(track.songNumber))
        .attr("cy", h) // Start below the chart
        .attr("r", 2.5)
        .transition() // Start a transition
        .duration(2000) // Duration of the animation in milliseconds
        .delay((track, i) => i * 20) // Delay each circle's animation by its index
        .attr("cy", track => yScale(track.timesPlayed)); // Animate to the final y position

    // ... rest of your code for axes and labels ...
}).catch(error => {
    console.error("Error loading the data: ", error);
});
