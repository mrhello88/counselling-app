import { Link } from "react-router-dom";
import { EnhancedDottedGlobe, FloatingShapes, WavyLine } from "./HomePage"; // Import FloatingShapes and WavyLine

export const AboutUs = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary to-primary-light dark:from-primary-dark dark:to-primary text-white py-32 relative overflow-hidden transition-colors duration-300">
          <FloatingShapes />
          <div className="container mx-auto pt-32 px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 pb-32 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  About Us
                </h1>
                <p className="text-xl mb-8">
                  We are dedicated to providing personalized education and
                  career counseling to help you unlock your full potential. Our
                  team of experienced counselors is here to guide you every step
                  of the way.
                </p>
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

        <section className="bg-gray-200 text-gray-800 py-48 relative px-4">
          <FloatingShapes />
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    <span className="text-5xl font-bold text-secondary">
                      Students
                    </span>
                  </h2>
                  <p className="text-lg leading-relaxed text-center mb-6">
                    Join our platform to receive personalized guidance and
                    support tailored to your educational and career aspirations.
                    Our dedicated counselors are committed to helping you
                    achieve your goals and unlock your full potential.
                  </p>
                </div>
                <Link
                  to="/login/student"
                  className="w-full md:w-auto mt-8 mx-auto hover:scale-110 py-4 px-6 text-xl md:text-2xl font-bold rounded-md text-primary bg-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
              </div>
              <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    <span className="text-5xl font-bold text-secondary">
                      Counselors
                    </span>
                  </h2>
                  <p className="text-lg leading-relaxed text-center mb-6">
                    Become a part of our mission to empower individuals through
                    education and career counseling. Share your expertise,
                    connect with students, and make a lasting impact on their
                    lives. Together, we can shape a brighter future.
                  </p>
                </div>
                <Link
                  to="/login/counselor"
                  className="w-full md:w-auto mt-8 mx-auto hover:scale-110 py-4 px-6 text-xl md:text-2xl font-bold rounded-md text-primary bg-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-300 text-gray-800 py-32 relative">
          <FloatingShapes />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center bg-white dark:bg-gray-900 p-12 rounded-xl shadow-lg">
              <h2 className="text-4xl font-semibold text-center mb-8 text-secondary">
                The Future of Counseling
              </h2>
              <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Our platform aims to revolutionize the way people access
                counseling services. By leveraging technology, we provide a
                seamless and efficient way for students and professionals to
                connect with experienced counselors. Our vision is to make
                counseling accessible to everyone, regardless of their location
                or financial situation.
              </p>
              <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                We believe that counseling can have a profound impact on
                individuals' lives, helping them overcome challenges, achieve
                their goals, and lead fulfilling lives. Our platform is designed
                to support this mission by offering a wide range of services,
                including one-on-one sessions, group workshops, and online
                resources.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
