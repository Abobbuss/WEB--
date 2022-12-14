import React, { Component } from 'react'

export default class SelectModel extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: [],
          loaded: false,
          placeholder: "Loading"
        };
      }

      componentDidMount() {
        fetch("http://127.0.0.1:8000/api/model/")
          .then(response => {
            if (response.status > 400) {
              return this.setState(() => {
                return { placeholder: "Something went wrong!" };
              });
            }
            return response.json();
          })
          .then(data => {
            this.setState(() => {
              return {
                data,
                loaded: true
              };
            });
          });
      }

    render() {
        return (
            <div>
                f
            </div>
        );
  }
}

