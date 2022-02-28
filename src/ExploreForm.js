import React from "react";
import { Form, Button, Container } from "react-bootstrap";

class ExploreForm extends React.Component {
    render() {
        return (
            <Container>
                <Form onSubmit={this.props.getCityInfo}>
                    <Form.Label>Pick A City!
                        <Form.Control onInput={this.props.handleInput} type="text" name="city" />
                    </Form.Label>
                    <Button size="lg" type="submit">Explore!</Button>
                </Form>
            </Container>
        )
    }
}

export default ExploreForm;
