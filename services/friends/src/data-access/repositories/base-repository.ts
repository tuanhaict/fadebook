import { DestroyOptions, Model, ModelStatic, UpdateOptions } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";



export abstract class RepositoryBase<T extends Model> 
{
    protected readonly model: ModelStatic<T>;
    constructor(model: ModelStatic<T>) {
        this.model = model;
    }
    async getAll() : Promise<Array<T> | null> {
        const entities = await this.model.findAll({});
        return entities;
    }
    async getById(id: string) : Promise<T | null> {
        const entity = await this.model.findByPk(id);
        return entity;
    }
    async add(entity: Partial<T>) : Promise<T> {
        const newEntity = await this.model.create(entity as MakeNullishOptional<T["_creationAttributes"]>);
        return newEntity;
    } 
    async updateById(id: string, entity: Partial<T>) : Promise<number> {
        const updateOptions : UpdateOptions = {
            where: {
                id
            }
        }
        const [rowsAffected] = await this.model.update(entity, updateOptions);
        return rowsAffected;
    }
    async deleteById(id: string) : Promise<void> {
        const deleteOptions : DestroyOptions = {
            where: {id}
        }
        await this.model.destroy(deleteOptions);
    }
}