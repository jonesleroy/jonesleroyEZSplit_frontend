import React from "react";
import useQuery from "../API/useQuery";
import { Link } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

export default function selectItems() {
  const { data: menu, loading, error } = useQuery("/menuTable/6", "menu");

  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    if (menu?.length > 0) {
      setMenuList(menu);
    }
  }, [menu]);

  if (loading || !menu) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tbody>
            <td>
              {menuList?.map((menu) => (
                <MenuListItem key={menu.id} menu={menu} />
              ))}
            </td>
          </tbody>
        </thead>
      </table>
    </div>
  );

  function MenuListItem({ menu }) {
    return (
      <tr className="Menu">
        <th>{menu.items}</th>

        <th>
          <b>{menu.prices}</b>
        </th>
      </tr>
    );
  }
}
