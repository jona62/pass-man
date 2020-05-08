import React from "react";
import validate from "../common/validate";
import auth from "../services/auth";
import { Redirect } from "react-router-dom";

// const confirmDelete = () => {
//   return window.confirm("Are you sure you want to delete this entry?");
// };

const style = {
  height: "100vh",
  width: "100%",
};

class EditPopup extends React.Component {
  constructor(props) {
    super(props);
    this.updateHandler = this.updateHandler.bind(this);
    this.deletionHandler = this.deletionHandler.bind(this);
  }

  state = {
    userId: null,
    error: false,
    success: false,
    formIsValid: false,
    formControls: {
      website: {
        value: "",
        placeholder: "Account Name",
        valid: false,
        touched: false,
        validationRules: {
          minLength: 3,
          isRequired: true,
        },
      },
      username: {
        value: "",
        placeholder: "username",
        valid: false,
        touched: false,
        validationRules: {
          minLength: 3,
          isRequired: true,
        },
      },
      password: {
        value: "",
        placeholder: "Password",
        valid: false,
        touched: false,
        validationRules: {
          isPassword: true,
        },
      },
    },
  };

  componentDidMount() {
    fetch("/api/users/")
      .then((res) => res.json())
      .then((users) => {
        users.forEach((user) => {
          if (user.email === auth.emailAddress) {
            this.setState({
              userId: user.id,
            });
          }
        });
      });
  }

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls,
    };
    const updatedFormElement = {
      ...updatedControls[name],
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(
      value,
      updatedFormElement.validationRules
    );

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid,
    });
  };

  updateHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    const { id } = this.props.match.params;
    formData["id"] = id;
    fetch("/api/accounts/", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          this.setState({
            success: true,
          });
          return res.json();
        }

        throw new Error("Account validation");
      })
      .catch((err) => {
        this.setState({
          error: true,
        });
      });
  };

  deletionHandler(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    fetch("/api/accounts/" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          this.setState({
            success: true,
          });
          return res.json();
        }

        throw new Error("Account validation");
      })
      .catch((err) => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    if (this.state.success) return <Redirect to="/home" />;
    let errorMessage = null;
    if (this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error saving this account."
        </div>
      );
    }
    return (
      <div
        style={style}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="card w-50 pt-3 pl-5 pr-5 border-0">
          <h2 className="modal-title">Edit Entry</h2>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="row">
              <div className="col-sm-12 pt-1 pb-3 text-muted">
                <label htmlFor="account-name">Account Name</label>
                <small className="account-name-error text-danger pl-4"></small>
                <input
                  className="form-control account-name"
                  type="text"
                  name="website"
                  placeholder={this.state.formControls.website.placeholder}
                  value={this.state.formControls.website.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.website.touched}
                  valid={this.state.formControls.website.value}
                  required
                />
              </div>

              <div className="col-sm-12 pt-1 pb-3 text-muted">
                <label htmlFor="username">Username</label>
                <small className="username-error text-danger pl-4"></small>
                <input
                  className="form-control username"
                  type="text"
                  name="username"
                  placeholder={this.state.formControls.username.placeholder}
                  value={this.state.formControls.username.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.username.touched}
                  valid={this.state.formControls.username.value}
                  required
                />
              </div>

              <div className="col-sm-12 pt-1 pb-5 text-muted">
                <label htmlFor="password">Password</label>
                <small className="password-error text-danger pl-4"></small>
                <input
                  className="form-control password"
                  type="password"
                  name="password"
                  placeholder={this.state.formControls.password.placeholder}
                  value={this.state.formControls.password.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.password.touched}
                  valid={this.state.formControls.password.value}
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            onClick={this.deletionHandler}
            type="button"
            className="btn btn-link text-danger float-left"
          >
            Delete Entry
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.updateHandler}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default EditPopup;
