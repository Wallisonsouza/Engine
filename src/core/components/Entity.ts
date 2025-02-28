export default class Entity {

    private _id: number;
    public static currentId: number = 0;
    private static recycledIds: number[] = [];

    public get id(): number {
        return this._id;
    }

    constructor() {
        this._id = Entity.generateId();
    }

    private static generateId(): number {
        if (Entity.recycledIds.length > 0) {
            return Entity.recycledIds.pop()!;
        }
        return Entity.currentId++;
    }

    destroy(): void {
        Entity.recycledIds.push(this._id);
        console.log(this.id)
    }
}
