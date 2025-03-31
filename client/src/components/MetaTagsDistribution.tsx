import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Tag } from '../types/seo';

interface MetaTagsDistributionProps {
  tags: Tag[];
}

const MetaTagsDistribution: React.FC<MetaTagsDistributionProps> = ({ tags }) => {
  const [statusChartWidth, setStatusChartWidth] = useState(300);
  const [statusChartHeight, setStatusChartHeight] = useState(300);
  const [categoryChartWidth, setCategoryChartWidth] = useState(300);
  const [categoryChartHeight, setCategoryChartHeight] = useState(300);
  const statusChartRef = useRef<HTMLDivElement>(null);
  const categoryChartRef = useRef<HTMLDivElement>(null);

  // Set initial chart dimensions when component mounts and on window resize
  useEffect(() => {
    // Make sure charts are at least 250x250 but can grow with their container
    const updateChartDimensions = () => {
      if (statusChartRef.current) {
        setStatusChartWidth(Math.max(statusChartRef.current.clientWidth, 250));
        setStatusChartHeight(Math.max(statusChartRef.current.clientHeight, 250));
      }
      if (categoryChartRef.current) {
        setCategoryChartWidth(Math.max(categoryChartRef.current.clientWidth, 250));
        setCategoryChartHeight(Math.max(categoryChartRef.current.clientHeight, 250));
      }
    };
    
    // Update dimensions initially and add event listener for window resize
    updateChartDimensions();
    window.addEventListener('resize', updateChartDimensions);
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('resize', updateChartDimensions);
    };
  }, []);

  // Count tags by status
  const statusCounts = tags.reduce((acc, tag) => {
    const status = tag.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count tags by category
  const categoryCounts = tags.reduce((acc, tag) => {
    const category = tag.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for status chart
  const statusData = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusCounts[status],
  }));

  // Prepare data for category chart
  const categoryData = Object.keys(categoryCounts).map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: categoryCounts[category],
  }));

  // Colors for status
  const statusColors = {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  // Colors for categories
  const categoryColors = {
    essential: '#6366f1',
    social: '#ec4899',
    other: '#64748b',
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Meta Tags Distribution</CardTitle>
        <CardDescription>
          Visualizing meta tags by status and category
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
        {/* Status Distribution */}
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2">Status Distribution</h3>
          <div 
            ref={statusChartRef}
            className="h-64 w-full" 
            style={{ minWidth: '250px', minHeight: '250px' }}
          >
            <ResponsiveContainer 
              width={statusChartWidth} 
              height={statusChartHeight} 
              aspect={undefined}
            >
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={statusColors[entry.name.toLowerCase() as keyof typeof statusColors] || '#ccc'} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} tags`, name]}
                  contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-2">Category Distribution</h3>
          <div 
            ref={categoryChartRef}
            className="h-64 w-full" 
            style={{ minWidth: '250px', minHeight: '250px' }}
          >
            <ResponsiveContainer 
              width={categoryChartWidth} 
              height={categoryChartHeight}
              aspect={undefined}
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={categoryColors[entry.name.toLowerCase() as keyof typeof categoryColors] || '#ccc'} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} tags`, name]}
                  contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaTagsDistribution;