// hooks/useSearchParamsFilters.js
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

const DEFAULT_VALUES = {
  title: '',
  startDate: '',
  endDate: '',
  minLikes: '',
  maxLikes: '',
  minDislikes: '',
  maxDislikes: '',
  sortBy: 'date', // Changed to date as default
  invert: false, // This will make it desc by default when true
  sentiments: ['positive', 'neutral', 'negative'],
};

const useSearchParamsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse current values from URL with proper defaults
  const getCurrentValues = useCallback(() => {
    const values = { ...DEFAULT_VALUES };

    // Simple fields
    [
      'title',
      'startDate',
      'endDate',
      'minLikes',
      'maxLikes',
      'minDislikes',
      'maxDislikes',
      'sortBy',
    ].forEach((key) => {
      const value = searchParams.get(key);
      if (value) values[key] = value;
    });

    // Boolean field - invert should be true for desc (newest first)
    values.invert = searchParams.get('invert') === 'true';

    // Array field - sentiments
    const sentiments =
      searchParams.get('sentiments') || searchParams.get('moods');
    if (sentiments) {
      values.sentiments = sentiments.split(',').filter(Boolean);
    }

    return values;
  }, [searchParams]);

  // Update URL params
  const updateParams = useCallback(
    (values) => {
      const params = new URLSearchParams();

      Object.entries(values).forEach(([key, value]) => {
        if (key === 'sentiments' && Array.isArray(value) && value.length > 0) {
          // Only add sentiments if not all three (default state)
          if (
            value.length < 3 ||
            !value.includes('positive') ||
            !value.includes('neutral') ||
            !value.includes('negative')
          ) {
            params.set('sentiments', value.join(','));
          }
        } else if (key === 'invert' && value) {
          params.set('invert', 'true');
        } else if (value && value !== '' && value !== DEFAULT_VALUES[key]) {
          params.set(key, value);
        }
      });

      setSearchParams(params);
    },
    [setSearchParams],
  );

  // Build API filters from current params
  const getApiFilters = useCallback(() => {
    const filters = {};

    const title = searchParams.get('title');
    if (title) {
      const cleanedTitle = title.replace(/\s*\(\d{4}\)\s*$/, '').trim();
      filters.title = cleanedTitle;
    }

    const startDate = searchParams.get('startDate');
    if (startDate) filters.startDate = startDate;

    const endDate = searchParams.get('endDate');
    if (endDate) filters.endDate = endDate;

    const minLikes = searchParams.get('minLikes');
    if (minLikes) filters.minLikes = Number(minLikes);

    const maxLikes = searchParams.get('maxLikes');
    if (maxLikes) filters.maxLikes = Number(maxLikes);

    const minDislikes = searchParams.get('minDislikes');
    if (minDislikes) filters.minDislikes = Number(minDislikes);

    const maxDislikes = searchParams.get('maxDislikes');
    if (maxDislikes) filters.maxDislikes = Number(maxDislikes);

    const sentiments =
      searchParams.get('sentiments') || searchParams.get('moods');
    if (sentiments) filters.sentiments = sentiments.split(',');

    return filters;
  }, [searchParams]);

  // Get sorting params
  const getSortParams = useCallback(() => {
    const sortBy = searchParams.get('sortBy') || 'date';
    const invert = searchParams.get('invert') === 'true';

    // For date sorting: invert=true means desc (newest first), which should be default
    // For other sorting: invert=true means desc
    const sortOrder = invert ? 'desc' : 'asc';

    return { sortBy, sortOrder };
  }, [searchParams]);

  // Reset to defaults
  const resetParams = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    currentValues: getCurrentValues(),
    updateParams,
    getApiFilters,
    getSortParams,
    resetParams,
  };
};

export default useSearchParamsFilters;
