import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function FamilyTree({ familyData }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // this.calculate the total number of spouses and their childrens
    const totalChildren = familyData.spouses.reduce(
      (acc, spouse) => Math.max(acc, spouse.children.length),
      1
    );

    const widthPerNode = 150;
    const width = Math.max(totalChildren * widthPerNode, 500);
    const height = 400;

    svg.selectAll("*").remove();

    // Creating SVG canvas with fixed height and dynamic width
    svg.attr("width", width).attr("height", height);

    const treeData = {
      name: familyData.client.name,
      children: familyData.spouses.map((spouse) => ({
        name: spouse.name,
        children: spouse.children.map((child) => ({ name: child }))
      }))
    };


    const root = d3.hierarchy(treeData);

    // Creates the tree layout by using d3 library
    const treeLayout = d3.tree().size([width - 100, height - 200]);
    treeLayout(root);

    const g = svg.append("g")
      .attr("transform", "translate(50, 20)");

    g.selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr('d', d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y)
      )
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);


    const nodes = g.selectAll('g.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle')
      .attr('r', 15)
      .attr('fill', '#80cbc4');

    nodes.append('text')
      .attr('dy', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => d.data.name);

  }, [familyData]);

  return (
    <div className="tree-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default FamilyTree;
