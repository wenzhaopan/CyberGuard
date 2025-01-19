import smtplib
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def load_news():
    """Load and combine all news from JSON files."""
    news_types = ['cyberAttack', 'dataBreach', 'vulnerability', 'malware']
    all_news = []
    
    for news_type in news_types:
        try:
            with open(f'{news_type}News.json', 'r') as f:
                news = json.load(f)
                # Add news type to each item
                for item in news:
                    item['type'] = news_type
                all_news.extend(news[:2])  # Get top 2 news from each category
        except FileNotFoundError:
            print(f"Warning: {news_type}News.json not found")
    
    return all_news

def create_email_body(news_items):
    """Create formatted email body from news items."""
    body = "Today's Cybersecurity News Update\n\n"
    
    for news in news_items:
        body += f"Category: {news['type'].upper()}\n"
        body += f"Headline: {news['headlines']}\n"
        body += f"Summary: {news.get('summary', news.get('fullNews', ''))[:200]}...\n"
        if news.get('preventionTips'):
            body += "\nPrevention Tips:\n"
            for tip in news['preventionTips']:
                body += f"- {tip}\n"
        if news.get('newsURL'):
            body += f"\nRead more: {news['newsURL']}\n"
        body += "\n---\n\n"
    
    body += "\nTo unsubscribe, reply with 'UNSUBSCRIBE' in the subject line."
    return body

def main():
    # SMTP configuration
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    SENDER_EMAIL = ""  # your email
    SENDER_PASSWORD = ""  # your app password
    SUBJECT = f"Cybersecurity News Update - {datetime.now().strftime('%Y-%m-%d')}"

    # Load news content
    news_items = load_news()
    if not news_items:
        print("Error: No news content available")
        return

    # Read email list
    try:
        with open("emails.txt", "r") as f:
            email_list = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print("Error: Could not find 'emails.txt'")
        return

    # Create email body
    email_body = create_email_body(news_items)

    # Connect to SMTP server
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
    except Exception as e:
        print(f"Error: Unable to connect/login to SMTP server.\n{e}")
        return

    # Send emails
    for recipient_email in email_list:
        try:
            msg = MIMEMultipart()
            msg["From"] = SENDER_EMAIL
            msg["To"] = recipient_email
            msg["Subject"] = SUBJECT
            
            msg.attach(MIMEText(email_body, "plain"))
            
            server.sendmail(SENDER_EMAIL, recipient_email, msg.as_string())
            print(f"Email sent to: {recipient_email}")
        except Exception as e:
            print(f"Error sending email to {recipient_email}: {e}")

    server.quit()

if __name__ == "__main__":
    main()
    