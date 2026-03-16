import { NextRequest, NextResponse } from "next/server";

interface ColumnMetadata {
  name: string;
  dtype: string;
  nullPct: number;
  unique: number;
  min?: number;
  max?: number;
  sample?: string[];
}

interface DatasetProfile {
  rows: number;
  columns: number;
  columnsMeta: ColumnMetadata[];
}

interface DashboardKPI {
  label: string;
  value: string | number;
  metric?: string;
}

interface DashboardChart {
  id: string;
  type: string;
  title: string;
  xAxis: string;
  yAxis: string;
  data: any[];
  [key: string]: any; // Allow additional properties
}

interface DashboardSpec {
  datasetId: string;
  datasetType: string;
  fileName: string;
  kpis: DashboardKPI[];
  charts: DashboardChart[];
  insights: string[];
}

// Parse CSV content
function parseCSV(content: string): { headers: string[]; rows: any[] } {
  const lines = content.split("\n").filter((line) => line.trim());
  if (lines.length === 0) {
    throw new Error("CSV file is empty");
  }

  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const row: any = {};
    headers.forEach((header, i) => {
      const value = values[i];
      row[header] = value === "" ? null : isNaN(Number(value)) ? value : Number(value);
    });
    return row;
  });

  return { headers, rows };
}

// Classify column types
function classifyColumnType(
  header: string,
  values: (any)[]
): string {
  const lowerHeader = header.toLowerCase();
  const timeKeywords = ["date", "time", "timestamp", "created", "month", "year", "day"];
  const isTimeColumn = timeKeywords.some((keyword) =>
    lowerHeader.includes(keyword)
  );

  if (isTimeColumn) return "time";

  const numericValues = values.filter(
    (v) => v !== null && !isNaN(Number(v))
  );
  const isNumeric = numericValues.length / values.length > 0.8;

  if (!isNumeric) {
    const uniqueCount = new Set(values).size;
    return uniqueCount < 50 ? "category" : "identifier";
  }

  const uniqueCount = new Set(values).size;
  if (uniqueCount === values.length) return "identifier";
  if (uniqueCount > 10) return "metric";

  return "category";
}

// Profile dataset
function profileDataset(headers: string[], rows: any[]): DatasetProfile {
  const columnsMeta: ColumnMetadata[] = headers.map((header) => {
    const values = rows.map((row) => row[header]);
    const numericValues = values.filter(
      (v) => v !== null && !isNaN(Number(v))
    );
    const unique = new Set(values.filter((v) => v !== null)).size;
    const nullPct = values.filter((v) => v === null).length / values.length;

    return {
      name: header,
      dtype:
        numericValues.length / values.length > 0.8 ? "numeric" : "string",
      nullPct,
      unique,
      min:
        numericValues.length > 0
          ? Math.min(...numericValues.map(Number))
          : undefined,
      max:
        numericValues.length > 0
          ? Math.max(...numericValues.map(Number))
          : undefined,
      sample: values.slice(0, 3).map((v) => String(v)),
    };
  });

  return {
    rows: rows.length,
    columns: headers.length,
    columnsMeta,
  };
}

// Detect dataset type
function detectDatasetType(
  headers: string[],
  columnTypes: Map<string, string>
): string {
  const typeArray = Array.from(columnTypes.values());
  const hasTime = typeArray.includes("time");
  const hasMetric = typeArray.includes("metric");
  const hasCategory = typeArray.includes("category");

  if (hasTime && hasMetric && hasCategory) return "transactional";
  if (hasMetric && hasCategory && !hasTime) return "aggregated";
  if (hasMetric && typeArray.filter((t) => t === "metric").length > 1)
    return "matrix";
  if (hasTime && hasMetric) return "time_series";
  if (typeArray.filter((t) => t === "metric").length > 3) return "numeric";
  return "generic";
}

// Generate KPI cards
function generateKPIs(headers: string[], rows: any[]): DashboardKPI[] {
  const kpis: DashboardKPI[] = [];

  // Total rows
  kpis.push({
    label: "Total Records",
    value: rows.length,
  });

  // Find numeric columns
  const numericColumns = headers.filter((h) => {
    const values = rows.map((r) => r[h]);
    const numCount = values.filter(
      (v) => v !== null && !isNaN(Number(v))
    ).length;
    return numCount / values.length > 0.8;
  });

  // Add metrics for first numeric column
  if (numericColumns.length > 0) {
    const metricCol = numericColumns[0];
    const values = rows
      .map((r) => r[metricCol])
      .filter((v) => v !== null && !isNaN(Number(v)))
      .map(Number);

    if (values.length > 0) {
      const total = values.reduce((a, b) => a + b, 0);
      const avg = total / values.length;

      kpis.push({
        label: `Total ${cleanColumnName(metricCol)}`,
        value: Math.round(total),
        metric: metricCol,
      });

      kpis.push({
        label: `Avg ${cleanColumnName(metricCol)}`,
        value: Math.round(avg),
        metric: metricCol,
      });
    }
  }

  return kpis.slice(0, 3);
}

