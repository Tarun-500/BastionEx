import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Input, Button, Form, FormFeedback } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function App() {
  const [submittedValues, setSubmittedValues] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  console.log('lastName', lastName)
  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem('submittedValues'));
    if (storedValues) {
      setSubmittedValues(storedValues);
    }
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema,
    onSubmit: values => {
      const currentTime = new Date().toLocaleString();
      const newData = { ...values, time: currentTime };
      const updatedData = [...submittedValues, newData];
      setSubmittedValues(updatedData);
      localStorage.setItem('submittedValues', JSON.stringify(updatedData));
      formik.resetForm();
    },
  });

  return (
    <Container fluid>
      <Row>
        <Col sm="12" md="6" lg="8" className="p-0">
          <div className="box">
            <div className="rectangle">
              <div className="triangle top-right">
                <div className="centered-text">
                  {firstName ? firstName.charAt(0) : 'F'}
                </div>
              </div>
              <div className="triangle bottom-left">
                <div className="centered-text">
                  {lastName ? lastName.charAt(0) : 'L'}
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col sm="12" md="6" lg="4" className="p-4">
          <Card className="mb-5">
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <FormGroup className="mb-4">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    onChange={(e)=> {
                      formik.handleChange(e);
                      setFirstName(e.target.value)
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    invalid={formik.touched.firstName && !!formik.errors.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <FormFeedback className="position-absolute">{formik.errors.firstName}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup className="mb-4">
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    onChange={(e)=> {
                      formik.handleChange(e);
                      setLastName(e.target.value)
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    invalid={formik.touched.lastName && !!formik.errors.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <FormFeedback className="position-absolute">{formik.errors.lastName}</FormFeedback>
                  ) : null}
                </FormGroup>

                <Button color="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
          <p className="fw-bold">User List</p>

          <Card className="user_list">
            <CardBody>
              {submittedValues?.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {submittedValues.slice().reverse().map((data, index) => (
                    <li className="list-group-item" key={index}>
                      {data.firstName} {data.lastName} <br />
                      <small>
                        {data.time}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center p-3 mb-0">There are no records to display.</p>
              )}
            </CardBody>
          </Card>

        </Col>
      </Row>
    </Container>
  );
}

export default App;
