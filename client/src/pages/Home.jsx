import { useEffect,useState } from "react";
import { CounselorCard } from "../components/Counselor-Card/CounselorCard";
import { useAuth } from "../store/auth";
export const Home = () => {
  const { getCounselors} = useAuth();
  const [counselors, setCounselors] = useState([]);
  useEffect(() => {
    const counselorList = async () => {
      const data = await getCounselors();
      setCounselors(data || []);
    };
    counselorList();
  }, [getCounselors]);
    return (
      <div className="min-h-screen">
        Home Component
        <div className="p-5 border-2 border-black w-96">
          <div>
            <p>this is home</p>
            {/* {counselors.map((counselor) => (
              <CounselorCard  key={counselor._id} counselorData={counselor} />
            ))} */}
          </div>
        </div>
      </div>
    );
};
