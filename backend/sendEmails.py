import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def main():
    # SMTP configuration
    SMTP_SERVER = "smtp.gmail.com"         # e.g., smtp.gmail.com
    SMTP_PORT = 587                          # or 465, depending on your provider
    SENDER_EMAIL = ""  # your email
    SENDER_PASSWORD = ""        # your password or app password

    SUBJECT = "News update for cybersecurity"

    # Read the list of emails from the text file
    try:
        with open("emails.txt", "r") as f:
            email_list = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print("Error: Could not find 'emails.txt'")
        return

    # Create a secure connection to your SMTP server
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Start TLS encryption
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
    except Exception as e:
        print(f"Error: Unable to connect/login to SMTP server. \n{e}")
        return

    for recipient_email in email_list:
        try:
            # Create a MIMEMultipart message
            msg = MIMEMultipart()
            msg["From"] = SENDER_EMAIL
            msg["To"] = recipient_email
            msg["Subject"] = SUBJECT
            
            # Email body placeholder
            body = (
                "Hello,\n\n"
                "This is a placeholder for our latest cybersecurity news update.\n"
                "Stay tuned for more details!\n\n"
                "Best regards,\n"
                "Cybersecurity Team"
            )
            
            # Attach the body to the email
            msg.attach(MIMEText(body, "plain"))
            
            # Send the message
            server.sendmail(SENDER_EMAIL, recipient_email, msg.as_string())
            print(f"Email sent to: {recipient_email}")
        except Exception as e:
            print(f"Error sending email to {recipient_email}: {e}")

    # Quit the server after sending all emails
    server.quit()

if __name__ == "__main__":
    main()
