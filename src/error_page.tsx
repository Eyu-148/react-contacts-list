// useRouteError with typescript
// source: @PhiltasticGuy from https://github.com/remix-run/react-router/discussions/9628?sort=top

import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div className="error-page">
                <h1>Uh-oh...</h1>
                <h2>An unexpected error has occurred.</h2>
                <p>{error.status}: {error.statusText}</p>
                <p><i>{error.data.message}</i></p>
            </div>
        );
    }
    // otherwise...
    else if (error instanceof Error) {
        return (
            <div className="error-page">
                <h1>Uh-oh...</h1>
                <h2>An unexpected error has occurred.</h2>
                <p>{error.message || "Unknown error."}</p>
            </div>
        );
    }
    else {
        return <></>;
    }
}