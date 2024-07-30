import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../src/pages/Signup";
import { Signin } from "../src/pages/Signin";
import { Blog } from "../src/pages/Blog";
import { Blogs } from "../src/pages/Blogs";
import { Publish } from "./pages/Publish";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
