import { useSelector } from 'react-redux';



function SplashPage () {

    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
        {!sessionUser &&
        <h1>Splash Page </h1>
        }
        </>
    )

}

export default SplashPage