import micropip
micropip.install('Boruta')

import pandas as pd
from pandas.compat import StringIO

from js import csv

DATA = StringIO(csv)
df = pd.read_csv(DATA)
df.describe().to_dict()
