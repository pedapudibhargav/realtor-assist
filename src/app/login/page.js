'use client'
import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useRouter } from "next/navigation";

export default function page() {
    const [erros, setErros] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEmailVerification, setIsEmailVerification] = React.useState(false);
    const router = useRouter();
    const BE_URI = process.env.NEXT_PUBLIC_BE_URI;

    React.useEffect(() => {
        const hash = window.location.hash.replace('#', '?'); // Replace # with ? to treat it as a query string
        const urlParams = new URLSearchParams(hash);
        const accessToken = urlParams.get('access_token');
        if (accessToken) {
            setIsEmailVerification(true);
            console.log('access_token:', accessToken);
            fetch(BE_URI + '/api/auth/email-verify/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ access_token: accessToken })
            })
                .then(res => res.json())
                .then(data => {
                    console.log('data:', data);
                    if (data.error) {
                        setErros([data.error]);
                    } else {
                        document.cookie = `access_token=${accessToken}`; // Store token in cookies                    
                        router.push('/app')
                    }
                })
                .catch(err => {
                    console.log('err:', err);
                    setErros([err.message]);
                });
        }
    }, []);

    const emailVerified = () => {

    }
    const validateForm = (e) => {
        const email = e.target.email.value;
        const password = e.target.email.value;
        let errors = [];
        if (email.length < 3 || !email.includes('@')) {
            errors.push("Enter a valid email");
        }
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters long");
        }
        setErros(errors);
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setErros([]);
        validateForm(e);
        if (erros.length > 0)
            return;
        const email = e.target.email.value;
        const password = e.target.password.value;
        setIsLoading(true);
        fetch(BE_URI + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log('data:', data);
                if (data.error) {
                    setErros([data.error]);
                } else {
                    console.log('Login successful:', data, data.session.access_token);
                    document.cookie = `access_token=${data.session.access_token}`; // Store token in cookies                    
                    router.push('/app')
                }
            })
            .catch(err => {
                console.log('err:', err);
                setErros([err.message]);
            }).finally(() => {
                setIsLoading(false);
            }
            );
    }

    const handleSingup = (e) => {
        e.preventDefault();
        router.push('/sign-up');
    }

    const emailVerifyConfirmationAlert = () => {
        return (
            <div className="alert alert-success" role="alert">
                Email verified successfully. Logging In now.....
            </div>
        )
    }

    // const handleForgotPassword = (e) => {
    //     e.preventDefault();
    //     // take email and password from the form and pass it to /auth/forgot-password
    //     const email = document.getElementById('email').value;
        
    // }
    return (
        <>
            <style type="text/css">
                {
                    `
                .login-card {
                    margin-top: 10rem;
                }
                `
                }
            </style>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className='login-card'>
                            <h1 className='text-center'>Login</h1>
                            <Card
                                bg={'dark'}
                                text={'white'}
                            >
                                <CardBody>
                                    {isEmailVerification && emailVerifyConfirmationAlert() ||
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input type="text" className="form-control" id="email" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="password" />
                                            </div>
                                            {erros.length > 0 && (
                                                <div className="alert alert-danger" role="alert">
                                                    {erros.map((error, index) => (
                                                        <p key={index}>{error}</p>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="d-grid gap-2">
                                                {isLoading ? (
                                                    <button type="submit" disabled className="btn btn-primary" size="lg">Hang tight...</button>
                                                ) :
                                                    <button type="submit" className="btn btn-primary" size="lg">Login</button>
                                                }
                                                <button onClick={handleSingup} className="btn btn-secondary" size="lg">Sign Up</button>
                                                {/* <a onClick={handleForgotPassword} className="btn btn-link">Forgot Password?</a> */}
                                            </div>
                                        </form>
                                    }
                                </CardBody>
                            </Card>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
