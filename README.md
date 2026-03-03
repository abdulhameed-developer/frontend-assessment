BOXpad – Advanced Chat Dashboard

A modern, enterprise-grade chat dashboard built with Next.js, React, and TypeScript. This application provides a seamless messaging experience with real-time updates, contact management, and comprehensive user settings.

Live Application:
https://my-frontend-assessment.vercel.app

Repository:
https://github.com/abdulhameed-developer/frontend-assessment

Overview

BOXpad is a production-style chat dashboard designed for team communication and customer support workflows. It combines a structured UI architecture with API-driven data rendering to deliver a responsive and scalable messaging interface across desktop and mobile devices.

The application implements a four-column desktop layout that transitions into a mobile-optimized interface with bottom navigation, ensuring consistent usability across screen sizes.

Technology Stack
Frontend Core

Next.js (App Router architecture)

React

TypeScript

Tailwind CSS

State Management

React Context API (Authentication and Chat state)

Custom Hooks for reusable logic and data handling

Tooling and Enhancements

ESLint for code quality

Framer Motion for UI transitions and animations

Key Features
Authentication System

Login and registration flow

Session persistence using local storage

Profile management

Password update functionality

Chat Interface

Real-time message interaction (simulated)

Message reactions

Reply, edit, and delete capabilities

Message status indicators

Contact Management

Add and manage contacts

Block/unblock functionality

Contact labels and internal notes

Search and filtering system

User Settings

Profile editing

Notification preferences

Privacy controls

Support section with FAQ

Responsive Layout

Desktop Layout:

Column 1: Inbox Sidebar (260px)

Column 2: Users/Chats List (320px)

Column 3: Chat Window (flexible width)

Column 4: Details Panel (280px)

Mobile Layout:

Bottom navigation

Full-screen chat view

Optimized touch interactions

Installation Guide
Prerequisites

Node.js 20+

npm 10+

Git

Setup Instructions

Clone the repository:

git clone https://github.com/abdulhameed-developer/frontend-assessment.git
cd frontend-assessment

Install dependencies:

npm install

Start development server:

npm run dev

Application will run at:

http://localhost:3000

API Integration

The project integrates public REST APIs for demonstration of data handling and dynamic rendering.

Endpoint	Purpose	Data Source
/api/users	User profiles	ReqRes
/api/comments	Chat messages	JSONPlaceholder
/api/todos	Task simulation	JSONPlaceholder
/api/posts	Campaign data	JSONPlaceholder

API requests are handled through a centralized services layer with structured TypeScript typing.

Project Structure
frontend-assessment/
├── public/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── ui/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
├── package.json
├── tsconfig.json
└── tailwind.config.js

The project follows a modular and scalable folder structure aligned with modern Next.js architecture practices.

Development Standards

TypeScript enforced across the project

Reusable component-driven design

Strict separation of UI, state, and service logic

Responsive-first implementation

Consistent Tailwind utility usage

License

This project is licensed under the MIT License.

Third-party libraries used in this project also follow the MIT License.

Contact

For inquiries:

Email: hameedrjt@gmail.com

GitHub: https://github.com/abdulhameed-developer
