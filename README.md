🌾 AI-Based Crop Disease Detection & Localized Treatment Recommendation System

An end-to-end intelligent web application designed to empower local farmers by providing real-time crop pathology diagnostics using Deep Learning (CNNs) and targeted treatment guidelines in native languages (Sinhala/English).

📌 Features

* 📸 **Instant Image Classification:** Upload or capture plant leaf images to classify crop diseases with high accuracy (>95%).
* 🌐 **Localized Recommendations:** Provides actionable chemical and organic treatment strategies tailored to regional guidelines.
* 🗣️ **Multilingual Support:** Displays diagnostics and treatment advice in native Sinhala and English languages.
* ⚡ **Low Latency Inference:** Fast prediction response times (<500ms) powered by a lightweight backend API.
* ☁️ **Cloud Storage Integration:** Scalable image upload and metadata storage using Supabase.

🛠️ Tech Stack

* Frontend: React.js / HTML5 / CSS3 / JavaScript
* Backend: Python, Flask (RESTful APIs)
* Machine Learning: TensorFlow, Keras, OpenCV, MobileNetV2 Architecture
* Database & Storage: Supabase (PostgreSQL, Supabase Storage Buckets)
* Environment: Google Colab, VS Code

📐 System Architecture

1. User Input: Farmer captures or uploads an infected leaf image via the web interface.
2. Backend Processing: Flask API passes the image array to the trained TensorFlow CNN model.
3. Inference & DB Retrieval: Model identifies disease class and confidence score. Flask queries Supabase for localized treatment data matching the predicted class.
4. Response: Diagnostics and step-by-step treatment guidelines are rendered on the UI.

🚀 Getting Started

Prerequisites
* Python 3.9+
* Node.js & npm (for Frontend)
* Supabase Account & API Credentials
