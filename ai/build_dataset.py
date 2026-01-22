import pandas as pd

# Load raw dataset
df = pd.read_csv("dataset_raw.csv")

# Keep only relevant columns
df = df[["title", "description", "requirements", "fraudulent"]]

# Replace NaN with empty strings
df = df.fillna("")

# Combine text fields into a single column
df["text"] = (
    df["title"].astype(str) + " " +
    df["description"].astype(str) + " " +
    df["requirements"].astype(str)
)

# Create final dataset
final_df = df[["text", "fraudulent"]].rename(
    columns={"fraudulent": "label"}
)

# Save dataset
final_df.to_csv("dataset.csv", index=False)

print("dataset.csv created successfully")
print("Total samples:", len(final_df))
print(final_df["label"].value_counts())
