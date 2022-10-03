import { handlerPath } from '@libs/handler-resolver';

export const getAllMoments = {
    handler: `${handlerPath(__dirname)}/handler.getAllMoments`,
    events: [
        {
            http: {
                method: 'get',
                path: 'moments'
            }
        }
    ]
};

export const createMoment = {
    handler: `${handlerPath(__dirname)}/handler.createMoment`,
    events: [
        {
            http: {
                method: 'post',
                path: 'moments'
            }
        }
    ]
};

export const getMoment = {
    handler: `${handlerPath(__dirname)}/handler.getMoment`,
    events: [
        {
            http: {
                method: 'get',
                path: 'moments/{id}'
            }
        }
    ]
};

export const updateMomentStatus = {
    handler: `${handlerPath(__dirname)}/handler.updateMomentStatus`,
    events: [
        {
            http: {
                method: 'put',
                path: 'moments/{id}/update-status',
            }
        }
    ]
};

export const updateIsFeatureMoment = {
    handler: `${handlerPath(__dirname)}/handler.updateIsFeatureMoment`,
    events: [
        {
            http: {
                method: 'put',
                path: 'moments/{id}/is-featured',
            }
        }
    ]
};

export const deleteMoment = {
    handler: `${handlerPath(__dirname)}/handler.deleteMoment`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'moments/{id}'
            }
        }
    ]
};