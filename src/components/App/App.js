import './App.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { PureComponent } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import ApiService from '../Fetch/Fetch';
import LoaderApp from '../Loader/LoaderApp';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiService = new ApiService();

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
};

class App extends PureComponent {
  state = {
    searchValue: null,
    images: [],
    status: Status.IDLE,
    modal: null,
    button: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { searchValue, status } = this.state;
    if (status === 'pending') {
      if (prevState.searchValue !== searchValue) {
        if (searchValue === '') {
          toast.warning('empty field');
          this.setState({ status: Status.IDLE });
          return;
        }
        this.setState({ images: [] });
        this.searchService();
      }
    }
  }

  searchService = async () => {
    const { searchValue } = this.state;
    try {
      const resp = await apiService
        .fetchImages(searchValue)
        .then(response => {
          if (response.hits.length < 12) {
            this.setState(({ images }) => ({
              images: [...images, ...response.hits],
              status: Status.RESOLVED,
              button: false,
            }));
            return response;
          }
          this.setState(({ images }) => ({
            images: [...images, ...response.hits],
            status: Status.RESOLVED,
            button: true,
          }));
          return response;
        })
        .then(r => {
          if (r.hits.length === 0) throw Error('шоза хрінь?');
        });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      return resp;
    } catch (error) {
      this.notification(error.message);
    }
  };

  onSubmit = value => {
    this.setState({
      searchValue: value.trim(),
      status: Status.PENDING,
    });
  };

  openModal = (image, tags) => {
    this.setState({ modal: { image, tags } });
  };
  closeModal = e => {
    if (e.target === e.currentTarget) {
      this.changeStateModal();
    }
    if (e.key === 'Escape') {
      this.changeStateModal();
    }
  };

  changeStateModal = () => {
    this.setState({ modal: null });
    window.removeEventListener('keydown', this.closeModal);
  };

  loadMore = e => {
    this.setState({ status: Status.PENDING });
    this.searchService();
  };

  notification = message => {
    toast.error(message);
  };

  render() {
    const {
      state: { status, images, modal, button },
      onSubmit,
      closeModal,
      openModal,
      loadMore,
    } = this;
    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images} openModal={openModal} />
        {status === 'pending' && <LoaderApp />}
        {modal && <Modal modal={modal} closeModal={closeModal} />}
        {button && <Button loadMore={loadMore} />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
