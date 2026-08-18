import { request } from '@zdy-oa/utils';

export const getFormDetail = (id: string) => {
    return request.request({
        url: `/api/form/detail/${id}`,
        method: 'GET'
    });
};