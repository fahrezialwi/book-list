import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Input, InputGroup } from 'reactstrap';
import axios from 'axios'
import Book from '../components/Book'
import ReactPaginate from 'react-paginate';

function Category () {
  let navigate = useNavigate();
  let params = useParams();
  let localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  const [bookmarks, setBookmarks] = useState(localBookmarks ? localBookmarks : []);
  const [books, setBooks] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // The provided API (on server side) should accepting request from localhost, so I use Chrome extension called Allow CORS 
    axios.get('https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books', {
      params: {
        categoryId: params.categoryId,
        page: page,
      }
    }).then((res) => {
      setBooks(res.data);
      setResultSearch(res.data);
    });
  }, [params.categoryId, page]);

  useEffect(() => {
    // The provided API (on server side) should accepting request from localhost, so I use Chrome extension called Allow CORS 
    axios.get('https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories').then((res) => {
      let findCategory = res.data.find(e => e.id === Number(params.categoryId))
      setCategoryName(findCategory.name);
    });
  }, [params.categoryId]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (book) => {
    setBookmarks([...bookmarks, book])
  }

  const removeBookmark = (idBookmark) => {
    let result = bookmarks.filter(el => el.id !== idBookmark);
    setBookmarks(result);
  }

  const searchBook = () => {
    let resultTitle = [];
    let resultAuthor = [];

    resultTitle = books.filter((el) => {
      return el.title.toLowerCase().includes(searchInput.toLowerCase()) 
    })

    resultAuthor = books.filter((el) => {
      return el.authors.join("").toLowerCase().includes(searchInput.toLowerCase()) 
    })

    setResultSearch(resultTitle.concat(resultAuthor));
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    searchBook(); 
  }

  const changePage = (data) => {
    setPage(data.selected + 1)
  }

  const renderBook = () => {
    if (resultSearch.length > 0) {
      return resultSearch.map((el, index) => {
        return (
          <Book
            key={index}
            book={el}
            removeBookmark={removeBookmark}
            addBookmark={addBookmark}
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
              {categoryName}    
            </h2>
          </Col>
        </Row>
        <Row>
          <Col md="2" className="text-start">
            <Button
              color="success"
              className="mb-3"
              onClick={() => navigate('/bookmark')}
            >
              See Bookmarks
            </Button>
          </Col>
          <Col md="10">
            <Form onSubmit={(e) => searchSubmit(e)}>
              <InputGroup>
                <Input
                  placeholder="Search book by Title or Author"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button
                  onClick={() => searchBook()}
                >
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          {renderBook()}
        </Row>
        <Row>
          <Col className="mt-4">
            {/* The API should have a total length value for pagination */}
            <ReactPaginate
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLinkClassName="page-link"
              activeClassName="active"
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Prev"
              renderOnZeroPageCount={null}
              pageRangeDisplayed={5}
              pageCount={8}
              onPageChange={changePage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Category;