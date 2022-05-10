export function success(message, data) {
    const response = {
        success: true,
        message: message,
        result: data,
    };
    return response;
}

export function failure(message, errors = {}) {
    const response = {
        success: false,
        message: message,
        errors: errors,
    };
    return response;
}
