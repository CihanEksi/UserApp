import Link from "next/link";

const Component404 = () => {
    return (
        <div
            style={{ textAlign: 'center', marginTop: '50px' }}
        >
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link href={"/"}>Go to Home</Link>
        </div>
    );
}

export default Component404;