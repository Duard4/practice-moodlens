import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getReviews } from '../redux/review/operation';

const useReviews = (userId = null) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilters = useCallback(() => {
    const filters = {};

    ['title', 'startDate', 'endDate'].forEach((key) => {
      const value = searchParams.get(key);
      if (value) filters[key] = value;
    });

    ['minLikes', 'maxLikes', 'minDislikes', 'maxDislikes'].forEach((key) => {
      const value = searchParams.get(key);
      if (value) filters[key] = Number(value);
    });

    const sentiments = searchParams.get('sentiments');
    if (sentiments) filters.sentiments = sentiments.split(',');

    return filters;
  }, [searchParams]);

  const getPageAndSort = useCallback(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('invert') === 'true' ? 'desc' : 'asc';

    return { page, sortBy, sortOrder };
  }, [searchParams]);

  const loadReviews = useCallback(() => {
    const filters = getFilters();
    const { page, sortBy, sortOrder } = getPageAndSort();

    const payload = {
      page,
      perPage: 10,
      sortBy,
      sortOrder,
      filters,
      ...(userId && { userId }),
    };

    dispatch(getReviews(payload));
  }, [dispatch, userId, getFilters, getPageAndSort]);

  const updateFilters = useCallback(
    (newParams) => {
      const params = new URLSearchParams(searchParams);

      if (!newParams.page) {
        params.delete('page');
      }

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === '' || value === null || value === undefined) {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, value);
        }
      });

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  // Handle page changes
  const handlePageChange = useCallback(
    (page) => {
      updateFilters({ page });
    },
    [updateFilters],
  );

  // Load reviews when URL changes
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  return {
    handlePageChange,
    updateFilters,
    loadReviews,
    currentPage: parseInt(searchParams.get('page')) || 1,
  };
};

export default useReviews;
