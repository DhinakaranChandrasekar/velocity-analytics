export async function GET() {
  try {
    const response = await fetch(
      "https://naciscdn.org/naturalearth/110m/cultural/ne_110m_admin_0_countries.geojson",
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
    }

    const geojson = await response.json();

    return new Response(JSON.stringify(geojson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error fetching GeoJSON:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch GeoJSON data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
