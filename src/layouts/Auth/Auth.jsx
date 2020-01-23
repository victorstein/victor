/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from '../../routes.js'
import { Row, Col, Container } from 'reactstrap'

class Pages extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    })
  }
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  }
  getFullPageName = routes => {
    let pageName = this.getActiveRoute(routes);
    switch (pageName) {
      case "Pricing":
        return "pricing-page";
      case "Login":
        return "login-page";
      case "Register":
        return "register-page";
      case "Lock Screen":
        return "lock-page";
      default:
        return "Default Brand Text";
    }
  }
  componentDidMount() {
    document.documentElement.classList.remove("nav-open");
  }
  render() {
    return (
      <>
        <div className="wrapper wrapper-full-page d-flex align-items-center justify-content-center" ref="fullPages">
          <div className={"w-100 full-page " + this.getFullPageName(routes)}>
            <Container>
              <Row>
                <Col>
                  <h3>lottiefiles</h3>
                </Col>
                <Col>
                <div className='container'>
                  <Switch>{this.getRoutes(routes)}</Switch>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    )
  }
}

export default Pages;
