import {Campus} from '../../store/campuses/useCampusesStore';

export function isValidCampus(data: any): data is Campus {
  return (
    data &&
    typeof data.campusId === 'string' &&
    typeof data.displayName === 'string' &&
    typeof data.campusName === 'string'
  );
}
