# Puviyan Digital Solutions Website

A modern, responsive React website built with TypeScript, featuring advanced animations, parallax effects, and interactive components. The site showcases Puviyan Digital Solutions' technology, services, and environmental initiatives.

## 🚀 Features

### **Interactive Animations & Effects**
- **Parallax Image Transitions**: Custom parallax component with smooth scroll-based image transitions
- **GSAP Animations**: Advanced animations for product showcase and interactive elements
- **Framer Motion**: Smooth page transitions and component animations
- **Touch Interactions**: Mobile-optimized touch gestures for enhanced user experience

### **Responsive Design**
- **Mobile-First Approach**: Dedicated mobile components and layouts
- **Adaptive Components**: Different layouts for mobile and desktop versions
- **Touch-Friendly Navigation**: Mobile hamburger menu with smooth animations

### **Modern Tech Stack**
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **ShadCN/UI** components for consistent design system
- **React Router** for client-side navigation

### **Key Components**

#### **Product Showcase (`Product.tsx`)**
- Interactive "Coming Soon" section with animated text
- Contact form with EmailJS integration
- Touch-responsive image animations
- Gradient call-to-action buttons

#### **Parallax Images (`ParallaxImages.tsx`)**
- Custom scroll-controlled image transitions
- Keyboard navigation support (arrow keys, page up/down)
- Smooth clip-path animations
- Performance-optimized rendering

#### **Header Navigation (`Header.tsx`)**
- Animated logo with hover effects
- Responsive mobile menu
- Smooth scroll navigation
- Dynamic styling based on scroll position

#### **Carbon Footprint Banner**
- Environmental awareness messaging
- Mobile and desktop optimized versions
- Integrated with overall site theme

## 🛠️ Development

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd puviyan_website

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📱 Mobile Optimization

The website features comprehensive mobile optimization:
- **Dedicated Mobile Components**: Separate components for mobile layouts
- **Touch Gestures**: Custom touch event handling for interactive elements
- **Responsive Images**: Optimized image loading with lazy loading
- **Mobile Navigation**: Smooth hamburger menu with touch-friendly interactions

## 🎨 Design System

### **Color Scheme**
- Primary background: Black (`#000000`)
- Secondary background: Dark gray (`#1F1F1F`)
- Text: Light gray (`#D1D5DB`)
- Accent: Green (`#5ABA52`, `#74CFE6`, `#F9BB18`)

### **Typography**
- Headers: Arial Black for impact
- Body: System fonts for readability
- Mobile: SF Pro Display for iOS optimization

## 🌐 Deployment

The site is configured for Vercel deployment with:
- **SPA Routing**: All routes redirect to index for client-side routing
- **Build Optimization**: Vite optimizations for production
- **Asset Optimization**: Lazy loading and performance optimizations

### **Deployment Configuration**
```json
{
  "rewrites": [
    {"source": "/(.*)", "destination": "/"}
  ]
}
```

## 📦 Key Dependencies

### **Core Framework**
- `react` & `react-dom` - React framework
- `typescript` - Type safety
- `vite` - Build tool

### **Styling & UI**
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Headless UI components
- `lucide-react` - Icon library

### **Animations**
- `framer-motion` - React animation library
- `gsap` - Advanced animations
- `embla-carousel-react` - Carousel component

### **Utilities**
- `react-responsive` - Responsive design hooks
- `@emailjs/browser` - Email functionality
- `react-helmet` - SEO meta tags

## 🔧 Recent Updates

### **Enhanced Mobile Experience**
- Added dedicated mobile components for better touch interaction
- Implemented custom touch gesture handling
- Optimized mobile navigation with smooth animations

### **Advanced Animations**
- Integrated GSAP for complex animations
- Added parallax scrolling effects
- Implemented scroll-based interactions

### **Performance Optimizations**
- Lazy loading for components and images
- Code splitting with React.lazy()
- Optimized asset loading

### **Interactive Features**
- Contact form with real-time validation
- Smooth scroll navigation
- Keyboard accessibility support

## 📄 License

© 2025 Puviyan Digital Solutions Private Limited. All rights reserved.

## 🤝 Contributing

This is a private project for Puviyan Digital Solutions. For any inquiries or suggestions, please contact the development team.

---

**Built with ❤️ by Puviyan Digital Solutions**