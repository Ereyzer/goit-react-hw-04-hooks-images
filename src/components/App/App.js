import './App.css';
import React, { useState } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import fetchApi from '../../service/helpers/Fetch/Fetch';
import LoaderApp from '../Loader/LoaderApp';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notification = message => {
  toast.error(message);
};

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
};

function App() {
  const [searchValue, setSearchValue] = useState(null);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(null);
  const [button, setButton] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [currentPage, setCurrentPage] = useState(1);

  function renderGallery(value, page) {
    fetchApi({ searchQuery: value, currentPage: page })
      .then(r => {
        if (!r[0]) throw Error('please enter correct value');
        setImages(s => [...s, ...r]);
        setStatus(Status.IDLE);
        setButton(r.length < 12 ? false : true);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        return r;
      })
      .catch(error => {
        notification(error.message);
      });
    setCurrentPage(s => s + 1);
  }

  const onSubmit = value => {
    if (value === '') return notification('please fill in the search field');
    setCurrentPage(1);
    setImages([]);
    setSearchValue(value);
    setStatus(Status.PENDING);
    renderGallery(value);
  };

  const openModal = (image, tags) => {
    setModal({ image, tags });
  };
  const closeModal = e => {
    setModal(null);
  };

  const loadMore = e => {
    setStatus(Status.PENDING);
    renderGallery(searchValue, currentPage);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {status === 'pending' && <LoaderApp />}
      {modal && <Modal modal={modal} closeModal={closeModal} />}
      {button && <Button loadMore={loadMore} text="Load More" />}
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

export default App;
