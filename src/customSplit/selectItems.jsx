import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";

const SelectItems = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const guestCount = location.state?.guestCount || 1;
  const guestIndex = location.state?.guestIndex || 0;
  // For development, use mock data directly
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenuData = async () => {
      setLoading(true);
      try {
        // Fetch menu data from backend API
        const response = await fetch(
          `http://localhost:3000/menuTable/${tableNumber}`
        );
        if (!response.ok) {
          // If table-specific menu fails, try getting all menus
          const allMenusResponse = await fetch(
            "http://localhost:3000/menuTable"
          );
          if (!allMenusResponse.ok) {
            throw new Error("Failed to fetch menu data");
          }
          const allMenus = await allMenusResponse.json();
          const formattedItems = allMenus.map((m) => ({
            id: m.id,
            name: m.items || "Unnamed Item",
            price: parseFloat(m.prices || 0),
            selectedBy: null,
          }));
          setItems(formattedItems);
          console.log("Loaded all menu items from backend:", formattedItems);
        } else {
          const tableMenu = await response.json();
          const formattedItems = tableMenu.map((m) => ({
            id: m.id,
            name: m.items || "Unnamed Item",
            price: parseFloat(m.prices || 0),
            selectedBy: null,
          }));
          setItems(formattedItems);
          console.log(
            "Loaded table-specific menu from backend:",
            formattedItems
          );
        }
      } catch (error) {
        console.error("Failed to load menu data from backend:", error);
        // Fallback: show error message but don't crash
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadMenuData();
  }, [tableNumber]);
  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.selectedBy === guestIndex) {
          return { ...item, selectedBy: null };
        }
        if (item.id === id && item.selectedBy === null) {
          return { ...item, selectedBy: guestIndex };
        }
        return item;
      })
    );
  };
  const handleContinue = () => {
    const selectedItems = items.filter((i) => i.selectedBy === guestIndex);
    if (selectedItems.length === 0) {
      alert("Please select at least one item before continuing.");
      return;
    }
    navigate(`/table/${tableNumber}/custom-split-payment`, {
      state: {
        guestIndex,
        guestCount,
        selectedItems,
        totalAmount: selectedItems.reduce((sum, item) => sum + item.price, 0),
        completedPayments: location.state?.completedPayments || [],
      },
    });
  };
  console.log("SelectItems Debug:", { loading, items });

  if (loading) return <p>Loading menu...</p>;
  if (!items.length) return <p>No menu items found.</p>;
  return (
    <div className="select-items-page">
      <div className="selectItems-container">
        <header className="selectItems-header">
          <div className="logo-container">
            <img
              src="/ezsplit-logo.jpg"
              alt="EZSplit Logo"
              className="logo"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <h1 className="tagline">Making Dining Fun!</h1>
          <h2 className="selectItems-title">Select Your Items</h2>
          <p className="table-info">
            Table #{tableNumber} — Guest {guestIndex + 1} of {guestCount}
          </p>
        </header>
        <main className="selectItems-main">
          <div className="selectItems-list">
            {items.map((item) => (
              <div
                key={item.id}
                className={`selectItems-item ${
                  item.selectedBy === guestIndex
                    ? "selected"
                    : item.selectedBy !== null
                    ? "disabled"
                    : ""
                }`}
                onClick={() => {
                  if (
                    item.selectedBy === null ||
                    item.selectedBy === guestIndex
                  )
                    toggleItem(item.id);
                }}
              >
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
                <input
                  type="checkbox"
                  checked={item.selectedBy === guestIndex}
                  onChange={() => toggleItem(item.id)}
                  disabled={
                    item.selectedBy !== null && item.selectedBy !== guestIndex
                  }
                  className="item-checkbox"
                />
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={handleContinue}>
            Continue to Payment
          </button>
        </main>
      </div>
    </div>
  );
};
export default SelectItems;
