// The number of datapoints
const n = 21;

// 8. An array of objects of length N. Each object has key -> value pair, the key being 'y' and the value is a random number
let dataset = d3.range(n).map(function (d) { 
    return { 'y': Math.random() }; 
});

let dataset2 = d3.range(n).map(function (d) { 
    return { 'y': Math.random() }; 
});

// 2. Use the margin convention practice 
const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    , width = 800 - margin.left - margin.right // Use the window's width 
    , height = 600 - margin.top - margin.bottom; // Use the window's height

// 5. X scale will use the index of our data
const xScale = d3.scaleLinear()
    .domain([0, n - 1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generated number 
const yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
const line = d3.line()
    .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 1. Add the SVG to the page and employ #2
const svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // 3. Call the x axis in a group tag
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append('g').attr('id', 'layer1').append('path')
    .datum(dataset) // 10. Binds data to the line 
    .attr('class', 'line') // Assign a class for styling 
    .attr('d', line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint 
svg.select('#layer1').selectAll('.dot')
    .data(dataset)
    .enter().append('circle') // Uses the enter().append() method
    .attr('class', 'dot') // Assign a class for styling
    .attr('cx', function (d, i) { return xScale(i) })
    .attr('cy', function (d) { return yScale(d.y) })
    .attr('r', 5)
    .append("svg:title")
    .text(function(d, i) { return 'Exact value: ' +  d.y; });

// 9. Append the path, bind the data, and call the line generator 
svg.append('g').attr('id', 'layer2').append('path')
    .datum(dataset2) // 10. Binds data to the line 
    .attr('class', 'line') // Assign a class for styling 
    .attr('d', line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint 
svg.select('#layer2').selectAll('.dot')
    .data(dataset2)
    .enter().append('circle') // Uses the enter().append() method
    .attr('class', 'dot') // Assign a class for styling
    .attr('cx', function (d, i) { return xScale(i) })
    .attr('cy', function (d) { return yScale(d.y) })
    .attr('r', 5)
    .append("svg:title")
    .text(function(d, i) { return 'Exact value: ' +  d.y; });