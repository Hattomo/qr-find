export interface CreateApiResponse {
    status: number,
    data: {
        qr_id: string,
        email: string,
        memo: string,
    }
}

export interface SendApiResponse {
    status: number,
    data: {
        qr_id: string,
        message: string,
    }
}
