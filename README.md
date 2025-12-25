# 🏡 LuxeEstate - Modern Real Estate Website

A beautiful, modern real estate website built with Next.js 15, Sanity CMS, TypeScript, and Tailwind CSS. Features a powerful admin panel for managing properties, agents, and testimonials with real-time updates.

![Real Estate Website](https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80)

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion and CSS animations
- **Gradient Effects**: Beautiful gradient text and backgrounds
- **Glass Morphism**: Modern glass effects on components
- **Hero Section**: Eye-catching hero with search functionality
- **Interactive Cards**: Hover effects and transitions

### 🏠 Property Management
- **Dynamic Properties**: Add/edit/delete properties via admin panel
- **Image Galleries**: Multiple images per property with hotspot support
- **Advanced Filtering**: Filter by type, status, price, etc.
- **Property Details**: Comprehensive property information pages
- **Amenities**: Customizable amenities and features
- **Specifications**: Bedrooms, bathrooms, area, year built, etc.

### 👨‍💼 Agent Management
- **Agent Profiles**: Detailed agent information
- **Contact Information**: Phone, email, and social media links
- **Property Assignments**: Link agents to properties
- **Years of Experience**: Showcase agent expertise

### 💬 Testimonials
- **Client Reviews**: Display customer testimonials
- **Star Ratings**: 5-star rating system
- **Featured Testimonials**: Highlight best reviews
- **Property Links**: Connect testimonials to properties

### 🎯 Admin Panel (Sanity Studio)
- **Embedded Studio**: Admin panel at `/studio`
- **Real-time Preview**: Live content updates
- **Image Management**: Upload and manage property images
- **Content Validation**: Ensure data quality
- **Custom Structure**: Organized content management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm
- A Sanity account (free at [sanity.io](https://sanity.io))

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd /tmp/realestate-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

   The project is already configured to use your Sanity project:
   - **Project ID**: `38fw45r3`
   - **Dataset**: `production`

   Update `.env.local` with your tokens:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=38fw45r3
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your-read-token-here
   SANITY_API_WRITE_TOKEN=your-write-token-here
   SANITY_REVALIDATE_SECRET=your-secret-key-here
   ```

4. **Get your Sanity API tokens**
   
   Go to [sanity.io/manage](https://sanity.io/manage), select your project, and:
   - Navigate to **API** → **Tokens**
   - Create a **Read** token (for `SANITY_API_READ_TOKEN`)
   - Create a **Write** token (for `SANITY_API_WRITE_TOKEN`) if needed
   - Generate a random string for `SANITY_REVALIDATE_SECRET`

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the website.
   
   Access the admin panel at [http://localhost:3000/studio](http://localhost:3000/studio)

## 📁 Project Structure

```
realestate-website/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Global styles
│   │   ├── properties/          # Properties pages
│   │   │   ├── page.tsx         # Properties listing
│   │   │   └── [slug]/page.tsx  # Property details
│   │   ├── contact/page.tsx     # Contact page
│   │   └── studio/[[...tool]]/  # Embedded Sanity Studio
│   │       └── page.tsx
│   ├── components/              # React components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Stats.tsx           # Statistics section
│   │   ├── FeaturedProperties.tsx
│   │   ├── PropertiesGrid.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx             # Call-to-action
│   └── sanity/                  # Sanity configuration
│       ├── lib/
│       │   ├── client.ts       # Sanity client
│       │   ├── image.ts        # Image URL builder
│       │   ├── live.ts         # Live preview setup
│       │   └── queries.ts      # GROQ queries
│       └── schemaTypes/        # Content schemas
│           ├── property.ts
│           ├── agent.ts
│           ├── testimonial.ts
│           └── index.ts
├── sanity.config.ts            # Sanity configuration
├── tailwind.config.ts          # Tailwind CSS config
├── next.config.ts              # Next.js config
└── package.json
```

## 🎨 Design Features

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Accent**: Purple (#764ba2)
- **Background**: White with gray accents
- **Text**: Gray-900 for headings, Gray-600 for body

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes (text-4xl to text-6xl)
- **Body**: Regular weight, comfortable reading size

### Components
- **Cards**: Rounded corners, shadows, hover effects
- **Buttons**: Gradient backgrounds, transitions
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with shadow

## 📝 Content Management

### Adding Properties

1. Go to [http://localhost:3000/studio](http://localhost:3000/studio)
2. Click **Properties** → **Create new Property**
3. Fill in the details:
   - **Title**: Property name
   - **Slug**: Auto-generated URL-friendly slug
   - **Property Type**: House, Apartment, Villa, etc.
   - **Status**: For Sale or For Rent
   - **Price**: Numeric value
   - **Main Image**: Upload featured image
   - **Gallery**: Add multiple images
   - **Description**: Detailed property description
   - **Address**: Full address details
   - **Specifications**: Beds, baths, area, etc.
   - **Amenities**: Select from predefined list
   - **Agent**: Link to an agent (optional)
4. Click **Publish** to make it live

### Adding Agents

1. In Sanity Studio, click **Agents** → **Create new Agent**
2. Add agent details:
   - Name, title, profile image
   - Bio and contact information
   - Social media links
3. Publish the agent profile

### Adding Testimonials

1. Click **Testimonials** → **Create new Testimonial**
2. Add:
   - Client name and photo
   - Testimonial content
   - Rating (1-5 stars)
   - Link to property (optional)
   - Mark as featured to display on homepage
3. Publish the testimonial

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy!

3. **Configure CORS in Sanity**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project → **API** → **CORS Origins**
   - Add your Vercel domain (e.g., `https://your-site.vercel.app`)

### Other Deployment Options

- **Netlify**: Similar process to Vercel
- **Self-hosted**: Build with `npm run build` and deploy the `.next` folder

## 🔧 Customization

### Changing Images

The project uses placeholder images from Unsplash. You can:

1. **Via Sanity Studio**: Upload your own images through the admin panel
2. **Update Hero Background**: Edit `src/components/Hero.tsx`, line with `backgroundImage`
3. **Default Images**: All images are stored in Sanity and can be changed anytime

### Modifying Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your custom color palette
    500: '#your-color',
    600: '#your-darker-color',
  }
}
```

### Adding New Property Types

Edit `src/sanity/schemaTypes/property.ts`:
```typescript
propertyType: {
  options: {
    list: [
      // Add your new types here
      { title: 'New Type', value: 'newtype' }
    ]
  }
}
```

## 📚 Technologies Used

- **[Next.js 15](https://nextjs.org/)**: React framework with App Router
- **[Sanity CMS](https://www.sanity.io/)**: Headless CMS for content management
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Lucide Icons](https://lucide.dev/)**: Beautiful icon library
- **[Framer Motion](https://www.framer.com/motion/)**: Animation library

## 🤝 Support

For issues or questions:
- Check the [Sanity documentation](https://www.sanity.io/docs)
- Review [Next.js documentation](https://nextjs.org/docs)
- Open an issue in the repository

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Next.js and Sanity**
