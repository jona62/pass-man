import React from "react";
import validate from "../common/validate";
import { Redirect } from "react-router-dom";
import auth from "../services/auth";

class AddEntry extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
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

  submitHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    formData["userId"] = this.state.userId;
    fetch("/api/accounts/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Account validation");
      })
      .then((account) => {
        this.setState({
          success: true,
        });
        this.props.addAccounts(account);
        console.log(account);
      })
      .catch((err) => {
        this.setState({
          error: true,
        });
      });
  };

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
        class="modal fade"
        id="addEntryPopup"
        data-backdrop="static"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addEntryPopupLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="addEntryPopupLabel">
                Add Entry
              </h2>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="row">
                  <div className="col-sm-12 pt-1 pb-3 text-muted">
                    <label for="account-name">
                      Account Name <span className="text-danger">*</span>
                    </label>
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
                    <label for="username">
                      Username <span className="text-danger">*</span>
                    </label>
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
                    <label for="password">
                      Password <span className="text-danger">*</span>
                    </label>
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
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                target="addEntryPopupLabel"
                data-backdrop="false"
                data-dismiss="modal"
                onClick={this.submitHandler}
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEntry;
