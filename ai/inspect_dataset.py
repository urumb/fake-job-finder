import pandas as pd

df = pd.read_csv("dataset_raw.csv")

print("Shape:", df.shape)
print("\nColumns:")
print(df.columns)

print("\nSample rows:")
print(df.head(3))
