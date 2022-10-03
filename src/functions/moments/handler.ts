import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";

import momentService from '../../services';
import Moment from "src/models/Moment";
import parseVideo from '../../libs/utils';

/**
 * getAllMoments
 */
export const getAllMoments = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const moments = await momentService.getAllMoments();
    return formatJSONResponse({ moments })
});

/**
 * createMoment
 */
export const createMoment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const request: any = event.body;
        const headers: any = event.headers;
        const video = parseVideo(request.path);

        const momentRequest: Moment = {
            ...request,
            id: v4(),
            appId: headers['app-id'],
            path: video.path,
            thumbnail: video.thumbnail,
            source: video.source,
            status: "Active",
            visitCount: 0,
            metaDetails: null
        };

        const moment = await momentService.createMoment(momentRequest);
        return formatJSONResponse({
            moment
        });

    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});

/**
 * getMoment
 */
export const getMoment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const moment = await momentService.getMoment(id)
        return formatJSONResponse({
            moment, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});

/**
 * updateMomentStatus
 */
export const updateMomentStatus = middyfy(async (event): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const params = event.body;
    try {
        const moment = await momentService.updateMomentStatus(id, params)
        return formatJSONResponse({
            moment, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});

/**
 * updateIsFeatureMoment
 */
export const updateIsFeatureMoment = middyfy(async (event): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const params = event.body;
    try {
        const moment = await momentService.updateIsFeatureMoment(id, params)
        return formatJSONResponse({
            moment, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});

/**
 * deleteMoment
 */
export const deleteMoment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const moment = await momentService.deleteMoment(id)
        return formatJSONResponse({
            moment, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});