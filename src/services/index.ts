import dynamoDBClient from "../models";
import MomentService from "./MomentService"

const momentService = new MomentService(dynamoDBClient());
export default momentService;
