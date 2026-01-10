import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from docx import Document

# SMTP-Server-Einstellungen
smtp_server = "smtp.gmail.com"
smtp_port = 587
myemail = "Mohammadrezakaramijob@gmail.com"
password = "ibwb muyj kior fhbx"

# Datei-Pfade
file__path = r"D:\job\Job-Application-ai\Email.Firmen.docx"
pdf_file_path = r"D:\job\Mohammad\Neuer Ordner\Lebenslauf\Lebenslauf1.pdf"

# Funktion zur Extraktion von E-Mail-Adressen aus einer Word-Datei
def extract_emails_from_word(file__path):
    doc = Document(file__path)
    emails = []
    for para in doc.paragraphs:
        found_emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', para.text)
        emails.extend(found_emails)
    return emails

# Betreff und Text der E-Mail
subjekt = "Bewerbung als Trockenbauer"
Body = """Sehr geehrte Damen und Herren,

hiermit bewerbe ich mich als Trockenbauer in Ihrem Unternehmen.

Mit freundlichen Grüßen
Mohammad Hossein Bidram"""

# E-Mail-Adressen extrahieren
email_list = extract_emails_from_word(file__path)
print(f"🔍 Gefundene E-Mail-Adressen: {email_list}")

try:
    # Verbindung zum SMTP-Server
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(myemail, password)

    # E-Mail an alle Empfänger senden
    for recipient in email_list:
        msg = MIMEMultipart()
        msg["From"] = myemail  
        msg["To"] = recipient   
        msg["Subject"] = subjekt  
        msg.attach(MIMEText(Body, "plain"))  

        # PDF-Datei anhängen
        with open(pdf_file_path, "rb") as attachment:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f"attachment; filename={pdf_file_path.split('/')[-1]}")
            msg.attach(part)

        # E-Mail senden
        server.sendmail(myemail, recipient, msg.as_string())
        print(f"✅ E-Mail an {recipient} gesendet.")

except smtplib.SMTPException as e:
    print(f"⚠️ Fehler beim Senden der E-Mail: {e}")

finally:
    server.quit()
    print("✅ Alle E-Mails wurden erfolgreich gesendet!")
