import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import cv2
import io
import PIL.Image
from PIL import Image, ImageOps
import os
import time
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime

# Set page configuration
st.set_page_config(
    page_title="Disaster Severity Analysis",
    page_icon="🌪️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main-header {
        font-size: 2.5rem;
        color: #B22222;
        text-align: center;
        margin-bottom: 1rem;
    }
    .subheader {
        font-size: 1.7rem;
        color: #8B0000;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .severity-high {
        color: #FF0000;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .severity-medium {
        color: #FFA500;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .severity-low {
        color: #008000;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .card {
        padding: 1.5rem;
        border-radius: 0.5rem;
        background-color: #f8f9fa;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
        margin-bottom: 1.5rem;
    }
    .footer {
        text-align: center;
        margin-top: 2rem;
        color: #666;
        font-size: 0.8rem;
    }
    .stAlert {
        background-color: #f8d7da;
        color: #721c24;
    }
    </style>
""", unsafe_allow_html=True)

# Title and introduction
st.markdown("<h1 class='main-header'>🌪️ Disaster Severity Analysis</h1>", unsafe_allow_html=True)
st.markdown("""
    This application analyzes uploaded images of natural disasters to determine the type and severity level. 
    Upload an image of a disaster scene to get an assessment of the damage severity, disaster type, and recommended actions.
