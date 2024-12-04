import {Route, Routes} from 'react-router-dom';
import {ROUT_DATA} from './RouterConstant.jsx';

function AppRoutes() {
    return (
        <Routes>
            {ROUT_DATA.map((route, index) => {
                const Layout = route.layout;
                const Page = route.element;
                return route.layout ? (
                        <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
                    )
                    : route.children ? (
                            <Route key={index} path={route.path} element={<Page/>}>
                                {route.children.map((childRoute, index) => {
                                    const ChildElement = childRoute.element;
                                    return (
                                        <Route key={index} path={childRoute.path} element={<ChildElement/>}/>
                                    )
                                })}
                            </Route>
                        )
                        : (
                            <Route key={index} path={route.path} element={<Page/>}/>
                        );
            })}
        </Routes>
    );
}

export default AppRoutes;
