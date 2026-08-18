import { request } from '@zdy-oa/utils';

export const getFormDetail = (id: string) => {
    return request.request({
        url: `/api/form/detail/${id}`,
        method: 'GET'
    });
};

export const updateForm = (id: string, data: any) => {
    return request.request({
        url: `/api/form/update/${id}`,
        method: 'PATCH',
        data
    });
};