""")

# Create a function to simulate disaster detection model
# In a real application, this would be a pretrained deep learning model
def analyze_disaster_image(image):
    """
    Simulates disaster type and severity analysis on an image
    Returns disaster type, severity level, confidence scores, and detected features
    """
    # Convert image to numpy array for processing
    img_array = np.array(image)
    
    # In a real application, this would pass the image through a trained model
    # For demo purposes, we'll simulate analysis with random predictions
    
    # Random disaster type selection with confidence scores
    disaster_types = {
        "Flood": 0,
        "Wildfire": 0,
        "Hurricane": 0,
        "Earthquake": 0,
        "Tornado": 0,
        "Landslide": 0
    }
    
    # Generate random confidence scores
    scores = np.random.dirichlet(np.ones(len(disaster_types)), size=1)[0]
    
    # Assign scores to disaster types
    for i, disaster_type in enumerate(disaster_types.keys()):
        disaster_types[disaster_type] = float(scores[i])
    
    # Sort by highest confidence
    sorted_disasters = {k: v for k, v in sorted(disaster_types.items(), key=lambda item: item[1], reverse=True)}
    
    # Select highest confidence disaster type
    disaster_type = list(sorted_disasters.keys())[0]
    confidence = sorted_disasters[disaster_type]
    
    # Determine severity based on image analysis
    # In a real model, this would be based on detected features like water level, fire spread, structural damage, etc.
    severity_score = np.random.uniform(0, 1)
    
    if severity_score > 0.7:
        severity = "High"
        severity_color = "red"
    elif severity_score > 0.4:
        severity = "Medium"
        severity_color = "orange"
    else:
        severity = "Low"
        severity_color = "green"
    
    # Simulated detected features that might indicate severity
    detected_features = {}
    
    if disaster_type == "Flood":
        detected_features = {
            "Water Level": round(np.random.uniform(0, 10), 1),  # in feet
            "Area Affected": round(np.random.uniform(1, 100), 1),  # in square miles
            "Current Flow Rate": round(np.random.uniform(0, 30), 1),  # in mph
            "Debris Presence": round(np.random.uniform(0, 1), 2)  # normalized score
        }
    elif disaster_type == "Wildfire":
        detected_features = {
            "Fire Spread": round(np.random.uniform(0, 50), 1),  # in acres
            "Smoke Density": round(np.random.uniform(0, 1), 2),  # normalized score
            "Proximity to Structures": round(np.random.uniform(0, 10), 1),  # in miles
            "Fire Intensity": round(np.random.uniform(0, 1), 2)  # normalized score
        }
    elif disaster_type == "Hurricane":
        detected_features = {
            "Wind Speed": round(np.random.uniform(0, 150), 1),  # in mph
            "Storm Surge": round(np.random.uniform(0, 20), 1),  # in feet
            "Structural Damage": round(np.random.uniform(0, 1), 2),  # normalized score
            "Debris Presence": round(np.random.uniform(0, 1), 2)  # normalized score
        }
    elif disaster_type == "Earthquake":
        detected_features = {
            "Structural Damage": round(np.random.uniform(0, 1), 2),  # normalized score
            "Ground Displacement": round(np.random.uniform(0, 10), 1),  # in feet
            "Aftershock Risk": round(np.random.uniform(0, 1), 2),  # normalized score
            "Infrastructure Impact": round(np.random.uniform(0, 1), 2)  # normalized score
        }
    elif disaster_type == "Tornado":
        detected_features = {
            "Path Width": round(np.random.uniform(0, 2), 1),  # in miles
            "Wind Speed": round(np.random.uniform(0, 300), 1),  # in mph
            "Structural Damage": round(np.random.uniform(0, 1), 2),  # normalized score
            "Debris Spread": round(np.random.uniform(0, 1), 2)  # normalized score
        }
    else:  # Landslide
        detected_features = {
            "Volume Displaced": round(np.random.uniform(0, 1000000), 0),  # in cubic meters
            "Path Length": round(np.random.uniform(0, 5), 1),  # in miles
            "Structural Impact": round(np.random.uniform(0, 1), 2),  # normalized score
            "Secondary Hazard Risk": round(np.random.uniform(0, 1), 2)  # normalized score
        }
    
    # Make sure the detected features match the severity score for consistency
    # Adjust the main feature based on severity
    main_feature = list(detected_features.keys())[0]
    max_value = max(detected_features.values()) if detected_features else 1
    
    if severity == "High":
        scaling_factor = np.random.uniform(0.8, 1.0)
    elif severity == "Medium":
        scaling_factor = np.random.uniform(0.4, 0.7)
    else:
        scaling_factor = np.random.uniform(0.1, 0.3)
    
    # Apply scaling to make features consistent with severity
    for feature in detected_features:
        if isinstance(detected_features[feature], float):
            detected_features[feature] = detected_features[feature] * scaling_factor * (max_value / detected_features[feature] if detected_features[feature] > 0 else 1)
    
    # Generate results object
    results = {
        "disaster_type": disaster_type,
        "confidence": confidence,
        "severity": severity,
        "severity_score": severity_score,
        "severity_color": severity_color,
        "detected_features": detected_features,
        "all_confidence_scores": sorted_disasters
    }
    
    return results

# Function to get recommendations based on disaster type and severity
def get_recommendations(disaster_type, severity):
    recommendations = {
        "Flood": {
            "High": [
                "Evacuate immediately to higher ground",
                "Do not attempt to cross flooded areas",
                "Follow emergency broadcast instructions",
                "Prepare for potential power and water outages lasting days",
                "Contact local emergency services for rescue if trapped"
            ],
            "Medium": [
                "Prepare for possible evacuation",
                "Move valuable items to higher floors",
                "Fill bathtubs and containers with clean water",
                "Charge devices and prepare emergency supplies",
                "Stay informed through emergency broadcasts"
            ],
            "Low": [
                "Monitor water levels and weather forecasts",
                "Prepare emergency supplies",
                "Check sump pumps and drainage systems",
                "Plan evacuation routes",
                "Keep important documents in waterproof containers"
            ]
        },
        "Wildfire": {
            "High": [
                "Evacuate immediately following official routes",
                "Do not return until authorities declare area safe",
                "Keep windows and doors closed if evacuation is not possible",
                "Wear respiratory protection if available",
                "Monitor emergency broadcasts for updates"
            ],
            "Medium": [
                "Prepare for possible evacuation",
                "Clear vegetation and combustibles from around structures",
                "Connect garden hoses and fill containers with water",
                "Place wet towels under door and window openings",
                "Keep emergency supplies ready"
            ],
            "Low": [
                "Monitor fire status and weather conditions",
                "Prepare emergency supplies and evacuation plan",
                "Clear gutters and roofs of debris",
                "Ensure address is visible for emergency responders",
                "Make a home inventory for insurance purposes"
            ]
        },
        "Hurricane": {
            "High": [
                "Evacuate if ordered by authorities",
                "Seek shelter in innermost room if evacuation is not possible",
                "Stay away from windows and glass doors",
                "Do not go outside during the eye of the hurricane",
                "Be prepared for prolonged power outages and flooding"
            ],
            "Medium": [
                "Prepare for possible evacuation",
                "Secure or bring inside outdoor items",
                "Cover windows with storm shutters or plywood",
                "Fill vehicles with fuel and charge electronic devices",
                "Prepare emergency supplies for at least 3-7 days"
            ],
            "Low": [
                "Monitor hurricane track and weather forecasts",
                "Review evacuation routes and emergency plan",
                "Check emergency supplies and replenish as needed",
                "Trim trees and shrubs to reduce wind damage potential",
                "Secure loose rain gutters and downspouts"
            ]
        },
        "Earthquake": {
            "High": [
                "Avoid damaged buildings and return only when authorities declare safe",
                "Be alert for aftershocks, landslides, and tsunami warnings",
                "Check for gas leaks and do not use open flames if gas smell is present",
                "Stay away from damaged areas and fallen power lines",
                "Text instead of call to keep phone lines clear for emergencies"
            ],
            "Medium": [
                "Inspect home for structural damage",
                "Check utilities for damage and shut off if necessary",
                "Clean up spilled medicines, chemicals, and flammable liquids",
                "Be prepared for aftershocks",
                "Check on neighbors, especially elderly or disabled"
            ],
            "Low": [
                "Inspect for minor damage",
                "Secure items that may fall in aftershocks",
                "Replenish emergency supplies",
                "Review and update emergency plans",
                "Document any damage for insurance purposes"
            ]
        },
        "Tornado": {
            "High": [
                "Seek immediate shelter in basement or interior room",
                "Stay away from windows and exterior walls",
                "Cover yourself with blankets or mattress for protection from debris",
                "Do not try to outrun a tornado in a vehicle",
                "After passing, watch for downed power lines and gas leaks"
            ],
            "Medium": [
                "Move to designated shelter area",
                "Secure or bring inside loose outdoor items",
                "Keep emergency supplies readily accessible",
                "Monitor emergency broadcasts",
                "Be prepared for power outages"
            ],
            "Low": [
                "Monitor weather conditions",
                "Review tornado safety procedures with household",
                "Identify safe shelter locations",
                "Prepare emergency supplies",
                "Secure outdoor items that could become projectiles"
            ]
        },
        "Landslide": {
            "High": [
                "Evacuate immediately if safe to do so",
                "Move uphill away from the slide path",
                "Watch for flooding and debris flows",
                "Alert neighbors who may be at risk",
                "Contact local emergency services if trapped"
            ],
            "Medium": [
                "Prepare for possible evacuation",
                "Monitor local news for warnings",
                "Observe ground conditions for signs of movement",
                "Prepare emergency supplies",
                "Plan evacuation routes"
            ],
            "Low": [
                "Monitor rainfall and soil conditions",
                "Watch for signs of land movement",
                "Consult with geotechnical experts if concerned",
                "Review insurance coverage for landslide damage",
                "Maintain proper drainage around property"
            ]
        }
    }
    
    return recommendations.get(disaster_type, {}).get(severity, ["No specific recommendations available."])

# Function to simulate getting historical data for the detected disaster type
def get_historical_data(disaster_type):
    """
    Simulates retrieving historical data for comparison
    Returns a dataframe of historical events and their severity
    """
    np.random.seed(42)  # For reproducibility
    
    # Simulate 10 historical events
    dates = pd.date_range(start='1/1/2015', periods=10, freq='6M')
    events = []
    
    for date in dates:
        severity = np.random.uniform(0, 1)
        if severity > 0.7:
            severity_label = "High"
        elif severity > 0.4:
            severity_label = "Medium"
        else:
            severity_label = "Low"
            
        impact_area = np.random.uniform(5, 500)  # in square miles
        casualties = int(np.random.uniform(0, 100) * severity)
        damage_millions = int(np.random.uniform(1, 1000) * severity)
        
        events.append({
            "Date": date,
            "Location": f"Region {np.random.randint(1, 20)}",
            "Severity Score": severity,
            "Severity": severity_label,
            "Impact Area (sq mi)": impact_area,
            "Casualties": casualties,
            "Damage ($ millions)": damage_millions
        })
    
    return pd.DataFrame(events)

# Layout sidebar
with st.sidebar:
    st.markdown("## 🌪️ Disaster Analysis Controls")
    
    # Upload image section
    st.markdown("### 📷 Upload Image")
    uploaded_file = st.file_uploader("Upload disaster image for analysis", type=["jpg", "jpeg", "png"])
    
    # Demo images option
    st.markdown("### 🖼️ Or Try Demo Images")
    demo_option = st.selectbox(
        "Select disaster type for demo:",
        ["None", "Flood", "Wildfire", "Hurricane", "Earthquake", "Tornado", "Landslide"]
    )
    
    # Analysis options
    st.markdown("### ⚙️ Analysis Options")
    show_features = st.checkbox("Show detected features", value=True)
    show_recommendations = st.checkbox("Show recommendations", value=True)
    show_historical = st.checkbox("Compare with historical events", value=True)
    
    # Disclaimer
    st.markdown("### ⚠️ Disclaimer")
    st.markdown("""
        This is a demonstration application. In a real scenario, predictions would be made by a trained 
        AI model. The results shown here are simulated and for illustrative purposes only.
    """)

# Main content area
col1, col2 = st.columns([1, 1])

# Initialize session state for storing analysis results
if 'analysis_results' not in st.session_state:
    st.session_state.analysis_results = None
if 'image' not in st.session_state:
    st.session_state.image = None
if 'historical_data' not in st.session_state:
    st.session_state.historical_data = None

# Handle demo option
if demo_option != "None":
    # In a real app, you would load actual disaster images
    # For demo, we'll create colored images representing each disaster type
    demo_image = Image.new('RGB', (400, 300), color=(np.random.randint(100, 255), np.random.randint(100, 255), np.random.randint(100, 255)))
    
    # Draw some simple shapes to make it look slightly more realistic
    from PIL import ImageDraw
    draw = ImageDraw.Draw(demo_image)
    
    # Different patterns based on disaster type
    if demo_option == "Flood":
        # Blue tones for flood
        for i in range(0, 300, 10):
            draw.line([(0, i), (400, i)], fill=(0, 0, 200, 128), width=10)
    elif demo_option == "Wildfire":
        # Red and orange for fire
        for i in range(20):
            x = np.random.randint(0, 400)
            y = np.random.randint(0, 300)
            size = np.random.randint(20, 60)
            draw.ellipse([x, y, x+size, y+size], fill=(255, np.random.randint(0, 100), 0, 200))
    elif demo_option == "Hurricane":
        # Spiral pattern for hurricane
        center_x, center_y = 200, 150
        for r in range(10, 150, 5):
            for angle in range(0, 360, 5):
                x = center_x + int(r * np.cos(np.radians(angle)))
                y = center_y + int(r * np.sin(np.radians(angle)))
                if 0 <= x < 400 and 0 <= y < 300:
                    draw.point([x, y], fill=(200, 200, 255))
    elif demo_option == "Earthquake":
        # Jagged lines for earthquake
        for i in range(20):
            points = []
            x, y = 0, np.random.randint(50, 250)
            while x < 400:
                points.append((x, y))
                x += np.random.randint(10, 30)
                y += np.random.randint(-20, 20)
                y = max(10, min(290, y))
            draw.line(points, fill=(139, 69, 19), width=5)
    elif demo_option == "Tornado":
        # Funnel shape for tornado
        for i in range(50, 10, -2):
            x1 = 200 - i//2
            x2 = 200 + i//2
            y1 = (50 - i) * 5
            y2 = y1 + 20
            draw.rectangle([x1, y1, x2, y2], fill=(100, 100, 100, 150))
    elif demo_option == "Landslide":
        # Brown/earth tones for landslide
        for i in range(20):
            points = []
            x, y = 0, 150 + np.random.randint(-50, 50)
            while x < 400:
                points.append((x, y))
                x += np.random.randint(10, 30)
                y += np.random.randint(-5, 15)
            draw.line(points, fill=(101, 67, 33), width=15)
    
    # Use the demo image
    st.session_state.image = demo_image
    
    # Force analysis to match selected disaster type
    if demo_option != "None":
        # Get historical data for the selected disaster type
        st.session_state.historical_data = get_historical_data(demo_option)
        
        # Create analysis results with the selected disaster type
        severity_score = np.random.uniform(0, 1)
        if severity_score > 0.7:
            severity = "High"
            severity_color = "red"
        elif severity_score > 0.4:
            severity = "Medium"
            severity_color = "orange"
        else:
            severity = "Low"
            severity_color = "green"
        
        # Simulated detected features based on disaster type
        detected_features = {}
        if demo_option == "Flood":
            detected_features = {
                "Water Level": round(np.random.uniform(0, 10), 1),
                "Area Affected": round(np.random.uniform(1, 100), 1),
                "Current Flow Rate": round(np.random.uniform(0, 30), 1),
                "Debris Presence": round(np.random.uniform(0, 1), 2)
            }
        elif demo_option == "Wildfire":
            detected_features = {
                "Fire Spread": round(np.random.uniform(0, 50), 1),
                "Smoke Density": round(np.random.uniform(0, 1), 2),
                "Proximity to Structures": round(np.random.uniform(0, 10), 1),
                "Fire Intensity": round(np.random.uniform(0, 1), 2)
            }
        elif demo_option == "Hurricane":
            detected_features = {
                "Wind Speed": round(np.random.uniform(0, 150), 1),
                "Storm Surge": round(np.random.uniform(0, 20), 1),
                "Structural Damage": round(np.random.uniform(0, 1), 2),
                "Debris Presence": round(np.random.uniform(0, 1), 2)
            }
        elif demo_option == "Earthquake":
            detected_features = {
                "Structural Damage": round(np.random.uniform(0, 1), 2),
                "Ground Displacement": round(np.random.uniform(0, 10), 1),
                "Aftershock Risk": round(np.random.uniform(0, 1), 2),
                "Infrastructure Impact": round(np.random.uniform(0, 1), 2)
            }
        elif demo_option == "Tornado":
            detected_features = {
                "Path Width": round(np.random.uniform(0, 2), 1),
                "Wind Speed": round(np.random.uniform(0, 300), 1),
                "Structural Damage": round(np.random.uniform(0, 1), 2),
                "Debris Spread": round(np.random.uniform(0, 1), 2)
            }
        elif demo_option == "Landslide":
            detected_features = {
                "Volume Displaced": round(np.random.uniform(0, 1000000), 0),
                "Path Length": round(np.random.uniform(0, 5), 1),
                "Structural Impact": round(np.random.uniform(0, 1), 2),
                "Secondary Hazard Risk": round(np.random.uniform(0, 1), 2)
            }
        
        # Create confidence scores
        confidence_scores = {}
        for dt in ["Flood", "Wildfire", "Hurricane", "Earthquake", "Tornado", "Landslide"]:
            if dt == demo_option:
                confidence_scores[dt] = round(np.random.uniform(0.85, 0.99), 2)
            else:
                confidence_scores[dt] = round(np.random.uniform(0, 0.15), 2)
        
        # Sort confidence scores
        sorted_confidence = {k: v for k, v in sorted(confidence_scores.items(), key=lambda item: item[1], reverse=True)}
        
        # Create analysis results
        st.session_state.analysis_results = {
            "disaster_type": demo_option,
            "confidence": sorted_confidence[demo_option],
            "severity": severity,
            "severity_score": severity_score,
            "severity_color": severity_color,
            "detected_features": detected_features,
            "all_confidence_scores": sorted_confidence
        }

# Handle uploaded image
if uploaded_file is not None:
    # Read the image
    image = Image.open(uploaded_file)
    
    # Resize for display if too large
    max_size = (800, 600)
    image.thumbnail(max_size)
    
    # Store the image
    st.session_state.image = image
    
    # Perform analysis
    with st.spinner('Analyzing image...'):
        # Simulate processing time
        time.sleep(2)
        
        # Get analysis results
        st.session_state.analysis_results = analyze_disaster_image(image)
        
        # Get historical data for the detected disaster type
        st.session_state.historical_data = get_historical_data(st.session_state.analysis_results["disaster_type"])

# Display image and analysis results
with col1:
    if st.session_state.image is not None:
        st.markdown("<h2 class='subheader'>Image Analysis</h2>", unsafe_allow_html=True)
        st.image(st.session_state.image, caption="Uploaded disaster image", use_column_width=True)
        
        # Image metadata
        with st.expander("Image Metadata"):
            if st.session_state.image:
                st.write(f"Size: {st.session_state.image.size}")
                st.write(f"Format: {st.session_state.image.format if hasattr(st.session_state.image, 'format') else 'Unknown'}")
                st.write(f"Mode: {st.session_state.image.mode}")
    else:
        st.markdown("<h2 class='subheader'>Upload an Image</h2>", unsafe_allow_html=True)
        st.markdown("""
            Please upload an image of a disaster scene using the file uploader in the sidebar, 
            or select one of the demo options to see how the analysis works.
        """)
        
        # Show sample images of different disasters
        st.markdown("<h3>Examples of Disaster Images:</h3>", unsafe_allow_html=True)
        
        # Create a 2x3 grid of colored rectangles representing disaster types
        cols = st.columns(3)
        disaster_types = ["Flood", "Wildfire", "Hurricane", "Earthquake", "Tornado", "Landslide"]
        colors = ["blue", "red", "lightblue", "brown", "gray", "sienna"]
        
        for i, (disaster, color) in enumerate(zip(disaster_types, colors)):
            with cols[i % 3]:
                st.markdown(f"""
                    <div style="background-color: {color}; height: 100px; display: flex; 
                    align-items: center; justify-content: center; color: white; font-weight: bold;">
                    {disaster}
                    </div>
                """, unsafe_allow_html=True)

# Display analysis results
with col2:
    if st.session_state.analysis_results is not None:
        results = st.session_state.analysis_results
        
        st.markdown("<h2 class='subheader'>Analysis Results</h2>", unsafe_allow_html=True)
        
        # Display disaster type and confidence
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown(f"### Detected Disaster: {results['disaster_type']}")
        st.markdown(f"**Confidence:** {results['confidence']:.2%}")
        
        # Create confidence gauge chart
        fig = go.Figure(go.Indicator(
            mode = "gauge+number",
            value = results['confidence'],
            domain = {'x': [0, 1], 'y': [0, 1]},
            title = {'text': "Confidence Level"},
            gauge = {
                'axis': {'range': [0, 1]},
                'bar': {'color': "darkblue"},
                'steps': [
                    {'range': [0, 0.5], 'color': "lightgray"},
                    {'range': [0.5, 0.7], 'color': "gray"},
                    {'range': [0.7, 1], 'color': "darkgray"}
                ]
            }
        ))
        fig.update_layout(height=200, margin=dict(l=10, r=10, t=50, b=10))
        st.plotly_chart(fig, use_container_width=True)
        
        # Display all confidence scores as a bar chart
        fig = px.bar(
            x=list(results["all_confidence_scores"].keys()),
            y=list(results["all_confidence_scores"].values()),
            labels={'x': 'Disaster Type', 'y': 'Confidence Score'},
            title="Confidence Scores by Disaster Type",
            color=list(results["all_confidence_scores"].values()),
            color_continuous_scale="Blues"
        )
        fig.update_layout(height=300, margin=dict(l=10, r=10, t=50, b=50))
        st.plotly_chart(fig, use_container_width=True)
        st.markdown("</div>", unsafe_allow_html=True)
        
        # Display severity assessment
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown(f"### Severity Assessment")
        
        # Create severity gauge
        fig = go.Figure(go.Indicator(
            mode = "gauge+number+delta",
            value = results['severity_score'],
            domain = {'x': [0, 1], 'y': [0, 1]},
            title = {'text': f"Severity Level: <span class='severity-{results['severity'].lower()}'>{results['severity']}</span>", 'font': {'size': 24}},
            gauge = {
                'axis': {'range': [0, 1], 'tickwidth': 1},
                'bar': {'color': results['severity_color']},
                'steps': [
                    {'range': [0, 0.4], 'color': "lightgreen"},
                    {'range': [0.4, 0.7], 'color': "orange"},
                    {'range': [0.7, 1], 'color': "lightcoral"}
                ],
                'threshold': {
                    'line': {'color': "red", 'width': 4},
                    'thickness': 0.75,
                    'value': results['severity_score']
                }
            }
        ))
        fig.update_layout(height=250, margin=dict(l=10, r=10, t=50, b=10))
        st.plotly_chart(fig, use_container_width=True)
        
        # Display severity description
        severity_descriptions = {
            "High": "Severe damage detected. Immediate action required.",
            "Medium": "Moderate damage detected. Caution advised.",
            "Low": "Minor damage detected. Monitor situation."
        }
        st.markdown(f"<p>{severity_descriptions[results['severity']]}</p>", unsafe_allow_html=True)