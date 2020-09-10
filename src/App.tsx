import React, { useState } from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

const log = (() => {
    let n = 1;
    return (s: any) => {
        const output = document.querySelector("#output");
        if (output) {
            output.textContent = output?.textContent + `${n}. ${s}\n`;
            n++;
        }
    }
})();

let canEnterLockedRoute = true;

const App = (props: any) => {
    let [locked, setLocked] = useState(canEnterLockedRoute);
    return (
        <div>
            <h1>App</h1>
            <div>Can enter locked routes: {`${locked}`}</div>
            <button onClick={() => {
                canEnterLockedRoute = !canEnterLockedRoute;
                setLocked(canEnterLockedRoute) 
            }}>
                {canEnterLockedRoute ? "Lock" : "Unlock"}
            </button>
            <ul>
                <li><Link to="/locked/one">Locked One</Link></li>
                <li><Link to="/locked/two">Locked Two</Link></li>
                <li><Link to="/unlocked/one">Unkocked One</Link></li>
                <li><Link to="/unlocked/two">Unlocked Two</Link></li>
            </ul>
            {props.children}
        </div>
    )
}

const UnlockedOne = () => {
    log("Rendering UnlockedOne")
    return <h3>Unlocked One</h3>
}

const UnlockedTwo = () => {
    log("Rendering UnlockedTwo")
    return <h3>Unlocked Two</h3>
}

const LockedOne = (props: any) => {
    log("Rendering LockedOne");
    return (
        <div>Locked One</div>
    )
}

const LockedTwo = (props: any) => {
    log("Rendering LockedTwo");
    return (
        <div>Locked Two</div>
    )
}

const AppRoutes = () => {
    return (
        <>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="locked" onEnter={(nextProps, replace) => {
                        let message = "Entering locked route. ";
                        if (!canEnterLockedRoute) {
                            message += "Cannot enter locked route. Redirecting"
                            replace("/unlocked/one")
                        }
                        log(message);
                    }}>
                        <Route path="one" component={LockedOne} />
                        <Route path="two" component={LockedTwo} />
                    </Route>
                    <Route path="unlocked" onEnter={() => {
                        log("Entering unlocked route.");
                    }}>
                        <Route path="one" component={UnlockedOne} />
                        <Route path="two" component={UnlockedTwo} />
                    </Route>
                </Route>
            </Router>
        </>
    );
}

export default AppRoutes;
