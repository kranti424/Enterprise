BizyEasy - Automated Business Solution

Revolutionizing Customer Support with AI & Automation

BizyEasy is a powerful, all-in-one solution designed to streamline customer service operations. With features like email automation, AI-powered chatbot integration, and support ticket management, BizyEasy enables businesses to enhance efficiency and focus on critical operations.

🚀 Key Features

✅ Email Automation

Automatically retrieves and processes customer emails.

Generates intelligent responses using AI.

Integrates seamlessly with Gmail via OAuth 2.0.

📩 Support Ticket Management

Converts emails into trackable support tickets.

Provides unique ticket IDs for better query resolution.

Stores data securely in MongoDB.

🤖 AI Chatbot Integration

Handles customer queries instantly.

Reduces response time and enhances user experience.

Uses local AI for improved performance.

🔐 Secure Data Storage

Ensures safe and encrypted storage of customer interactions.

Supports both local and MongoDB Atlas integration.

🌐 Seamless Google Integration

Uses Google OAuth 2.0 for secure email access.

Simplifies email-based support processes.

📸 Screenshots

1️⃣ AI Chatbot & Ticket Management



2️⃣ File Upload & Data Processing



🛠 Getting Started

1️⃣ Prerequisites

Ensure you have the following installed:

Python 3.7+ → Download here

MongoDB → Download here

Google Account (for Gmail API access)

2️⃣ Installation Steps

📌 Step 1: Clone the Repository

git clone https://github.com/kranti424/Enterprise.git
cd Enterprise/BizyEasy

📌 Step 2: Create a Virtual Environment (Recommended)

python -m venv venv
# For macOS/Linux:
source venv/bin/activate
# For Windows:
venv\Scripts\activate

📌 Step 3: Install Dependencies

pip install -r requirements.txt

📌 Step 4: Set Up MongoDB

Ensure MongoDB is running (locally or via MongoDB Atlas).

Create a database named enterprise_db.

Update the MONGO_URI in your .env file (see next step).

📌 Step 5: Configure Google OAuth 2.0

Go to the Google Cloud Console.

Create a new project and enable Gmail API.

Navigate to "Credentials" → Create OAuth 2.0 Client ID.

Download the credentials.json file and place it in the BizyEasy directory.

📌 Step 6: Set Up Environment Variables

Create a .env file in the BizyEasy directory and add:

GMAIL_API_CREDENTIALS_PATH=credentials.json
MONGO_URI=mongodb://localhost:27017/enterprise_db  # Or MongoDB Atlas URL

📌 Step 7: Run the Application

python app.py

🎯 How to Use BizyEasy

📨 Email Processing

Monitors your Gmail inbox for customer queries.

Automatically processes emails and generates support tickets.

💬 Chatbot Interaction

Users can interact with the chatbot for instant issue resolution.

📊 Ticket Management

Tracks and manages support tickets using unique Ticket IDs.

🤝 Contributing

We welcome contributions! Feel free to fork the repository, make improvements, and submit a pull request.

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

📞 Need Help?

For any issues, feel free to open an issue on GitHub, and we’ll be happy to assist you!

🚀 Automate Customer Service with BizyEasy Today!

