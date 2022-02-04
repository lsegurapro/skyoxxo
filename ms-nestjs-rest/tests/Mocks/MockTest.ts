import { Repository } from 'typeorm';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    save: jest.fn()
}));

// @ts-ignore
export const cacheMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    del: jest.fn(),
    get: jest.fn(),
    reset: jest.fn(),
    set: jest.fn(),
    wrap: jest.fn(),
}));

export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
};
