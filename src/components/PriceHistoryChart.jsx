"use client";
import { RechartsDevtools } from "@recharts/devtools";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
    ResponsiveContainer,
    ReferenceDot,
} from "recharts";
import { Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";


const PriceHistoryChart = ({ productId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            setLoading(true);
            const { data: history, error } = await supabase
                .from("price_history")
                .select("checked_at, price")
                .eq("product_id", productId)
                .order("checked_at", { ascending: true });

            if (!isMounted) return;

            if (error) {
                console.error("Error fetching price history", error);
                setData([]);
            } else {
                const chartData = (history || []).map((item) => ({
                    date: new Date(item.checked_at).toLocaleDateString(),
                    price: Number.parseFloat(item.price),
                }));
                setData(chartData);
            }
            setLoading(false);
        }

        if (productId) {
            loadData();
        }

        return () => {
            isMounted = false;
        };
    }, [productId, supabase]);


    const hasData = data.length > 0;

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;
        const value = payload[0].value;
        return (
            <div className="rounded-lg border border-emerald-500/30 bg-gray-900/90 px-3 py-2 shadow-lg text-sm text-white">
                <div className="font-semibold text-emerald-300">{label}</div>
                <div className="mt-1">Price: {value}</div>
            </div>
        );
    };

    return (
        <div className="w-full h-96 bg-gray-900 rounded-lg shadow-lg p-4">
            {loading ? (
                <div className="flex items-center justify-center h-full text-white/80">
                    <Loader2 className="animate-spin mr-2" />
                    Loading price history...
                </div>
            ) : !hasData ? (
                <div className="flex items-center justify-center h-full text-white/60">
                    No price history yet. Start tracking to see trends.
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%" className="bg-gray-900 rounded-lg shadow-lg p-4">
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 24, left: 0, bottom: 12 }}

                    >
                        <defs>
                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#34d399" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" stroke="#ffffff1a" />
                        <XAxis dataKey="date" stroke="#cbd5e1" tick={{ fill: "#cbd5e1" }} />
                        <YAxis
                            stroke="#cbd5e1"
                            tick={{ fill: "#cbd5e1" }}
                            tickFormatter={(v) => `${v}`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#34d399", strokeDasharray: "3 3" }} />
                        <Legend wrapperStyle={{ color: "#e2e8f0" }} />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#34d399"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 1, fill: "#0f172a" }}
                            activeDot={{ r: 7 }}
                        />
                        <ReferenceDot
                            x={data[data.length - 1].date}
                            y={data[data.length - 1].price}
                            r={5}
                            fill="#34d399"
                            stroke="#10b981"
                        />
                        {process.env.NODE_ENV === "development" && <RechartsDevtools />}
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};
export default PriceHistoryChart;
