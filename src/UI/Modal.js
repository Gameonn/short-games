import React, { PureComponent } from "react";
import "./Modal.css";

class Modal extends PureComponent {
  render() {
    return (
      <>
        {this.props.show ? (
          <div
            className="Modal-backdrop"
            onClick={this.props.modalClosed}
          ></div>
        ) : null}
        <div
          className="Modal"
          style={{
            transform: this.props.show
              ? "translateY(-20%)"
              : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
          <div className="divider"></div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={this.props.modalClosed}
              className="waves-effect waves-green btn-small right"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
