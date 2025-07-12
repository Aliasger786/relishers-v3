import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStateValue } from "../../../context/StateProvider";
import User from "./user";


const Users = () => {
  const [{ users }] = useStateValue();
  const [query, setQuery] = useState("");
  const filteredUsers = users.filter((item: any) => item.displayName.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full justify-center flex flex-col">
      {/* search bar */}
      <div className="w-full flex justify-center p-2 bg-white mb-4 rounded-lg">
        <input
          className="w-full p-2 outline-none rounded-lg "
          type="text"
          placeholder="Search user"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {/* search button */}
        <button className="flex items-center justify-center gap-3 text-orange-700 font-bold py-2 px-4 rounded-lg">
          <FaSearch />
        </button>
        <button
          className="flex items-center justify-center gap-3 text-gray-600 font-bold py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => setQuery("")}
        >
          Clear
        </button>
      </div>

      {/* dasboard statistics and counts */}
      <div className="w-full grid grid-cols-3 gap-1">
        {
          filteredUsers.map((user:any) => (
            <User key={user.uid} item = {user} />
          ))
        }
      </div>
    </div>
  );
};

export default Users;
