import { CarEntity } from 'apps/src/Models/Entities/CarEntity';
import { TransactionEntity } from 'apps/src/Models/Entities/TransactionEntity';
import CreateTransactionRequest from 'apps/src/Models/Request/TransactionController/CreateTransactionRequest'

export const mockCreateTransactionRequest = (): CreateTransactionRequest => {
    let mock = new CreateTransactionRequest();
    mock.carId = 1;
    mock.description = 'testing';
    mock.services = [1, 2, 3];
    return mock;
}

export const mockCarEntity = () : CarEntity => {
    let car = new CarEntity();
    car.personId = 1;
    car.id = 123
    return car;
}

export const mockTransactionEntity = (): TransactionEntity => {
    let mock = new TransactionEntity();
    mock.id = 1;
    mock.enabled = true;
    return mock;
}