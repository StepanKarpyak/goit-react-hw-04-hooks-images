import { useState, useEffect } from 'react';
import { fetchImg } from './API';
import { Toaster, toast } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const perPage = 12;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState(null);
  const [tags, setTags] = useState(null);

  const addSearchValue = formData => {
    setSearchValue(formData);
    setPage(1);
    setImages([]);
    setIsLoading(false);
    setErrors(null);
  };

  useEffect(() => {
  if (searchValue === '') {
      return;
    }
  
    setIsLoading(true);

  try {
    fetchImg(searchValue, page).then(data => {
      const {
        data: { hits, totalHits },
      } = data;

      if (hits.length === 0) {
        toast.error('Sorry, there are no pictures. Try another request...');
        return setImages([]);
      }

      setImages(prevImages => [...prevImages, ...hits])

      setEndPage (totalHits - page * perPage)

    });

  } catch(error) {
    setErrors(error);
    toast.error('Whoops, something went wrong: error. Try new request');
    throw Error(errors);
  } finally {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    }

  }, [searchValue, page, errors]);

  const submitValue = e => {
    e.preventDefault();
    setSearchValue(e.currentTarget.elements.searchValue.value);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
    if (images.length > 0 && endPage < perPage) {
      return toast.error('Pictures are finished.Try new request');
    }
  };

  const toggleModal = (largeImg, tags) => {
    setShowModal(prevModal => !prevModal); 
    setLargeImg(largeImg);
    setTags(tags);
  };

    const shouldRenderLoreMoreButton = endPage > perPage / 2 && images.length > 0;

    return (
      <div>
        <Toaster position="top-right" /> 
        <Searchbar onSubmit={submitValue} propSubmit={addSearchValue}/>
        {images.length > 0 && (<ImageGallery propGallery={images} onClick={toggleModal} />)}
        {isLoading && <Loader />}
        {shouldRenderLoreMoreButton && <Button buttonProp={handleClick} />}
        {showModal && (<Modal onClosed={toggleModal}>
          <img src={largeImg} alt={tags} />
        </Modal>)}
      </div>
    );
}

export default App;