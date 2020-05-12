import React, { Component } from "react";
import Entry from "./entry";

class Entries extends Component {
  render() {
    return (
      <div className="container entries pt-4">
        {this.props.accounts.map((account) => (
          <Entry
            key={account.id}
            id={account.id}
            // iconName={account.website}
            website={account.website}
            username={account.username}
            password={account.password}
          />
        ))}
      </div>
    );
  }
}

export default Entries;
