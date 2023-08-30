import React from "react";
import ThemeToggler from "../../design/ThemeToggler";
import { ThemeContext, useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
import { navigate } from "gatsby";
import { apiCaller } from "../../api/fetch";

export default function Home() {
  const { theme } = useTheme();
  const { token, decodeToken, logout } = useAuth();
  const [users, setUsers] = React.useState([]);
  const [loggedUser, setLoggedUser] = React.useState(undefined);
  const { callUsers } = apiCaller;

  useEffect(() => {
    if (token === "" || token === undefined) {
      alert("Please login to access this page");
      navigate("/");
      return;
    }

    callUsersAsync();
    if (loggedUser === undefined) setLoggedUser(decodeToken());
  }, [token, users]);

  const callUsersAsync = async () => {
    if (users.length === 0) {
      setUsers(await callUsers(token));
    }
  };

  return (
    <div
      data-theme={theme}
      style={{ height: "100vh" }}
      className="flex align-center flex-col pt-2"
    >
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Home</a>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-primary">Add User</button>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <ThemeToggler absolute={false} />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://picsum.photos/seed/picsum/200/300" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>
                  {loggedUser?.name} {loggedUser?.lastname}{" "}
                  <span className="badge badge-neutral">Profile</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table" style={{ userSelect: "none" }}>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((value) => {
              return (
                <tr>
                  <th></th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="font-bold">{value.id}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="font-bold">{value.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="font-bold">{value.lastname}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="font-bold">
                        {value.email}{" "}
                        <span className="text-red-400">
                          {value.email === loggedUser.email && "(You)"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-outline btn-xs">
                      edit
                    </button>
                    {value.email !== loggedUser.email && (
                      <button className="btn btn-error btn-outline btn-xs ml-2">
                        delete
                      </button>
                    )}
                  </th>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export const Head = () => <title>Home</title>;
