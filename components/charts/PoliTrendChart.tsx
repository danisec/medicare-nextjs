"use client";

import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

export function PoliTrendChart() {
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

    chartRef.current?.destroy();
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Poli Umum",
          "Poli Gigi",
          "Jantung",
          "Peny. Dalam",
          "Kandungan",
          "IGD",
        ],
        datasets: [
          {
            label: "Jumlah Kunjungan",
            data: [65, 45, 20, 35, 25, 15],
            backgroundColor: [
              "rgba(22, 93, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 99, 132, 0.8)",
            ],
            borderRadius: 8,
            barThickness: 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: true, color: "#F3F4F3" },
            ticks: { font: { family: "Lexend Deca" } },
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: "Lexend Deca" } },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <canvas id="PoliChart" ref={canvasRef} className="w-full height-full" />
  );
}