// Clean column names for display
function cleanColumnName(name: string): string {
  return name
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Generate chart recommendations with intelligent selection
function generateCharts(
  headers: string[],
  rows: any[],
  columnTypes: Map<string, string>
): DashboardChart[] {
  const charts: DashboardChart[] = [];

  const timeColumns = Array.from(columnTypes.entries())
    .filter(([_, type]) => type === "time")
    .map(([name]) => name);

  const metricColumns = Array.from(columnTypes.entries())
    .filter(([_, type]) => type === "metric")
    .map(([name]) => name);

  const categoryColumns = Array.from(columnTypes.entries())
    .filter(([_, type]) => type === "category")
    .map(([name]) => name);

  // 1. TIME SERIES CHART (Line Chart)
  if (timeColumns.length > 0 && metricColumns.length > 0) {
    const sortedByTime = [...rows].sort(
      (a, b) =>
        new Date(a[timeColumns[0]]).getTime() -
        new Date(b[timeColumns[0]]).getTime()
    );

    charts.push({
      id: `chart-${Date.now()}-1`,
      type: "line",
      title: `${cleanColumnName(metricColumns[0])} Over Time`,
      xAxis: timeColumns[0],
      yAxis: metricColumns[0],
      data: sortedByTime,
    });

    // 2. AREA CHART (Cumulative Growth)
    if (sortedByTime.length > 5) {
      charts.push({
        id: `chart-${Date.now()}-2`,
        type: "area",
        title: `Cumulative ${cleanColumnName(metricColumns[0])} Growth`,
        xAxis: timeColumns[0],
        yAxis: metricColumns[0],
        data: sortedByTime,
      });
    }
  }

  // 3. BAR CHART (Category Comparison)
  if (categoryColumns.length > 0 && metricColumns.length > 0) {
    const aggregated: any = {};
    rows.forEach((row) => {
      const category = row[categoryColumns[0]];
      const value = parseFloat(row[metricColumns[0]]) || 0;
      if (!aggregated[category]) {
        aggregated[category] = {
          [categoryColumns[0]]: category,
          [metricColumns[0]]: 0,
        };
      }
      aggregated[category][metricColumns[0]] += value;
    });

    const barData = Object.values(aggregated)
      .sort((a: any, b: any) => b[metricColumns[0]] - a[metricColumns[0]])
      .slice(0, 10);

    if (barData.length > 0) {
      charts.push({
        id: `chart-${Date.now()}-3`,
        type: "bar",
        title: `${cleanColumnName(metricColumns[0])} by ${cleanColumnName(
          categoryColumns[0]
        )}`,
        xAxis: categoryColumns[0],
        yAxis: metricColumns[0],
        data: barData,
      });
    }

    // 4. PIE CHART (Top Categories)
    if (barData.length >= 3 && barData.length <= 6) {
      charts.push({
        id: `chart-${Date.now()}-4`,
        type: "pie",
        title: `Share by ${cleanColumnName(categoryColumns[0])}`,
        xAxis: categoryColumns[0],
        yAxis: metricColumns[0],
        data: barData.slice(0, 6),
      });
    }
  }

  // 5. DISTRIBUTION CHART (Histogram)
  if (metricColumns.length > 0) {
    const values = rows
      .map((r) => parseFloat(r[metricColumns[0]]))
      .filter((v) => !isNaN(v));

    if (values.length > 0) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const binCount = Math.min(12, Math.ceil(Math.sqrt(values.length)));
      const binSize = (max - min) / binCount || 1;

      const bins: any = {};
      for (let i = 0; i < binCount; i++) {
        const binStart = min + i * binSize;
        const binLabel = `${Math.round(binStart)}-${Math.round(
          binStart + binSize
        )}`;
        bins[binLabel] = 0;
      }

      values.forEach((v) => {
        const binIndex = Math.min(
          Math.floor((v - min) / binSize),
          binCount - 1
        );
        const binStart = min + binIndex * binSize;
        const binLabel = `${Math.round(binStart)}-${Math.round(
          binStart + binSize
        )}`;
        bins[binLabel]++;
      });

      const histData = Object.entries(bins).map(([label, count]) => ({
        range: label,
        frequency: count,
      }));

      charts.push({
        id: `chart-${Date.now()}-5`,
        type: "bar",
        title: `${cleanColumnName(metricColumns[0])} Distribution`,
        xAxis: "range",
        yAxis: "frequency",
        data: histData,
      });
    }
  }

  // 6. SECONDARY METRIC COMPARISON (if 2+ metrics exist)
  if (metricColumns.length >= 2 && categoryColumns.length > 0) {
    const aggregated: any = {};
    rows.forEach((row) => {
      const category = row[categoryColumns[0]];
      const val1 = parseFloat(row[metricColumns[0]]) || 0;
      const val2 = parseFloat(row[metricColumns[1]]) || 0;
      if (!aggregated[category]) {
        aggregated[category] = {
          [categoryColumns[0]]: category,
          [metricColumns[0]]: 0,
          [metricColumns[1]]: 0,
        };
      }
      aggregated[category][metricColumns[0]] += val1;
      aggregated[category][metricColumns[1]] += val2;
    });

    const compData = Object.values(aggregated)
      .sort(
        (a: any, b: any) => b[metricColumns[0]] - a[metricColumns[0]]
      )
      .slice(0, 8);

    if (compData.length > 0) {
      charts.push({
        id: `chart-${Date.now()}-6`,
        type: "bar",
        title: `${cleanColumnName(metricColumns[0])} vs ${cleanColumnName(
          metricColumns[1]
        )}`,
        xAxis: categoryColumns[0],
        yAxis: metricColumns[0],
        secondaryYAxis: metricColumns[1],
        data: compData,
      });
    }
  }

  // 7. TIME-BASED CATEGORY TREND (if time + category exists)
  if (
    timeColumns.length > 0 &&
    categoryColumns.length > 0 &&
    metricColumns.length > 0
  ) {
    const aggregated: any = {};
    rows.forEach((row) => {
      const time = row[timeColumns[0]];
      const cat = row[categoryColumns[0]];
      const val = parseFloat(row[metricColumns[0]]) || 0;
      const key = `${time}-${cat}`;
      if (!aggregated[key]) {
        aggregated[key] = {
          [timeColumns[0]]: time,
          [categoryColumns[0]]: cat,
          [metricColumns[0]]: 0,
        };
      }
      aggregated[key][metricColumns[0]] += val;
    });

    const trendData = Object.values(aggregated)
      .sort(
        (a: any, b: any) =>
          new Date(a[timeColumns[0]]).getTime() -
          new Date(b[timeColumns[0]]).getTime()
      )
      .slice(0, 50);

    if (trendData.length > 5) {
      charts.push({
        id: `chart-${Date.now()}-7`,
        type: "line",
        title: `Trend by ${cleanColumnName(categoryColumns[0])}`,
        xAxis: timeColumns[0],
        yAxis: metricColumns[0],
        category: categoryColumns[0],
        data: trendData,
      });
    }
  }

  // 8. METRIC RANKING (Top performers)
  if (categoryColumns.length > 0 && metricColumns.length > 0) {
    const ranked = rows
      .map((row) => ({
        [categoryColumns[0]]: row[categoryColumns[0]],
        [metricColumns[0]]: parseFloat(row[metricColumns[0]]) || 0,
      }))
      .sort((a, b) => b[metricColumns[0]] - a[metricColumns[0]])
      .slice(0, 5);

    if (ranked.length > 0) {
      charts.push({
        id: `chart-${Date.now()}-8`,
        type: "bar",
        title: `Top 5 ${cleanColumnName(categoryColumns[0])}`,
        xAxis: categoryColumns[0],
        yAxis: metricColumns[0],
        data: ranked,
      });
    }
  }

  return charts.slice(0, 8);
}

