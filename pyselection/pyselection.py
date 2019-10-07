import micropip
micropip.install('Boruta')

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from boruta import BorutaPy

from js import csv, target

DATA = StringIO(csv)
df = pd.read_csv(DATA)

X = df.drop(target, axis = 1).values
y = df[target]
y = y.ravel()

rf = RandomForestClassifier(n_jobs=-1, class_weight='balanced', max_depth=5)
feat_selector = BorutaPy(rf, n_estimators='auto', verbose=2, random_state=1)
feat_selector.fit(X, y)
feat_selector.ranking_
