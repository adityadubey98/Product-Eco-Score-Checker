import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

const PieChart = ({ productData }) => {
  const chartRef = useRef(null); // Reference for the canvas element
  const chartInstance = useRef(null); // Reference for the Chart.js instance

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance to prevent duplication
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Pie chart
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Carbon Footprint (kg CO₂)", "Water Usage (liters)", "Energy Efficiency (kWh)", "Recyclability (%)"],
        datasets: [
          {
            label: "Product Lifecycle Insights",
            data: [
              productData.carbonFootprint,
              productData.waterUsage,
              productData.energyEfficiency,
              productData.recyclability,
            ],
            backgroundColor: ["#FF6F61", "#F9C74F", "#90BE6D", "#43AA8B"],
            borderColor: ["#FF6F61", "#F9C74F", "#90BE6D", "#43AA8B"],
            borderWidth: 1,
            hoverOffset: 10, // Hover effect offset
          },
        ],
      },
      options: {
        responsive: true, // Make it responsive
        maintainAspectRatio: false, // Allow dynamic sizing
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#333", // Customize legend text color
              font: {
                size: 14, // Adjust font size
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const label = tooltipItem.label || "";
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });

    // Cleanup the chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [productData]); // Recreate the chart whenever productData changes

  return (
    <div style={{ position: "relative", width: "100%", height: "400px", marginTop: "200px"}}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;
