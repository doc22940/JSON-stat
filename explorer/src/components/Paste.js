import React from "react";
import {fetchJsonStat, getMessage} from "./XHRUtils";

export default class Paste extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "ok"
    };
  }

  reset() {
    this.refs.jsonstat.value="";
    fetchJsonStat(this, this.props.loadData, null);
  }

  submit() {
    const jsonstat=this.refs.jsonstat;

    if(!jsonstat.value.trim()){
      this.setState({ status: "blank" });
      return;
    }

    fetchJsonStat(
      this,
      this.props.loadData,
      "paste",
      null,
      null,
      jsonstat.value.trim()
    );
  }

  render() {
    return (
      <section id="form">
        <textarea ref="jsonstat" placeholder="JSON-stat/CSV-stat/SDMX-JSON code"></textarea>
        <button className="btn btn-primary" onClick={this.submit.bind(this)}>Send</button>
        <button className="btn" onClick={this.reset.bind(this)}>Reset</button> <div id="version">v. {this.props.version}</div>
        {getMessage(this.state.status)}
      </section>
    );
  }
}
