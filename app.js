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
    .rangeRound([dimensions.ctrHeight, 0])
    .nice()
    .clamp(true);
  ctr
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("data-temp", yAccessor);
  // ctr.append("circle").attr("r", 15);

  //XAxes

  const x_axes = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((d) => d * 100 + "%");
  const XAxisGroup = ctr
    .append("g")
    .call(x_axes)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true);

  XAxisGroup.append("text")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .text("Humidity");

  //yAxes

  const y_axes = d3.axisLeft(yScale);

  const YAxisGroup = ctr.append("g").call(y_axes).classed("axis", true);

  YAxisGroup.append("text")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin.left + 15)
    .attr("fill", "black")
    .html("Humidity &deg; F")
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle");
}

draw();
