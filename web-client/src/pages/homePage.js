import React from "react";
import Account from "../components/account";
import Loading from "../components/loading";

class HomePage extends React.Component {
  state = {
    accounts: [],
    loading: true,
  };

  componentDidMount() {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((accounts) => {
        this.setState({
          loading: false,
          accounts: accounts.map((p, ii) => <Account {...p} key={ii} />),
        });
      })
      .catch((err) => console.log("API ERROR: ", err));
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center">{this.state.accounts}</div>
      </div>
    );
  }
}

export default HomePage;
