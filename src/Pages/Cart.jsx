import CartItem from "../Components/CartItem.jsx";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Cart({ cartItems, addToCart, decreaseQuantity, removeFromCart }) {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <Container className="py-5">
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <i className="bi bi-cart-x"></i>
                    </div>
                    <h3>Your Cart is Empty</h3>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <Link to="/products">
                        <Button className="shop-now-btn">
                            <i className="bi bi-shop me-2"></i>
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <>
            <div className="cart-header">
                <div className="container">
                    <h2>Your Shopping Cart</h2>
                    <p>Review and manage your items before checkout</p>
                </div>
            </div>

            <Container className="cart-container">
                <Row>
                    <Col lg={8}>
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    addToCart={addToCart}
                                    decreaseQuantity={decreaseQuantity}
                                    removeFromCart={removeFromCart}
                                />
                            ))}
                        </div>
                    </Col>
                    
                    <Col lg={4}>
                        <div className="order-summary">
                            <h4>Order Summary</h4>
                            
                            <div className="summary-row">
                                <span className="summary-label">Subtotal</span>
                                <span className="summary-value">${subtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="summary-row">
                                <span className="summary-label">Shipping</span>
                                <span className="summary-value">
                                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            
                            <div className="summary-row">
                                <span className="summary-label">Estimated Tax (10%)</span>
                                <span className="summary-value">${tax.toFixed(2)}</span>
                            </div>
                            
                            <div className="summary-row summary-total">
                                <span className="summary-label">Total</span>
                                <span className="summary-value">${total.toFixed(2)}</span>
                            </div>
                            
                            {subtotal > 0 && subtotal < 100 && (
                                <div className="alert alert-info mt-3 small">
                                    <i className="bi bi-truck me-2"></i>
                                    Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                                </div>
                            )}
                            
                            <Link to="/checkout">
                                <Button className="checkout-btn">
                                    <i className="bi bi-lock me-2"></i>
                                    Proceed to Checkout
                                </Button>
                            </Link>
                            
                            <div className="text-center mt-3">
                                <Link to="/products" className="text-decoration-none small">
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}