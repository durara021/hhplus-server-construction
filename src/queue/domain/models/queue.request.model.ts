export class QueueRequestModel {
    id: number;
    userId: number;
    uuid: string;
    myPosition: number;
    
    updateMyPosition(newMyPosition) {
        this.myPosition = newMyPosition;
    }
}
