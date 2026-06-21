import re

# --- Category-wise keyword blacklists with severity weights ---
BLACKLIST = {
    "hate_speech": {"keywords": ["slur1", "slur2", "hateword"], "weight": 1.0},
    "violence":    {"keywords": ["kill you", "bomb", "attack plan"], "weight": 0.9},
    "spam":        {"keywords": ["buy now", "free money", "click here"], "weight": 0.4},
}

# Regex to catch evasion patterns, e.g. 'k.i.l.l', 'kiiill'
EVASION_PATTERNS = {
    "violence": [r"k+\.?i+\.?l+\.?l+", r"b+o+m+b+"],
}

AUTO_REMOVE_THRESHOLD = 0.9
HUMAN_REVIEW_THRESHOLD = 0.4

def normalize(text):
    """Lowercase and strip extra whitespace for consistent matching."""
    return re.sub(r"\s+", " ", text.lower()).strip()

def keyword_match_score(text):
    """Return (max_weight, matched_categories) from direct keyword hits."""
    max_weight = 0.0
    matched = []
    for category, data in BLACKLIST.items():
        for kw in data["keywords"]:
            if kw in text:
                matched.append(category)
                max_weight = max(max_weight, data["weight"])
    return max_weight, matched

def regex_match_score(text):
    """Return (max_weight, matched_categories) from evasion regex hits."""
    max_weight = 0.0
    matched = []
    for category, patterns in EVASION_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text):
                matched.append(category)
                max_weight = max(max_weight, BLACKLIST[category]["weight"])
    return max_weight, matched

def classify_content(raw_text):
    """
    Simulates the rule-based filtering stage.
    Returns a dict with score, matched categories, and decision.
    """
    text = normalize(raw_text)

    kw_score, kw_categories = keyword_match_score(text)
    re_score, re_categories = regex_match_score(text)

    final_score = max(kw_score, re_score)
    categories = list(set(kw_categories + re_categories))

    if final_score >= AUTO_REMOVE_THRESHOLD:
        decision = "AUTO_REMOVE"
    elif final_score >= HUMAN_REVIEW_THRESHOLD:
        decision = "HUMAN_REVIEW"
    else:
        decision = "AUTO_ALLOW"

    return {
        "score": round(final_score, 2),
        "categories": categories,
        "decision": decision,
    }

# --- Example usage ---
if __name__ == "__main__":
    sample_posts = [
        "Check out this amazing sunset photo!",
        "Buy now and get free money instantly, click here",
        "I will k.i.l.l you tomorrow",
    ]

    print("=== SafeNet Rule-Based Filtering Simulation (Q5) ===\n")
    for post in sample_posts:
        res = classify_content(post)
        print(f"Content: '{post}'")
        print(f"Result: {res}\n")
