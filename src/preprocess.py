import pandas as pd

def preprocess(train_df, test_df):
    print("Initial Train Shape:", train_df.shape)
    print("Initial Test Shape:", test_df.shape)

    # Drop missing values
    train_df = train_df.dropna()
    test_df = test_df.dropna()

    # Encode categorical columns using SAME mapping
    for col in train_df.select_dtypes(include='object'):
        if col != "Churn":

            # Combine train + test to ensure same encoding
            combined = pd.concat([train_df[col], test_df[col]], axis=0)

            codes, uniques = pd.factorize(combined)

            # Split back
            train_df[col] = codes[:len(train_df)]
            test_df[col] = codes[len(train_df):]

    print("Processed Train Shape:", train_df.shape)
    print("Processed Test Shape:", test_df.shape)

    return train_df, test_df