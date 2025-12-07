# 🚀 Savvan Rahul's Portfolio
🔗 **Live Demo**: [savvan-rahul.tech](https://www.savvan-rahul.tech)

A cutting-edge, interactive portfolio website built with React and modern web technologies. Features stunning animations, real-time NASA data integration, and a futuristic design that showcases technical skills and creativity.

![Portfolio Preview](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-0.180.0-000000?style=for-the-badge&logo=three.js)

## ✨ Features

### 🎨 **Interactive Design**
- **3D Animations** - Three.js powered 3D globe and interactive elements
- **Liquid Ether Effects** - Dynamic liquid animations in hero section
- **Hyperspeed Background** - Futuristic speed effects in projects section
- **Electric Borders** - Animated electric border effects
- **Pixel Trail Effects** - Interactive cursor trails and animations
- **Blob Cursor** - Custom animated cursor with blob effects

### 🛠️ **Technical Excellence**
- **Performance Optimized** - Lazy loading, image preloading, and caching
- **Progressive Loading** - Components load as user scrolls
- **Error Boundaries** - Robust error handling with reload functionality
- **Mobile Responsive** - Optimized for all device sizes
- **SEO Friendly** - Proper meta tags and semantic HTML

### 🎯 **Sections**
1. **Hero Section** - Animated introduction with liquid effects
2. **Skills** - Interactive skill showcase with fuzzy text effects
3. **Projects** - 3D project cards with hyperspeed backgrounds
4. **NASA Live** - Real-time space imagery and satellite data
5. **Contact** - Interactive contact form with 3D globe
6. **Footer** - Social links with laser flow effects

### 🌍 **NASA Live Integration**
- **Real-time Earth Images** - EPIC satellite imagery from NASA's DSCOVR
- **Live Sun Data** - Solar Dynamics Observatory (SDO) images
- **Satellite Views** - Auto-shuffling satellite imagery every 2 seconds
- **Daily Updates** - Fresh NASA data updated daily
- **Placeholder System** - Smooth loading with Earth/Sun placeholders


## 🚀 Tech Stack

### **Frontend Framework**
- **React 19.1.1** - Latest React with concurrent features
- **Vite 7.1.7** - Lightning-fast build tool
- **TypeScript** - Type-safe development

### **Styling & Animation**
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **GSAP 3.13.0** - Professional-grade animations
- **Framer Motion** - React animation library
- **Three.js 0.180.0** - 3D graphics and animations

### **UI Components**
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Tabler Icons** - Additional icon set
- **Shadcn/ui** - Modern component library

### **3D & Graphics**
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Three Globe** - 3D globe visualization
- **Postprocessing** - Advanced visual effects

### **Performance & Optimization**
- **Lazy Loading** - Code splitting for optimal performance
- **Image Preloading** - Critical resource optimization
- **Debouncing & Throttling** - Performance utilities
- **Memory Management** - Efficient resource handling

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/RahulDev-01/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

### Development
```bash
# Start development server with hot reload
npm run dev

# Lint code
npm run lint

# Build optimized production bundle
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

## 🏗️ Project Structure

```
portfolio/
├── public/
│   ├── FavIcon.png          # Custom favicon
│   ├── profile.jpg          # Profile image
│   ├── Logos/               # Technology logos
│   ├── NasaPhotos/          # NASA placeholder images
│   ├── Projects/            # Project screenshots
│   └── Savvan_Rahul_Resume.pdf
├── src/
│   ├── Components/
│   │   ├── Header/          # Navigation header
│   │   ├── HeroSection/     # Landing section
│   │   ├── Footer/          # Footer with social links
│   │   ├── NasaLive/        # NASA data integration
│   │   └── ui/              # Reusable UI components
│   ├── Skills/              # Skills showcase
│   ├── Projects/             # Projects display
│   ├── ContactMe/           # Contact form
│   ├── utils/               # Performance utilities
│   └── lib/                 # Utility functions
├── data/
│   └── globe.json           # Globe data for 3D visualization
└── package.json
```

## 🎨 Key Components

### **HeroSection**
- Liquid ether animations
- Variable proximity effects
- Split text animations
- Typewriter effects

### **Skills**
- Fuzzy text effects
- Interactive skill cards
- Technology logos showcase
- Smooth hover animations

### **Projects**
- 3D project cards
- Hyperspeed background effects
- Pixel trail animations
- Link previews

### **NasaLive**
- Real-time NASA API integration
- EPIC Earth imagery
- SDO Sun data
- Auto-shuffling satellite views
- Caching and error handling

### **ContactMe**
- Interactive 3D globe
- Electric border effects
- Blob cursor animations
- Form validation

## 🔧 Customization

### **Colors & Themes**
Update the color scheme in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#06b6d4',
        accent: '#00d9ff'
      }
    }
  }
}
```

### **NASA API**
Replace the NASA API key in `NasaLive.jsx`:
```javascript
const NasaLive = lazy(() => import('./Components/NasaLive/NasaLive'))

// In your component
<NasaLive apiKey="your_nasa_api_key" />
```

### **Personal Information**
Update personal details in:
- `src/Components/HeroSection/HeroSection.jsx`
- `src/ContactMe/ContactMe.jsx`
- `src/Components/Footer/Footer.jsx`

## 🚀 Performance Features

- **Lazy Loading** - Components load on demand
- **Image Optimization** - Preloading and compression
- **Code Splitting** - Reduced initial bundle size
- **Caching** - NASA data caching for better performance
- **Error Boundaries** - Graceful error handling
- **Memory Management** - Efficient resource cleanup

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Responsive breakpoints
- **Desktop Enhanced** - Full desktop experience
- **Touch Friendly** - Mobile gesture support

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Savvan Rahul S**
- Email: s.rahul5116@gmail.com
- LinkedIn: [linkedin.com/in/s-rahul-885613312](https://www.linkedin.com/in/s-rahul-885613312/)
- GitHub: [github.com/RahulDev-01](https://github.com/RahulDev-01)

## 🙏 Acknowledgments

- NASA for providing free APIs for space data
- Three.js community for amazing 3D libraries
- React team for the excellent framework
- Tailwind CSS for the utility-first approach
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**

