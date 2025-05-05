// src/services/storage.service.ts
import {MMKV} from 'react-native-mmkv';
import {Campus} from '../../../store/campuses/useCampusesStore';
import {isValidCampus} from '../../../utils/global/campusValidator';

// Initialize MMKV
export const storage = new MMKV();

// Define storage keys
const StorageKeys = {
  SELECTED_CAMPUS: 'selectedCampus',
} as const;

// Type-safe getters
export const StorageService = {
  // Campus methods
  getSelectedCampus: (): Campus | null => {
    const campusString = storage.getString(StorageKeys.SELECTED_CAMPUS);
    if (!campusString) return null;

    try {
      const campus = JSON.parse(campusString);
      return isValidCampus(campus) ? campus : null;
    } catch (error) {
      console.error('Failed to parse stored campus', error);
      return null;
    }
  },

  setSelectedCampus: (campus: Campus | null): void => {
    if (!campus) {
      storage.delete(StorageKeys.SELECTED_CAMPUS);
      return;
    }
    storage.set(StorageKeys.SELECTED_CAMPUS, JSON.stringify(campus));
  },

  // Clear all storage (optional)
  clearAll: (): void => {
    storage.clearAll();
  },

  // Add other storage methods as needed...
};
