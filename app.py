from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import json

app = Flask(__name__)
CORS(app)

# Load model
model = pickle.load(open("model/model.pkl", "rb"))

# Load features
with open("model/features.json", "r") as f:
    feature_columns = json.load(f)

@app.route("/")
def home():
    return "API Running 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Ensure correct order
    input_data = [data.get(col, 0) for col in feature_columns]

    df = pd.DataFrame([input_data], columns=feature_columns)

    prediction = model.predict(df)
    prob = model.predict_proba(df)

    return jsonify({
        "prediction": int(prediction[0]),
        "probability": float(prob[0][1])
    })

if __name__ == "__main__":
    app.run(debug=True)