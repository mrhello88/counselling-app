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
import { useAuth } from "../context/Context";
import { LoadingOverlay } from "../components/Loading/Loading";

const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-md bg-gray-800 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const Button = ({ children, onClick, variant = "outline", className }) => {
  const baseStyle = `px-4 py-2 rounded-md focus:outline-none transition-all  duration-200`;
  const variantStyle =
    variant === "outline"
      ? " text-gray-700  dark:text-gray-300"
      : "bg-primary text-white"; // Modify variants as needed

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
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

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </span>
  );
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
  // rotating circle
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
              stopColor={isDark ? "#000000" : "#000000"}
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#000000" : "#FACC15"}
              stopOpacity="0.7"
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
          <div className="relative h-48 overflow-hidden text-white">
            <img
              src={`http://localhost:3000/images/${counselor.profile}`}
              alt={`${counselor.personalInfo.name}, Counselor`}
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
                  {counselor.personalInfo.name}
                </h3>
                <Badge className="bg-primary/80 text-primary-foreground  text-white">
                  {counselor.counselor.education.category}
                </Badge>
              </div>
              <div className="flex items-center bg-primary/80 text-primary-foreground px-2 py-1 rounded-full">
                <span className="font-bold">4.6</span>
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
              <div className="flex items-center text-white">
                <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground  ">
                  {counselor.counselor.education.experience} exp.
                </span>
              </div>
              <div className="flex items-center text-white">
                <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {counselor.friends.length}+ clients
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
                  <p className="text-sm text-muted-foreground mb-4 text-white">
                    {counselor.counselor.education.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full border border-secondary"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2 " />
                    <span className="text-secondary hover:text-white hover:scale-105 text-lg duration-150">
                      Show Less
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2 " />
                    <span className="text-secondary hover:text-white hover:scale-105 text-lg duration-300">
                      {" "}
                      Read More
                    </span>
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
      className="w-full h-20 -mt-1"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#FACC15" />
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
        className="absolute top-32 left-52 w-16 h-16 bg-secondary rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-80 right-16 w-24 h-24 bg-secondary rounded-lg"
        animate={{
          y: [0, 50, 0],
          x: [0, 0, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-96 w-20 h-20 border-4 border-secondary  rounded-full"
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
  // const { isLoggedIn, LogoutUser} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme state

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  // const { getCounselors, fetchData, apiLoading } = useAuth();
  const { fetchData, apiLoading, isLoggedIn} = useAuth();
  // Dummy data for counselors

  const [counselors, setCounselors] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `http://localhost:3000/counselors`
        );
        if (responseData.success) {
          setCounselors(responseData.data || []);
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while counselors list");
      }
    };
    fetchingData();
  }, [fetchData, isLoggedIn]);

  if (apiLoading) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <div
        className={`flex flex-col w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${theme}`}
      >
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
            <div className="container mx-auto pt-32 px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 pb-32 md:mb-0">
                  <h1 className="text-3xl md:text-4xl font-bold mb-6">
                    Your Path to{" "}
                    <span className="text-5xl font-bold text-secondary">
                      Success
                    </span>{" "}
                    Starts Here.
                  </h1>
                  <p className="text-xl mb-8">
                    Get personalized education and career counseling to unlock
                    your full potential.
                  </p>
                  <div>
                    <button className=" hover:scale-110 py-4 px-6 text-2xl font-bold rounded-md inline-block mr-4 text-primary bg-secondary hover:bg-secondary hover:text-white transition-colors duration-300">
                      Get Started
                    </button>
                    <button className="hover:scale-110 py-4 px-6 text-2xl font-bold rounded-md inline-block  bg-primary hover:text-secondary transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2 -mt-44 flex justify-center">
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
                {counselors?.map((counselor, index) => (
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
              <button className=" hover:scale-110 py-4 px-6 text-2xl font-bold rounded-md inline-block mr-4 text-primary bg-secondary hover:bg-secondary hover:text-white transition-colors duration-300">
                Book a Session
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
