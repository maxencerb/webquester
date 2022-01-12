const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const;

const defaultHeaders = {
    // 'Cache-Control': 'no-cache, no-store, must-revalidate',
    // 'Pragma': 'no-cache',
    // 'Expires': '0',
}

const requestAuthorizations = ['Basic', 'Bearer', 'Custom'] as const;

const contentTypes = ['application/json', 'application/x-www-form-urlencoded', 'text/html', 'application/xml', 'text/plain'] as const;

export {
    methods,
    defaultHeaders,
    requestAuthorizations,
    contentTypes
}