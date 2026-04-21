import { useState } from "react";
import Header from "../components/Header";
import URLInput from "../components/URLInput";
import URLList from "../components/URLList";

const Home = () => {
  const [urls, setUrls] = useState([]);

  const handleAddURL = (newURL) => {
    setUrls([newURL, ...urls]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Header />
      <URLInput onAddURL={handleAddURL} />
      <URLList urls={urls} />
    </div>
  );
};

export default Home;