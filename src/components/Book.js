import React from 'react';
import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

function Book ({book, addBookmark, removeBookmark, isBookmark}) {

  if (isBookmark) {
    return (
      <Col md="3" sm="6">
        <Card className="my-2 book-card">
          <CardBody className="d-flex flex-column">
            <div className="image-book">
              <img src={book.cover_url} alt={book.title}/>
            </div>
            <CardTitle tag="h4" className="mt-3">
              {book.title}
            </CardTitle>
            <CardSubtitle tag="h5" className="mt-1 mb-3">
              ({book.authors.join(", ")})
            </CardSubtitle>
            <CardText>
              {book.description}
            </CardText>
            <Button
              color="light"
              className="mt-auto"
              onClick={() => removeBookmark(book.id)}
            >
              Remove Bookmark
            </Button>
          </CardBody>
        </Card>
      </Col>
    )
  } else {
    return (
      <Col md="3" sm="6">
        <Card className="my-2 book-card">
          <CardBody className="d-flex flex-column">
            <div className="image-book">
              <img src={book.cover_url} alt={book.title}/>
            </div>
            <CardTitle tag="h4" className="mt-3">
              {book.title}
            </CardTitle>
            <CardSubtitle tag="h5" className="mt-1 mb-3">
              ({book.authors.join(", ")})
            </CardSubtitle>
            <CardText>
              {book.description}
            </CardText>
            <Button
              color="success"
              className="mt-auto"
              onClick={() => addBookmark(book)}
            >
              Bookmark
            </Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Book;