import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  ListGroup,
} from "react-bootstrap";

function CharacterPage() {
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  const [firstEpisode, setFirstEpisode] = useState({});

  const charResponse = async () => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    setCharacter(response.data);
    episodeResponse(response.data.episode[0]);
  };

  const episodeResponse = async (eps) => {
    const epsRes = await axios.get(eps);
    console.log(epsRes);
    setFirstEpisode(epsRes.data);
  };

  useEffect(() => {
    charResponse();
  }, []);

  console.log(firstEpisode);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4} className="mb-4">
            <Card
              bg="secondary"
              text="light"
              style={{ width: "26rem", marginTop: "5rem" }}>
              <Card.Img variant="top" src={character.image} />
              <div
                style={{
                  backgroundColor:
                    character.status == "Alive" ? "#2E8B57" : character.status == "unknown" ? "#EAEA4b" : "#BA2B00",
                }}>
                <Card.Header
                  className={
                    character.status == "Alive" ? "text-light" : "text-dark"
                  }>
                  Status: {character.status}
                </Card.Header>
              </div>
              <Card.Body>
                    <Card.Title className={"fw-bold text-large text-center"} style={{fontSize:"1.8em"}}>{character.name}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item variant="info" style={{color:'black', backgroundColor:"#ADD8E6"}}>Species: {character.species}</ListGroup.Item>
                    <ListGroup.Item variant="info" style={{color:'black', backgroundColor:"#ADD8E6"}}>Gender: {character.gender}</ListGroup.Item>
                    <ListGroup.Item variant="info" style={character.origin && character.origin.name === 'unknown' ? {color:'black', fontWeight:'bold', backgroundColor:'#EEA41C'}:{color:"black", backgroundColor:"#ADD8E6"}}>
                    Origin: {character.origin && character.origin.name}
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" style={{color:'black', backgroundColor:"#ADD8E6"}}>Location: {character.location && character.location.name}</ListGroup.Item>
                    <ListGroup.Item variant="info" style={{color:'black', backgroundColor:"#ADD8E6"}}>First Episode: {firstEpisode.name}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                <Button variant="primary" onClick={() => console.log("This will favorite")}> 
                  Details
                    
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CharacterPage;