// Generate insights (AI disabled for now, using deterministic insights)
async function generateInsights(
  datasetType: string,
  kpis: DashboardKPI[],
  charts: DashboardChart[],
  headers: string[],
  columnTypes: Map<string, string>,
  rows: any[]
): Promise<string[]> {
  const insights: string[] = [];

  // Find metric and category columns
  const metricColumns = Array.from(columnTypes.entries())
    .filter(([_, type]) => type === "metric")
    .map(([name]) => name);
  
  const categoryColumns = Array.from(columnTypes.entries())
    .filter(([_, type]) => type === "category")
    .map(([name]) => name);

  // Insight 1: Top performing category/product
  if (metricColumns.length > 0 && categoryColumns.length > 0) {
    const metricCol = metricColumns[0];
    const catCol = categoryColumns[0];
    
    const aggregated: { [key: string]: number } = {};
    rows.forEach((row) => {
      const cat = row[catCol];
      const val = parseFloat(row[metricCol]) || 0;
      aggregated[cat] = (aggregated[cat] || 0) + val;
    });

    const topCat = Object.entries(aggregated).sort(([,a], [,b]) => b - a)[0];
    if (topCat) {
      const percentage = ((topCat[1] / Object.values(aggregated).reduce((a, b) => a + b, 0)) * 100).toFixed(1);
      insights.push(
        `🏆 Top Performer: ${topCat[0]} leads with ${Math.round(topCat[1])} in ${cleanColumnName(metricCol)} (${percentage}% of total)`
      );
    }
  }

  // Insight 2: Average performance
  if (metricColumns.length > 0) {
    const metricCol = metricColumns[0];
    const values = rows
      .map((r) => parseFloat(r[metricCol]))
      .filter((v) => !isNaN(v));
    
    if (values.length > 0) {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);
      const variance = (((max - min) / avg) * 100).toFixed(0);
      
      insights.push(
        `📊 Performance Range: Average ${cleanColumnName(metricCol)} is ${Math.round(avg)}, with values ranging from ${Math.round(min)} to ${Math.round(max)} (${variance}% variance)`
      );
    }
  }

  // Insight 3: Data consistency
  if (categoryColumns.length > 0) {
    const catCol = categoryColumns[0];
    const categories = new Set(rows.map((r) => r[catCol]));
    const avgPerCat = rows.length / categories.size;
    
    insights.push(
      `📈 Balanced Distribution: ${categories.size} categories with ~${Math.round(avgPerCat)} records each, indicating well-distributed data`
    );
  }

  // Insight 4: Growth or trend
  if (headers.some((h) => h.toLowerCase().includes("date"))) {
    const dateCol = headers.find((h) => h.toLowerCase().includes("date"));
    const metricCol = metricColumns[0];
    
    if (dateCol && metricCol) {
      const sortedByDate = [...rows].sort((a, b) => 
        new Date(a[dateCol]).getTime() - new Date(b[dateCol]).getTime()
      );
      
      if (sortedByDate.length >= 2) {
        const firstHalf = sortedByDate.slice(0, Math.floor(sortedByDate.length / 2));
        const secondHalf = sortedByDate.slice(Math.floor(sortedByDate.length / 2));
        
        const firstAvg = firstHalf.reduce((sum, r) => sum + (parseFloat(r[metricCol]) || 0), 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((sum, r) => sum + (parseFloat(r[metricCol]) || 0), 0) / secondHalf.length;
        
        const trend = secondAvg > firstAvg ? "📈 Upward" : "📉 Downward";
        const change = Math.abs(((secondAvg - firstAvg) / firstAvg) * 100).toFixed(1);
        
        insights.push(
          `${trend} Trend: ${change}% ${secondAvg > firstAvg ? "increase" : "decrease"} in ${cleanColumnName(metricCol)} from early to later period`
        );
      }
    }
  }

  // Insight 5: Data quality
  const totalValues = rows.length * headers.length;
  const nullValues = rows.reduce((sum, row) => {
    return sum + headers.filter((h) => row[h] === null || row[h] === "").length;
  }, 0);
  const dataQuality = (((totalValues - nullValues) / totalValues) * 100).toFixed(1);
  
  insights.push(
    `✅ Data Quality: ${dataQuality}% completeness across ${rows.length} records and ${headers.length} attributes`
  );

  return insights.slice(0, 5);
}

// Main handler
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json(
        { error: "File must be a CSV" },
        { status: 400 }
      );
    }

    // Read file content
    const content = await file.text();

    // Parse CSV
    const { headers, rows } = parseCSV(content);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "CSV has no data rows" },
        { status: 400 }
      );
    }

    // Classify columns
    const columnTypes = new Map<string, string>();
    headers.forEach((header) => {
      const values = rows.map((row) => row[header]);
      columnTypes.set(header, classifyColumnType(header, values));
    });

    // Profile dataset
    const profile = profileDataset(headers, rows);

    // Detect dataset type
    const datasetType = detectDatasetType(headers, columnTypes);

    // Generate KPIs
    const kpis = generateKPIs(headers, rows);

    // Generate charts
    const charts = generateCharts(headers, rows, columnTypes);

    // Generate insights
    const insights = await generateInsights(
      datasetType,
      kpis,
      charts,
      headers,
      columnTypes,
      rows
    );

    // Create dashboard specification
    const dashboard: DashboardSpec = {
      datasetId: `dataset_${Date.now()}`,
      datasetType,
      fileName: file.name,
      kpis,
      charts,
      insights,
    };

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error("Error generating dashboard:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
