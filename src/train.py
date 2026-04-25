import pandas as pd
import pickle
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

from preprocess import preprocess

# =========================
# LOAD DATA
# =========================
train_df = pd.read_csv("../data/train.csv")
test_df = pd.read_csv("../data/test.csv")

# Fix column spacing
train_df.columns = train_df.columns.str.strip()
test_df.columns = test_df.columns.str.strip()

print("\nTrain Columns:\n", train_df.columns)

# =========================
# PREPROCESS DATA
# =========================
train_df, test_df = preprocess(train_df, test_df)

# =========================
# SET TARGET
# =========================
TARGET = "Churn"

# =========================
# SPLIT FEATURES & TARGET
# =========================
X_train = train_df.drop(TARGET, axis=1)
y_train = train_df[TARGET]

X_test = test_df.drop(TARGET, axis=1)
y_test = test_df[TARGET]

# =========================
# REMOVE ID COLUMN (IMPORTANT)
# =========================
if "CustomerID" in X_train.columns:
    X_train = X_train.drop("CustomerID", axis=1)
    X_test = X_test.drop("CustomerID", axis=1)

# =========================
# TRAIN MODEL (IMPROVED)
# =========================
print("\nTraining Random Forest model...")

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=15,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train, y_train)

# =========================
# EVALUATE MODEL
# =========================
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"\nAccuracy: {accuracy:.4f}")

# 🔥 IMPORTANT ADDITION
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# =========================
# FEATURE IMPORTANCE
# =========================
feature_importance = pd.Series(
    model.feature_importances_,
    index=X_train.columns
).sort_values(ascending=False)

print("\nTop 10 Important Features:\n")
print(feature_importance.head(10))

# =========================
# SAVE MODEL
# =========================
pickle.dump(model, open("../model/model.pkl", "wb"))

# =========================
# SAVE FEATURES
# =========================
with open("../model/features.json", "w") as f:
    json.dump(list(X_train.columns), f)

print("\n✅ Model and features saved successfully!")