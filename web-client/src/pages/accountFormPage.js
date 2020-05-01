import React from "react";
import TextInput from "../common/textInput";
import validate from "../common/validate";
import { Redirect } from "react-router-dom";

class AccountFormPage extends React.Component {
  state = {
    error: false,
    success: false,
    formControls: {
      website: {
        value: "",
        placeholder: "website",
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

  savePost = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    fetch("/api/accounts/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website: formData }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Content validation");
      })
      .then((account) => {
        this.setState({
          success: true,
        });
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
      <div className="col-10 col-md-8 col-lg-7">
        {errorMessage}
        <div className="input-group">
          <form>
            <TextInput
              name="website"
              type={"text"}
              placeholder={this.state.formControls.website.placeholder}
              value={this.state.formControls.website.value}
              onChange={this.changeHandler}
              touched={this.state.formControls.website.touched}
              valid={this.state.formControls.website.value}
            />
            <TextInput
              name="username"
              type={"text"}
              placeholder={this.state.formControls.username.placeholder}
              value={this.state.formControls.username.value}
              onChange={this.changeHandler}
              touched={this.state.formControls.username.touched}
              valid={this.state.formControls.username.value}
            />
            <TextInput
              name="password"
              type={"password"}
              placeholder={this.state.formControls.password.placeholder}
              value={this.state.formControls.password.value}
              onChange={this.changeHandler}
              touched={this.state.formControls.password.touched}
              valid={this.state.formControls.password.value}
            />
          </form>
          <button className="btn btn-primary" onClick={this.savePost}>
            Save Post
          </button>
        </div>
      </div>
    );
  }
}

export default AccountFormPage;
