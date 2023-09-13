import Login from "@/Components/Login";
import Header from "@/Components/User/Header";
import Sidebar from "@/Components/User/Sidebar";
import { auth } from "@/db/firebase";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [sideNavActive, setSideNavActive] = useState("Dashboard");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Login/>;
  }

  return (
    <div className="text-white">
      <Header photoUrl={ `/about.png` ||user.photoURL} />
      <div
        className="h-screen pt-[75px] p-8 grid grid-cols-[3fr,9fr] max-sm:grid-cols-[1fr] gap-4 overflow-hidden"
        style={{ height: "calc(100vh)" }}
      >
        {/* Left Column */}
        <Scrollbars
          autoHide={true}
          autoHideTimeout={100}
          autoHideDuration={200}
          thumbMinSize={30}
          universal={true}
        >
          <Sidebar
            displayName={"User" || user.displayName}
          />
        </Scrollbars>
        {/* right Column */}
        <Scrollbars
          style={{ height: "calc(80vh)" }}
          autoHide={true}
          autoHideTimeout={100}
          autoHideDuration={200}
          thumbMinSize={30}
          universal={true}
        >
          <div className="w-full">
            <div className="flex flex-col flex-1 w-full">
            <Component {...pageProps} />
            </div>
          </div>
        </Scrollbars>
      </div>
      
    </div>
  );
}
