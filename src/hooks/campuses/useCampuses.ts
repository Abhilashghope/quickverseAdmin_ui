import {useCampusesStore} from '../../store/campuses/useCampusesStore';

export const useCampuses = () => {
  const {
    campuses,
    selectedCampus,
    isLoading,
    error,
    fetchCampuses,
    selectCampus,
    clearSelectedCampus,
    addCampus,
    updateCampus,
    deleteCampus,
  } = useCampusesStore();

  return {
    campuses,
    selectedCampus,
    isLoading,
    error,
    fetchCampuses,
    selectCampus,
    clearSelectedCampus,
    addCampus,
    updateCampus,
    deleteCampus,
  };
};
