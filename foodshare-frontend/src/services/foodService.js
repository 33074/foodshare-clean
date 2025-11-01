import apiClient from './api';

export const fetchFoodListings = async (searchQuery, category) => {
  let url = '/food';
  let params = {};

  if (searchQuery) {
    params.search = searchQuery;
  } else if (category && category !== 'All') {
    url = '/food/category';
    params.name = category;
  }

  const response = await apiClient.get(url, { params });
  return response.data; // Returns the list of food items
};

// You can add more functions here later:
// export const postFoodListing = async (foodData) => { ... }
// export const claimFoodItem = async (itemId) => { ... }
