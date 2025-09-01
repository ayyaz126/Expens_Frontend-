import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  bgColor: string;
  textColor: string;
}

export default function StatsCard({
  title,
  value,
  bgColor,
  textColor,
}: StatsCardProps) {
  return (
    <div className={`${bgColor} ${textColor} p-6 rounded-xl shadow text-center`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
