import React, {Component} from "react";
import "./websites.css";

class Websites extends Component {

    constructor(){
        super();
        this.state = {
            websites: []
        }
    }

    componentDidMount(){
        fetch('/') //to be changed for real website api endpoint
            .then(res => res.json())
            .then(websites => this.setState({websites},
                ()=> console.log('websites data ..', websites)
                ));
    }
    render(){
        return(
            <div>
                <h2>Websites and Passwords</h2>
                <ul>
                    {this.state.websites.map(website =>
                        <li key={website.id}> {website.website} {website.username} {website.password}</li> //to be changed for real website field's name
                        )}
                    </ul>                    
            </div>
        );
    }
}

export default Websites;
