import React from "react";
import Account from "../components/account";
import Loading from "../components/loading";
import { Redirect } from "react-router-dom";

class ShowAccountPage extends React.Component {
  state = {
    loading: true,
    account: null,
    notFound: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch("/api/accounts/" + id)
      .then((res) => res.json())
      .then((account) => {
        this.setState({
          account: <Account {...account} />,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          notFound: true,
        });
      });
  }

  render() {
    if (this.state.notFound) return <Redirect to="/" />;
    if (this.state.loading) return <Loading />;
    return this.state.account;
  }
}

export default ShowAccountPage;
