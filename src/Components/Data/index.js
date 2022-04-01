import React, { Suspense } from 'react';
import '../../App.css';
import Grid from '@material-ui/core/Grid';
import {
  getAllImages,
  handleSubmit,
  updateState,
  onChangePage,
  handleNextbtn,
  handlePrevbtn,
} from './api';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      showImages: {},
      newType: {},
      err_message: '',
      currentPage: 1,
      pages: [],
    };
  }

  componentDidMount() {
    getAllImages(this);
  }

  render() {
    return (
      <Grid>
        <Grid container item xs={12} md={12}>
          <Grid item xs={4} md={4}></Grid>
          <Grid item xs={4} md={4}>
            <Grid className="searchImg">
              <Grid>
                <label>Search Images</label>
              </Grid>
              <input
                type="text"
                name="image_type"
                onChange={(e) => {
                  updateState(this, e);
                }}
              ></input>
              <button
                onClick={() => {
                  handleSubmit(this);
                }}
              >
                Submit
              </button>
              <div className="errMsg">{this.state.err_message}</div>
            </Grid>
          </Grid>
          <Grid item xs={4} md={4}></Grid>
        </Grid>
        <Grid className="imgSetInLine">
          <Suspense fallback={<div>Loading...</div>}>
            {this.state.showImages &&
              this.state.showImages?.length > 0 &&
              this.state.showImages.map((items, index) => (
                <div className="imageCss">
                  <p className="hideKeyInBros">Key={index}</p>
                  <img src={items?.urls?.full} alt="" title=""></img>
                </div>
              ))}
          </Suspense>
        </Grid>
        <Grid className="setPagesData">
          <button
            onClick={() => handlePrevbtn(this, this.state.currentPage - 1)}
            disabled={
              this.state.currentPage == this.state.pages[0] ? true : false
            }
          >
            Prev
          </button>
          {this.state.pages &&
            this.state.pages.length > 0 &&
            this.state.pages.map((number) => (
              <div
                className={this.state.currentPage === number ? 'active' : null}
                onClick={() => onChangePage(this, number)}
              >
                {number}
              </div>
            ))}
          <button
            onClick={() => handleNextbtn(this, this.state.currentPage + 1)}
            disabled={
              this.state.currentPage ==
              this.state.pages[this.state.pages.length - 1]
                ? true
                : false
            }
          >
            Next
          </button>
        </Grid>
      </Grid>
    );
  }
}

export default Index;
