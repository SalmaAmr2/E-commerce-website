import productsData from '../Data/Products.json';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProductDetails({ addToCart, cartItems }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const foundProduct = productsData.Allproducts.find((p) => p.id === id);
            setProduct(foundProduct);
            setIsLoading(false);
        }, 300);
    }, [id]);
    
    const isInCart = cartItems.some((item) => item.id === product?.id);
    
    if (isLoading) {
        return (
            <Container className="py-5 text-center">
                <div className="loading-spinner mx-auto"></div>
                <p className="mt-3 text-muted">Loading product...</p>
            </Container>
        );
    }
    
    if (!product) {
        return (
            <Container className="py-5 text-center">
                <div className="empty-state">
                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '64px', color: '#ddd' }}></i>
                    <h3 className="mt-3">Product Not Found</h3>
                    <p className="text-muted">The product you're looking for doesn't exist.</p>
                    <Link to="/products">
                        <Button variant="primary">Browse Products</Button>
                    </Link>
                </div>
            </Container>
        );
    }
    
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <div className="product-detail-card">
                        
                        <div className="product-detail-image">
                            <img 
                                src={product.image} 
                                alt={product.title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image';
                                }}
                            />
                        </div>
                        
                        <div className="product-detail-info">
                            <h1 className="product-detail-title">{product.title}</h1>
                            
                            <div className="product-detail-category">
                                <i className="bi bi-tag me-1"></i>
                                {product.category}
                            </div>
                            
                            <div className="product-detail-price">
                                <span className="current-price">${product.price.toFixed(2)}</span>
                                {product.oldPrice && (
                                    <>
                                        <span className="old-price">${product.oldPrice.toFixed(2)}</span>
                                        <span className="discount-badge">
                                            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                            
                            <div className="product-detail-description">
                                <h4><i className="bi bi-info-circle me-2"></i>Description</h4>
                                <p>{product.description}</p>
                            </div>
                            
                            <div className="product-detail-features">
                                <div className="feature">
                                    <i className="bi bi-truck"></i>
                                    <span>Free Shipping</span>
                                </div>
                                <div className="feature">
                                    <i className="bi bi-shield-check"></i>
                                    <span>2 Year Warranty</span>
                                </div>
                                <div className="feature">
                                    <i className="bi bi-arrow-return-left"></i>
                                    <span>30 Day Returns</span>
                                </div>
                            </div>
                            
                            <div className="product-detail-action">
                                {!isInCart ? (
                                    <Button 
                                        className="add-to-cart-btn-detail"
                                        onClick={() => addToCart(product)}
                                    >
                                        <i className="bi bi-cart-plus me-2"></i>
                                        Add to Cart
                                    </Button>
                                ) : (
                                    <Button className="added-to-cart-btn-detail" disabled>
                                        <i className="bi bi-check-lg me-2"></i>
                                        Added to Cart
                                    </Button>
                                )}
                            </div>
                            
                            <div className="product-detail-back">
                                <button onClick={() => navigate(-1)}>
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back to Products
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            
            <style>{`
                .product-detail-card {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                }
                
                .product-detail-image {
                    background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
                    padding: 2rem;
                    text-align: center;
                    border-bottom: 1px solid #eee;
                }
                
                .product-detail-image img {
                    max-width: 100%;
                    max-height: 350px;
                    object-fit: contain;
                    transition: transform 0.3s ease;
                }
                
                .product-detail-image img:hover {
                    transform: scale(1.02);
                }
                
                .product-detail-info {
                    padding: 2rem;
                }
                
                .product-detail-title {
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: #1a1a2e;
                    text-align: center;
                }
                
                .product-detail-category {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    color: #667eea;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .product-detail-price {
                    text-align: center;
                    padding: 1rem 0;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 1.5rem;
                }
                
                .current-price {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #667eea;
                }
                
                .old-price {
                    font-size: 1.2rem;
                    color: #999;
                    text-decoration: line-through;
                    margin-left: 1rem;
                }
                
                .discount-badge {
                    background: #ff4757;
                    color: white;
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    margin-left: 1rem;
                    font-weight: bold;
                }
                
                .product-detail-description {
                    margin-bottom: 1.5rem;
                }
                
                .product-detail-description h4 {
                    font-size: 1.1rem;
                    font-weight: bold;
                    margin-bottom: 0.8rem;
                    color: #1a1a2e;
                }
                
                .product-detail-description p {
                    color: #666;
                    line-height: 1.7;
                }
                
                .product-detail-features {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }
                
                .feature {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: #666;
                }
                
                .feature i {
                    font-size: 1rem;
                    color: #667eea;
                }
                
                .product-detail-action {
                    text-align: center;
                    margin-bottom: 1rem;
                }
                
                .add-to-cart-btn-detail {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    padding: 12px 40px;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                
                .add-to-cart-btn-detail:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }
                
                .added-to-cart-btn-detail {
                    background: #28a745;
                    border: none;
                    padding: 12px 40px;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: not-allowed;
                }
                
                .product-detail-back {
                    text-align: center;
                }
                
                .product-detail-back button {
                    background: none;
                    border: none;
                    color: #667eea;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .product-detail-back button:hover {
                    transform: translateX(-3px);
                    color: #764ba2;
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @media (max-width: 768px) {
                    .product-detail-title {
                        font-size: 1.3rem;
                    }
                    
                    .current-price {
                        font-size: 1.8rem;
                    }
                    
                    .old-price {
                        font-size: 1rem;
                    }
                    
                    .product-detail-features {
                        gap: 1rem;
                    }
                    
                    .feature {
                        font-size: 0.7rem;
                    }
                    
                    .product-detail-info {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </Container>
    );
}