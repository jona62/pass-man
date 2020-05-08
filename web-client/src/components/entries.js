import React, { Component } from "react";
import Entry from "./entry";

class Entries extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container entries pt-4">
        {this.props.accounts.map((account) => (
          <Entry
            key={account.id}
            // iconName={account.iconName}
            website={account.website}
            username={account.username}
            password={account.password}
          ></Entry>
        ))}
      </div>
    );
  }
}

export default Entries;
