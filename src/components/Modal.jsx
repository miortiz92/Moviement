import React from 'react';
import SweetAlert from 'sweetalert2-react';

class Modal extends React.Component {
  state={
    show: this.props.suggest.show,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.suggest !== this.props.suggest) {
      this.setState({
        show: this.props.suggest.show,
      });
    }
  }

  render() {
    return (
      <div>
        <SweetAlert
          show={this.state.show}
          title={this.props.suggest.value}
          text={this.props.suggest.message}
          showCancelButton
          onCancel={() => this.props.onCancelBox}
          onConfirm={() => this.props.onConfirmBox}
        />
      </div>
    );
  }
};

export default Modal;
