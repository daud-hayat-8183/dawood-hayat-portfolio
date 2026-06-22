export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullNarrative: {
    question: string;
    challenge: string;
    method: string;
    solution: string;
    learnings: string[];
  };
  tags: string[];
  imageAlt: string;
  imageUrl?: string;
  ratingValue?: number; // for IMDb predictor
  link?: string;
  githubUrl?: string;
  demoUrl?: string;
  externalActionLabel?: string;
  metrics?: { label: string; value: string }[];
}

export const profile = {
  name: "Muhammad Dawood Hayat",
  displayName: "Dawood Hayat",
  role: "Business Data Analyst & Digital Product Builder",
  location: "Islamabad, Pakistan",
  university: "COMSATS University Islamabad",
  email: "daudhayat51@gmail.com",
  phoneE164: "+923295129250",
  whatsappUrl: "https://wa.me/923295129250?text=Hi%20Dawood%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20data%2C%20finance%2C%20FinTech%2C%20or%20web%20project.",
  githubUrl: "https://github.com/daud-hayat-8183",
  linkedinUrl: "https://www.linkedin.com/in/dawoodhayat/",
  resumePath: "/Dawood-Hayat-Resume.pdf",
};

export const capabilityCategories = [
  {
    title: "Data & Analytics",
    icon: "analytics",
    items: [
      "Data Cleaning & Preparation",
      "Exploratory Data Analysis",
      "Data Visualization",
      "Predictive Modeling",
      "Insight & Storytelling"
    ]
  },
  {
    title: "Business & Finance",
    icon: "attach_money",
    items: [
      "Financial Statement Analysis",
      "Ratio & Trend Analysis",
      "Valuation & Forecasting",
      "Business Strategy",
      "Market & Industry Research"
    ]
  },
  {
    title: "Databases & Systems",
    icon: "database",
    items: [
      "Oracle SQL & PL/SQL",
      "Database Design",
      "Query Optimization",
      "ERP System Development",
      "Data Management"
    ]
  },
  {
    title: "Product & Web Dev",
    icon: "code",
    items: [
      "Web Application Development",
      "Interactive Dashboards",
      "API Integration",
      "UI/UX Implementation",
      "Product Prototyping"
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "financial-health-risk-return-analysis",
    title: "Financial Analysis: Safe Mix Concrete vs Thatta Cement",
    category: "Financial Analytics",
    description: "Comparative financial performance analysis using ratio analysis, trend evaluation and valuation metrics.",
    imageAlt: "A clean, light-mode dashboard showing financial analysis charts for Safe Mix Concrete and Thatta Cement. The UI is minimalist, using white glassmorphism panels, soft green accents, and precise editorial typography. The charts display comparative bar graphs and line trends.",
    imageUrl: "/financial-analysis.png",
    githubUrl: "https://github.com/daud-hayat-8183/Financial-Analysis-SafeMix-ThattaCement",
    externalActionLabel: "View Repository",
    tags: ["Ratio Analysis", "Stock Analysis", "Excel", "Finance"],
    metrics: [
      { label: "Analyzed Years", value: "2023 - 2025" },
      { label: "Comparative KPIs", value: "15+ Ratios" },
      { label: "Data Modeling", value: "Excel Workbook" }
    ],
    fullNarrative: {
      question: "How do Safe Mix Concrete and Thatta Cement compare in financial strength, operating efficiency, leverage risk, and market return performance?",
      challenge: "Aggregating scattered annual reports, extracting common-size statement elements, correcting different reporting periods, and computing stock beta values to accurately characterize volatility risk in Pakistan's construction sector.",
      method: "Performed common-size statement parsing, calculated index metrics, evaluated liquidity, solvency, activity, productivity, profitability ratios, and executed stock returns variance/covariance analysis extending to 2026 data points.",
      solution: "Developed an elegant, formula-grounded interactive financial model illustrating Thatta Cement's dominant solvency stance alongside Safe Mix Concrete's high responsiveness, offering clear recommendations to investors.",
      learnings: [
        "Identified how market pricing lags behind core activity metrics",
        "Synthesized raw asset turn and leverage counts into business credit ratings",
        "Refined the correlation structure of Pakistan stock indices against construction leaders"
      ]
    }
  },
  {
    id: "imdb-movie-success-predictor",
    title: "IMDb Movie Success Predictor",
    category: "Data Science",
    description: "Machine Learning model to predict whether a movie will be a hit or flop based on core features using classification and regression.",
    imageAlt: "A sleek, modern web application interface for an IMDb Movie Success Predictor. The design features a translucent glass-like data entry form over a very soft, blurred cinematic background. A prominent 'Prediction: Will be a HIT' result is visible in green.",
    imageUrl: "/imdb-predictor.png",
    githubUrl: "https://github.com/daud-hayat-8183/imdb-business-data-analytics",
    externalActionLabel: "View Repository",
    tags: ["Python", "Logistic Regression", "Classification", "Streamlit"],
    metrics: [
      { label: "Model Type", value: "Logistic Regression" },
      { label: "Success threshold", value: "IMDb rating >= 7.0" },
      { label: "Features", value: "Budget, Genre, Cast, Runtime" }
    ],
    fullNarrative: {
      question: "Can we predict if a film will succeed on IMDb before wide theatrical release based purely on pre-release attributes?",
      challenge: "Handling extreme outliers in box office and budget data, resolving raw messy text categories (directors, stars, genres), and training model classification equations without causing bias towards hyper-inflated blockbusters.",
      method: "Created a full machine learning flow from scratch: cleaning missing rows, engineering novel features, scaling numeric distributions, and deploying mathematical models in interactive pipelines using Streamlit.",
      solution: "Achieved strong cross-validation precision, identifying budget-to-runtime multipliers and genre success probabilities, wrapped in an exquisite interface giving real-time score indicators.",
      learnings: [
        "Recognized that runtime has a non-linear sweet-spot for rating curves",
        "Improved pre-processing scripts to filter rare directors gracefully",
        "Discovered that genre combination weights heavily modify baseline risk factors"
      ]
    }
  },
  {
    id: "solar-system-explorer",
    title: "Solar System Explorer (Cosmos Explorers)",
    category: "Interactive Web Product",
    description: "Interactive web app to explore planets, facts, and space data with immersive visual elements and an AI tutor.",
    imageAlt: "A visually striking dark-mode interactive web application titled 'Explore the Solar System'. The screen shows 3D models of planets floating in a dark, starry void, juxtaposed against crisp white text and minimalist control panels, fitting the high-end digital product vibe.",
    imageUrl: "/solar-system.png",
    demoUrl: "https://daud-hayat-8183.github.io/solar-system-explorer/",
    externalActionLabel: "Visit Live Website",
    tags: ["React", "TypeScript", "Express", "Interactive"],
    metrics: [
      { label: "Framework", value: "React 19 & TS" },
      { label: "AI Integration", value: "Gemini 2.4 SDK" },
      { label: "Architecture", value: "Modular Frontend" }
    ],
    fullNarrative: {
      question: "How can we transform static astronomical datasets into an engaging, interactive canvas that children and student astronomers love?",
      challenge: "Calculating accurate scaled orbital ratios for web layout viewing without losing the aesthetic appeal of individual planets, managing interactive canvas event loops, and feeding context to prompt templates securely.",
      method: "Designed responsive coordinate calculations and fluid UI modules using custom CSS variables, integrated the @google/genai Node API client, and set up fluid orbit speed modifiers.",
      solution: "Created an exquisite educational system displaying immersive orbit maps, comparison tools, game quizzes, and an AI Space Coach powered by server-proxied intelligence.",
      learnings: [
        "Synthesized custom SVG canvases to render orbits efficiently in real time",
        "Designed context-isolated prompts to generate strictly structured science quizzes",
        "Refined state systems to handle rapid layout transitions with high frame rates"
      ]
    }
  }
];

export const processSteps = [
  {
    step: "01",
    label: "Understand",
    sub: "Define the problem, objectives and success criteria."
  },
  {
    step: "02",
    label: "Collect",
    sub: "Gather relevant data from reliable sources."
  },
  {
    step: "03",
    label: "Clean & Prep",
    sub: "Clean, validate and structure data for analysis."
  },
  {
    step: "04",
    label: "Analyze",
    sub: "Explore patterns and derive meaningful insights."
  },
  {
    step: "05",
    label: "Model & Visualize",
    sub: "Build models and create clear visualizations."
  },
  {
    step: "06",
    label: "Build & Deliver",
    sub: "Build products and deliver solutions that create impact."
  }
];
