import { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Checkout({ cartItems, clearCart }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    function validate() {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
        if (!formData.email.trim()) newErrors.email = 'Email is required.';
        if (!formData.address.trim()) newErrors.address = 'Shipping address is required.';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
        
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        
        if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number (min 10 digits).';
        }
        
        return newErrors;
    }

    function handleSubmit() {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsProcessing(true);
        
        // Simulate order processing
        setTimeout(() => {
            setOrderPlaced(true);
            clearCart();
            setIsProcessing(false);
        }, 1500);
    }

    if (orderPlaced) {
        return (
            <Container className="py-5" style={{ maxWidth: '600px' }}>
                <div className="success-message">
                    <div className="success-icon">
                        <i className="bi bi-check-lg"></i>
                    </div>
                    <h2 className="fw-bold text-success">Order Placed Successfully!</h2>
                    <p className="text-muted">
                        Thank you for shopping with TechShop!
                    </p>
                    
                    <div className="order-details">
                        <p><strong>Order Number:</strong> #ORD-{Math.floor(Math.random() * 1000000)}</p>
                        <p><strong>Customer:</strong> {formData.fullName}</p>
                        <p><strong>Shipping to:</strong> {formData.address}, {formData.city}</p>
                        <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
                    </div>
                    
                    <p className="text-muted small">
                        A confirmation email has been sent to {formData.email}
                    </p>
                    
                    <div className="d-flex gap-3 justify-content-center mt-4">
                        <Link to="/">
                            <Button className="back-home-btn">
                                <i className="bi bi-house me-2"></i>
                                Back to Home
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button variant="outline-primary">
                                <i className="bi bi-shop me-2"></i>
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Container className="py-5 text-center">
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <i className="bi bi-cart-x"></i>
                    </div>
                    <h3>Your cart is empty</h3>
                    <p>Add some items to your cart before checking out.</p>
                    <Link to="/products">
                        <Button className="shop-now-btn">
                            <i className="bi bi-shop me-2"></i>
                            Browse Products
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <>
            <div className="checkout-header">
                <div className="container">
                    <h2>Secure Checkout</h2>
                    <p>Complete your purchase with confidence</p>
                </div>
            </div>

            <Container className="checkout-container">
                {isProcessing && (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                )}
                
                <Row className="g-4">
                    <Col lg={5} md={6}>
                        <div className="checkout-summary-card">
                            <h5>
                                <i className="bi bi-cart-check me-2"></i>
                                Order Summary
                            </h5>
                            
                            <div className="checkout-items-list">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="checkout-item">
                                        <span className="checkout-item-name">
                                            {item.title} <span className="text-muted">× {item.quantity}</span>
                                        </span>
                                        <span className="checkout-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="checkout-divider"></div>
                            
                            <div className="checkout-item">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="checkout-item">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            
                            <div className="checkout-item">
                                <span>Tax (10%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            
                            <div className="checkout-total-row">
                                <span className="checkout-total-label">Total</span>
                                <span className="checkout-total-value">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </Col>
                    
                    <Col lg={7} md={6}>
                        <div className="checkout-form-card">
                            <h5>
                                <i className="bi bi-person-badge me-2"></i>
                                Shipping Information
                            </h5>
                            
                            <Form>
                                <Form.Group className="checkout-form-group">
                                    <Form.Label className="checkout-form-label">
                                        <i className="bi bi-person"></i>
                                        Full Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        className="checkout-form-control"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="checkout-form-group">
                                    <Form.Label className="checkout-form-label">
                                        <i className="bi bi-envelope"></i>
                                        Email Address
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        className="checkout-form-control"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="checkout-form-group">
                                    <Form.Label className="checkout-form-label">
                                        <i className="bi bi-telephone"></i>
                                        Phone Number
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        className="checkout-form-control"
                                        placeholder="123-456-7890"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="checkout-form-group">
                                    <Form.Label className="checkout-form-label">
                                        <i className="bi bi-geo-alt"></i>
                                        Shipping Address
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="address"
                                        className="checkout-form-control"
                                        placeholder="123 Main Street"
                                        value={formData.address}
                                        onChange={handleChange}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                
                                <Button
                                    className="place-order-btn"
                                    onClick={handleSubmit}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-credit-card me-2"></i>
                                            Place Order — ${total.toFixed(2)}
                                        </>
                                    )}
                                </Button>
                                
                                <div className="text-center mt-3">
                                    <Link to="/cart" className="text-decoration-none small">
                                        <i className="bi bi-arrow-left me-1"></i>
                                        Back to Cart
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}