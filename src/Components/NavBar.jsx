import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import shoppingCart from '../assets/shopping-cart.png';
import { NavLink, Link } from 'react-router-dom';

function NavBar({ cartCount }) {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>

                <Navbar.Brand as={Link} to="/">TechShop</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto gap-3">
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}
                            to="/products"
                        >
                            Products
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}
                            to="/cart"
                        >
                            Cart
                        </NavLink>
                    </Nav>

                    <Link to="/cart" className="position-relative">
                        <img
                            src={shoppingCart}
                            alt="Shopping Cart"
                            style={{ width: "35px", cursor: "pointer" }}
                        />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartCount}
                        </span>
                    </Link>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;