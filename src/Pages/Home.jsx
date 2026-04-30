import productsData from '../Data/Products.json';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

export default function HomePage({ addToCart, cartItems }) {
    return (
        <>
            <div
                className="hero-section p-5 text-center text-white"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div className="position-relative" style={{ zIndex: 2 }}>
                    <h1 className="fw-bold display-3 mb-3 animate__animated animate__fadeInUp">
                        Welcome to TechShop
                    </h1>
                    <p className="mb-4 fs-4" style={{ opacity: 0.95 }}>
                        Discover the latest in technology and innovation
                    </p>
                    <div className="d-flex gap-3 justify-content-center">
                        <Link to="/products">
                            <button className="btn btn-light btn-lg px-4">
                                Shop Now <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </Link>
                       
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    top: '-150px',
                    right: '-100px',
                    animation: 'pulse 3s infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    bottom: '-100px',
                    left: '-80px',
                    animation: 'pulse 3s infinite 1s'
                }}></div>
            </div>

            <Container className="featured-products py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-3">Featured Products</h2>
                    <p className="text-muted">Check out our most popular items this month</p>
                    <div className="mx-auto" style={{ width: '50px', height: '3px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                </div>

                <Row>
                    {productsData.FeaturedProducts.map((product) => {
                        const isInCart = cartItems.some((item) => item.id === product.id);
                        return (
                            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                                <ProductCard 
                                    product={product} 
                                    addToCart={addToCart} 
                                    isInCart={isInCart} 
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}