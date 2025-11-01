# 🚗 Tracksy - Modern Ride Sharing Platform

<div align="center">

![Tracksy Logo](https://img.shields.io/badge/Tracksy-Ride%20Sharing-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**Your Journey, Your Way - Connect. Ride. Arrive.**

[Live Demo](https://tracksy-client.vercel.app) • [Report Bug](https://github.com/samio11/Tracksy_Client/issues) • [Request Feature](https://github.com/samio11/Tracksy_Client/issues)

</div>

---

## 🌟 About Tracksy

Tracksy is a next-generation ride-sharing platform that revolutionizes urban transportation. Built with cutting-edge web technologies, Tracksy connects riders with drivers seamlessly, providing a safe, efficient, and user-friendly experience for modern commuters.

Whether you're heading to work, exploring the city, or catching a flight, Tracksy ensures you get there comfortably and on time.

---

## ✨ Key Features

### 🎯 Core Services

#### 🔐 Authentication & User Management
- **Multi-Role Registration** - Separate registration flows for Riders, Drivers, and Admins
- **Secure Login System** - JWT-based authentication with access and refresh tokens
- **Google OAuth Integration** - Quick sign-in with Google accounts
- **Password Recovery** - OTP-based password reset functionality
- **User Profile Management** - Update and customize user information

#### 🚗 Ride Management
- **Create Ride Requests** - Riders can book rides instantly
- **Driver Acceptance System** - Drivers can accept available ride requests
- **Ride Status Tracking** - Complete ride lifecycle management:
  - Pending → Accepted → Started → Completed
- **Ride Cancellation** - Riders can cancel rides when needed
- **Comprehensive Ride History** - View all past and current rides
- **Ride Details Lookup** - Detailed information for each ride

#### 💳 Payment Processing
- **SSLCommerz Integration** - Secure payment gateway for transactions
- **Payment Success Handling** - Automated successful payment processing
- **Payment Failure Management** - Handle failed transactions gracefully
- **Payment Cancellation** - Support for cancelled payments
- **Admin Payment Analytics** - View all payment records and statistics

#### ⭐ Rating & Reviews
- **Two-Way Rating System** - Riders and drivers can rate each other
- **Rating History** - View all ratings and feedback
- **Quality Assurance** - Maintain service standards through ratings

#### 🚙 Vehicle Management (Driver)
- **Add Vehicles** - Drivers can register multiple vehicles
- **Vehicle Information** - Store vehicle details and documentation
- **Delete Vehicles** - Remove vehicles from the platform

#### 👨‍💼 Admin Dashboard
- **User Management** - View, search, and manage all users with pagination
- **User Verification** - Approve or verify user accounts
- **User Deletion** - Remove users from the platform
- **Admin Statistics** - Comprehensive dashboard with key metrics
- **Ride Analytics** - Monitor all rides across the platform
- **Payment Oversight** - Track all financial transactions
- **Discount Management** - Send promotional discount codes via OTP
- **Driver Performance Tracking** - View completed rides by drivers

#### 📱 Additional Features
- **Responsive Design** - Seamless experience across all devices
- **Real-time Data Updates** - Server-side rendering with Next.js caching
- **Secure API Communications** - Protected routes with JWT authorization
- **Pagination Support** - Efficient data loading for large datasets
- **Search Functionality** - Quick user and ride searches

### 🔐 User Experience

- **Quick Registration** - Sign up in seconds with email or social login
- **Profile Customization** - Personalize your profile with preferences and favorite locations
- **Saved Locations** - Save frequently visited places for faster booking
- **Schedule Rides** - Book rides in advance for important appointments
- **Multi-language Support** - Available in multiple languages for global accessibility

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** React Context API / Zustand
- **Maps Integration:** Mapbox / Google Maps API
- **Authentication:** NextAuth.js
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Axios

### Additional Tools
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Date Handling:** date-fns
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or higher)
- npm / yarn / pnpm / bun
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/samio11/Tracksy_Client.git
cd Tracksy_Client
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

---

## 📁 Project Structure

```
Tracksy_Client/
├── app/                    # Next.js 15 app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # UI components (Shadcn)
│   ├── shared/           # Shared components
│   └── features/         # Feature-specific components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── styles/                # Global styles
├── public/                # Static assets
└── config/                # Configuration files
```

---

## 🎨 Screenshots

<div align="center">

### Home Page
<img width="1916" height="885" alt="Screenshot 2025-11-01 110220" src="https://github.com/user-attachments/assets/b3aa3d33-1532-4b86-a05c-17361c68bd15" />


### Ride Booking Interface
<img width="1920" height="2156" alt="create-ride" src="https://github.com/user-attachments/assets/314c6584-16f6-40dc-923a-3ba29bc861db" />



</div>

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Your Name** - [@samio11](https://github.com/samio11)

Project Link: [https://github.com/samio11/Tracksy_Client](https://github.com/samio11/Tracksy_Client)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Vercel](https://vercel.com) for hosting
- [Lucide Icons](https://lucide.dev)
- All contributors who help improve Tracksy

---

<div align="center">

**Made with ❤️ by the Tracksy Team**

⭐ Star this repo if you find it useful!

</div>
