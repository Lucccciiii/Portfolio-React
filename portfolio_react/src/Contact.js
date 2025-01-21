import React, {Component} from "react";

class Contact extends  Component {
    render() {
        return (
            <div className="text-purple-600">
                <h3>SPA App - Contact</h3>
                <p>Please feel free to contact me with feedback or questions.</p>
                <h4>Contact Details:</h4>
                <ul>
                    <li><strong>Email:</strong> omuluc@gmail.com</li>
                    <li><strong>Phone:</strong> +31 613037426</li>
                    <li><strong>Address</strong> 123 Janpieterderuyterlaan, Capelle aan den IJssel Nederland</li>
                </ul>
            </div>
        )
    }
}

export default Contact;