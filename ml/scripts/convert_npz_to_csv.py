from pathlib import Path
import numpy as np
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATA_PATH = PROJECT_ROOT / "dataset" / "raw" / "data" / "METR-LA" / "train.npz"
OUTPUT_DIR = PROJECT_ROOT / "dataset" / "processed"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

with np.load(DATA_PATH) as data:
    X = data["x"]
    y = data["y"]

# Flatten each training sequence into one CSV row
X_df = pd.DataFrame(X.reshape(X.shape[0], -1))
y_df = pd.DataFrame(y.reshape(y.shape[0], -1))

X_df.to_csv(OUTPUT_DIR / "metr_la_train_x.csv", index=False)
y_df.to_csv(OUTPUT_DIR / "metr_la_train_y.csv", index=False)

print("Conversion complete.")
print("X shape:", X.shape, "→", X_df.shape)
print("y shape:", y.shape, "→", y_df.shape)