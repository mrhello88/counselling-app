import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
// import { useTheme } from 'next-themes'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

const counselors = [
  {
    name: "Dr. Emily Johnson",
    specialization: "Academic Counseling",
    experience: 12,
    rating: 4.9,
    clientsHelped: 500,
    imageUrl: "/placeholder.svg?height=300&width=400",
    bio: "Dr. Emily Johnson specializes in helping students navigate their academic journey and make informed decisions about their educational path.",
  },
  {
    name: "Michael Chen",
    specialization: "Career Guidance",
    experience: 8,
    rating: 4.7,
    clientsHelped: 350,
    imageUrl: "/placeholder.svg?height=300&width=400",
    bio: "Michael Chen is passionate about assisting students in exploring career options and developing strategies for professional success.",
  },
  {
    name: "Sarah Patel",
    specialization: "Mental Health Support",
    experience: 10,
    rating: 4.8,
    clientsHelped: 400,
    imageUrl: "/placeholder.svg?height=300&width=400",
    bio: "Sarah Patel provides compassionate mental health support to help students thrive both academically and personally.",
  },
];

const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-md bg-white dark:bg-gray-800 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const Button = ({ children, onClick, variant = "outline", className }) => {
  const baseStyle = `px-4 py-2 rounded-md focus:outline-none transition-all duration-200`;
  const variantStyle =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
      : "bg-primary text-white"; // Modify variants as needed

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ children, className, variant = "secondary" }) => {
  const baseStyle = `px-2 py-1 text-xs font-semibold rounded-full`;
  const variantStyle =
    variant === "secondary"
      ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      : "bg-primary text-white"; // Modify variants as needed

  return <span className={`${baseStyle} ${variantStyle} ${className}`}>{children}</span>;
};

function EnhancedDottedGlobe({ isDark = false }) {
  const dotColor = isDark ? "#ffffff" : "#000000";
  const orbitColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";

  const generateDots = (count, radius) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      dots.push(<circle key={i} cx={x} cy={y} r="0.5" fill={dotColor} />);
    }
    return dots;
  };

  return (
    <motion.div
      className="w-80 h-80 relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="-50 -50 100 100" className="w-full h-full">
        <defs>
          <radialGradient
            id="globe-gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop
              offset="0%"
              stopColor={isDark ? "#4338ca" : "#60a5fa"}
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#312e81" : "#3b82f6"}
              stopOpacity="0.2"
            />
          </radialGradient>
        </defs>
        <circle r="49" fill="url(#globe-gradient)" />
        <motion.g
          animate={{ rotateY: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {generateDots(60, 45)}
          <circle r="45" fill="none" stroke={orbitColor} strokeWidth="0.2" />
        </motion.g>
        <motion.g
          animate={{ rotateX: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {generateDots(50, 35)}
          <circle r="35" fill="none" stroke={orbitColor} strokeWidth="0.2" />
        </motion.g>
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {generateDots(40, 25)}
          <circle r="25" fill="none" stroke={orbitColor} strokeWidth="0.2" />
        </motion.g>
        <motion.g
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {generateDots(30, 15)}
          <circle r="15" fill="none" stroke={orbitColor} strokeWidth="0.2" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

function CounselorCard({ counselor }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  const handleError = (e) => {
    e.target.src = "/fallback-image.png"; // Fallback image path
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-primary/5 to-primary/20 dark:from-primary-dark/5 dark:to-primary-dark/20">
        <CardContent className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img
              src={counselor.imageUrl}
              alt={`${counselor.name}, Counselor`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={handleError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <motion.div
              className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {counselor.name}
                </h3>
                <Badge className="bg-primary/80 text-primary-foreground">
                  {counselor.specialization}
                </Badge>
              </div>
              <div className="flex items-center bg-primary/80 text-primary-foreground px-2 py-1 rounded-full">
                <span className="font-bold">{counselor.rating.toFixed(1)}</span>
              </div>
            </motion.div>
          </div>
          <div className="p-4">
            <motion.div
              className="flex justify-between items-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {counselor.experience} years exp.
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {counselor.clientsHelped}+ clients
                </span>
              </div>
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    {counselor.bio}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Read More
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function WavyLine({ color = "currentColor" }) {
  return (
    <svg
      className="w-full h-24 -mt-1"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.7)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.7)" />
          <stop offset="100%" stopColor="rgba(37, 99, 235, 0.7)" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#wave-gradient)"
        fillOpacity="1"
        initial={{
          d: "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
        }}
        animate={{
          d: [
            "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
            "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
            "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
          ],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      ></motion.path>
    </svg>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-lg"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-20 h-20 border-4 border-primary/30 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme state

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <div
        className={`flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${theme}`}
      >
        <header className="bg-gradient-to-r from-primary to-primary-dark text-white py-2 px-4 relative">
          <FloatingShapes />
          <div className="container mx-auto flex justify-between items-center relative z-10">
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-secondary transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-secondary transition-colors"
                title="Follow us on Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-secondary transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-secondary transition-colors"
                title="Connect with us on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:info@studentcounseling.com"
                className="flex items-center hover:text-secondary transition-colors"
              >
                <Mail size={18} className="mr-2" />
                info@studentcounseling.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center hover:text-secondary transition-colors"
              >
                <Phone size={18} className="mr-2" />
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </header>
        <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-4 sticky top-0 z-10 transition-colors duration-300">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-primary dark:text-white"
            >
              StudentCounsel
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/counselors"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Counselors
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-md py-4 px-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/counselors"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Counselors
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-primary to-primary-light dark:from-primary-dark dark:to-primary text-white py-20 relative overflow-hidden transition-colors duration-300">
            <FloatingShapes />
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Path to Success Starts Here
                  </h1>
                  <p className="text-xl mb-8">
                    Get personalized education and career counseling to unlock
                    your full potential.
                  </p>
                  <div>
                    <button className="inline-block mr-4 bg-white text-primary hover:bg-secondary hover:text-white transition-colors duration-300">
                      Get Started
                    </button>
                    <button className="inline-block text-white border-white hover:bg-white hover:text-primary transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <EnhancedDottedGlobe />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-white dark:text-gray-800">
              <WavyLine />
            </div>
          </section>

          <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
                Our Expert Counselors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Map through counselors data here */}
                {counselors.map((counselor, index) => (
                  <CounselorCard key={index} counselor={counselor} />
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary to-primary-dark dark:from-primary-dark dark:to-primary text-white py-20 relative transition-colors duration-300">
            <FloatingShapes />
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-8">
                Ready to Take the Next Step?
              </h2>
              <p className="text-xl mb-8">
                Book a session with one of our expert counselors and start your
                journey to success.
              </p>
              <button className="bg-white text-primary hover:bg-secondary hover:text-white transition-colors duration-300">
                Book a Session
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
