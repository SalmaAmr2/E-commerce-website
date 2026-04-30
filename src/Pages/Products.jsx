import productsData from '../Data/Products.json';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import ProductCard from '../Components/ProductCard';

export default function Products({ addToCart, cartItems }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");

    const filteredProducts = productsData.Allproducts.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", "Devices", "Accessories", "Gaming"];

    return (
        <>
            <div className="hero-section p-5 text-center" 
            style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:'white'
                }}>
                <h2 className="display-5 fw-bold mb-3">Our Products</h2>
                <p className="mb-4">Explore our wide range of premium tech products</p>

                <Form.Control
                    type="text"
                    placeholder="🔍 Search by product name..."
                    className="mb-3 w-50 mx-auto"
                    style={{ borderRadius: '50px', padding: '12px 20px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="d-flex justify-content-center gap-2 flex-wrap">
                    {categories.map(cat => (
                        <Button 
                            key={cat}
                            variant={category === cat ? "light" : "outline-light"} 
                            className="px-4"
                            onClick={() => setCategory(cat)}
                            style={{ borderRadius: '25px' }}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <Container className="py-5">
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <p className="text-muted mb-0">
                        Showing {filteredProducts.length} products
                    </p>
                    
                </div>
                
                <Row>
                    {filteredProducts.map((product) => {
                        const isInCart = cartItems.some((item) => item.id === product.id);
                        return (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
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