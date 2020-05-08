import React from "react";
import Loading from "../components/loading";
import Header from "../components/header";
import auth from "../services/auth";
import Entries from "../components/entries";
import SideMenu from "../components/side-menu";
import { Redirect } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onNewEntry = this.onNewEntry.bind(this);
    this.getKey = this.getKey.bind(this);
  }

  state = {
    accounts: [],
    account_id: "",
    loading: true,
    user: null,
  };

  onNewEntry(account) {
    const new_arr = [...this.state.accounts];
    new_arr.push(account);
    this.setState({
      accounts: new_arr,
    });
  }

  componentDidMount() {
    fetch("/api/users/")
      .then((res) => res.json())
      .then((users) => {
        users.forEach((user) => {
          if (user.email === auth.emailAddress) {
            this.setState({
              user: user,
            });
          }
        });
      })
      .catch((err) => console.log("API ERROR: ", err));

    fetch("/api/accounts/")
      .then((res) => res.json())
      .then((accounts) => {
        accounts.forEach((account) => {
          if (account.userId === this.state.user.id) {
            this.state.accounts.push(account);
          }
        });
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 400);
      })
      .catch((err) => console.log("API ERROR: ", err));
  }

  getKey(id) {
    console.log("Called ", id);
    this.setState({
      account_id: id,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.success) return <Redirect to="/home" />;

    return (
      <div className="App row">
        <SideMenu user={this.state.user} />
        <div className="col-sm-9">
          <Header />
          <Entries
            accounts={this.state.accounts}
            onClickHandler={this.getKey}
          />
          {/* <EditPopup accountId={this.state.account_id} /> */}
        </div>
      </div>
    );
  }
}

export default HomePage;
