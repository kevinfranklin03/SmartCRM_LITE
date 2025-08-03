# 🚀 SmartCRM Lite

SmartCRM Lite is a lightweight, Firebase-powered CRM system designed for lead tracking, status workflows, and AI-powered note analysis.


## 🚀 Video Demo


https://github.com/user-attachments/assets/5ebbd02e-9c6b-433f-b36e-c5bc0f62e53c


---

## ✨ Features

- 🔄 **Real-time lead management** with Firestore
- 📊 **Status tracking**: New → Contacted → Closed
- 🧠 **AI-powered lead scoring** using Hugging Face (`facebook/bart-large-cnn`)
- 📝 Notes field with dynamic score generation
- 🔍 Filter leads by status
- 🎯 Responsive UI built with Tailwind CSS
- 🔐 Firebase Auth-ready (optional upgrade)

---

## 🧠 How Lead Scoring Works

Lead notes are summarized by Hugging Face's `bart-large-cnn` model. The score is calculated by detecting meaningful keywords like:

- `interested`, `demo`, `budget`, `follow-up`
- Custom phrases like `looking to compare`, `ready to purchase`

This gives you a smart, context-aware ranking from 10 to 100.

---

## 🛠 Tech Stack

| Layer         | Tech                       |
|---------------|----------------------------|
| Frontend      | React.js + Tailwind CSS    |
| Backend       | Firebase Firestore         |
| AI Scoring    | Hugging Face Inference API |
| Auth (Optional)| Firebase Auth             |


---

## 🧪 Sample Lead Input

```json
{
  "name": "Sophie Miles",
  "email": "sophie@fastdata.io",
  "campaign": "Q3 Product Demo",
  "notes": "Sophie asked for a personalized demo next week. Mentioned budget has been approved. Follow-up scheduled for Tuesday."
}

```

## 🧪 How to Run Locally


## 1. Clone the repository

```bash

git clone https://github.com/your-username/smartcrm-lite.git
cd smartcrm-lite
npm install

```

## 2. Install dependencies
npm install

## 3. Configure Firebase And Hugging Face API
### Create a .env file
```bash

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MSG_SENDER_ID=your_msg_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_HF_TOKEN=hf_your_huggingface_token

```
## 4. Start the app
npm start
