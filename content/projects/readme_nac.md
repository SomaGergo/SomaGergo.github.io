# NAC Breda Signing Predictor

A machine learning project focused on identifying the player performance metrics most strongly associated with expected goals and turning those findings into practical recruitment and tactical recommendations for NAC Breda.

## Overview

This project explored how data science can support football decision-making beyond simple descriptive statistics. Using player performance and market data, the goal was to understand which variables best explain attacking output and how those insights could inform scouting, squad planning, and match strategy.

Rather than treating machine learning as a black box, the work combined exploratory analysis, model comparison, and business interpretation to produce recommendations that could be understood by non-technical stakeholders.

## Dataset and Preparation

- 16,536 player records
- 114 features across numerical, categorical, and date-based variables
- Missing values in xG-related fields handled with median imputation
- One-hot encoding for categorical features
- Feature normalization applied where model choice required it

The analysis initially examined market value and broader player attributes, but the strongest and most actionable patterns emerged around expected goals and attacking contribution.

## Key Findings

Several performance indicators showed strong value for understanding attacking output, including:

- shots on target per 90
- pass completion rate
- duels won per 90
- touches in the box
- accurate long passes

The exploratory phase also highlighted that some common assumptions, such as using market value as a primary signal, were less informative than direct on-pitch performance metrics.

## Modeling Approach

Multiple regression models were explored to predict expected goals, including:

- Random Forest Regressor
- Gradient Boosting Regressor
- K-Nearest Neighbors
- XGBoost

The strongest overall results came from the Random Forest model, which was selected for its ability to capture non-linear patterns, work well with mixed feature types, and provide interpretable feature importance signals.

## Results

### Random Forest Performance

| Metric | Value |
|---|---|
| MSE | 0.1036 |
| RMSE | 0.3218 |
| MAE | 0.1522 |
| R2 | 0.9849 |

These results suggested the model captured the structure of the dataset very effectively, while also surfacing which footballing attributes mattered most for attacking contribution.

## Business Value

The project translated model output into practical recommendations for club decision-makers:

- prioritize scouting profiles with strong shot quality and ball progression indicators
- support tactical systems that generate more high-quality shooting opportunities
- monitor performance metrics continuously rather than relying on static transfer heuristics
- extend similar modeling approaches into retention, development, and injury-risk workflows

## What This Project Shows

This project demonstrates the ability to:

- connect machine learning to a real business context
- move from raw sports data to stakeholder-ready recommendations
- compare and evaluate multiple predictive approaches
- use analytics not just for prediction, but for strategic decision support
