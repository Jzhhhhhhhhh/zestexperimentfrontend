import React from 'react'
import './App.css'
import  Admin from "./pages/Admin-pwd/Admin"
import Terms from "./pages/TermsAndPolicies/Terms"
import Welcome from "./pages/HomePage/Welcome";
import NewQuestions from "./pages/New-question/NewQuestions";
import AdminHome from "./pages/Admin-homepage/AdminHome";
import NewSchedule from "./pages/New-Schedule/NewSchedule";
import ShowSchedules from "./pages/ShowSchedule/ShowSchedules";
import { HashRouter as Router, Link, Route, Redirect,Routes } from 'react-router-dom';



export default function App() {

    return(
        <Router>
            <Routes>
                <Route path="/welcome" element={<Welcome></Welcome>}/>
                <Route path="/admin" element={<Admin></Admin>}/>
                <Route path="/adminHomepage" element={<AdminHome></AdminHome>}/>
                <Route exact path="" element={<Terms></Terms>}/>
                <Route path="/newQuestions" element={<NewQuestions></NewQuestions>}/>
                <Route path="/newSchedule" element={<NewSchedule></NewSchedule>}/>
                <Route path="/showSchedule/:name" element={<ShowSchedules></ShowSchedules>}/>
            </Routes>
        </Router>
    )
}
