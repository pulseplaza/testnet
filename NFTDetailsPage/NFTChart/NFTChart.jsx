

import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

//INTERNAL IMPORT
import Style from "./NFTChart.module.css";

const NFTChart = ({ priceHistory }) => {
    const [windowWidth, setWindowWidth] = useState(undefined);
    const chartRef = useRef(null);

    useEffect(() => {
        // Set the initial value of windowWidth
        setWindowWidth(window.innerWidth);

        const updateDimensions = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);

        // Destroy chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }

    }, []);


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        // Format the date as you prefer, e.g., "YYYY-MM-DD"
        return date.toISOString().split('T')[0];
    };


    // Reverse the priceHistory array for chart display
    const reversedPriceHistory = [...priceHistory].reverse();

    const chartData = {
        labels: reversedPriceHistory.map(item => formatDate(item.timestamp)),
        datasets: [
            {
                label: "NFT Price in PLS",
                data: reversedPriceHistory.map(item => item.price),
                fill: true,
                backgroundColor: '#0080ff30',
                borderColor: '#0077d8',
                lineTension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: '#727272',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                }

            },
            x: {
                grid: {
                    color: '#727272',
                },

                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 8,
                }

            }
        }
    };


    return (
        <div>
            <div className={Style.titleContainer}>
                <h1 className={Style.title}>Price History</h1>
            </div>
            <div className={Style.chartContainer}>
                {windowWidth !== undefined && (
                    <Line
                        key={windowWidth}
                        data={chartData}
                        options={chartOptions}
                        ref={chartInstance => {
                            // Assign the chart instance to the ref
                            chartRef.current = chartInstance?.chartInstance;
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default NFTChart;


