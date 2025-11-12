// Mock API service for development when backend is not available
const mockMenuData = [
  { id: 1, items: "Caesar Salad", prices: 12.99 },
  { id: 2, items: "Grilled Chicken", prices: 18.5 },
  { id: 3, items: "Margherita Pizza", prices: 16.75 },
  { id: 4, items: "Fish and Chips", prices: 15.25 },
  { id: 5, items: "Beef Burger", prices: 14.99 },
  { id: 6, items: "Chocolate Cake", prices: 7.5 },
  { id: 7, items: "Iced Tea", prices: 3.99 },
  { id: 8, items: "Craft Beer", prices: 6.5 },
];

export const mockApiService = {
  async getMenuByTable(tableNumber) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock data for any table number
    return mockMenuData;
  },
};

// Check if we're in development and backend is not available
export const isBackendAvailable = async () => {
  try {
    const response = await fetch("https://ezsplit.onrender.com", {
      method: "GET",
      timeout: 2000,
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
