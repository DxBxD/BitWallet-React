import { NavLink } from "react-router-dom"

export function AppHeader() {
    return (
        <header className="app-header flex justify-between items-center">
            <h1 className="logo">
                BitWallet
            </h1>
            <nav className="nav flex gap-2">
                <NavLink exact to="/" className="link" activeClassName="active">
                    Home
                </NavLink>
                <NavLink to="/contact" className="link" activeClassName="active">
                    Contacts
                </NavLink>
                <NavLink to="/statistics" className="link" activeClassName="active">
                    Statistics
                </NavLink>
            </nav>
        </header>
    )
}