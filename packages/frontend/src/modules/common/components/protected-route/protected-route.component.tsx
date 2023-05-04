import {Redirect} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {FC} from 'react'
import {useGetUser} from '../../hooks/use-get-user'
import {APP_KEYS} from '../../consts/index'

export type ProtectedRoute = {
    exact: boolean,
    path: string
}

const ProtectedRoute: FC<ProtectedRoute> = ({children, ...rest}) => {
    const {isLoading, user} = useGetUser()

    return (
        <Route {...rest} render={() => (
            <>
                {user ? (
                    <>
                        {children}
                    </>
                ) : !isLoading && (
                    <Redirect to={APP_KEYS.ROUTER_KEYS.LOGIN}/>
                )}
            </>
        )}/>
    )
}

export default ProtectedRoute