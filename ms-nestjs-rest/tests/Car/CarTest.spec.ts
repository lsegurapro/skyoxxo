import { Test } from '@nestjs/testing';
import { InterceptedAmqpConnection } from '../../apps/src/Helpers/Utilities/InterceptedAmqpConnection';
import { ConfigService } from '@nestjs/config';
import { CarService } from '../../apps/src/Services/CarService';
import { cacheMockFactory } from '../Mocks/MockTest';
import CarDao from 'apps/src/Daos/CarDao';
import { mockCarEntity } from 'tests/Transaction/TransactionMockTest';
import { mockUpdateCarRequest } from './CarMockTest';
import { HttpStatus } from '@nestjs/common';

jest.mock('apps/src/Daos/CarDao');
jest.mock('apps/src/Helpers/Utilities/InterceptedAmqpConnection');

describe('Car Test', () => {
    let carService: CarService;
    let carDao: CarDao;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CarDao,
                InterceptedAmqpConnection,
                ConfigService,
                CarService,
                { provide: 'CACHE_MANAGER', useFactory: cacheMockFactory },
            ]
        }).compile();

        carService = moduleRef.get<CarService>(CarService);
        carDao = moduleRef.get<CarDao>(CarDao);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('Update car', () => {
        it('should return an error: car not found exception', async () => {
            const updateCarRequest = mockUpdateCarRequest()
            jest.spyOn(carDao, 'get').mockImplementation(() => Promise.resolve(null));
            try {
                expect.assertions(1);
                await carService.update(1, updateCarRequest);
            } catch (error) {
                expect(error.status).toEqual(HttpStatus.NOT_FOUND);
            }
        });

        it('should return an error: car already exists', async () => {
            const carEntity = mockCarEntity();
            const carEntityV2 = mockCarEntity();
            const updateCarRequest = mockUpdateCarRequest()
            jest.spyOn(carDao, 'get')
                .mockImplementationOnce(() => Promise.resolve(carEntity))
                .mockImplementation(() => Promise.resolve(carEntityV2));
            try {
                expect.assertions(1);
                await carService.update(1, updateCarRequest);
            } catch (error) {
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        })
    });

});