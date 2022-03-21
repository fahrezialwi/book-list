import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Book from '../components/Book'

function Bookmark () {
  let localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const [bookmarks, setBookmarks] = useState(localBookmarks ? localBookmarks : []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const removeBookmark = (idBookmark) => {
    let result = bookmarks.filter(el => el.id !== idBookmark);
    setBookmarks(result);
  }

  const renderBook = () => {
    if (bookmarks.length > 0) {
      return bookmarks.map((el, index) => {
        return (
          <Book
            key={index}
            book={el}
            removeBookmark={removeBookmark}
            isBookmark={bookmarks.some(e => e.id === el.id)}
          />
        )
      });
    } else {
      return <Col>No Data</Col>
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h2 className="my-4">
              List Bookmarks  
            </h2>
          </Col>
        </Row>
        <Row>
          {renderBook()}
        </Row>
      </Container>
    </div>
  );
}

export default Bookmark;