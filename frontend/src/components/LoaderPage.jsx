import { Loader } from "lucide-react";

const LoaderPage = () => {
  return <div className="h-screen flex justify-center items-center">
    <Loader className="animate-spin size-16"></Loader>
  </div>;
};

export default LoaderPage;
