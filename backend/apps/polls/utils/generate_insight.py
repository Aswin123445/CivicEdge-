def generate_insight(results):
    if not results:
        return None

    top = max(results, key=lambda x: x["percent"])

    if top["percent"] >= 60:
        return "Majority strongly agrees"
    elif top["percent"] >= 50:
        return "Majority agrees"
    else:
        return "Opinions are divided"