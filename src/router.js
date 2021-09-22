import React, { createContext, useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useParams,
    useLocation
} from "react-router-dom";
import { useState } from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Context = createContext('111');


export default function RouterComp() {
    const [isDark, toggleDark] = useState(false)
    const a ={
        toggleTheme: ()=>{
            toggleDark(!isDark)
        },
        theme: isDark ? 'bark' : 'light'
    }


    return (
      
        <Context.Provider value={a}>
        <Router>
            <Body />
        </Router>
        </Context.Provider>

    );
}

function Body() {
    let query = useQuery();


    const [state, setState] = useState("");

    const handleClick = () => {
        console.log(Context.theme)
    //  Context.toggleTheme()
       
    };
    const handleChange = (event) => {
        setState(event.target.value)

    };
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/users/1">User 1</Link>
                    </li>
                </ul>
                <input onChange={handleChange}></input>
                <button onClick={handleClick}>add</button>
                
            </nav>

            {/* A <Switch> looks through its children <Route>s and
renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/users/:uuid">
                    <User name={query.get('name')} />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route>
                    <Error />
                </Route>
            </Switch>
        </div>
    )
}


function Home() {
    return <h2 style={{ color: "red" }}>Home</h2>;
}

function About() {
    return <h2 style={{ color: "blue" }}>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

function User({ name }) {

    const { uuid } = useParams();
    return <h1>User {uuid}</h1>;
}
function Error() {
    return <h1 style={{ color: "red" }}>Error 404</h1>;
}


function Child({ name }) {
    return (
        <div>
            {name ? (
                <h3>
                    The <code>name</code> in the query string is &quot;{name}
                    &quot;
                </h3>
            ) : (
                <h3>There is no name in the query string</h3>
            )}
        </div>
    );
}
