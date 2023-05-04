import {useHistory} from 'react-router-dom'
import LinksComponent from './links.component'
import {useGetUser} from '../../common/hooks/use-get-user'
import userService from '../../../service/user'
import {useQuery} from 'react-query'
import {APP_KEYS} from '../../common/consts'
import {User} from '../../common/types/user.types'

const LinksContainer = () => {
    const {user} = useGetUser()

    return (
        <LinksComponent user={user}/>
    )
}

export default LinksContainer