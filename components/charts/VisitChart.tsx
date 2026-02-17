"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export function VisitChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(22, 93, 255, 0.2");
    gradient.addColorStop(1, "rgba(22, 93, 255, 0");

    chartRef.current?.destroy();
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        datasets: [
          {
            label: "Kunjungan",
            data: [120, 150, 180, 140, 160, 90, 60],
            borderColor: "#165DFF",
            backgroundColor: gradient,
            borderWidth: 3,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#165DFF",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#080C1A",
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: "Lexend Deca", size: 13 },
            bodyFont: { family: "Lexend Deca", size: 13 },
            displayColors: false,
            callbacks: {
              label: function (context) {
                return context.parsed.y + " Pasien";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#F3F4F3",
            },
            ticks: {
              font: { family: "Lexend Deca", size: 11 },
              color: "#6A7686",
              padding: 10,
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "Lexend Deca", size: 11 },
              color: "#6A7686",
              padding: 10,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
