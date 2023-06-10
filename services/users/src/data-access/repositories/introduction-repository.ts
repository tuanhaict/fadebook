import { IntroductionModelFields, introductionModel } from "../models/introduction-model";
import { RepositoryBase } from "./base-repository";



class IntroductionRepository extends RepositoryBase<IntroductionModelFields> 
{
    constructor()
    {
        super(introductionModel);
    }
    async getIntroductionByUserId(userId: string) : Promise<IntroductionModelFields | null> {
        const introduction = await introductionModel.findOne({
            where: {
                userId
            }
        });
        return introduction;
    }
}

export const introductionRepository = new IntroductionRepository();

