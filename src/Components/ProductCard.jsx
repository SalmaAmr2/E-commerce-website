import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, addToCart, isInCart }) {
    return (
        <Card className="h-100 shadow-sm product-card border-0 overflow-hidden">
            <div className="image-wrapper">
                <Card.Img 
                    variant="top" 
                    src={product.image} 
                    alt={product.title}
                    className="product-img"
                    style={{ 
                        height: '250px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                    }} 
                />
                {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                )}
            </div>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0 fs-6 fw-bold text-truncate">
                        {product.title}
                    </Card.Title>
                    <span className="category-badge">{product.category}</span>
                </div>
                
                <div className="rating mb-2">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi bi-star${i < (product.rating || 4) ? '-fill' : ''} text-warning`} style={{ fontSize: '12px' }}></i>
                    ))}
                    <span className="text-muted ms-1 small">({product.reviews || 24})</span>
                </div>
                
                <Card.Text className="text-muted small mb-3">
                    {product.description?.substring(0, 60)}...
                </Card.Text>
                
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold fs-4 text-primary">${product.price}</span>
                        {product.oldPrice && (
                            <span className="text-muted text-decoration-line-through small">${product.oldPrice}</span>
                        )}
                    </div>
                    
                    <Link to={`/product/${product.id}`}>
                        <Button variant="outline-dark" className="w-100 mb-2">
                            <i className="bi bi-eye me-2"></i>View Details
                        </Button>
                    </Link>
                    
                    {!isInCart ? (
                        <Button 
                            variant="primary" 
                            className="w-100 add-to-cart-btn"
                            onClick={() => addToCart(product)}
                        >
                            <i className="bi bi-cart-plus me-2"></i>Add to Cart
                        </Button>
                    ) : (
                        <Button variant="success" className="w-100" disabled>
                            <i className="bi bi-check-lg me-2"></i>Added to Cart
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}