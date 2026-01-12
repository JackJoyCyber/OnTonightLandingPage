# OnTonight Landing Page

**on-tonight.com** - Professional identity platform for hospitality

## Quick Deploy

1. Create project folder structure:
```
ontonight-landing/
├── package.json
├── .gitignore (rename from gitignore.txt)
├── .env.example (rename from env.example.txt)
├── next.config.js
├── vercel.json
├── pages/
│   ├── index.js
│   ├── _app.js
│   ├── _document.js
│   └── api/
│       └── waitlist.js
├── lib/
│   └── firebase.js
└── styles/
    └── globals.css
```

2. Install & run:
```bash
npm install
cp .env.example .env.local
# Add Firebase credentials to .env.local (SAME as main app)
npm run dev
```

3. Deploy to Vercel:
- Push to GitHub
- Import to Vercel
- Add Firebase env variables
- Deploy

## Firebase Setup

Add to Firestore rules:
```javascript
match /waitlist/{waitlistId} {
  allow create: if request.resource.data.email is string;
  allow read, update, delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
}
```

## Domain
- **Landing:** on-tonight.com
- **App:** app.on-tonight.com

Contact: AdminJoy@On-Tonight.com
