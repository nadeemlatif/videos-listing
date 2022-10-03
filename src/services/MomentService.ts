import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Moment from "../models/Moment";

/**
 * ``` Moment service is being used to store data, 
 *     provide available livestream and handle moments form the grounds.
 * ```
 * MomentService
 */
export default class MomentService {

    private Tablename: string = "CatalogMomentsTable";

    constructor(private docClient: DocumentClient) { }

    /**
     * getAllMoments
     */
    async getAllMoments(): Promise<Moment[]> {

        const moments = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise();

        return moments.Items as Moment[];
    }

    /**
     * createMoment
     * @param moment 
     */
    async createMoment(moment: Moment): Promise<Moment> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: moment
        }).promise()
        return moment as Moment;

    }

    async getMoment(id: string): Promise<Moment> {

        const moment = await this.docClient.get({
            TableName: this.Tablename,
            Key: { id }
        }).promise()

        if (!moment.Item) {
            throw new Error("Sorry, Moment not found with provided details.");
        }

        return moment.Item as Moment;

    }

    async updateMomentStatus(id: string, params: Moment): Promise<Moment> {

        const moment = await this.docClient.update({
            TableName: this.Tablename,
            Key: { id },
            UpdateExpression:
                "set #status = :status",
            ExpressionAttributeNames: {
                "#status": "status",
            },
            ExpressionAttributeValues: {
                ":status": params.status,
            },
            ReturnValues: "ALL_NEW",
        })
            .promise();

        return moment.Attributes as Moment;
    }

    async updateIsFeatureMoment(id: string, params: Moment): Promise<Moment> {
        const moment = await this.docClient.update({
            TableName: this.Tablename,
            Key: { id },
            UpdateExpression:
                "set #isFeatured = :isFeatured",
            ExpressionAttributeNames: {
                "#isFeatured": "isFeatured",
            },
            ExpressionAttributeValues: {
                ":isFeatured": params.isFeatured,
            },
            ReturnValues: "ALL_NEW",
        })
            .promise();

        return moment.Attributes as Moment;
    }

    async deleteMoment(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: { id }
        }).promise();
    }

}