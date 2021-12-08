/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  FormFeedback  
} from "reactstrap";

import { useRef, useState } from "react";
import AuthenticationService from "services/AuthenticationService";
import { useHistory } from "react-router-dom";
import { isEmpty } from "@firebase/util";


function useFormInput(initialValue, validate) {
  const [value, setValue] = useState(initialValue);
  const valid = validate(value) || value == "";

  return { value: value, setValue: setValue, valid: valid };
}

const Register = () => {
  const history = useHistory();
  const authenticationService = useRef(new AuthenticationService()).current;

  const [loading, setLoading] = useState(false);

  const name = useFormInput("", (value) => value.length >= 5);
  const email = useFormInput("", (value) => value.length >= 5);
  const password = useFormInput("", (value) => value.length >= 5);

  const [createAccountFeedback, setCreateAccountFeedback] = useState(undefined);

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  
  const onCreateAccountButtonClicked = async (ev) => {
    setLoading(true);

    try {
      await authenticationService.register(email.value, password.value, name.value);
    }
    catch(e) {
      console.log(e.toString());
      setLoading(false);
      setCreateAccountFeedback("create account failed");
      return;
    }

    
    history.push("/authentication_success");
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup >
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    placeholder="Name" type="text" value={name.value} valid={name.valid} invalid={!name.valid}
                    onChange={(ev) => name.setValue(ev.currentTarget.value)}
                  />

                  <FormFeedback invalid={true}>Name is not valid.</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email" type="email" autoComplete="new-email"
                    value={email.value}
                    onChange={(ev) => email.setValue(ev.currentTarget.value)}
                    valid={email.valid} invalid={!email.valid}
                  />                  

                  <FormFeedback invalid={true}>Email is not valid.</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password.value}
                    valid={password.valid}
                    invalid={!password.valid}
                    onChange={(ev) => password.setValue(ev.currentTarget.value)}                    
                  />

                  <FormFeedback invalid={true}>Password is not valid.</FormFeedback>
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"       
                      checked={privacyPolicyChecked}
                      onChange={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={onCreateAccountButtonClicked} disabled={!privacyPolicyChecked || loading}>
                  {(loading) ? "Loading..." : "Create Account"}
                </Button>

                <p style={{color: "red"}}>{createAccountFeedback}</p>                
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
