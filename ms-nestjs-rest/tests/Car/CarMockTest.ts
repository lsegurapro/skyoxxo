import { CarEntity } from "apps/src/Models/Entities/CarEntity"
import UpdateCarRequest from "apps/src/Models/Request/CarController/UpdateCarRequest";


export const mockCarEntity = (): CarEntity => {
    let car = new CarEntity();
    car.id = 1,
    car.model = "Test";
    car.brand = "Test";
    car.patent = "AAA123";
    car.color = "Blue";
    car.enabled = true;
    car.personId = 1;
    return car;
}

export const mockUpdateCarRequest = (): UpdateCarRequest => {
    let mock = new UpdateCarRequest();
    mock.model = "Model Test";
    mock.brand = "Brand Test";
    mock.patent = "AAA111";
    mock.color = "Red";
    mock.personId = 1;
    mock.isActive = true;
    return mock;
}
