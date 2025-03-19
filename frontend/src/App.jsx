import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration";
import LoginForm from "./Components/LoginForm";
import IssueForm from "./Components/IssueForm";
import Home from "./Components/Home";
import Master from "./Components/Layout/Master";
import SingleIssue from "./Components/SingleIssue";
import Contact from "./Components/Contact";
import AllIssues from "./Components/AllIssues";
import Profile from "./Components/Profile";
import About from "./Components/About";
import AdminDashboard from "./Components/Admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Master />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/issueform" element={<IssueForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/issues" element={<AllIssues />} />
          <Route path="/singleissue/:id" element={<SingleIssue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
