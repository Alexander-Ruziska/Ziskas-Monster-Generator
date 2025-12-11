# FableSpire

**Live Application**: https://fablespire.fly.dev/

FableSpire is a comprehensive D&D monster generator and management platform that empowers dungeon masters to create, customize, and organize unique creatures for their campaigns.

## 🎮 What FableSpire Does

### Core Features (Currently Live)
- **AI-Powered Monster Generation**: Create unique D&D monsters using OpenAI's GPT technology
- **Visual Monster Creation**: Generate custom monster artwork using DALL-E image generation
- **Personal Monster Library**: Save, organize, and manage your created monsters
- **Monster Stat Management**: View and edit complete monster stat blocks with D&D 5e formatting
- **Secure User Authentication**: Protected user accounts with secure login/registration
- **Admin Management Panel**: Administrative tools for user and monster oversight
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### How to Use FableSpire
1. **Register/Login**: Create your account at https://fablespire.fly.dev/
2. **Generate Monsters**: Use the Monster Generator to create unique creatures
3. **Customize**: Edit names, stats, and descriptions to fit your campaign
4. **Browse Library**: Access your personal collection of saved monsters
5. **Use in Game**: Reference your monsters during D&D sessions

### Coming Soon 🚧
Additional features currently in development:
- Dungeon Generator
- NPC Generator  
- Treasure Generator
- Encounter Builder
- World Builder Tools
- Adventure Generator

## 🛠️ Technology Stack

- **Frontend**: React, Bootstrap, Zustand (state management)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Neon)
- **Authentication**: Passport.js with sessions
- **AI Integration**: OpenAI API (GPT-4 for text, DALL-E for images)
- **Deployment**: Fly.io
- **Image Storage**: Cloudinary

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org)
- OpenAI API Key
- Cloudinary Account

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Alexander-Ruziska/Ziskas-Monster-Generator.git
   cd Ziskas-Monster-Generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database using the schema in `database.sql`

4. Create a `.env` file in the root directory:
   ```env
   SERVER_SESSION_SECRET=your_secure_secret_here
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=your_postgresql_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

5. Start the application:
   ```bash
   npm run server  # Start backend server
   npm run client  # Start frontend (in separate terminal)
   ```

6. Navigate to `http://localhost:5173`

## 📝 Features Overview

### Monster Generation
- Generate monsters by type, size, alignment, and challenge rating
- AI creates complete stat blocks including abilities, actions, and lore
- Custom artwork generated to match monster descriptions
- Edit and customize any aspect of generated monsters

### User Management
- Secure registration and authentication
- Personal monster collections
- User profile management

### Admin Features
- View all users and their monster collections
- Administrative controls for content management
- User account management tools

---

Built with ❤️ for the D&D community