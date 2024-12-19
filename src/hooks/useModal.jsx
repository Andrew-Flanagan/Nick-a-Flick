import React, { createContext, useContext, useState } from "react";
import MovieModal from "../components/MovieModal/MovieModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({ open: false, movie: null });

  const openModal = (movie) => { setModalData({ open: true, movie }) };
  const closeModal = () => { setModalData({ open: false, movie: null }) };

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}
      {modalData.open && (
        <MovieModal
          movie={modalData.movie}
          open={modalData.open}
          handleClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
