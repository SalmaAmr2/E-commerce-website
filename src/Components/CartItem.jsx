import { Card, Button, Row, Col } from 'react-bootstrap';

export default function CartItem({ item, addToCart, decreaseQuantity, removeFromCart }) {
  return (
    <Card className="mb-3 shadow-sm p-3">
      <Row className="align-items-center text-center text-md-start">
        <Col md={2}>
          <img src={item.image} alt={item.title} className="img-fluid" style={{maxHeight: '100px'}} />
        </Col>
        <Col md={4}>
          <h5>{item.title}</h5>
          <p className="text-muted mb-0">Price: ${item.price}</p>
        </Col>
        <Col md={3}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(item.id)}>-</Button>
            <span className="fw-bold">{item.quantity}</span>
            <Button variant="outline-secondary" size="sm" onClick={() => addToCart(item)}>+</Button>
          </div>
        </Col>
        <Col md={2}>
          <p className="fw-bold mb-0">${(item.price * item.quantity).toFixed(2)}</p>
        </Col>
        <Col md={1}>
          <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
            <i className="bi bi-trash"></i> Delete
          </Button>
        </Col>
      </Row>
    </Card>
  );
}