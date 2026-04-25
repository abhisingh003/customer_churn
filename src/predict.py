import pickle
import pandas as pd

# Load model
model = pickle.load(open("../model/model.pkl", "rb"))

# -------------------------------
# CREATE SAMPLE INPUT (MATCH DATASET)
# -------------------------------
sample = {
    "CustomerID": 12345,
    "Age": 30,
    "Gender": 1,
    "Tenure": 12,
    "Usage Frequency": 5,
    "Support Calls": 1,
    "Payment Delay": 0,
    "Subscription Type": 2,
    "Contract Length": 12,
    "Total Spend": 500,
    "Last Interaction": 10
}

# Convert to DataFrame
df = pd.DataFrame([sample])

# Predict
prob = model.predict_proba(df)

print("Churn Probability:", prob[0][1])