import buildClient from '../api/build-client'
import axios from 'axios'

const LandingPage = ({ currentUser }) => {
    const uploadFile = async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        await axios.post('/api/upload', formData, {})
    }

    return currentUser ? (
        <div>
            <h1>You are signed in</h1>
            <input type="file" name="file" onChange={uploadFile} />
        </div>
    ) : (
        <h1>You are not signed in</h1>
    )
}

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context)
    const { data } = await client.get('/api/users/currentuser')
    return data
}

export default LandingPage

// ingress-nginx-controller-admission.kube-system.svc.cluster.local
