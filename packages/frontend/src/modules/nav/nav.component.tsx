import {HomeLink} from './nav.styled'
import {useHistory} from 'react-router-dom'
import {APP_KEYS} from '../common/consts'
import {Container} from './nav.styled'

const Nav = () => {
    const history = useHistory()

    return (
        <Container>
            <HomeLink onClick={() => history.push(APP_KEYS.ROUTER_KEYS.MY_TODOS)}>
                Home
            </HomeLink>
        </Container>
    )
}

export default Nav