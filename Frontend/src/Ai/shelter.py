import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from streamlit_folium import folium_static
import folium
from folium.plugins import MarkerCluster

# Page configuration
st.set_page_config(
    page_title="India Shelter Homes Dashboard",
    page_icon="🏠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main-header {
        font-size: 2.5rem;
        color: #1E3A8A;
        text-align: center;
        margin-bottom: 1rem;
    }
    .subheader {
        font-size: 1.5rem;
        color: #2563EB;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .card {
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #f8f9fa;
        box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.15);
        margin-bottom: 1rem;
    }
    </style>
""", unsafe_allow_html=True)

# Title and introduction
st.markdown("<h1 class='main-header'>🏠 India Shelter Homes Dashboard</h1>", unsafe_allow_html=True)
st.markdown("""
    This interactive dashboard provides comprehensive data visualization of shelter homes across India.
    Explore the distribution, filter by type, and analyze geographical patterns.
""")

# Load dataset with error handling
@st.cache_data
def load_data():
    try:
        df = pd.read_csv("Shelter_Homes_India.csv")
        # Clean data - handle missing values
        df = df.fillna({"Type": "Unspecified", "State": "Unknown"})
        return df
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return pd.DataFrame()

# Sidebar for filters and controls
with st.sidebar:
    st.image("https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg", width=100)
    st.markdown("## Dashboard Controls")
    
    # Load data
    df = load_data()
    
    if not df.empty:
        # Filter section
        st.markdown("### 🔍 Filters")
        
        # Multi-select filter for shelter types
        shelter_types = sorted(df["Type"].unique())
        selected_types = st.multiselect(
            "Filter by Shelter Type:",
            shelter_types,
            default=shelter_types[:3] if len(shelter_types) > 3 else shelter_types
        )
        
        # State selection
        states = sorted(df["State"].unique())
        selected_states = st.multiselect(
            "Filter by State:",
            states,
            default=[]
        )
        
        # Capacity filter (assuming there's a capacity column)
        if "Capacity" in df.columns:
            min_capacity, max_capacity = int(df["Capacity"].min()), int(df["Capacity"].max())
            capacity_range = st.slider(
                "Capacity Range:",
                min_capacity, max_capacity, 
                (min_capacity, max_capacity)
            )
        
        # Chart type selection
        chart_type = st.radio(
            "Select Chart Type for Distribution:",
            ["Bar Chart", "Pie Chart", "Line Chart"]
        )
        
        # Download option
        st.markdown("### 📥 Export Data")
        if st.button("Download Filtered Data as CSV"):
            # This will be handled in the main section
            pass

# Apply filters
if not df.empty:
    filtered_df = df.copy()
    
    if selected_types:
        filtered_df = filtered_df[filtered_df["Type"].isin(selected_types)]
    
    if selected_states:
        filtered_df = filtered_df[filtered_df["State"].isin(selected_states)]
    
    if "Capacity" in df.columns and 'capacity_range' in locals():
        filtered_df = filtered_df[
            (filtered_df["Capacity"] >= capacity_range[0]) & 
            (filtered_df["Capacity"] <= capacity_range[1])
        ]

    # Main content area with tabs
    tab1, tab2, tab3, tab4 = st.tabs(["📊 Overview", "🗺️ Map View", "📈 Analytics", "📋 Raw Data"])
    
    with tab1:
        # Overview
        st.markdown("<h2 class='subheader'>Dashboard Overview</h2>", unsafe_allow_html=True)
        
        # KPI metrics
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.markdown("<div class='card'>", unsafe_allow_html=True)
            st.metric("Total Shelters", f"{len(filtered_df):,}")
            st.markdown("</div>", unsafe_allow_html=True)
            
        with col2:
            st.markdown("<div class='card'>", unsafe_allow_html=True)
            st.metric("Shelter Types", f"{filtered_df['Type'].nunique():,}")
            st.markdown("</div>", unsafe_allow_html=True)
            
        with col3:
            st.markdown("<div class='card'>", unsafe_allow_html=True)
            st.metric("States Covered", f"{filtered_df['State'].nunique():,}")
            st.markdown("</div>", unsafe_allow_html=True)
            
        with col4:
            st.markdown("<div class='card'>", unsafe_allow_html=True)
            if "Capacity" in filtered_df.columns:
                total_capacity = filtered_df["Capacity"].sum()
                st.metric("Total Capacity", f"{total_capacity:,}")
            else:
                st.metric("Avg Shelters per State", f"{len(filtered_df) / filtered_df['State'].nunique():.1f}")
            st.markdown("</div>", unsafe_allow_html=True)
        
        # Distribution chart based on user selection
        st.markdown("<h3 class='subheader'>Shelter Type Distribution</h3>", unsafe_allow_html=True)
        
        type_counts = filtered_df["Type"].value_counts().reset_index()
        type_counts.columns = ["Type", "Count"]
        
        if chart_type == "Bar Chart":
            fig = px.bar(
                type_counts, 
                x="Type", 
                y="Count", 
                color="Type",
                title="Distribution by Shelter Type",
                height=500
            )
        elif chart_type == "Pie Chart":
            fig = px.pie(
                type_counts, 
                values="Count", 
                names="Type",
                title="Distribution by Shelter Type",
                height=500
            )
        else:  # Line Chart - Using cumulative counts for meaningful line representation
            type_counts = type_counts.sort_values("Count", ascending=False)
            type_counts["Cumulative"] = type_counts["Count"].cumsum()
            fig = px.line(
                type_counts, 
                x="Type", 
                y="Cumulative",
                markers=True,
                title="Cumulative Distribution by Shelter Type",
                height=500
            )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # State-wise distribution
        st.markdown("<h3 class='subheader'>Top 10 States by Shelter Count</h3>", unsafe_allow_html=True)
        state_counts = filtered_df["State"].value_counts().reset_index().head(10)
        state_counts.columns = ["State", "Count"]
        
        fig = px.bar(
            state_counts,
            y="State",
            x="Count",
            orientation='h',
            color="Count",
            color_continuous_scale=px.colors.sequential.Blues,
            title="Top 10 States by Number of Shelters",
            height=500
        )
        st.plotly_chart(fig, use_container_width=True)
    
    with tab2:
        # Map visualization
        st.markdown("<h2 class='subheader'>Geographical Distribution</h2>", unsafe_allow_html=True)
        
        # Check if lat/long columns exist
        if all(col in filtered_df.columns for col in ["Latitude", "Longitude"]):
            # Create a folium map
            st.markdown("Use the map controls to zoom in/out and explore shelter locations:")
            
            # Center the map on India
            map_center = [20.5937, 78.9629]
            m = folium.Map(location=map_center, zoom_start=4)
            
            # Add marker clusters
            marker_cluster = MarkerCluster().add_to(m)
            
            # Add markers for each shelter
            for idx, row in filtered_df.iterrows():
                if pd.notnull(row["Latitude"]) and pd.notnull(row["Longitude"]):
                    popup_text = f"""
                        <b>Name:</b> {row.get('Name', 'N/A')}<br>
                        <b>Type:</b> {row.get('Type', 'N/A')}<br>
                        <b>State:</b> {row.get('State', 'N/A')}<br>
                        <b>Capacity:</b> {row.get('Capacity', 'N/A')}<br>
                        <b>Contact:</b> {row.get('Contact', 'N/A')}<br>
                    """
                    
                    folium.Marker(
                        location=[row["Latitude"], row["Longitude"]],
                        popup=folium.Popup(popup_text, max_width=300),
                        tooltip=row.get('Name', f"Shelter {idx}"),
                        icon=folium.Icon(icon="home", prefix="fa", color="blue")
                    ).add_to(marker_cluster)
            
            # Display map
            folium_static(m, width=1200, height=600)
            
            # Alternative simpler map using streamlit's built-in map function
            st.markdown("<h3 class='subheader'>Simplified Shelter Locations Map</h3>", unsafe_allow_html=True)
            st.map(filtered_df.rename(columns={"Latitude": "lat", "Longitude": "lon"}))
        else:
            st.warning("Latitude and Longitude data are required for the map visualization.")
    
    with tab3:
        # Analytics
        st.markdown("<h2 class='subheader'>Advanced Analytics</h2>", unsafe_allow_html=True)
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Type distribution by state (heatmap)
            st.markdown("<h3 class='subheader'>Shelter Type Distribution by State</h3>", unsafe_allow_html=True)
            
            # Get top 10 states for better visualization
            top_states = filtered_df["State"].value_counts().nlargest(10).index.tolist()
            state_type_df = filtered_df[filtered_df["State"].isin(top_states)]
            
            # Create a crosstab for heatmap
            heatmap_data = pd.crosstab(state_type_df["State"], state_type_df["Type"])
            
            # Plot heatmap
            fig, ax = plt.subplots(figsize=(10, 8))
            sns.heatmap(heatmap_data, cmap="YlGnBu", annot=True, fmt="d", ax=ax)
            ax.set_title("Shelter Type Distribution by Top 10 States")
            st.pyplot(fig)
        
        with col2:
            # Time series analysis (if date column exists)
            date_columns = [col for col in filtered_df.columns if any(date_keyword in col.lower() for date_keyword in ["date", "year", "established"])]
            
            if date_columns:
                date_col = date_columns[0]
                st.markdown(f"<h3 class='subheader'>Trend Analysis by {date_col}</h3>", unsafe_allow_html=True)
                
                try:
                    # Convert to datetime
                    filtered_df[date_col] = pd.to_datetime(filtered_df[date_col], errors='coerce')
                    
                    # Extract year
                    filtered_df["Year"] = filtered_df[date_col].dt.year
                    
                    # Group by year
                    yearly_data = filtered_df.groupby("Year").size().reset_index(name="Count")
                    yearly_data = yearly_data.sort_values("Year")
                    
                    # Plot time series
                    fig = px.line(
                        yearly_data,
                        x="Year",
                        y="Count",
                        markers=True,
                        title=f"Shelter Growth Over Time",
                        height=400
                    )
                    st.plotly_chart(fig, use_container_width=True)
                except:
                    st.warning(f"Could not parse {date_col} as date for trend analysis.")
            else:
                # Correlation analysis (if numeric columns exist)
                numeric_cols = filtered_df.select_dtypes(include=['float64', 'int64']).columns.tolist()
                
                if len(numeric_cols) >= 2:
                    st.markdown("<h3 class='subheader'>Correlation Analysis</h3>", unsafe_allow_html=True)
                    
                    # Select top numeric columns for correlation
                    selected_numeric = numeric_cols[:5]
                    
                    # Create correlation matrix
                    corr_matrix = filtered_df[selected_numeric].corr()
                    
                    # Plot correlation heatmap
                    fig, ax = plt.subplots(figsize=(10, 8))
                    sns.heatmap(corr_matrix, annot=True, cmap="coolwarm", ax=ax)
                    ax.set_title("Correlation Matrix of Numeric Variables")
                    st.pyplot(fig)
                else:
                    st.info("Not enough numeric columns for correlation analysis.")
        
        # Word cloud for amenities or descriptions if available
        text_columns = [col for col in filtered_df.columns if any(text_keyword in col.lower() for text_keyword in ["description", "amenities", "features", "notes"])]
        
        if text_columns:
            from wordcloud import WordCloud
            
            st.markdown("<h3 class='subheader'>Word Cloud Analysis</h3>", unsafe_allow_html=True)
            text_col = text_columns[0]
            
            # Combine all text
            text_data = " ".join(filtered_df[text_col].dropna().astype(str))
            
            if len(text_data) > 50:  # Only create wordcloud if there's enough text
                # Generate word cloud
                wordcloud = WordCloud(width=800, height=400, background_color='white', max_words=100).generate(text_data)
                
                # Display the word cloud
                fig, ax = plt.subplots(figsize=(10, 5))
                ax.imshow(wordcloud, interpolation='bilinear')
                ax.axis('off')
                st.pyplot(fig)
            else:
                st.info(f"Not enough text data in the {text_col} column for word cloud generation.")
    
    with tab4:
        # Raw data view with search functionality
        st.markdown("<h2 class='subheader'>Shelter Homes Dataset</h2>", unsafe_allow_html=True)
        
        # Search functionality
        search_term = st.text_input("Search in dataset:", "")
        
        if search_term:
            # Search across all string columns
            string_cols = filtered_df.select_dtypes(include=['object']).columns
            mask = pd.DataFrame(False, index=filtered_df.index, columns=['match'])
            
            for col in string_cols:
                mask['match'] |= filtered_df[col].astype(str).str.contains(search_term, case=False, na=False)
            
            search_results = filtered_df[mask['match']]
            st.dataframe(search_results, height=400)
            st.markdown(f"**Found {len(search_results)} matches for '{search_term}'**")
        else:
            st.dataframe(filtered_df, height=400)
            st.markdown(f"**Showing {len(filtered_df)} records**")
        
        # Download functionality
        csv = filtered_df.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="Download data as CSV",
            data=csv,
            file_name="filtered_shelter_homes.csv",
            mime="text/csv",
        )

# Footer
st.markdown("---")
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    st.markdown(
        """
        <div style='text-align: center'>
            <p>Built with ❤️ using Streamlit | Data as of April 2025</p>
            <p>For more information, contact: <a href='mailto:info@indiashelters.org'>info@indiashelters.org</a></p>
        </div>
        """, 
        unsafe_allow_html=True
    )