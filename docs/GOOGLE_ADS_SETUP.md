# Google Ads setup

Enable Google Ads API, apply for a developer token from a manager account, and set the
configured API version. Customers grant the connected identity the **Read-only** Ads
role. AppLedger lists accessible customers, supports manager `login-customer-id`, and
executes GAQL search only. The live adapter intentionally contains no create, mutate,
pause, budget, bidding, or asset methods.
