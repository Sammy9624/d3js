async function draw() {
  //data
  const dataset = await d3.json("data.json");
  const xAccessor = (d) => d.currently.humidity;
  const yAccessor = (d) => d.currently.apparentTemperature;

  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      left: 50,
      right: 50,
      bottom: 50,
    },
  };
  dimensions.ctrHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  dimensions.ctrWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  //drawing image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left},${dimensions.margin.top})`
    );

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .rangeRound([0, dimensions.ctrWidth])
    .clamp(true);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .rangeRound([0, dimensions.ctrHeight])
    .nice()
    .clamp(true);
  ctr
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red");
  // ctr.append("circle").attr("r", 15);
}

draw();
