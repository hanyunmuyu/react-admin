import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { authRoutes } from '../router'
import AdminLayout from './AdminLayout'
class AuthView extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {
                            authRoutes.map((route) => (
                                <Route path={route.path} key={route.id} exact={route.exact}>
                                    <Switch>
                                        {
                                            route.extend ?
                                                <AdminLayout>
                                                    {route.component}
                                                    {
                                                        route.routes?.map((r) => {
                                                            return (
                                                                <Route path={r.path} key={r.id} children={r.component} />
                                                            )
                                                        })
                                                    }
                                                </AdminLayout>
                                                :
                                                route.component
                                        }
                                    </Switch>
                                </Route>
                            ))
                        }
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default AuthView