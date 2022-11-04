import React from "react";
import { Link, Outlet } from "react-router-dom"

const About = (props) => {
    return (
        <div>
            <div>Hello from About page</div>
            <ul>
                <li>
                    <Link to={"about-app"}>About App</Link>
                </li>
                <li>
                    <Link to={"about-author"}>About Author</Link>
                </li>
                <Outlet />
            </ul>
        </div>
    )
}

export default About