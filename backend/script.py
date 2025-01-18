import json
from cybernews.cybernews import CyberNews

# Create an instance of the CyberNews class
news = CyberNews()  

# Fetch the news categories
generalNews = news.get_news("general")
dataBreachNews = news.get_news("dataBreach")
cyberAttackNews = news.get_news("cyberAttack")
vulnerabilityNews = news.get_news("vulnerability")
malwareNews = news.get_news("malware")
securityNews = news.get_news("security")

# Define a function to save data to a JSON file
def save_to_json(data, filename):
    with open(f"{filename}.json", "w", encoding="utf-8") as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

# Save each news category to its corresponding JSON file
save_to_json(generalNews, "generalNews")
save_to_json(dataBreachNews, "dataBreachNews")
save_to_json(cyberAttackNews, "cyberAttackNews")
save_to_json(vulnerabilityNews, "vulnerabilityNews")
save_to_json(malwareNews, "malwareNews")
save_to_json(securityNews, "securityNews")

print("News saved to JSON files successfully!")
