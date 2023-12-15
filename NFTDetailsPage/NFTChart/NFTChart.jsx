

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

//INTERNAL IMPORT
import Style from "./NFTChart.module.css";

const NFTChart = ({ priceHistory }) => {
    const [windowWidth, setWindowWidth] = useState(undefined);

    useEffect(() => {
        // Set the initial value of windowWidth
        setWindowWidth(window.innerWidth);

        const updateDimensions = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Reverse the priceHistory array for chart display
    const reversedPriceHistory = [...priceHistory].reverse();

    const chartData = {
        labels: reversedPriceHistory.map(item => item.timestamp),
        datasets: [
            {
                label: "NFT Price in PLS",
                data: reversedPriceHistory.map(item => item.price),
                fill: false,
                backgroundColor: '#0080ff',
                borderColor: '#0077d8',
                lineTension: 0.3,
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

            },
            x: {
                grid: {
                    color: '#727272',
                },

                ticks: {
                    display: false,
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
                {/* Render chart only if windowWidth is defined (i.e., on the client side) */}
                {windowWidth !== undefined && (
                    <Line key={windowWidth} data={chartData} options={chartOptions} />
                )}
            </div>
        </div>
    );
};

export default NFTChart;


