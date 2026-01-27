import {Route,Routes} from 'react-router-dom'
import CandidateProfile from '../../presentation/pages/user/candidate/CandidateProfile'

export const CandidateRouter=()=>{
    return(
        <Routes>
            <Route path='profile' element={<CandidateProfile/>}  />
        </Routes>
    )
}