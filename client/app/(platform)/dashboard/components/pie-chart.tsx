"use client"

import React from 'react';
import { PieChart as RechartsChart, Pie } from 'recharts';
import { useMounted } from '@/hooks/use-mounted';
 
 
export default function PieChart(){
    const mounted = useMounted();

    if (!mounted) return null;
 
    // Sample data
    const data = [
        { name: 'Work', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];
 
 
    return (
        <RechartsChart width={200} height={200}>
            <Pie data={data} dataKey="students" outerRadius={100} fill="hsl(var(--primary))"/>
        </RechartsChart>
    );
}