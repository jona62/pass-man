import React from "react";
import Logo from "../img/Logo.png";
import validate from "../common/validate";
import auth from "../services/auth";
import { Link, Redirect } from "react-router-dom";

const style = {
  height: "100vh",
  width: "100%",
};

const styleImg = {
  width: "200px",
};

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      formIsValid: false, //we will use this to track the overall form validity

      formControls: {
        first_name: {
          value: "",
          placeholder: "First Name",
          valid: false,
          touched: false,
          validationRules: {
            minLength: 3,
            isRequired: true,
          },
        },
        last_name: {
          value: "",
          placeholder: "Last Name",
          valid: false,
          touched: false,
          validationRules: {
            minLength: 3,
            isRequired: true,
          },
        },
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
        repeat_password: {
          value: "",
          placeholder: "Repeat Password",
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
    auth.signup(formData).then((user) => {
      this.setState({ userId: user.id });
    });
  };

  render() {
    if (auth.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/home",
            id: this.state.userId,
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
          <h1 className="pb-5">Sign Up</h1>

          <form className="w-100" onSubmit={this.formSubmitHandler}>
            <div className="row w-100">
              <div className="col-sm-8 pt-1 pb-3 text-muted">
                <label hmtlFor="name">First Name</label>
                <small className="name-error text-danger pl-4"></small>
                <input
                  className="form-control full-name"
                  type="text"
                  name="first_name"
                  placeholder={this.state.formControls.first_name.placeholder}
                  value={this.state.formControls.first_name.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.first_name.touched}
                  valid={this.state.formControls.first_name.value}
                  required
                />
              </div>

              <div className="col-sm-8 pt-1 pb-3 text-muted">
                <label hmtlFor="name">Last Name</label>
                <small className="name-error text-danger pl-4"></small>
                <input
                  className="form-control full-name"
                  type="text"
                  name="last_name"
                  placeholder={this.state.formControls.last_name.placeholder}
                  value={this.state.formControls.last_name.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.last_name.touched}
                  valid={this.state.formControls.last_name.value}
                  required
                />
              </div>

              <div className="col-sm-8 pt-1 pb-3 text-muted">
                <label hmtlFor="email">Email Address</label>
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
                <label hmtlFor="password">Password</label>
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

              <div className="col-sm-8 pt-1 pb-3 text-muted">
                <label hmtlFor="repeat-password">Repeat Password</label>
                <small className="repeat-password-error text-danger pl-4"></small>
                <input
                  className="form-control repeat-password"
                  type="password"
                  name="repeat_password"
                  placeholder={
                    this.state.formControls.repeat_password.placeholder
                  }
                  value={this.state.formControls.repeat_password.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.repeat_password.touched}
                  valid={this.state.formControls.repeat_password.value}
                  required
                />
              </div>

              <div className="col-sm-12 pt-3 pb-4">
                <input
                  className="btn btn-primary"
                  type="submit"
                  name="Sign UP"
                  disabled={!this.state.formIsValid}
                />
              </div>
            </div>
            <div className="col-sm-12 text-muted">
              <span>Already have an account?</span>{" "}
              <Link className="nav-link" exact to="/login">
                login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
