import axios from 'axios';

// Get all images of data according to their type
export const getAllImages = (current) => {
  current.setState({ err_message: '' });
  var data = JSON.parse(localStorage.getItem('Type'));
  var image = data && data?.image_type ? data?.image_type : 'dog';
  let AccessKey = '1sH-jf3rglfu87SCMdXModK4RAYQ-gnawcJdnlFJP4Q';
  axios
    .get(
      'https://api.unsplash.com/search/photos?query=' +
        image +
        '&client_id=' +
        AccessKey
    )
    .then((response) => {
      if (response && response?.data && response?.data?.results) {
        var data = response?.data?.results;
        if (data && data?.length > 0) {
          const Pages = [];
          var itemsPerPage = 1;
          for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            Pages.push(i);
          }
          current.setState({
            showImages: data.slice(0, itemsPerPage),
            AllImages: data,
            pages: Pages,
            currentPage: 1,
          });
        } else {
          current.setState({
            err_message: 'No matches found!',
            showImages: {},
          });
        }
      }
    })
    .catch((err) => {});
};

// Submit type of image data
export const handleSubmit = (current) => {
  getAllImages(current);
};

// update state of image type
export const updateState = (current, e) => {
  const state = current.state.newType;
  state[e.target.name] = e.target.value;
  current.setState({ newType: state });
  localStorage.setItem('Type', JSON.stringify(current.state.newType));
};

// Set pagination data
export const onChangePage = (current, pageNumber) => {
  current.setState({
    showImages: current.state.AllImages.slice(
      (pageNumber - 1) * 1,
      pageNumber * 1
    ),
    currentPage: pageNumber,
  });
};

// Set value of next button
export const handleNextbtn = (current, pageNumber) => {
  current.setState({
    showImages: current.state.AllImages.slice(
      (pageNumber - 1) * 1,
      pageNumber * 1
    ),
    currentPage: pageNumber,
  });
};

// Set value of previous button
export const handlePrevbtn = (current, pageNumber) => {
  current.setState({
    showImages: current.state.AllImages.slice(
      (pageNumber - 1) * 1,
      pageNumber * 1
    ),
    currentPage: pageNumber,
  });
};
