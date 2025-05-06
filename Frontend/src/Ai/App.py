import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# Set up the Streamlit page
st.set_page_config(page_title="India Disaster Analysis", layout="wide")

# Title
st.title("📊 India Disaster-Prone Areas Dashboard")

# Sidebar Filters
st.sidebar.title("🧮 Filters")

# Load data function with caching
@st.cache_data
def load_data(uploaded_file=None):
    try:
        if uploaded_file:
            df = pd.read_csv(uploaded_file)
        else:
            df = pd.read_csv("india_disaster_prone_areas.csv")  # fallback for local use
        return df
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return pd.DataFrame()

# File uploader
uploaded_file = st.sidebar.file_uploader("Upload Disaster CSV File", type=["csv"])
df = load_data(uploaded_file)

# Validate DataFrame
if df.empty:
    st.warning("The dataset is empty or invalid. Please upload a valid CSV file.")
    st.stop()

required_cols = {"Disaster", "Location", "Latitude", "Longitude"}
if not required_cols.issubset(df.columns):
    st.error(f"Dataset must include the following columns: {required_cols}")
    st.stop()

# Show raw data
st.subheader("📂 Raw Dataset")
st.dataframe(df, use_container_width=True)

# Disaster filter
disaster_types = df["Disaster"].dropna().unique()
selected_disaster = st.sidebar.multiselect("Select Disaster Type(s):", disaster_types, default=list(disaster_types))

# Filtered data
filtered_df = df[df["Disaster"].isin(selected_disaster)]

# Plot 1: Disaster Type Distribution - Interactive
st.subheader("📈 Disaster Type Distribution")
disaster_count = filtered_df["Disaster"].value_counts().reset_index()
disaster_count.columns = ["Disaster", "Count"]
fig1 = px.bar(disaster_count, x="Disaster", y="Count", color="Disaster", title="Disaster Type Distribution")
st.plotly_chart(fig1, use_container_width=True)

# Plot 2: Top Affected Locations - Interactive
st.subheader("📍 Top 10 Affected Locations")
top_locations = filtered_df["Location"].value_counts().head(10).reset_index()
top_locations.columns = ["Location", "Count"]
fig2 = px.bar(top_locations, x="Count", y="Location", orientation="h", color="Location", title="Top Affected Locations")
st.plotly_chart(fig2, use_container_width=True)

# Plot 3: Map Visualization
# Plot 3: Interactive Map with Color-Coded Disasters (Plotly version)
st.subheader("🗺️ Interactive Map of Disasters")

# Create the DataFrame first
map_df = filtered_df.dropna(subset=["Latitude", "Longitude"]).copy()
map_df = map_df.rename(columns={"Latitude": "lat", "Longitude": "lon"})

# Now check if it's empty before plotting
if not map_df.empty:
    fig = px.scatter_mapbox(map_df,
                          lat="lat",
                          lon="lon",
                          color="Disaster",
                          hover_name="Location",
                          hover_data=["Disaster"],
                          zoom=4,
                          height=600)
    fig.update_layout(mapbox_style="open-street-map")
    fig.update_layout(margin={"r":0,"t":40,"l":0,"b":0})
    st.plotly_chart(fig, use_container_width=True)
else:
    st.warning("No geographical data available for the selected filters.")

# Download filtered data option
st.sidebar.markdown("---")
csv = filtered_df.to_csv(index=False).encode("utf-8")
st.sidebar.download_button(
    label="📥 Download Filtered CSV",
    data=csv,
    file_name="filtered_disaster_data.csv",
    mime="text/csv"
)

# Footer
st.markdown("---")
st.caption("Dashboard created for India Disaster Analysis | Use the filters to explore disaster-prone areas")

