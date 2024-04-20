import "../index.css"
import { Link, Outlet } from "react-router-dom"

export default function App() {
    const linkStyle = {
        padding: "10px",
        textDecoration: "none",
        color: "black",
        backgroundColor: "#ffcc00",
        borderRadius: "5px",
        margin: "5px",
        fontWeight: "bold",
    };
    return (
        <>
            <nav style={{ backgroundColor: "#ffcb05", padding: "10px" }}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/about" style={linkStyle}>About</Link>
            </nav>
            <Outlet />
        </>
    )
}