BizyEasy - Automated Customer Service Solution
BizyEasy is a comprehensive solution designed to automate your customer service operations. It handles email processing, support ticket generation, and integrates an AI chatbot to efficiently manage repetitive tasks. This allows your business to focus on what truly matters.

Features:

Email Automation: Automatically retrieves and intelligently responds to customer emails.
Ticket Management: Generates unique support tickets for each customer query, enabling easy tracking and resolution.
AI Chatbot Integration: Provides instant answers to common customer questions using a local AI chatbot.
Secure Data Storage: Stores ticket data and customer information securely in MongoDB.
Seamless Gmail Integration: Simplifies email handling with Google OAuth 2.0.
Getting Started:

1. Prerequisites:

Python 3.7 or higher (Download from python.org)
MongoDB (Download from mongodb.com or use MongoDB Atlas mongodb.com/atlas)
Google Account (for Gmail API access)
2. Installation Steps:

2.1 Clone the Repository:
Bash

git clone https://github.com/kranti424/Enterprise.git
cd Enterprise/BizyEasy
2.2 Create a Virtual Environment (Recommended):
Bash

python -m venv venv
# For macOS/Linux:
source venv/bin/activate
# For Windows:
venv\Scripts\activate
2.3 Install Dependencies:
Bash

pip install -r requirements.txt
2.4 Set Up MongoDB:
Ensure MongoDB is running (either locally or through a cloud service like MongoDB Atlas).
Create a database named enterprise_db.
Update the MONGO_URI in your .env file (see step 2.6).
2.5 Configure Google OAuth 2.0:
Go to the Google Cloud Console.
Create a new project.
Enable the "Gmail API".
Navigate to "Credentials" and create "OAuth 2.0 Client IDs".
Download the credentials.json file and place it in the BizyEasy directory.
2.6 Set Up Environment Variables:
Create a .env file in the BizyEasy directory.
Add the following lines, replacing placeholders with your actual values:
GMAIL_API_CREDENTIALS_PATH=credentials.json
MONGO_URI=mongodb://localhost:27017/enterprise_db # Or your MongoDB Atlas connection string
If using Mongodb Atlas, the connection string will be provided by Atlas.
2.7 Run the Application:
Bash

python app.py
3. Usage:

Email Processing: The application will automatically monitor your Gmail inbox, process emails, and generate support tickets.
Chatbot Interaction: Customers can interact with the chatbot for instant responses to common queries.
Ticket Management: Track and manage support tickets using the generated Ticket IDs.
4. Contributing:

Feel free to fork the repository, make improvements, and submit a pull request. Contributions are highly appreciated!
5. License:

This project is licensed under the MIT License. See the LICENSE file for details.
6. Support:

For any issues or questions, please open an issue on GitHub. We'll do our best to assist you.
