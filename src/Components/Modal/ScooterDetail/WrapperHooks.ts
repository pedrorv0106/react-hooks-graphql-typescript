
 import { useCallback } from 'react';
 import { useDispatch, useSelector } from 'react-redux';

 import {
    hideModalAction,
    showModalAction
 } from './WrapperConstants';
 
 export const useModal = () => {
  // Get modal params from store using reselect
  return {
    modal: useSelector((state: any) => state.scooterDetail)
  };
 };
 
export const useShowModal = () => {
  const dispatch = useDispatch();
  const handleOnShow = useCallback(() => {
    dispatch(showModalAction());
  }, [dispatch]);
  return {handleOnShow}
};

 
export const useHideModal = () => {
  const dispatch = useDispatch();
  const handleOnClose = useCallback(() => {
    dispatch(hideModalAction());
  }, [dispatch]);
  return {
    handleOnClose 
  }
};