import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool  // Add this line for prop type validation
  };

  componentDidMount() {
    this.props.getItems(); 
  }
onDeleteClick = id => {
  this.props.getItems();
}
  render() {
    const { items } = this.props.item;
    const { isAuthenticated } = this.props; // Add this line to destructure isAuthenticated

    return ( 
      <Container>
        {/* <Button
          color='dark'
          style = {{marginBottom:'2rem'}}
          onClick={() => {
            const name = prompt("enter item");
            if (name) {
              this.setState(state => ({
                items: [...state.items,{id:uuid(),name}]
              }))
            }
          }}
          >ADD ITEM</Button> */}
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {
                    this.props.isAuthenticated ? 
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this,_id)}
                    >
                      &times;
                    </Button>
                  : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}




const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});



export default connect(
  mapStateToProps, 
  { getItems, deleteItems }
  )(ShoppingList);
