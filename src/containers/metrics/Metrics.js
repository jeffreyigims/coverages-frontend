import React from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { Card } from "react-bootstrap";
import { statusDisplay } from "../../utils/Helpers";

const PlotlyRenderers = createPlotlyRenderers(Plot);

export default class Metrics extends React.Component {
  render() {
    const { objects, status } = this.props;
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>Metrics</Card.Title>
          <Card.Body>
            {statusDisplay(
              status,
              <PivotTableUI
                data={objects}
                onChange={(s) => this.setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...this.state}
              />
            )}
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </>
    );
  }
}
