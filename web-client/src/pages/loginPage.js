import React from "react";
import Logo from "../img/Logo.png";
import validate from "../common/validate";
import auth from "../services/auth.js";
import { Link, Redirect } from "react-router-dom";

const style = {
  height: "100vh",
  width: "100%",
};

const styleImg = {
  width: "200px",
};

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      userId: null,
      formIsValid: false,
      formControls: {
        email: {
          value: "",
          placeholder: "Email",
          valid: false,
          touched: false,
          validationRules: {
            isEmail: true,
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

  formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    const { email, password } = formData;
    auth.authenticate(email, password).then((user) => {
      this.setState({
        isAuthenticated: true,
      });
    });
  };

  render() {
    if (this.state.isAuthenticated) {
      const { pathname } = this.props.history.location.from || "/home";
      return (
        <Redirect
          to={{
            pathname: pathname,
          }}
        />
      );
    }
    return (
      <div
        style={style}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img className="pt-5 pb-5" style={styleImg} alt="Logo" src={Logo} />
        <div className="card w-50 pt-3 pl-5 pr-5 border-0">
          <h1 className="pb-5">Login</h1>

          <form className="w-100" onSubmit={this.formSubmitHandler}>
            <div className="row w-100">
              <div className="col-sm-8 pt-1 pb-3 text-muted">
                <label htmlFor="email">Email Address</label>
                <small className="email-error text-danger pl-4"></small>
                <input
                  className="form-control email"
                  type="email"
                  name="email"
                  placeholder={this.state.formControls.email.placeholder}
                  value={this.state.formControls.email.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.email.touched}
                  valid={this.state.formControls.email.value}
                  required
                />
              </div>

              <div className="col-sm-8 pt-1 pb-3 text-muted">
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

              <div className="col-sm-12 pt-3 pb-4">
                <input
                  className="btn btn-primary"
                  type="submit"
                  name="login"
                  disabled={!this.state.formIsValid}
                />
              </div>
            </div>
          </form>

          <div className="col-sm-12 text-muted">
            <span>Already have an account?</span>{" "}
            <Link className="nav-link" exact to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
