import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionService } from '../../apps/src/Services/TransactionService';
import TransactionDao from '../../apps/src/Daos/TransactionDao';
import { InterceptedAmqpConnection } from '../../apps/src/Helpers/Utilities/InterceptedAmqpConnection';
import { ConfigService } from '@nestjs/config';
import { ServiceService } from '../../apps/src/Services/ServiceService';
import { CarService } from '../../apps/src/Services/CarService';
import { TransactionEntity } from '../../apps/src/Models/Entities/TransactionEntity';
import { cacheMockFactory, repositoryMockFactory } from '../Mocks/MockTest';
import { mockCreateTransactionRequest, mockTransactionEntity, mockCarEntity } from './TransactionMockTest';
import { BadRequestException } from '@nestjs/common';

jest.mock('../../apps/src/Daos/TransactionDao');
jest.mock('../../apps/src/Helpers/Utilities/InterceptedAmqpConnection');
jest.mock('../../apps/src/Services/ServiceService');
jest.mock('../../apps/src/Services/CarService');

describe('Transaction Test', () => {
    let transactionService: TransactionService;
    let carService: CarService;
    let transactionDao: TransactionDao;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TransactionService,
                TransactionDao,
                InterceptedAmqpConnection,
                ConfigService,
                ServiceService,
                CarService,
                { provide: 'CACHE_MANAGER', useFactory: cacheMockFactory },
                { provide: getRepositoryToken(TransactionEntity), useFactory: repositoryMockFactory },
            ]
        }).compile();

        transactionService = moduleRef.get<TransactionService>(TransactionService);
        carService = moduleRef.get<CarService>(CarService);
        transactionDao = moduleRef.get<TransactionDao>(TransactionDao);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('Create transaction', () => {
        it('should return a new transaction', async () => {
            const transactionRequest = mockCreateTransactionRequest();
            const carEntity = mockCarEntity();
            const transactionEntity = mockTransactionEntity();
            jest.spyOn(carService, 'findOne').mockImplementation(() => Promise.resolve(carEntity));
            jest.spyOn(transactionDao, 'create').mockImplementation(() => Promise.resolve(transactionEntity));
            const response = await transactionService.create(transactionRequest);
            expect.assertions(1);
            expect(response.id).toStrictEqual(transactionEntity.id);
        })

        it('should return an exception', async () => {
            const transactionRequest = mockCreateTransactionRequest();
            const carEntity = mockCarEntity();
            jest.spyOn(carService, 'findOne').mockImplementation(() => Promise.resolve(carEntity));
            jest.spyOn(transactionDao, 'create').mockImplementation(() => Promise.reject(new BadRequestException('Bye')));
            try {
                expect.assertions(1);
                await transactionService.create(transactionRequest);
            } catch (error) {
                expect(error.message).toEqual('Game Over...');
            }
        })
    });

    describe('change state', () => {
        it('should return a transaction list', async () => {
            const transactionEntity = mockTransactionEntity();
            jest.spyOn(transactionDao, 'getByPersonId').mockImplementation(() => Promise.resolve([transactionEntity]));
            let response = await transactionService.getTransactionsByPersonId(1);
            expect.assertions(1);
            expect(response.length).toStrictEqual(1);
        })

        it('should return a not found exception', async () => {
            jest.spyOn(transactionDao, 'getByPersonId').mockImplementation(() => Promise.resolve(null));
            try {
                expect.assertions(1);
                await transactionService.getTransactionsByPersonId(1);
            } catch (error) {
                expect(error.status).toStrictEqual(404);
            }
        })
    });
    

});