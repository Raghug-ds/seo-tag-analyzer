# SEO Meta Tag Analyzer

<div align="center">
  
  ![SEO Meta Tag Analyzer](https://img.shields.io/badge/SEO-Meta%20Tag%20Analyzer-5E72E4)
  ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
  ![License](https://img.shields.io/badge/license-MIT-green.svg)
  
</div>

<p align="center">
  A powerful tool for analyzing and validating SEO meta tags from any website, providing comprehensive insights and recommendations for optimization.
</p>

<div align="center">
  <img src="./attached_assets/Screenshot 2025-03-30 at 9.43.23 PM.png" alt="SEO Meta Tag Analyzer Landing Page" width="85%" />
</div>

## ✨ Features

- **Instant SEO Analysis** - Extract and analyze meta tags from any website URL
- **Comprehensive Evaluation** - Score and validate essential SEO elements 
- **Visual Preview** - See how your site appears in Google, Facebook, and Twitter search results
- **Beginner-Friendly Insights** - Get plain-language explanations of SEO concepts
- **Actionable Recommendations** - Receive specific suggestions to improve your SEO
- **Mobile & Desktop Ready** - Fully responsive design for all devices
- **Shareable Results** - Export or share analysis results with others

## 📋 How It Works

1. **Enter a URL** - Simply input any website URL for analysis
2. **Instant Analysis** - The application scans the site's HTML and extracts all meta tags
3. **Comprehensive Report** - View detailed results with validation status and scores
4. **Optimization Insights** - Get practical recommendations to improve your SEO

## 🔍 What's Analyzed

The SEO Meta Tag Analyzer evaluates:

- **Essential Meta Tags**
  - Title and description tags
  - Canonical URLs
  - Robots directives
  - Language settings
  - Viewport configuration

- **Social Media Tags**
  - Open Graph (Facebook) tags
  - Twitter Card tags
  - Social media images and descriptions

- **Structured Data & Other Tags**
  - Schema.org markup
  - Favicon
  - Additional HTML head elements

## 🛠️ Technical Details

The SEO Meta Tag Analyzer is built with:

- **Frontend**: React.js with TypeScript and Tailwind CSS
- **UI Components**: Shadcn/UI
- **Backend**: Node.js with Express
- **HTML Parsing**: Cheerio
- **Data Visualization**: Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/seo-meta-tag-analyzer.git
   cd seo-meta-tag-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

### Running Locally

To run this project on your local machine:

1. Make sure you have Node.js installed (v16.0 or newer)

2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/seo-meta-tag-analyzer.git
   ```

3. Navigate to the project directory:
   ```bash
   cd seo-meta-tag-analyzer
   ```

4. Install the dependencies:
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - React and React DOM
   - Express
   - TypeScript
   - Tailwind CSS
   - Shadcn/UI components
   - Axios for HTTP requests
   - Cheerio for HTML parsing
   - Recharts for data visualization
   - Drizzle ORM
   - Zod for validation

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The application will be available at:
   ```
   http://localhost:5000
   ```

7. For production build:
   ```bash
   npm run build
   npm start
   ```



## 📝 Usage Examples

### Basic Analysis

1. Enter a URL (e.g., `example.com` or `https://example.com`)
2. Click "Analyze" to get instant results
3. Browse through the different sections to review your SEO performance

<div align="center">
  <img src="./attached_assets/Screenshot 2025-03-30 at 9.42.55 PM.png" alt="SEO Meta Tag Analysis Results" width="85%" />
</div>

### Understanding the Score

- **90-100**: Excellent SEO implementation
- **70-89**: Good SEO with minor improvements needed
- **50-69**: Average SEO requiring attention
- **Below 50**: Poor SEO needing significant improvements

### Sharing Results

Use the "Share" button to create a shareable link or "Export" to download the analysis as JSON.

## 🧩 Project Structure

```
seo-meta-tag-analyzer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript type definitions
├── server/                 # Backend Node.js application
│   ├── services/           # Server-side services
│   └── routes.ts           # API routes
├── shared/                 # Shared code between client and server
└── README.md               # Project documentation
```

## 🧪 Planned Features

- **Historical Analysis** - Track SEO changes over time
- **Bulk URL Analysis** - Process multiple URLs in batch
- **PDF Reports** - Generate downloadable PDF reports
- **Competitor Analysis** - Compare SEO with competitor websites
- **Advanced SEO Metrics** - Page speed, mobile-friendliness, and more

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions or suggestions, please open an issue or contact the maintainer at example@example.com.

---

<p align="center">
  Made with ❤️ for SEO enthusiasts and web developers everywhere
</p>